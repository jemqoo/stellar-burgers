import { getIngredientsApi } from '@api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientsState = {
  ingredients: Array<TIngredient>;
  bun: TIngredient | null;
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
    addItem: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
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
    }
  },
  selectors: {
    constructorSliceSelector: (state) => state
  }
});

export const constructorReducer = constructorSlice.reducer;

export const { addItem, removeItem, changeItem } = constructorSlice.actions;
