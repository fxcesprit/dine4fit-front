import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { api } from "../api"
import { NUTRIENTS_MOCK } from "../modules/mock";
import { Nutrient } from '../api/Api';
import { setCount, setdishCompositionID } from "./dishCompositionSlice";


export const getNutrientsByName = createAsyncThunk<
    Nutrient[],
    void,
  { state: RootState; rejectValue: string }
>(
    'nutrients/getNutrientsByName',
    async (_, {getState, dispatch, rejectWithValue}) => { 
        const { nutrients } = getState();
        try {
            const response = await api.nutrients.nutrientsList({nutrient_search_text: nutrients.filterName});
            const dishCompositionResponse = await api.dishCompositions.dishCompositionsDraftList() as any;

            const dishCompositionID = dishCompositionResponse.data.dish_composition_draft.id; // ID черновой заявки
            const count = dishCompositionResponse.data.dish_composition_draft.nutrient_types_amount; // количество услуг в черновой заявке

            dispatch(setdishCompositionID(dishCompositionID));
            dispatch(setCount(count));
            return response.data;
        }
        catch (error) {
            console.log(error)
            return rejectWithValue('Ошибка при загрузке данных');
        }
    }
)


interface nutrientState {
    nutrients: Nutrient[],
    filterName: string
}

const initialState: nutrientState = {
    nutrients: [],
    filterName: ""
}

const nutrientSlice = createSlice({
    name: "nutrients",
    initialState,
    reducers: {
        setFilterName(state, {payload}) {
            state.filterName = payload
        },
        setNutrients(state, {payload}) {
            state.nutrients = payload
        }
    },
    extraReducers: (builder) => {
    builder
      .addCase(getNutrientsByName.fulfilled, (state, action) => {
        state.nutrients = action.payload;
      })
      .addCase(getNutrientsByName.rejected, (state) => {
        state.nutrients = NUTRIENTS_MOCK.filter((item) =>
            item.name.toLocaleLowerCase().includes(state.filterName.toLocaleLowerCase())
        );
      });
  },
})


export const useNutrientsFilterName = () =>
    useSelector((state: RootState) => state.nutrients.filterName)


export const useNutrients = () =>
    useSelector((state: RootState) => state.nutrients.nutrients)


export const {
    setFilterName: setFilterNameAction
} = nutrientSlice.actions


export default nutrientSlice.reducer