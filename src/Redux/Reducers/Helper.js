import { Helper } from "@/Utility";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    Lang: "en",
    ViewType: Helper.GetScreenSize().width > 768 ? "Desktop" : "Mobile",
    Rtl: false,
    NavHeight: "9.70",
    Loader: false,
    ToggleSideBar: Helper.GetScreenSize().width > 768,
    Version: "2",
    ServerStatus: {
        Main: true
    },
    IpAdress: "",
    ExpiredMessage: false
};
const Reducer = createSlice({
    name: "Helper",
    initialState,
    reducers: {
        SetNewLang: (state, action) => {
            Helper.SetStorage("Lang", action.payload);
            document.documentElement.lang = action.payload?.trim();
            if (action.payload == "ar") {
                return {
                    ...state,
                    Lang: action.payload,
                    Rtl: true
                };
            }
            return {
                ...state,
                Lang: action.payload,
                Rtl: false
            };
        },
        ToggleLoader: (state) => {
            return {
                ...state,
                Loader: !state.Loader
            };
        },
        ToggleSideBar: (state) => {
            return {
                ...state,
                ToggleSideBar: !state.ToggleSideBar
            };
        },
        SetHelperData: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        },
        SetServerStatus: (state, action) => {
            return {
                ...state,
                ServerStatus: {
                    ...state.ServerStatus,
                    ...action.payload
                }
            };
        }
    }
});
export default Reducer.reducer;
export const { SetNewLang, ToggleLoader, ToggleSideBar, SetHelperData, SetServerStatus } =
    Reducer.actions;
