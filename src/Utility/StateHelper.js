export const ArrayKeys = [
    "DataCityId",
    "DataAreaId",
    "DataSubTypeId",
    "DataBedRooms",
    "DataCompoundId",
    "DataDeveloperId"
];
const ReducerInitialState = {
    Auth: {
        Method: "+2",
        Password: "",
        // =================    Register   ==============//
        UserName: "",
        UserEmail: "",
        UserPhoneNumber: "",
        UserCountryCode: "",
        UserPassword: "",
        UserRoleId: "4",
        UserCompanyName: "",
        UserSubUsersCount: "",
        UserSections: [],
        Residential: [],
        Commercial: [],
        UserPlan: ""
    },
    AppData: {
        DataAreaId: [],
        DataTypeId: "",
        DataSubTypeId: [],
        // ============= Utp ===========
        DataUnitTotalPriceFrom: "",
        DataUnitTotalPriceTo: "",
        DataUnitPriceType: "Installment", // "Installment" Or "CashDiscount"
        // ============= Bs ===========
        DataBedRooms: [],
        // ============= Fg ===========
        DataFinishingId: "",
        // // =============== Dly ============
        DataDeliveryFrom: "",
        DataDeliveryTo: "",
        // ========== Payment Plan ==============
        // // =========== Ys = Installment ================
        DataYearsFrom: "",
        DataYearsTo: "",
        // =============== Dp = DownPayment ============
        DataDownPaymentFrom: "",
        DataDownPaymentTo: "",
        // ========== End Payment Plan ==============
        // =========== Bua ================
        DataBuiltUpAreaFrom: "",
        DataBuiltUpAreaTo: "",
        DataCompoundId: [],
        DataDeveloperId: [],
        IsCityScape: false,
        DataExtraBenefits: [],
        DataEngineering: [],
        DataExecutive: [],
        DataManagement: [],
        DataArchitecture: [],
        NotifyCompoundId: "",
        NotifyCityId: "",
        NotifySectionId: ""
    },
    Sales: {
        Tab: "Add",
        IsOpen: false,
        SalesDeveloper: "",
        SalesProject: "",
        SalesCustomer: "",
        SalesExecutive: "",
        SalesDate: "",
        SalesUnitPrice: "",
        SalesUnitType: "",
        SalesNote: "",
        Files: []
    }
};
const ReducerHandler = (state = {}, action = {}) => {
    const { type, payload, Key } = action;
    const IsChoose = type?.startsWith("Choose");
    if (IsChoose) {
        const ProcessKey = type.slice("Choose".length);
        const OldData = state[ProcessKey];
        if (!ArrayKeys.includes(ProcessKey)) return state;
        return {
            ...state,
            [ProcessKey]: payload.checked
                ? [...OldData, payload.id]
                : OldData?.filter((id) => id !== payload.id)
        };
    }
    switch (type) {
        case "Change": {
            return {
                ...state,
                ...payload
            };
        }
        case "Reset": {
            return ReducerInitialState[Key];
        }
        default:
            return {};
    }
};
export { ReducerInitialState, ReducerHandler };
