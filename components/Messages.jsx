'use client';
import Spinner from '@/components/Spinner';
import { useEffect, useState } from 'react';
import moment from 'moment';

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

  return (
    <>
      <section className='bg-blue-50'>
        <div className='container m-auto py-14 max-w-6xl'>
          <div className='bg-white px-6 py-4 mb-4 shadow-md rounded-md border m-4 md:m-0'>
            <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>
            {messages.length === 0 ? (
              <p>You have no messages to show</p>
            ) : (
              messages.map((item) => (
                <div className='space-y-4'>
                  <div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
                    <h2 className='text-xl mb-4'>
                      <span className='font-bold'>Property Inquiry:</span>$
                      {item.property.title}
                    </h2>
                    <p className='text-gray-700'>{item.body}</p>

                    <ul className='mt-4'>
                      <li>
                        <strong>Name:</strong> {item.sender.name}
                      </li>

                      <li>
                        <strong>Reply Email:</strong>
                        <a
                          href='mailto:recipient@example.com'
                          className='text-blue-500'
                        >
                          {item.email}
                        </a>
                      </li>
                      <li>
                        <strong>Reply Phone:</strong>
                        <a href='tel:123-456-7890' className='text-blue-500'>
                          {item.phone}
                        </a>
                      </li>
                      <li>
                        <strong>Received:</strong>
                        {moment(item.createdAt).format('M/D/YYYY h:mm A')}
                      </li>
                    </ul>
                    <button className='mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md'>
                      Mark As Read
                    </button>
                    <button className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'>
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

export default Messages;
