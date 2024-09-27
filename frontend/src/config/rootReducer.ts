// src/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';

import toDoReducer from './todoSlice';

export default combineReducers({
  auth: authReducer,
  todo:toDoReducer
});


export type RootState = typeof combineReducers;
