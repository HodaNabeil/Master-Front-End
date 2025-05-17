import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    Section: [],
    City: [],
    Events: {
        Cityscape: false
    },
    Notifications: [],
    ROI: {
        PriceApprecitionTD: 0,
        PriceApprecitionAD: 0,
        DiscountRate: 0
    },
    SelectedNotification: null
};
const Reducer = createSlice({
    name: "Public",
    initialState,
    reducers: {
        SetPublicData: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        },
        SetNotifications: (state, action) => {
            state.Notifications = action.payload;
            state.SelectedNotification = null;
        },
        CreateNotification: (state, action) => {
            if (!Array.isArray(state?.Notifications)) {
                throw new Error("Notifications is not an array");
            }
            const { NotifyId } = action.payload;
            const oldDate = [...state.Notifications];
            let IsExist = oldDate.find((item) => {
                const CompareKey = NotifyId == item.NotifyId;
                return CompareKey;
            });

            let newData = [];
            if (IsExist) {
                newData = oldDate?.map((item) => {
                    if (item.NotifyId == NotifyId) {
                        return action.payload;
                    } else {
                        return item;
                    }
                });
            } else {
                newData = [...oldDate, action.payload];
            }
            state.Notifications = newData;
        },
        UpdateNotification: (state, action) => {
            if (!Array.isArray(state?.Notifications)) {
                throw new Error("Notifications is not an array");
            }
            const { NotifyId, NotifyShow } = action.payload;
            const oldDate = [...state.Notifications];
            let IsExist = oldDate.find((item) => {
                const CompareKey = NotifyId == item.NotifyId;
                return CompareKey;
            });
            let newData = [];
            if (IsExist) {
                newData = NotifyShow
                    ? oldDate?.map((item) => {
                          if (item.NotifyId == NotifyId) {
                              return action.payload;
                          } else {
                              return item;
                          }
                      })
                    : oldDate?.filter((item) => item.NotifyId != NotifyId);
            } else {
                newData = [...oldDate, action.payload];
            }
            state.Notifications = newData;
            state.SelectedNotification = null;
        },
        DeleteNotification: (state, action) => {
            const newNotification = state.Notifications?.filter(
                (item) => item.NotifyId != action.payload
            );
            state.Notifications = newNotification;
            state.SelectedNotification = null;
        }
    }
});

export default Reducer.reducer;
export const {
    SetPublicData,
    SetNotifications,
    CreateNotification,
    UpdateNotification,
    DeleteNotification
} = Reducer.actions;
