import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';

// type TFeedsState = {
//   ingredients: Array<TIngredient>;
//   isLoading: boolean;
// };

const initialState = {
  feeds: [] as TOrder[],
  total: 0,
  totalToday: 0,
  isLoading: true
};

export const fetchFeeds = createAsyncThunk(
  'feeds/fetchOrders',
  async function () {
    const feeds: any = getFeedsApi();
    return feeds;
  }
);

const feedsSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
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
