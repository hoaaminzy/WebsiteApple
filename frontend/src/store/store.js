import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import { combineReducers } from "redux";

// Create a persist config for each slice
const userPersistConfig = {
  key: 'user',
  storage,
};

const cartPersistConfig = {
  key: 'cart',
  storage,
};

// Create persisted reducers
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

// Combine reducers
const rootReducer = combineReducers({
  user: persistedUserReducer,
  cart: persistedCartReducer,
});

// Create store with persisted reducers
const store = configureStore({
  reducer: rootReducer,
});

const persistor = persistStore(store);

export { store, persistor };
