import { useEffect, useState } from 'react';

export const useStateData = (initial = {}) => {
  if (!(initial.constructor === Object)) throw new Error('useStateData will only recieve Object type');
  const [state, set] = useState(initial);
  const setState = updater => set(prev => ({ ...prev, ...(typeof updater === 'function' ? updater(prev) : updater) }));
  return [state, setState];
};

export const useDidMount = func => useEffect(() => func && func(), []);

export const useWillUnmount = func => useEffect(() => () => func && func(), []);

export const useDidUpdate = func => {
  const [didMount, setDidMount] = useState(false);
  useEffect(() => {
    if (didMount) func && func();
    else setDidMount(true);
  });
};
