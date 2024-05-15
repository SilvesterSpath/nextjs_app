import moment from 'moment';

const Message = ({ message }) => {
  console.log(message);
  return (
    <>
      {' '}
      <div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
        <h2 className='text-xl mb-4'>
          <span className='font-bold'>Property Inquiry:</span>$
          {message.property.title}
        </h2>
        <p className='text-gray-700'>{message.body}</p>

        <ul className='mt-4'>
          <li>
            <strong>Name:</strong> {message.name}
          </li>

          <li>
            <strong>Reply Email:</strong>
            <a href='mailto:recipient@example.com' className='text-blue-500'>
              {message.email}
            </a>
          </li>
          <li>
            <strong>Reply Phone:</strong>
            <a href='tel:123-456-7890' className='text-blue-500'>
              {message.phone}
            </a>
          </li>
          <li>
            <strong>Received:</strong>
            {moment(message.createdAt).format('M/D/YYYY h:mm A')}
          </li>
        </ul>
        <button className='mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md'>
          Mark As Read
        </button>
        <button className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'>
          Delete
        </button>
      </div>
    </>
  );
};

export default Message;
