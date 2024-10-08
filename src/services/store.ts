import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSliceReducer } from '../slices/ingredientsSlice';
import { constructorReducer } from '../slices/constructorSlice';
import { feedReducer } from '../slices/feedsSlice';
import { userReducer } from '../slices/userSlice';
import { orderReducer } from '../slices/newOrderSlice';
import { userOrdersReducer } from '../slices/userOrdersSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsSliceReducer,
  burgerConstructor: constructorReducer,
  feed: feedReducer,
  user: userReducer,
  order: orderReducer,
  userOrders: userOrdersReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
