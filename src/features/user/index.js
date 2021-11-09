import encryptStorage from '@helpers/encryptStorage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserBytokenApi, loginUserApi } from '@services/user';

export const loginUser = createAsyncThunk('users/login', async ({ email, password }, thunkAPI) => {
  try {
    const data = await loginUserApi({ email, password });
    const token = data.token;
    encryptStorage.setItem('user-token', token);
    return thunkAPI.dispatch(fetchUserBytoken());
  } catch (errData) {
    return thunkAPI.rejectWithValue(errData);
  }
});

export const fetchUserBytoken = createAsyncThunk('users/fetchUserByToken', async (token = null, thunkAPI) => {
  try {
    token = encryptStorage.getItem('user-token');
    const data = await fetchUserBytokenApi({ token });
    delete data.password;
    encryptStorage.setItem('user-data', data);
    return { userData: data };
  } catch (errData) {
    return thunkAPI.rejectWithValue(errData);
  }
});

const initialState = { userData: {}, isFetching: false, isSuccess: false, isValidated: false, isError: false, errorMessage: '' };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserState: state => {
      state = initialState;
    },
    clearValiadtion: state => {
      state.isValidated = false;
    },
  },
  extraReducers: {
    [loginUser.pending]: state => {
      state.isFetching = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [fetchUserBytoken.pending]: state => {
      state.isFetching = true;
    },
    [fetchUserBytoken.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isValidated = true;
      state.userData = payload.userData;
    },
    [fetchUserBytoken.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
  },
});

export default userSlice.reducer;

export const { resetUserState, clearValiadtion } = userSlice.actions;
