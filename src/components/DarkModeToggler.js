import { ReactComponent as DarkIcon } from 'assets/icons/dark.svg';
import { ReactComponent as LightIcon } from 'assets/icons/light.svg';
import useDarkMode from 'custom-hooks/useDarkMode';
import React from 'react';

const DarkModeToggler = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  return (
    <button className='px-2 my-2 rounded transition duration-200 focus:outline-none focus:bg-gray-700 hover:bg-gray-700' onClick={() => toggleDarkMode(!isDarkMode)}>
      {isDarkMode ? <DarkIcon /> : <LightIcon />}
    </button>
  );
};

export default DarkModeToggler;
