import { combineReducers, configureStore } from "@reduxjs/toolkit"
import nutrientReducer from "../slices/nutrientSlice"
import userReducer from '../slices/userSlice'; 

const rootReducer = combineReducers({
  nutrients: nutrientReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export default store

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof configureStore>
export type AppDispatch = typeof store.dispatch