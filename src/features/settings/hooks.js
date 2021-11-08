import { useDispatch, useSelector } from 'react-redux';
import * as uiSettingsActions from './index';

export const useUiSettingsDispatch = () => {
  const dispatch = useDispatch();
  let obj = {};
  Object.keys(uiSettingsActions).forEach(key => {
    if (key !== 'default') obj[key] = (...params) => dispatch(uiSettingsActions[key](...params));
  });
  return obj;
};

export const useUiSettingsStore = () => {
  const data = useSelector(state => state.uiSettings);
  return data;
};
