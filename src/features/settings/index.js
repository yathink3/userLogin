import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

const initialState = { navOpen: false };

const uiSettingsSlice = createSlice({
  name: 'uiSettings',
  initialState,
  reducers: {
    resetUiSettings: state => {
      state = initialState;
    },
    updateUiSettings: (state, { payload }) => {
      if (payload && payload.constructor === Object) {
        Object.keys(payload).forEach(key => state[key] !== undefined && (state[key] = payload[key]));
      }
    },
  },
});

export default uiSettingsSlice.reducer;

export const { resetUiSettings, updateUiSettings } = uiSettingsSlice.actions;

export const useDispatchUiSettings = () => {
  const dispatch = useDispatch();
  let obj = {};
  Object.keys(uiSettingsSlice.actions).forEach(key => {
    obj[key] = (...params) => dispatch(uiSettingsSlice.actions[key](...params));
  });
  return obj;
};

export const useSelectUiSettings = () => {
  const data = useSelector(state => state.uiSettings);
  return data;
};
