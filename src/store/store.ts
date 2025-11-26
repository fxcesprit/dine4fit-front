import { combineReducers, configureStore } from "@reduxjs/toolkit"
import nutrientReducer from "../slices/nutrientSlice"
import userReducer from '../slices/userSlice'; 
import dishCompositionDraftReducer from '../slices/dishCompositionSlice'
import dishCompositionListReducer from '../slices/dishCompositionListSlice'

const rootReducer = combineReducers({
  nutrients: nutrientReducer,
  user: userReducer,
  dishCompositionDraft: dishCompositionDraftReducer,
  dishCompositionList: dishCompositionListReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export default store

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof configureStore>
export type AppDispatch = typeof store.dispatch