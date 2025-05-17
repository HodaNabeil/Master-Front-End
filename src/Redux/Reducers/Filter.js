import { ReducerInitialState } from "@/Utility";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    Limit: 1000,
    Page: 1,
    Sort: "ASC",
    DataViewTab: "Basic",
    OrderBy: "DataMinUnitPrice",
    DataSectionId: null,
    DataCityId: [],
    ...ReducerInitialState.AppData
};
const Reducer = createSlice({
    name: "Filer",
    initialState,
    reducers: {
        SetData: (state, action) => {
            return {
                ...state,
                DataCityId: action.payload
            };
        },
        SetTableSort: (state, action) => {
            return {
                ...state,
                sort: action.payload.sort,
                orderBy: action.payload.orderBy
            };
        },
        NavigtePage: (state, action) => {
            return {
                ...state,
                page: action.payload
            };
        },
        ChangeFilterLimit: (state, action) => {
            return {
                ...state,
                page: 1,
                limit: action.payload
            };
        },
        ChangeFilterType: (state, action) => {
            return {
                ...state,
                type: action.payload,
                page: 1,
                limit: 10
            };
        },
        ResetFilter(state, action) {
            if (action.payload) {
                return {
                    ...initialState,
                    ...action.payload
                };
            }
            return initialState;
        },
        SetFilter(state, action) {
            return {
                ...state,
                ...action.payload
            };
        }
    }
});
export default Reducer.reducer;
export const {
    SetData,
    SetTableSort,
    NavigtePage,
    ChangeFilterLimit,
    ChangeFilterType,
    ResetFilter,
    SetFilter
} = Reducer.actions;
