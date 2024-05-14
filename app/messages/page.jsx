'use client';
import { useState, useEffect } from 'react';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';
import moment from 'moment';

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
      <section class='bg-blue-50'>
        <div class='container m-auto py-14 max-w-6xl'>
          <div class='bg-white px-6 py-4 mb-4 shadow-md rounded-md border m-4 md:m-0'>
            <h1 class='text-3xl font-bold mb-4'>Your Messages</h1>
            {messages.length === 0 ? (
              <p>You have no messages to show</p>
            ) : (
              messages.map((item) => (
                <div class='space-y-4'>
                  <div class='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
                    <h2 class='text-xl mb-4'>
                      <span class='font-bold'>Property Inquiry:</span>$
                      {item.property.title}
                    </h2>
                    <p class='text-gray-700'>{item.body}</p>

                    <ul class='mt-4'>
                      <li>
                        <strong>Name:</strong> {item.sender.name}
                      </li>

                      <li>
                        <strong>Reply Email:</strong>
                        <a
                          href='mailto:recipient@example.com'
                          class='text-blue-500'
                        >
                          {item.email}
                        </a>
                      </li>
                      <li>
                        <strong>Reply Phone:</strong>
                        <a href='tel:123-456-7890' class='text-blue-500'>
                          {item.phone}
                        </a>
                      </li>
                      <li>
                        <strong>Received:</strong>
                        {moment(item.createdAt).format('M/D/YYYY h:mm A')}
                      </li>
                    </ul>
                    <button class='mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md'>
                      Mark As Read
                    </button>
                    <button class='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'>
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default MessagesPage;
