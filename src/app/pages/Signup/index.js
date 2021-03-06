import { useUserDispatch } from '@features/user/hooks';
import { signupUserApi } from '@services/user';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useHistory } from 'react-router-dom';

const Signup = () => {
  const history = useHistory();
  const { loginUser } = useUserDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async data => {
    try {
      setIsFetching(true);
      await signupUserApi(data);
      toast.success('SignUp Success');
      await loginUser(data);
      setTimeout(() => history.push('/'), 800);
    } catch (errData) {
      setIsFetching(false);
      toast.error(errData.message);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 dark:bg-gray-800 dark:text-gray-100'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900  dark:text-white'>Sign Up to your account</h2>
      </div>
      <div className='mt-8 mx-2 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)} method='POST'>
            <div>
              <label for='name' className='block text-sm font-medium text-gray-700'>
                Name
              </label>
              <div className='mt-1'>
                <input id='name' name='name' type='text' ref={register({ required: true })} autocomplete='name' required className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:text-gray-900 sm:text-sm' />
              </div>
            </div>
            <div>
              <label for='email' className='block text-sm font-medium text-gray-700'>
                Email address
              </label>
              <div className='mt-1'>
                <input id='email' name='email' type='email' autocomplete='email' required ref={register({ pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i })} className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:text-gray-900 sm:text-sm' />
              </div>
            </div>
            <div>
              <label for='password' className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <div className='mt-1'>
                <input id='password' name='password' type='password' ref={register({ required: true })} autocomplete='current-password' required className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:text-gray-900 sm:text-sm' />
              </div>
            </div>
            <div>
              <button type='submit' className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
                {isFetching && (
                  <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' stroke-width='4'></circle>
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                )}
                <p>{isFetching ? `Signing up` : `Sign up`}</p>
              </button>
            </div>
          </form>
          <div className='mt-6'>
            <div className='relative'>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-white text-gray-500'>
                  Or <Link to='login'> Login</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
