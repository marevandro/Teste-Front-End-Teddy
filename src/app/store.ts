import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { userSlice } from '../features/user/userSlice';

const persistConfigUser = {
  key: 'user',
  storage,
};

const persistedUserReducer = persistReducer(persistConfigUser, userSlice.reducer);

const rootReducer = combineReducers({
  user: persistedUserReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
