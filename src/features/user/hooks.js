import { useDispatch, useSelector } from 'react-redux';
import * as userActions from './index';

export const useUserDispatch = () => {
  const dispatch = useDispatch();
  let obj = {};
  Object.keys(userActions).forEach(key => {
    if (key !== 'default') obj[key] = (...params) => dispatch(userActions[key](...params));
  });
  return obj;
};

export const useUserStore = () => {
  const data = useSelector(state => state.user);
  return data;
};
