import { ReactComponent as MenuIcon } from '@assets/icons/menu.svg';
import DarkModeToggler from '@components/DarkModeToggler';
import useOnClickOutside from '@custom-hooks/useOnClickOutside';
import { useUiSettingsDispatch, useUiSettingsStore } from '@features/settings/hooks';
import { useUserDispatch, useUserStore } from '@features/user/hooks';
import encryptStorage from '@helpers/encryptStorage';
import React, { lazy, Suspense, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import Loader from 'react-loader-spinner';
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom';

const withLazy = comp => props => {
  const Component = lazy(comp);
  return (
    <Suspense fallback={<Loader type='Puff' color='#00BFFF' height={100} width={100} />}>
      <Component {...props} />
    </Suspense>
  );
};

const MainApp = () => {
  const wrapperRef = useRef(null);
  const history = useHistory();
  const { clearValiadtion, resetUserState, fetchUserBytoken } = useUserDispatch();
  const { isValidated, userData, isFetching, isError } = useUserStore();
  const { navOpen } = useUiSettingsStore();
  const { updateUiSettings } = useUiSettingsDispatch();
  useOnClickOutside(wrapperRef, () => updateUiSettings({ navOpen: false }));

  useEffect(() => {
    if (!isValidated) fetchUserBytoken();
    clearValiadtion();
  }, []);

  const reset = () => {
    resetUserState();
    encryptStorage.removeItemFromPattern('user');
    history.push('/');
  };

  useEffect(() => {
    if (isError) reset();
  }, [isError]);

  const highlightUrl = url => (history.location.pathname.match(url) ? 'bg-blue-700 text-white' : '');

  const toggleNav = () => {
    updateUiSettings({ navOpen: !navOpen });
  };

  const onLogOut = () => {
    toast.success('LogOut Success');
    setTimeout(() => reset(), 800);
  };

  return isFetching || isError ? (
    <div className='h-screen w-screen flex items-center justify-center'>
      <Loader type='Puff' color='#00BFFF' height={100} width={100} />
    </div>
  ) : (
    <div className='relative min-h-screen lg:flex'>
      <div ref={wrapperRef} className={`sidebar bg-blue-800 text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform lg:transform-none lg:opacity-100 duration-200 lg:relative z-10 w-80 bg-indigo-900 text-white h-screen p-3 ${navOpen ? `translate-x-0 ease-in opacity-100` : `-translate-x-full ease-out opacity-0`}`}>
        <Link onClick={toggleNav} to='/app' className='text-white flex items-center space-x-2 px-4'>
          <svg className='w-8 h-8' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
            />
          </svg>
          <span className='text-2xl font-extrabold'>User DashBoard</span>
        </Link>
        <nav>
          <Link onClick={toggleNav} to='/app/home' className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white ${highlightUrl('/app/home')}`}>
            Home
          </Link>
          <Link onClick={toggleNav} to='/app/about' className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white ${highlightUrl('/app/about')}`}>
            About
          </Link>
          <Link onClick={toggleNav} to='/app/features' className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white ${highlightUrl('/app/features')}`}>
            Features
          </Link>
          <Link onClick={toggleNav} to='/app/pricing' className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white ${highlightUrl('/app/pricing')}`}>
            Pricing
          </Link>
        </nav>
      </div>
      <div className='relative z-0 lg:flex-grow'>
        <div className='relative z-0 lg:flex-grow'>
          <div className='bg-gray-800 text-gray-100 flex justify-between'>
            <button onClick={() => updateUiSettings({ navOpen: true })} className='p-4 rounded transition duration-200 focus:outline-none focus:bg-gray-700 hover:bg-gray-700 lg:hidden'>
              <MenuIcon />
            </button>
            <Link to='#' className='block p-4 text-white font-bold'>
              {userData.name}
            </Link>
            <div className='flex justify-between'>
              <DarkModeToggler />
              <button onClick={onLogOut} className='justify-center items-center pt-1 my-2 mx-2 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'>
                <span className='inline-flex mr-1'>
                  <svg className='w-5 h-5 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                    <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'></path>
                  </svg>
                  Log Out
                </span>
              </button>
            </div>
          </div>
          <div className='relative z-0 lg:flex-grow '>
            <div className='h-93h lg:h-95h max-h-93h lg:max-h-95h  bg-gray-50 flex flex-col justify-center py-2 lg:py-4 px-2 lg:px-4 overflow-y-auto dark:bg-gray-600'>
              <div className='flex-1 min-w-full rounded-2xl bg-white shadow-xl text-gray-800 relative flex items-center justify-center text-center text-left dark:bg-gray-300'>
                <Switch>
                  <Route exact path='/app' render={props => <Redirect {...props} to='/app/home' />} />
                  <Route path='/app/home' component={withLazy(() => import('./pages/Home'))} />
                  <Route path='/app/about' component={withLazy(() => import('./pages/About'))} />
                  <Route path='/app/features' component={withLazy(() => import('./pages/Features'))} />
                  <Route path='/app/pricing' component={withLazy(() => import('./pages/Pricing'))} />
                  <Route component={withLazy(() => import('../Error404'))} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainApp;
