import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrders = createAsyncThunk(
  'userOrder/getOrdersBurger',
  async function () {
    return await getOrdersApi();
  }
);

const initialState = {
  orders: [] as TOrder[],
  loading: false,
  error: null as string | null
};

const userOrdersSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    listOfOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null; // Проверка на undefined
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      });
  }
});

export const userOrdersReducer = userOrdersSlice.reducer;
export const getUserOrdersSelector = (state: { orders: TOrder[] }) =>
  state.orders;
