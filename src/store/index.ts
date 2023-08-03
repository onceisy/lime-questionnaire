import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import localeReducer from './localeSlice';
import themeReducer from './themeSlice';
import userSlice from './userSlice';
import componentsReducer from './components';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['locale'],
};

const reducer = persistCombineReducers(persistConfig, {
  locale: localeReducer,
  theme: themeReducer,
  user: userSlice,
  components: componentsReducer,
});

export const store = configureStore({
  reducer,
  middleware: [thunk],
});
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
