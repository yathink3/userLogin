import uiSettingsReducer from '@features/settings';
import userSliceReducer from '@features/user';
import { configureStore } from '@reduxjs/toolkit';
export default configureStore({
  reducer: {
    user: userSliceReducer,
    uiSettings: uiSettingsReducer,
  },
});
