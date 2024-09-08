import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrders = createAsyncThunk(
  'userOrder/getAll',
  async () => await getOrdersApi()
);

type TUserOrdersState = {
  orders: TOrder[];
  loading: boolean;
  error?: string | null;
};

const initialState: TUserOrdersState = {
  orders: [],
  loading: false,
  error: null
};

export const userOrdersSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    getUserOrdersSelector: (state) => state.orders
  },

  extraReducers: (builder) =>
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
});

export const userOrdersReducer = userOrdersSlice.reducer;
export const { getUserOrdersSelector } = userOrdersSlice.selectors;
