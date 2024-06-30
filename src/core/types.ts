export type TConnectionType =
  | 'connected'
  | 'no-connection'
  | 'pending-them'
  | 'pending-me';

export type TSearchedUser = {
  username: string;
  name: string;
  thumbnail: string;
  status: TConnectionType;
};
export type TUserTyping = {
  username: string;
};
export type TRequestUser = {
  id: number;
  sender: Omit<TSearchedUser, 'status'>;
  receiver: Omit<TSearchedUser, 'status'>;
  created: Date;
};
export type TMessage = {
  message: {
    id: number;
    is_me: boolean;
    text: string;
    created: Date;
  };
  friend: Omit<TSearchedUser, 'status'>;
};
export type TMessageList = {
  messagesList: TMessage[];
  messages: TMessage[];
  next: number | null;
  friend: Omit<TSearchedUser, 'status'>;
};
export type TUser = {
  id: number;
  friend: Omit<TSearchedUser, 'status'>;
  preview: 'New connection';
  updated: Date;
};
export type TThumbnail = {
  uri: string;
  fileSize: number;
  height: number;
  base64: string;
  type: string;
  width: number;
  fileName: string;
};

export type TResponseSources =
  | 'search'
  | 'thumbnail'
  | 'friend.new'
  | 'friend.list'
  | 'message.list'
  | 'request.list'
  | 'message.send'
  | 'message.type'
  | 'request.accept'
  | 'request.connect';
export interface IParsedData {
  source: TResponseSources;
  data: any; // Type this properly if possible
}
export interface IGlobalState {
  initialized: boolean;
  authenticated: boolean;
  user: TSearchedUser | null;
  socket: WebSocket | null;
  searchList: TSearchedUser[] | null;
  requestList: TRequestUser[] | null;
  friendList: TUser[] | null;
  messagesList: TMessage[];
  messagesNext: number | null;
  messagesTyping: Date | null;
  messagesUsername: string | null;

  // Functions to update the state
  init: () => Promise<void>;
  login: (credentials: any, user: TUser, tokens: string[]) => void;
  logout: () => void;
  socketConnect: () => Promise<void>;
  socketClose: () => void;
  searchUsers: (query: string) => void;
  messageList: (connectionId: number, page?: number) => void;
  messageSend: (connectionId: number, message: string) => void;
  messageType: (username: string) => void;
  requestConnect: (username: string) => void;
  requestAccept: (username: string) => void;
  uploadThumbnail: (file: TThumbnail) => void;
}

export type SetStateFunction = (partial: Partial<IGlobalState>) => void;
export type GetStateFunction = () => IGlobalState;
