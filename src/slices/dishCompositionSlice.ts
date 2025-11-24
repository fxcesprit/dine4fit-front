import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';

interface dishCompositionNutrient {
  nutrient: {
    id: number;
    name: string | undefined;
    daily_dose_min: number | null;
    daily_dose_max: number | null;
    short_desc: string | null;
    full_desc: string | null;
    img_url: string | null;
  }
  quantity_in_dish: number | null;
  daily_dose_percentage: number | null;
}

interface dishCompositionRequest {
  body_mass: number | string | null;
  dish_mass: number | string | null;
  dish: string | null;
}

interface dishCompositionState {
  dishCompositionID?: number;
  count: number | undefined;

  nutrients: dishCompositionNutrient[];
  dishCompositionRequest: dishCompositionRequest;
  isDraft: boolean;
}

const initialState: dishCompositionState = {
  dishCompositionID: NaN,
  count: NaN,

  nutrients: [],
  dishCompositionRequest: {
    body_mass: null,
    dish_mass: null,
    dish: null
  },
  isDraft: false
};

export const getDishCompositionRequest = createAsyncThunk(
  'dishCompositionRequest/getDishCompositionRequest',
  async (dishCompositionID: string | number) => {
    const response: any = await api.dishCompositions.dishCompositionsRead(dishCompositionID as string);
    return response.data;
  }
)

export const addDishCompositionNutrient = createAsyncThunk(
  'nutrients/addDishCompositionNutrient',
  async (id: string) => {
    const response: any = await api.nutrients.nutrientsCreate2(id);
    return response.data;
  }
)

export const deleteDishCompositionRequest = createAsyncThunk(
  'dishCompositionRequest/deleteDishCompositionRequest',
  async (dishCompositionID: string | number) => {
    const response = await api.dishCompositions.dishCompositionsDeleteDelete(dishCompositionID as string);
    return response.data;
  }
);

export const updateDishCompositionRequest = createAsyncThunk(
  'dishCompositionRequest/updateDishCompositionRequest',
  async ({ dishCompositionID, dishCompositionRequest }: { dishCompositionID: string; dishCompositionRequest: dishCompositionRequest }) => {
    const ToSend = {
      dish_mass: dishCompositionRequest.dish_mass as number ?? 0, 
      body_mass: dishCompositionRequest.body_mass as number ?? 0,
      dish: dishCompositionRequest.dish as string ?? ''
    };
    const response = await api.dishCompositions.dishCompositionsPutUpdate(dishCompositionID, ToSend);
    return response.data;
  }
);

export const deleteDishCompositionNutrient = createAsyncThunk(
  'dishCompositionRequest/deleteDishCompositionNutrient',
  async ({ dishCompositionID, nutrientId }: { dishCompositionID: number; nutrientId: number }) => {
    await api.dishCompositions.dishCompositionsNutrientDeleteDelete(dishCompositionID.toString(), nutrientId.toString())
  }
);

const dishCompositionDraftSlice = createSlice({
  name: 'dishCompositionDraft',
  initialState,
  reducers: {
    setdishCompositionID: (state, action) => {
      state.dishCompositionID = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
    setDishCompositionRequest: (state, action) => {
      state.dishCompositionRequest = {
          ...state.dishCompositionRequest,
          ...action.payload,
      };
    },
    setDishCompositionNutrients: (state, action) => {
      state.nutrients = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDishCompositionRequest.fulfilled, (state, action) => {
        const dishCompositionRequest = action.payload;
        console.log('thunk reducer', dishCompositionRequest)
        if (dishCompositionRequest) {
            state.dishCompositionID = dishCompositionRequest.id;
            state.dishCompositionRequest = {
                body_mass: dishCompositionRequest.body_mass,
                dish_mass: dishCompositionRequest.dish_mass,
                dish: dishCompositionRequest.dish
            };
            state.nutrients = dishCompositionRequest.nutrients || [];
            state.isDraft = dishCompositionRequest.status === 'DR'
        }
      })
      .addCase(deleteDishCompositionRequest.fulfilled, (state) => {
        state.dishCompositionID = NaN;
        state.count = NaN;
        state.nutrients = [];
        state.dishCompositionRequest = {
          body_mass: null,
          dish_mass: null,
          dish: null
        };
      })
      .addCase(updateDishCompositionRequest.fulfilled, (state, action) => {
        state.dishCompositionRequest = action.payload as any;
      })
  }
});

export const { 
  setdishCompositionID, 
  setCount,
  setDishCompositionRequest,
  setDishCompositionNutrients
} = dishCompositionDraftSlice.actions;
export default dishCompositionDraftSlice.reducer;