import {
  getOrders,
  userOrdersReducer,
  initialState
} from '../src/slices/userOrdersSlice';
const mockOrders = [
  {
    _id: '1234',
    status: 'ready',
    name: 'order',
    createdAt: 'date',
    updatedAt: 'date',
    number: 1234,
    ingredients: ['1', '2', '3', '4']
  },
  {
    _id: '5678',
    status: 'ready',
    name: 'order',
    createdAt: 'date',
    updatedAt: 'date',
    number: 5678,
    ingredients: ['5', '6', '7', '8']
  }
];
describe('getOrders extra reducer', () => {
  test('should switch loading while getOrders.pending', () => {
    const action = { type: getOrders.pending.type };
    const state = userOrdersReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });
  test('should return users orders while getOrders.fulfilled', () => {
    const action = {
      type: getOrders.fulfilled.type,
      payload: mockOrders
    };
    const state = userOrdersReducer(initialState, action);
    expect(state).toEqual({ ...initialState, orders: mockOrders });
  });
  test('should correctly return errors', () => {
    const action = {
      type: getOrders.rejected.type,
      error: { message: 'request rejected' }
    };
    const state = userOrdersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'request rejected'
    });
  });
});
