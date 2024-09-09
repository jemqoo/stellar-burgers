import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  registerUserApi,
  updateUserApi,
  logoutApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie } from '../utils/cookie';

export const registerUserThunk = createAsyncThunk(
  'user/register',
  registerUserApi
);

export const loginUserThunk = createAsyncThunk('user/login', loginUserApi);

export const logoutUserThunk = createAsyncThunk('user/logout', logoutApi);

export const getUserThunk = createAsyncThunk(
  'user/getUser',
  async ({ email, name, password }: Partial<TRegisterData>) => {
    await updateUserApi({ email, name, password });
    return getUserApi();
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      try {
        const { user } = await getUserApi();
        dispatch(setUser(user));
      } catch (error) {
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
      } finally {
        dispatch(authChecked());
      }
    } else {
      dispatch(authChecked());
    }
  }
);

type TUserState = {
  loading: boolean;
  user: TUser | null;
  error?: string | null;
  isAuthChecked: boolean;
};

const initialState: TUserState = {
  isAuthChecked: false,
  loading: false,
  user: null,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
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
      })
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
      })
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
      })
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
export const { setUser, authChecked } = userSlice.actions;
