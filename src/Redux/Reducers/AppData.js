import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    SelectedItem: null
};
const Reducer = createSlice({
    name: "AppData",
    initialState,
    reducers: {
        SetAppData: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        },
        ResetAppData: (state) => {
            return {
                ...state,
                ...initialState
            };
        }
    }
});
export default Reducer.reducer;
export const { SetAppData, ResetAppData } = Reducer.actions;
