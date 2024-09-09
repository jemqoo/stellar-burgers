import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TNewOrderState = {
  orderModalData: TOrder | null;
  orderRequest: boolean;
  error?: string | null;
};

const initialState: TNewOrderState = {
  orderModalData: null,
  orderRequest: false,
  error: null
};

export const addOrder = createAsyncThunk(
  'userOrder/createNew',
  async (data: string[]) => await orderBurgerApi(data)
);

export const getOrder = createAsyncThunk(
  'userOrder/getByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(getOrder.pending, (state) => {
        state.error = null;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload.orders[0];
      });
  }
});

export const { clearOrderModalData } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
