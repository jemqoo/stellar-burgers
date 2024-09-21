import {
  clearOrderModalData,
  orderReducer,
  initialState,
  addOrder,
  getOrderByNumber
} from '../src/slices/newOrderSlice';
const mockOrder = {
  _id: '1234',
  status: 'ready',
  name: 'order',
  createdAt: 'date',
  updatedAt: 'date',
  number: 1234,
  ingredients: ['1', '2', '3', '4']
};
const stateWithData = {
  orderModalData: mockOrder,
  orderRequest: false,
  error: null
};
test('clearOrderModalData should remove data about order from store', () => {
  const state = orderReducer(stateWithData, clearOrderModalData());
  expect(state).toEqual(initialState);
});
describe('addOrder extra reducer', () => {
  test('should add order data to store while addOrder.fulfilled', () => {
    const action = {
      type: addOrder.fulfilled.type,
      payload: { order: mockOrder }
    };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({ ...initialState, orderModalData: mockOrder });
  });
  test('should correctly return errors', () => {
    const action = {
      type: addOrder.rejected.type,
      error: { message: 'request rejected' }
    };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'request rejected'
    });
  });
});
describe('getOrderByNumber extra reducer', () => {
  test('should return order data while getOrderByNumber.fulfilled', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [mockOrder] }
    };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({ ...initialState, orderModalData: mockOrder });
  });
  test('should correctly return errors', () => {
    const action = {
      type: getOrderByNumber.rejected.type,
      error: { message: 'request rejected' }
    };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'request rejected'
    });
  });
});
