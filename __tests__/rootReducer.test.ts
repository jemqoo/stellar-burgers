import { store } from '../src/services/store';
import { constructorReducer } from '../src/slices/constructorSlice';
import { ingredientsSliceReducer } from '../src/slices/ingredientsSlice';
describe('rootReducer', () => {
  test('initial state of the root reducer matches what child reducers return given an empty action', () => {
    expect(store.getState().ingredients).toEqual(
      ingredientsSliceReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );
    expect(store.getState().burgerConstructor).toEqual(
      constructorReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );
  });
});
