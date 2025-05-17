import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    IsConnected: false,
    Name: "",
    Phone: "",
    Avatar: "/Img/whatsapp.webp"
};
const Reducer = createSlice({
    name: "Wp",
    initialState,
    reducers: {
        SetWpData: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        },
        ResetWpData: () => {
            return initialState;
        }
    }
});

export default Reducer.reducer;
export const { SetWpData, ResetWpData } = Reducer.actions;
