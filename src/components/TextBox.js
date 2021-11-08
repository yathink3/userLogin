import React from 'react';

const TextBox = ({ className, label, startIcon, endIcon, placeholder, type, ...rest }) => (
  <div className={className}>
    <label htmlFor className='text-xs font-semibold px-1'>
      {label}
    </label>
    <div className='flex'>
      {startIcon && <div className={`w-10 z-10  pl-1 text-center pointer-events-none flex items-center justify-center`}>{startIcon}</div>}
      <input type={type || 'text'} className={`w-full ${startIcon && '-ml-10 pl-10 pr-3'} ${endIcon && '-mr-10 pr-10 pl-3'} py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500`} placeholder={placeholder || ''} {...rest} />
      {endIcon && <div className={`w-10 z-10  pl-1 text-center pointer-events-none flex items-center justify-center`}>{endIcon}</div>}
    </div>
  </div>
);

export default TextBox;
