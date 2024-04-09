import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './task/taskSlice';
import authReducer from './auth/authSlice';
import { injectStore } from '../utils/axiosConfig';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer
  }
});
injectStore(store);
export default store