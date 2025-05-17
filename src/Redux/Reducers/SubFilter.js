import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    Limit: 1000,
    Page: 1,
    Sort: "ASC",
    OrderBy: "",
    SearchBy: "",
    Search: "",
    From: "",
    To: "",
};
const Reducer = createSlice({
    name: "SubFilter",
    initialState,
    reducers: {
        ResetSubFilter(state, action) {
            if (action.payload) {
                return {
                    ...initialState,
                    ...action.payload
                };
            }
            return initialState;
        },
        SetSubFilter(state, action) {
            return {
                ...state,
                ...action.payload
            };
        }
    }
});
export default Reducer.reducer;
export const {
    ResetSubFilter,
    SetSubFilter
} = Reducer.actions;
