import { Helper } from "@/Utility";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    UserId: "",
    UserName: "",
    UserEmail: "",
    UserPhoneNumber: "",
    UserCompanyName: "",
    UserRole: "",
    UserSelectedResidential: [],
    UserSelectedCommercial: [],
    UserAccessToken: "",
    UserIsConnectedSession: false,
    UserExpiry : "",
    
};
const Reducer = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        LoginR: (state, action) => {
            const {
                UserAccessToken,
                UserIsConnectedSession,
                UserCompanyName,
                UserRole,
                UserPhoneNumber,
                UserEmail,
                UserName,
                UserId,
                UserSelectedResidential,
                UserSelectedCommercial,
                UserIsActive,
                UserExpiry
            } = action.payload;
            const UData = {
                UserId: UserId ? UserId : state.UserId,
                UserName: UserName? UserName : state.UserName,
                UserEmail: UserEmail ? UserEmail : state.UserEmail,
                UserPhoneNumber: UserPhoneNumber ? UserPhoneNumber : state.UserPhoneNumber,
                UserCompanyName: UserCompanyName ? UserCompanyName : state.UserCompanyName,
                UserRole: UserRole ? UserRole : state.UserRole,
                UserSelectedResidential: UserSelectedResidential ? UserSelectedResidential : state.UserSelectedResidential,
                UserSelectedCommercial: UserSelectedCommercial ? UserSelectedCommercial : state.UserSelectedCommercial,
                UserAccessToken: UserAccessToken ? UserAccessToken : state.UserAccessToken,
                UserIsActive: UserIsActive ? UserIsActive : state.UserIsActive,
                UserIsConnectedSession: UserIsConnectedSession
                    ? UserIsConnectedSession
                    : state.UserIsConnectedSession,
                UserExpiry: UserExpiry ? UserExpiry : state.UserExpiry
            };
            Helper.SetStorage("User", UData);
            return {
                ...state,
                ...UData
            };
        },
        LogoutR: () => {
            Helper.ClearStorage();
            return initialState;
        },
        UpdateUserData: (state, action) => {
            const NewData = {
                ...state,
                ...action.payload
            };
            Helper.SetStorage("User", NewData);
            return NewData;
        }
    }
});

export default Reducer.reducer;
export const { LoginR, LogoutR, UpdateUserData } = Reducer.actions;
