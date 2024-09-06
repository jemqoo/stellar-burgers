import { getIngredientsApi } from '@api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientsState = {
  ingredients: Array<TIngredient>;
};

const initialState: TIngredientsState = {
  ingredients: []
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
      state.ingredients.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item._id !== action.payload._id
      );
    }
  },
  selectors: {
    constructorSliceSelector: (state) => state
  }
});

export const constructorReducer = constructorSlice.reducer;

export const { addItem, removeItem } = constructorSlice.actions;
