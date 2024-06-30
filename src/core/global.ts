import api from '@core/api';
import {ADDRESS_WITHOUT_PROTOCOL} from '@utils/constants';
import {create} from 'zustand';
import secure from './secure';
import {
  IGlobalState,
  IParsedData,
  TMessage,
  TMessageList,
  TRequestUser,
  TResponseSources,
  TSearchedUser,
  TThumbnail,
  TUser,
  TUserTyping,
} from './types';
import utils from './utils';

//-----------------------------------------
//     Socket receive message handlers  (second argument for that function is y getter)
//-----------------------------------------

function responseSearch(set: any, _: unknown, data: TSearchedUser[] | []) {
  set(() => ({
    searchList: data,
  }));
}

function responseRequestList(
  set: any,
  _: unknown,
  requestsList: TRequestUser | [],
) {
  set(() => ({
    requestList: requestsList,
  }));
}

function responseMessageTyping(set: any, get: any, data: TUserTyping) {
  if (data.username !== get().messagesUsername) {
    return;
  }
  set(() => ({
    messagesTyping: new Date(),
  }));
}

function responseMessageList(set: any, get: any, data: TMessageList) {
  set(() => ({
    messagesList: [...get().messagesList, ...data.messages],
    messagesUsername: data.friend.username,
    messagesNext: data.next,
  }));
}

function responseMessageSend(set: any, get: any, data: TMessage) {
  const username = data.friend.username;
  // Move friendList item for this friend to the start of
  // list, update the preview text and update the time stamp
  const friendList = [...get().friendList];
  const friendIndex = friendList.findIndex(
    item => item.friend.username === username,
  );
  if (friendIndex >= 0) {
    const item = friendList[friendIndex];
    item.preview = data.message.text;
    item.updated = data.message.created;
    friendList.splice(friendIndex, 1);
    friendList.unshift(item);
    set(() => ({
      friendList: friendList,
    }));
    // If the message data does not belong to this friend then
    // dont update the message list, as a fresh message List will
    // be loaded the next time the user opens the correct chat window
    if (username !== get().messagesUsername) {
      return;
    }
  }
  const messagesList = [data.message, ...get().messagesList];
  set(() => ({
    messagesList: messagesList,
    messagesTyping: null,
  }));
}

function responseFriendList(set: any, get: any, friendList: TUser[] | []) {
  set(() => ({
    friendList: friendList,
  }));
}

function responseFriendNew(set: any, get: any, friend: TUser | TUser[]) {
  const friendList = [friend, ...get().friendList];
  set(() => ({
    friendList: friendList,
  }));
}

function responseThumbnail(set: any, _: unknown, data: TThumbnail) {
  set(() => ({
    user: data,
  }));
}

function responseRequestConnect(set: any, get: any, connection: TRequestUser) {
  const user = get().user;
  // If i was the one that made the connect request,
  // update the search list row
  if (user.username === connection.sender.username) {
    const searchList = [...get().searchList];
    const searchIndex = searchList.findIndex(
      request => request.username === connection.receiver.username,
    );
    if (searchIndex >= 0) {
      searchList[searchIndex].status = 'pending-them';
      set(() => ({
        searchList: searchList,
      }));
    }
    // If they were the one  that sent the connect
    // request, add request to request list
  } else {
    const requestList = [...get().requestList];
    const requestIndex = requestList.findIndex(
      request => request.sender.username === connection.sender.username,
    );
    if (requestIndex === -1) {
      requestList.unshift(connection);
      set(() => ({
        requestList: requestList,
      }));
    }
  }
}

function responseRequestAccept(set: any, get: any, connection: TRequestUser) {
  const user = get().user;
  // If I was the one that accepted the request, remove
  // request from the  requestList
  if (user.username === connection.receiver.username) {
    const requestList = [...get().requestList];
    const requestIndex = requestList.findIndex(
      request => request.id === connection.id,
    );
    if (requestIndex >= 0) {
      requestList.splice(requestIndex, 1);
      set(() => ({
        requestList: requestList,
      }));
    }
  }
  // If the corresponding userr is contained within the
  // searchList for the  acceptor or the  acceptee, update
  // the state of the searchlist item
  const sl = get().searchList;
  if (sl === null) {
    return;
  }
  const searchList = sl ? [...sl] : [];

  let searchIndex = -1;
  // If this user  accepted
  if (user.username === connection.receiver.username) {
    searchIndex = searchList.findIndex(
      user => user.username === connection.sender.username,
    );
    // If the other user accepted
  } else {
    searchIndex = searchList.findIndex(
      user => user.username === connection.receiver.username,
    );
  }
  if (searchIndex >= 0) {
    searchList[searchIndex].status = 'connected';
    set(() => ({
      searchList: searchList,
    }));
  }
}

