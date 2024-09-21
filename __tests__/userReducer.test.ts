import {
  userReducer,
  initialState,
  setUser,
  checkUserAuth,
  loginUserThunk,
  registerUserThunk,
  getUserThunk,
  logoutUserThunk,
  authChecked
} from '../src/slices/userSlice';
const mockUser = {
  email: 'test@mail.ru',
  name: 'Ivan'
};
describe('user reducers', () => {
  test('setUser should set user data to store', () => {
    const state = userReducer(initialState, setUser(mockUser));
    expect(state).toEqual({ ...initialState, user: mockUser });
  });
  test('checkUserAuth should switch isAuthChecked', () => {
    const state = userReducer(initialState, authChecked());
    expect(state).toEqual({ ...initialState, isAuthChecked: true });
  });
});
describe('loginUserThunk extra reducer', () => {
  test('should switch loading while loginUserThunk.pending', () => {
    const action = { type: loginUserThunk.pending.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });
  test('should set user data to store while loginUserThunk.fulfilled', () => {
    const action = {
      type: loginUserThunk.fulfilled.type,
      payload: mockUser
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: mockUser,
      isAuthChecked: true
    });
  });
  test('should correctly return errors', () => {
    const action = {
      type: loginUserThunk.rejected.type,
      error: { message: 'request rejected' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'request rejected',
      isAuthChecked: true
    });
  });
});
describe('registerUserThunk extra reducer', () => {
  test('should switch loading while registerUserThunk.pending', () => {
    const action = { type: registerUserThunk.pending.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });
  test('should set user data to store while registerUserThunk.fulfilled', () => {
    const action = {
      type: registerUserThunk.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: mockUser,
      isAuthChecked: true
    });
  });
  test('should correctly return errors', () => {
    const action = {
      type: registerUserThunk.rejected.type,
      error: { message: 'request rejected' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'request rejected',
      isAuthChecked: true
    });
  });
});
describe('getUserThunk extra reducer', () => {
  test('should switch loading while getUserThunk.pending', () => {
    const action = { type: getUserThunk.pending.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });
  test('should set new user data to store while getUserThunk.fulfilled', () => {
    const action = {
      type: getUserThunk.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: mockUser
    });
  });
  test('should correctly return errors', () => {
    const action = {
      type: getUserThunk.rejected.type,
      error: { message: 'request rejected' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'request rejected'
    });
  });
});
describe('logoutUserThunk extra reducer', () => {
  test('should switch loading while logoutUserThunk.pending', () => {
    const action = { type: logoutUserThunk.pending.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });
  test('should remove user data from store while logoutUserThunk.fulfilled', () => {
    const action = {
      type: logoutUserThunk.fulfilled.type
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
  test('should correctly return errors', () => {
    const action = {
      type: logoutUserThunk.rejected.type,
      error: { message: 'request rejected' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'request rejected'
    });
  });
});
