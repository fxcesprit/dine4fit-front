import { combineReducers, configureStore } from "@reduxjs/toolkit"
import nutrientReducer from "../slices/nutrientSlice"

const rootReducer = combineReducers({
  nutrients: nutrientReducer,
});

export default configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;