'use client';
import { useState, useEffect } from 'react';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/messages');
        if (res.status === 200) {
          const data = await res.json();
          setMessages(data);
        } else {
          console.log(res.statusText);
          toast.error('Failed to fetch saved properties');
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {messages.length === 0 ? (
        <p>You have no messages to show</p>
      ) : (
        messages.map((item) => item.body)
      )}
    </>
  );
};

export default MessagesPage;
