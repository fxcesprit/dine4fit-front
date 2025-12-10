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
  body_mass: number | string ;
  dish_mass: number | string ;
  dish: string ;
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
    body_mass: 0,
    dish_mass: 0,
    dish: ''
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

export const saveDishCompositionRequest = createAsyncThunk(
  'dishCompositionRequest/saveDishCompositionRequest',
  async ({ dishCompositionID, dishCompositionRequest }: { dishCompositionID: string; dishCompositionRequest: dishCompositionRequest }) => {
    const ToSend = {
      dish_mass: dishCompositionRequest.dish_mass as number ?? 0, 
      body_mass: dishCompositionRequest.body_mass as number ?? 0,
      dish: "1",
    };
    const response = await api.dishCompositions.dishCompositionsPutUpdate(dishCompositionID, ToSend)
    return response.data;
  }
);

export const submitDishCompositionRequest = createAsyncThunk(
  'dishCompositionRequest/updateDishCompositionRequest',
  async ({ dishCompositionID, dishCompositionRequest }: { dishCompositionID: string; dishCompositionRequest: dishCompositionRequest }) => {
    const ToSend = {
      dish_mass: dishCompositionRequest.dish_mass as number ?? 0, 
      body_mass: dishCompositionRequest.body_mass as number ?? 0,
      dish: 1,
    };
    const response = await api.dishCompositions.dishCompositionsSubmitUpdate(dishCompositionID, ToSend)
    return response.data;
  }
);

export const completeDishCompositionRequest = createAsyncThunk(
  "dishCompositionRequest/completeDishCompositionRequest",
  async (dishCompositionID: string) => {
    const body = { action: "complete" } as any;

    const response = await api.dishCompositions.dishCompositionsCompleteUpdate(
      dishCompositionID,
      body
    );

    return response.data;
  }
);

/**
 * Отклонить заявку (action = "reject")
 */
export const rejectDishCompositionRequest = createAsyncThunk (
  "dishCompositionRequest/rejectDishCompositionRequest",
  async (dishCompositionID: string) => {
    const body = { action: "reject" } as any;

    const response = await api.dishCompositions.dishCompositionsCompleteUpdate(
      dishCompositionID,
      body
    );

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
          body_mass: 0,
          dish_mass: 0,
          dish: ''
        };
      })
      .addCase(submitDishCompositionRequest.fulfilled, (state, action) => {
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