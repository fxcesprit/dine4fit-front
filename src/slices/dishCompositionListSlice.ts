import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api";

interface dishComposition {
  id?: number;
  status: "FO" | "CO" | "RE";
  creation_datetime?: string;
  formation_datetime?: string | null;
  completion_datetime?: string | null;
  calculated_nutrients_count: number;
  client: string;
  manager?: string;
}

interface dishCompositionListState {
  dishCompoisitionList: dishComposition[];
}

const initialState: dishCompositionListState = {
  dishCompoisitionList: [],
};

interface DishCompositionListFilters {
  status?: "DR" | "DE" | "FO" | "CO" | "RE";
  startDate?: string;
  endDate?: string;
}

export const getDishCompositionList = createAsyncThunk<
  dishComposition[],
  DishCompositionListFilters | undefined
>(
  "dishCompositionList/getDishCompositionList",
  async (filters) => {
    const params: Record<string, string> = {};

    if (filters?.status) {
      params.status = filters.status;
    }

    if (filters?.startDate && filters?.endDate) {
      params.start_date = filters.startDate;
      params.end_date = filters.endDate;
    }

    const hasParams = Object.keys(params).length > 0;

    const requestConfig = hasParams ? { query: params } : {};

    const response: any = await (api.dishCompositions
      .dishCompositionsList as any)(requestConfig);

    return response.data as dishComposition[];
  }
);

const dishCompositionListSlice = createSlice({
  name: "dishCompositionList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDishCompositionList.fulfilled, (state, action) => {
      state.dishCompoisitionList = action.payload;
    });
  },
});

export default dishCompositionListSlice.reducer;
