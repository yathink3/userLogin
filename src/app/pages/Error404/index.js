import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => (
  <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
    <div className='w-9/12 m-auto py-16 min-h-screen flex items-center justify-center'>
      <div>
        <div className='text-8xl font-dark font-bold'>404</div>
        <p className='text-2xl md:text-3xl font-light leading-normal'>Sorry we couldn't find this page. </p>
        <p className='mb-8'>But dont worry, you can find plenty of other things on our homepage.</p>
        <Link to='/app'>
          <button className='py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>back to homepage</button>
        </Link>
      </div>
    </div>
  </div>
);

export default Error404;
