



import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import ReducerDataHandle from './ReducerDataHandle';

const rootReducer = combineReducers({
  ReducerDataHandle,
});

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
