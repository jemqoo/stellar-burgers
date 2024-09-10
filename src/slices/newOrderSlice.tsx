import { getFeedsApi, getOrderByNumberApi, orderBurgerApi } from '@api';
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
  'userOrder/postOrderBurger',
  async function (IdList: string[]) {
    return await orderBurgerApi(IdList);
  }
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async function (number: number) {
    return await getOrderByNumberApi(number);
  }
);

// все заказы
export const getFeeds = createAsyncThunk('order/getFeeds', async function () {
  return await getFeedsApi();
});

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
      .addCase(getOrderByNumber.pending, (state) => {
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderModalData = action.payload.orders[0];
      });
    // .addCase(getFeeds.fulfilled, (state, action) => {
    //   state.orderModalData = action.payload;
    // });
  }
});

export const { clearOrderModalData } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