export const useGlobalState = create<IGlobalState>((set, get) => ({
  //-------------------------
  //     Initialization
  //-------------------------

  initialized: false,
  init: async () => {
    const credentials = await secure.get('credentials');
    if (credentials) {
      try {
        const response = await api({
          method: 'POST',
          url: '/chat/signin/',
          data: {
            username: credentials.username,
            password: credentials.password,
          },
        });
        if (response.status !== 200) {
          throw 'Authentication error';
        }
        const user = response.data.user;
        const tokens = response.data.tokens;

        secure.set('tokens', tokens);
        setTimeout(() => {
          set(() => ({
            initialized: true,
            authenticated: true,
            user: user,
          }));
        }, 1300);
        return;
      } catch (error) {
        console.log('useGlobal.init: ', error);
      }
    }
    set(() => ({
      initialized: true,
    }));
  },

  //-------------------------
  //     Authentication
  //-------------------------
  authenticated: false,
  //@ts-ignore
  user: {},

  login: (credentials, user, tokens) => {
    secure.set('credentials', credentials);
    secure.set('tokens', tokens);
    //@ts-ignore
    set(() => ({
      authenticated: true,
      user: user,
    }));
  },

  logout: () => {
    secure.wipe();
    //@ts-ignore
    set(() => ({
      authenticated: false,
      user: {},
    }));
  },

  //-------------------------
  //     Websocket
  //-------------------------
  socket: null,

  socketConnect: async () => {
    const tokens = await secure.get('tokens');
    const url = `ws://${ADDRESS_WITHOUT_PROTOCOL}/chat/?token=${tokens?.access}`;
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log('SOCKET OPEN');
      socket?.send(JSON.stringify({source: 'request.list'}));
      socket?.send(JSON.stringify({source: 'friend.list'}));
    };

    socket.onmessage = event => {
      const parsed: IParsedData = JSON.parse(event.data);
      console.log('SOCKET MESSAGE', parsed);
      const responses: Record<
        TResponseSources,
        (set: any, get: any, data: any) => void
      > = {
        search: responseSearch,
        thumbnail: responseThumbnail,
        'friend.new': responseFriendNew,
        'friend.list': responseFriendList,
        'message.list': responseMessageList,
        'request.list': responseRequestList,
        'message.send': responseMessageSend,
        'message.type': responseMessageTyping,
        'request.accept': responseRequestAccept,
        'request.connect': responseRequestConnect,
      };

      const resp = responses[parsed.source];
      if (!resp) {
        console.log(`parsed.source "${parsed.source}" not found`);
        return;
      }
      resp(set, get, parsed.data);
    };

    socket.onerror = error => {
      console.log('SOCKET ERROR', error.message);
    };

    socket.onclose = () => {
      console.log('SOCKET CLOSED');
    };

    set(() => ({
      socket: socket,
    }));
  },
  socketClose: () => {
    const socket = get().socket;
    if (socket) {
      socket?.close();
    }
    set(() => ({
      socket: null,
    }));
  },

  //-------------------------
  //     Search
  //-------------------------

  searchUsers: (query: string) => {
    if (query) {
      const socket = get().socket;
      socket?.send(
        JSON.stringify({
          source: 'search',
          query: query,
        }),
      );
    } else {
      set(() => ({
        searchList: null,
      }));
    }
  },
  //-------------------------
  //     Friends
  //-------------------------
  friendList: null,
  //---------------------
  //     Messages
  //---------------------

  messagesList: [],
  messagesNext: null,
  messagesTyping: null,
  messagesUsername: null,

  messageList: (connectionId: number, page = 0) => {
    if (page === 0) {
      set(() => ({
        messagesList: [],
        messagesNext: null,
        messagesTyping: null,
        messagesUsername: null,
      }));
    } else {
      set(() => ({
        messagesNext: null,
      }));
    }
    const socket = get().socket;
    socket?.send(
      JSON.stringify({
        source: 'message.list',
        connectionId: connectionId,
        page: page,
      }),
    );
  },

  messageSend: (connectionId: number, message: string) => {
    const socket = get().socket;
    socket?.send(
      JSON.stringify({
        source: 'message.send',
        connectionId: connectionId,
        message: message,
      }),
    );
  },

  messageType: (username: string) => {
    const socket = get().socket;
    socket?.send(
      JSON.stringify({
        source: 'message.type',
        username: username,
      }),
    );
  },
  //-------------------------
  //     Requests
  //-------------------------
  requestList: null,

  requestConnect: (username: string) => {
    const socket = get().socket;
    socket?.send(
      JSON.stringify({
        source: 'request.connect',
        username: username,
      }),
    );
  },
  requestAccept: (username: string) => {
    const socket = get().socket;
    socket?.send(
      JSON.stringify({
        source: 'request.accept',
        username: username,
      }),
    );
  },

  //-------------------------
  //     Thumbnail
  //-------------------------

  uploadThumbnail: (file: TThumbnail) => {
    const socket = get().socket;

    if (socket && socket?.readyState === WebSocket?.OPEN) {
      socket?.send(
        JSON.stringify({
          source: 'thumbnail',
          base64: file.base64,
          filename: file.fileName,
        }),
      );
    } else {
      utils.log('WebSocket is not open. Unable to send message.');
    }
  },
}));
