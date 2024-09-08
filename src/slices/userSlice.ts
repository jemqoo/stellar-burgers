import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  registerUserApi,
  updateUserApi,
  logoutApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export const registerUserThunk = createAsyncThunk(
  'user/register',
  registerUserApi
);

export const loginUserThunk = createAsyncThunk('user/login', loginUserApi);

export const logoutUserThunk = createAsyncThunk('user/logout', logoutApi);

type TUserState = {
  loading: boolean;
  user: TUser | null;
  error?: string | null;
};

const initialState: TUserState = {
  loading: false,
  user: null,
  error: null
};

export const getUserThunk = createAsyncThunk(
  'user/getUser',
  async ({ email, name, password }: Partial<TRegisterData>) => {
    await updateUserApi({ email, name, password });
    return getUserApi();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      });

    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      });

    builder
      .addCase(getUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      });
    builder
      .addCase(logoutUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      });
  }
});

export const userReducer = userSlice.reducer;
