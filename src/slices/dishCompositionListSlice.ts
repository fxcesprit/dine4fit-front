import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api";
import DishCompositionListPage from "../pages/DishCompositionListPage";

interface dishComposition {
    id?: number;
    status?: "DR" | "DE" | "FO" | "CO" | "RE";
    creation_datetime?: string;
    formation_datetime?: string | null;
    completion_datetime?: string | null;
}

interface dishCompositionListState {
    dishCompoisitionList: dishComposition[];
}

const initialState: dishCompositionListState = {
    dishCompoisitionList: []
}

export const getDishCompositionList = createAsyncThunk(
  'dishCompositionList/getDishCompositionListt',
  async () => {
    const response: any = await api.dishCompositions.dishCompositionsList();
    return response.data;
  }
)

const dishCompositionListSlice = createSlice({
  name: 'dishCompositionList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder
        .addCase(getDishCompositionList.fulfilled, (state, action) => {
            const recievedDishCompositionList = action.payload;
            state.dishCompoisitionList = recievedDishCompositionList
        })
    }
})

// export const {
// } = nutrientSlice.actions


export default dishCompositionListSlice.reducer