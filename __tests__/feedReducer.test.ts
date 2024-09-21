import {
  addNewOrder,
  feedReducer,
  initialState
} from '../src/slices/feedsSlice';
const mockOrder = {
  _id: '1234',
  status: 'ready',
  name: 'order',
  createdAt: 'date',
  updatedAt: 'date',
  number: 1234,
  ingredients: ['1', '2', '3', '4']
};

test('addNewOrder should correctly add new order', () => {
  const state = feedReducer(initialState, addNewOrder(mockOrder));
  expect(state.feeds).toEqual([mockOrder]);
});
