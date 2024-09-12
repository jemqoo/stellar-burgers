import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';

const initialState = {
  feeds: [] as TOrder[],
  total: 0,
  totalToday: 0,
  isLoading: true
};

export const fetchFeeds = createAsyncThunk('feeds/fetchOrders', getFeedsApi);

const feedsSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    addNewOrder: (state, action: PayloadAction<TOrder>) => {
      state.feeds.push(action.payload);
    }
  },
  selectors: {
    getFeeds: (state) => state.feeds,
    getFeedsStatus: (state) => state.isLoading,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feeds = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state) => {
        state.isLoading = false;
      })
      .addDefaultCase(() => {});
  }
});
export const { getFeeds, getFeedsStatus, getTotal, getTotalToday } =
  feedsSlice.selectors;

export const feedReducer = feedsSlice.reducer;

export const { addNewOrder } = feedsSlice.actions;
