import {useGlobalState} from '@core/global';
import React, {useEffect, useState} from 'react';
import MessageBubbleFriend from './MessageBubbleFriend';
import MessageBubbleMe from './MessageBubbleMe';

interface IMessageBubble {
  message: any;
  index: number;
  friend: any;
}

function MessageBubble({index, message, friend}: IMessageBubble) {
  const [showTyping, setShowTyping] = useState(false);

  const messagesTyping = useGlobalState((state: any) => state.messagesTyping);

  useEffect(() => {
    if (index !== 0) {
      return;
    }

    if (messagesTyping === null) {
      setShowTyping(false);
      return;
    }
    setShowTyping(true);

    const check = setInterval(() => {
      const now = new Date();
      //@ts-ignore
      const ms = now - messagesTyping;
      if (ms > 10000) {
        setShowTyping(false);
      }
    }, 0);
    return () => clearInterval(check);
  }, [index, messagesTyping]);

  if (index === 0) {
    if (showTyping) {
      return <MessageBubbleFriend friend={friend} typing={true} />;
    }
    return;
  }

  return message.is_me ? (
    <MessageBubbleMe text={message.text} />
  ) : (
    <MessageBubbleFriend text={message.text} friend={friend} />
  );
}

export default MessageBubble;
