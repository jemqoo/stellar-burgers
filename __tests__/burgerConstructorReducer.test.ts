import {
  TIngredientsState,
  addItem,
  constructorReducer,
  changeItem,
  initialState,
  removeItem,
  clearConstructor
} from '../src/slices/constructorSlice';
const mockBun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};
const mockIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0945',
    name: 'Соус с шипами Антарианского плоскоходца',
    type: 'sauce',
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
  }
];
describe('addItem reducer', () => {
  test('should correctly add bun', () => {
    const state = constructorReducer(initialState, {
      payload: mockBun,
      type: addItem.type
    });
    expect(state).toEqual({ ...initialState, bun: mockBun });
  });
  test('should correctly add ingredient', () => {
    const state = constructorReducer(initialState, {
      type: addItem.type,
      payload: mockIngredients[0]
    });
    expect(state).toEqual({
      ...initialState,
      ingredients: [mockIngredients[0]]
    });
  });
});
describe('removeItem reducer', () => {
  let constructorWithIngredients: TIngredientsState;
  beforeEach(() => {
    constructorWithIngredients = { bun: mockBun, ingredients: mockIngredients };
  });
  test('should correctly remove bun', () => {
    const state = constructorReducer(
      constructorWithIngredients,
      removeItem({ ...mockBun, index: 0 })
    );
    expect(state).toEqual({ ...constructorWithIngredients, bun: null });
  });
  test('should correctly remove ingredient', () => {
    const state = constructorReducer(
      constructorWithIngredients,
      removeItem({ ...mockIngredients[0], index: 0 })
    );
    expect(state).toEqual({
      ...constructorWithIngredients,
      ingredients: [mockIngredients[1]]
    });
  });
});
describe('changeItem reducer', () => {
  let constructorWithIngredients: TIngredientsState;
  beforeEach(() => {
    constructorWithIngredients = {
      ...initialState,
      ingredients: mockIngredients
    };
  });
  test('should correctly move ingredient down', () => {
    const state = constructorReducer(
      constructorWithIngredients,
      changeItem({ move: 'down', index: 0 })
    );
    expect(state).toEqual({
      ...constructorWithIngredients,
      ingredients: [mockIngredients[1], mockIngredients[0]]
    });
  });
  test('should correctly move ingredient up', () => {
    const state = constructorReducer(
      constructorWithIngredients,
      changeItem({ move: 'up', index: 1 })
    );
    expect(state).toEqual({
      ...constructorWithIngredients,
      ingredients: [mockIngredients[1], mockIngredients[0]]
    });
  });
});
test('clearConstructor reducer should remove all ingredients and buns', () => {
  const constructorWithIngredients = {
    bun: mockBun,
    ingredients: mockIngredients
  };
  const state = constructorReducer(
    constructorWithIngredients,
    clearConstructor()
  );
  expect(state).toEqual(initialState);
});
