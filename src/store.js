import { configureStore } from '@reduxjs/toolkit';
import uiSettingsReducer from 'features/settings';
import userSliceReducer from 'features/user';
export default configureStore({
  reducer: {
    user: userSliceReducer,
    uiSettings: uiSettingsReducer,
  },
});
