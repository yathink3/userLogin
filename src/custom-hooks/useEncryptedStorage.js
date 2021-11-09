import encryptStorage from '@helpers/encryptStorage';
import { useState } from 'react';

const useEncryptedStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = encryptStorage.getItem(key);
      return item ? item : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      encryptStorage.setItem(key, valueToStore);
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

export default useEncryptedStorage;
