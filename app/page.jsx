'use client';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md'>
        <h1 className='text-3xl font-bold mb-6'>Welcome to PropertyPulse</h1>
        <div className='mb-4'>
          <input
            type='email'
            placeholder='name@yourcompany.com'
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <button className='w-full py-2 mb-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
          Continue with Email
        </button>
        <div className='flex justify-center mb-4'>
          <span className='mx-2 text-gray-500'>OR</span>
        </div>
        <button className='w-full py-2 mb-4 bg-white text-gray-700 font-bold border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400'>
          Continue with Google
        </button>
        <button className='w-full py-2 bg-black text-white font-bold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500'>
          Continue with Apple
        </button>
        <div className='mt-6 text-center'>
          <a href='#' className='text-blue-500 hover:text-blue-600'>
            Already have an account? Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
