'use client';
import Spinner from '@/components/Spinner';
import { useEffect, useState } from 'react';

const Messages = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch('/api/messages');
        if (res.status === 200) {
          const data = await res.json();
          setMessages(data);
        } else {
          console.log(res.statusText);
        }
      } catch (error) {
        console.log('Error fetching messages: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    getMessages();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return <div>Messages</div>;
};

export default Messages;
