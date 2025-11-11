import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Nutrients } from "../modules/NutrientsApi"

interface nutrientState {
    nutrients: any[],
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
        setNutrients(state, {payload}: PayloadAction<Nutrients[]>) {
            state.nutrients = payload
        },
        setFilterName(state, {payload}) {
            state.filterName = payload
        }
    }
})

export const useNutrients = () =>
    useSelector((state: RootState) => state.nutrients.nutrients)


export const useNutrientsFilterName = () =>
    useSelector((state: RootState) => state.nutrients.filterName)


export const {
    setNutrients: setNutrientsAction,
    setFilterName: setFilterNameAction
} = nutrientSlice.actions


export default nutrientSlice.reducer