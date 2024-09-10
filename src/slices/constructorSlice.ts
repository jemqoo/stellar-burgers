import { getIngredientsApi } from '@api';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TIngredientsState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TIngredientsState = {
  ingredients: [],
  bun: null
};

export type TMoveItem = {
  move: 'up' | 'down';
  index: number;
};

// export const fetchIngredients = createAsyncThunk(
//   'ingredients/fetchIngredients',
//   async () => {
//     const ingredients = await getIngredientsApi();
//     return ingredients;
//   }
// );

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeItem: (
      state,
      action: PayloadAction<TIngredient & { index: number }>
    ) => {
      if (action.payload.type === 'bun') {
        state.bun = null;
      } else {
        state.ingredients.splice(action.payload.index, 1);
      }
    },
    changeItem: (state, action: PayloadAction<TMoveItem>) => {
      switch (action.payload.move) {
        case 'down':
          if (action.payload.index < state.ingredients.length - 1) {
            [
              state.ingredients[action.payload.index],
              state.ingredients[action.payload.index + 1]
            ] = [
              state.ingredients[action.payload.index + 1],
              state.ingredients[action.payload.index]
            ];
          }
          return;
        case 'up':
          if (action.payload.index > 0) {
            [
              state.ingredients[action.payload.index],
              state.ingredients[action.payload.index - 1]
            ] = [
              state.ingredients[action.payload.index - 1],
              state.ingredients[action.payload.index]
            ];
          }
          return;
      }
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    constructorSliceSelector: (state) => state
  }
});

export const constructorReducer = constructorSlice.reducer;

export const { addItem, removeItem, changeItem, clearConstructor } =
  constructorSlice.actions;
export const constructorSliceSelector = constructorSlice.selectors;
