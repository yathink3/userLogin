import React, { forwardRef } from 'react';

const hocify = useHook => Component => {
  const WithHook = forwardRef((props, ref) => {
    const results = useHook(props);
    if (typeof results !== 'object') throw new Error(`[hocify]: Hook results must return null or object but got "${typeof results}"`);
    return <Component {...results} {...props} ref={ref} />;
  });
  WithHook.displayName = `hocify(${Component.displayName || Component.name})`;
  return WithHook;
};

export default hocify;
