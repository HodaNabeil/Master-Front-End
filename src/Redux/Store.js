import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearAllListeners, configureStore } from "@reduxjs/toolkit";
import Reducers from "./Reducers";
import { Helper, RoutingManager } from "@/Utility";
const abbortConttroler = new AbortController();
const actionSanitizer = (action) =>
    action.type === "FILE_DOWNLOAD_SUCCESS" && action.data
        ? { ...action, data: "<<LONG_BLOB>>" }
        : action;
class Store {
    static ApiSlice = createApi({
        reducerPath: "MasterConfigration",
        baseQuery: fetchBaseQuery({
            baseUrl: RoutingManager.ApiUrl,
            signal: abbortConttroler.signal,
            cache: "no-store",
            // timeout: 50000,
            prepareHeaders: async (headers, { getState }) => {
                try {
                    const { Auth, Helper: RHelper } = getState();
                    const Device = Helper.GetStorage("Device");
                    
                    const NewHeaders = new Headers(headers);
                    if (Auth?.UserAccessToken) {
                        NewHeaders.append("Authorization", `Bearer ${Auth.UserAccessToken}`);
                    }
                    NewHeaders.set("IpAdress", RHelper.IpAdress);
                    NewHeaders.append("Local", RHelper.Lang);
                    NewHeaders.append("Device", Device);
                    return NewHeaders;
                } catch (error) {
                    clearAllListeners();
                    abbortConttroler.abort();
                    return error;
                }
            }
        }),
        // eslint-disable-next-line no-unused-vars
        endpoints: (builder) => ({})
    });
    static Configration = configureStore({
        reducer: {
            ...Reducers,
            [this.ApiSlice.reducerPath]: this.ApiSlice.reducer
        },
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({
                serializableCheck: false,
                serialize: true,
                actionSanitizer
            })?.concat(Store.ApiSlice.middleware);
        }
    });
    static GetState(Key) {
        const AllState = Store.Configration.getState();
        return Key ? AllState[Key] : {};
    }
    static Api = {
        // [GET] -
        Root: "/",
        //  [GET] - [POST] - [PUT] - [DELETE] - [PATCH]
        SubUser: "/user/sub",
        //  [PATCH]
        // /login - /register - /register/event - /pass/forget - /pass/check - /pass/reset
        Auth: "/public/auth",
        // [PATCH]
        Data: "/public/data",
        // [PATCH] - [GET] - [POST] - [PUT]
        Cdn: "/public/cdn",
        // [PATCH] - [POST]
        Message: "/public/send",
        //  [GET] - [POST] - [PUT] - [DELETE] - [PATCH]
        Session: "/public/session",
        //  [GET]
        Contact: "/public/contact",
        //  [GET] - [POST] - [PUT] - [DELETE]
        ProjectSales: "/public/sales",
    };
}
export default Store;
