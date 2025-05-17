import { SalesNavbar } from "@/Common";
import {
    AddOrEditModalSales,
    CollectedCommisions,
    DeleteModalSales,
    SalesClaculatorModal,
    SalesHero,
    ViewSalesFilesModal
} from "@/Components";
import DueCommisions from "@/Components/Sales/Commissions/Due";
import { useLang, useNotify } from "@/Hooks";
import {
    LogoutR,
    useCreateSalesMutation,
    useDeleteSalesMutation,
    useGetDevQuery,
    useUpdateSalesMutation
} from "@/Redux";
import { BodyHelper, Helper, ReducerHandler, ReducerInitialState, Validation } from "@/Utility";
import { Box, Heading } from "@chakra-ui/react";
import { clearAllListeners } from "@reduxjs/toolkit";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function Sales({ Socket }) {
    const { Rtl } = useSelector((state) => state.Helper);
    const [Disabled, setDisabled] = useState({
        FetchDev: false
    });
    const [TotalEarnings, SetTotalEarnings] = useState(0);
    const Lang = useLang();
    const Notify = useNotify();
    const Dispatch = useDispatch();
    const NavHeight = "2.5rem";
    const EarnedCount = useMemo(
        () => (TotalEarnings ? Helper.NumberWithCommas(TotalEarnings) : "0"),
        [TotalEarnings]
    );
    const [State, disptach] = useReducer(ReducerHandler, ReducerInitialState.Sales);
    const { data, isFetching: IsFetchingDev } = useGetDevQuery(
        {},
        {
            skip: Disabled.FetchDev
        }
    );
    const PrepareDevOptions = useMemo(() => {
        if (!data || !data?.data) return {
            Dev : [],
            Types : []
        };
        return data?.data;
    }, [data]);
    useEffect(() => {
        if (PrepareDevOptions?.Dev?.length > 0) setDisabled({ ...Disabled, FetchDev: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [PrepareDevOptions?.Dev?.length]);
    const [CreateItem, { isLoading: IsCreateLoading, isError: IsCreateError, error: CreateError }] =
        useCreateSalesMutation();
    const [UpdateItem, { isLoading: IsUpdateLoading, isError: IsUpdateError, error: UpdateError }] =
        useUpdateSalesMutation();
    const [DeleteItem, { isLoading: IsDeleteLoading, isError: IsDeleteError, error: DeleteError }] =
        useDeleteSalesMutation();
    const LogoutAndNotify = (e, withLogout = false) => {
        const Msg = Helper.ValidateErrorMessage(e);
        Notify("error", Msg);
        if (withLogout) {
            Dispatch(LogoutR());
            clearAllListeners();
        }
    };
    useEffect(() => {
        if (IsCreateError) {
            const LogOutCodes = [401, 403];
            LogoutAndNotify(CreateError, LogOutCodes.includes(CreateError.status));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [IsCreateError]);
    useEffect(() => {
        if (IsUpdateError) {
            const LogOutCodes = [401, 403];
            LogoutAndNotify(UpdateError, LogOutCodes.includes(UpdateError.status));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [IsUpdateError]);
    useEffect(() => {
        if (IsDeleteError) {
            const LogOutCodes = [401, 403];
            LogoutAndNotify(DeleteError, LogOutCodes.includes(DeleteError.status));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [IsDeleteError]);
    const OnChange = (Key, Value) => {
        if (typeof Key == "object") {
            disptach({ type: "Change", payload: Key });
        }
        if (Key == "SalesUnitPrice" && Value != "") {
            const val = Value.replace(/\D/g, "");
            const limitedValue = val.slice(0, 9);
            let FloatNumber = Helper.ConvertToFloat(limitedValue);
            if (isNaN(FloatNumber) && val !== "") {
                Notify("info", "Numbers Only");
                return;
            }
            Value = !isNaN(FloatNumber) ? FloatNumber : "";
        }
        disptach({
            type: "Change",
            payload: {
                [Key]: Value
            }
        });
    };
    const OnReset = () => {
        disptach({ type: "Reset", Key: "Sales" });
    };
    const OnSubmit = async (e, Form) => {
        e.preventDefault();
        const { Tab } = Form || {};
        if (["Add", "Edit"].includes(Tab)) {
            const Validate = Validation.Sales(Form);
            if (Validate.length > 0) {
                const Msg = Lang?.VALIDATION[Validate[0]];
                Notify("error", Msg);
                return;
            }
        }
        const Body = BodyHelper.Sales(Form);
        const Func = {
            Add: CreateItem,
            Edit: UpdateItem,
            Delete: DeleteItem
        };
        const { data } = await Func[Tab](Body);
        if (data && !data?.error) {
            Notify("success", data?.message);
            OnReset();
        }
    };
    const OnCommisionCalculate = () => {
        OnChange({
            Tab: "Calculator",
            IsOpen: true
        });
    };
    const OnNewCommision = () => {
        OnChange({
            Tab: "Add",
            IsOpen: true
        });
    };
    const CalculateCommisionRate = useCallback((Price, Rate) => {
        let TransactionValue = parseFloat(Price); // قيمة الصفقة
        let CommissionRate = parseFloat(Rate); // نسبة العمولة
        const CalcCommissionRate = (TransactionValue * CommissionRate) / 1.14; // اجمالي العمولة
        const CalcCheckValue = eval(
            `(CalcCommissionRate+(CalcCommissionRate*0.14))-(CalcCommissionRate*0.05)`
        );
        const CalcTotalTax = eval(
            `(CalcCommissionRate*0.14)+(CalcCommissionRate*0.05)+(CalcCheckValue*0.22)`
        ); // اجمالي الضريبة
        const CalcNetCommission = CalcCheckValue - CalcTotalTax; // صافي العمولة
        const CalcYourProfits = CalcNetCommission * 0.85; // ارباحك
        const DataToReturn = {
            CalcCheckValue,
            TotalCommission: CalcCommissionRate?.toFixed(0),
            CheckValue: CalcCheckValue?.toFixed(0),
            TotalTax: CalcTotalTax?.toFixed(0),
            NetCommission: CalcNetCommission?.toFixed(0),
            YourProfits: CalcYourProfits?.toFixed(0)
        };
        return DataToReturn;
    }, []);

    return (
        <Box
            h={"100vh"}
            pos={"relative"}
            className={"Sales-Page-Bg"}
            color={"white"}
            dir={Rtl ? "rtl" : "ltr"}
        >
            <SalesNavbar Lang={Lang} NavHeight={NavHeight} Socket={Socket} />
            <Box
                px={{
                    base: "0",
                    md: "1rem"
                }}
            >
                <Heading
                    as={"h2"}
                    textAlign={"center"}
                    fontSize={"3xl"}
                    h={"3.5rem"}
                    lineHeight={"3.5rem"}
                    mb={"3rem"}
                >
                    {Lang?.SALES_PAGE?.EARNED?.replace("{{Count}}", EarnedCount) ||
                        `ارباحك المحصلة : ${EarnedCount} جنيه`}
                </Heading>
                <SalesHero
                    OnCommisionCalculate={OnCommisionCalculate}
                    OnNewCommision={OnNewCommision}
                    Lang={Lang}
                    mb={"2rem"}
                />
                <DueCommisions
                    CalculateCommisionRate={CalculateCommisionRate}
                    OnChange={OnChange}
                    Dispatch={Dispatch}
                    Notify={Notify}
                    Lang={Lang}
                    Rtl={Rtl}
                />
                <CollectedCommisions
                    CalculateCommisionRate={CalculateCommisionRate}
                    SetTotalEarnings={SetTotalEarnings}
                    OnChange={OnChange}
                    Dispatch={Dispatch}
                    Notify={Notify}
                    Lang={Lang}
                    Rtl={Rtl}
                />
            </Box>
            {["Add", "Edit"].includes(State.Tab) && State.IsOpen && (
                <AddOrEditModalSales
                    State={State}
                    IsOpen={State.IsOpen}
                    OnClose={OnReset}
                    OnSubmit={OnSubmit}
                    OnChange={OnChange}
                    IsLoading={IsCreateLoading || IsUpdateLoading}
                    Lang={Lang}
                    Rtl={Rtl}
                    Options={PrepareDevOptions}
                    DevLoading={IsFetchingDev}
                />
            )}
            {State.Tab == "Delete" && State.IsOpen && (
                <DeleteModalSales
                    OnClose={OnReset}
                    OnSubmit={OnSubmit}
                    IsLoading={IsDeleteLoading}
                    IsOpen={State.IsOpen}
                    Lang={Lang}
                    State={State}
                />
            )}
            {State.Tab == "Views" && State.IsOpen && (
                <ViewSalesFilesModal
                    OnClose={OnReset}
                    IsOpen={State.IsOpen}
                    Lang={Lang}
                    Files={State.Files}
                />
            )}
            {State.Tab == "Calculator" && State.IsOpen && (
                <SalesClaculatorModal
                    CalculateCommisionRate={CalculateCommisionRate}
                    State={State}
                    IsOpen={State.IsOpen}
                    OnClose={OnReset}
                    OnSubmit={OnSubmit}
                    IsLoading={IsCreateLoading || IsUpdateLoading}
                    Lang={Lang}
                    Rtl={Rtl}
                    DevOptions={PrepareDevOptions}
                    DevLoading={IsFetchingDev}
                />
            )}
        </Box>
    );
}
