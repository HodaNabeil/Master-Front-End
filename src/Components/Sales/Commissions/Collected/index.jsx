import { Box, Flex, Heading, IconButton } from "@chakra-ui/react";
import { LogoutR, useGetCollectedSalesQuery } from "@/Redux";
import { BodyHelper, Helper } from "@/Utility";
import { useSelector } from "react-redux";
import { memo, useEffect, useMemo, useState } from "react";
import { clearAllListeners } from "@reduxjs/toolkit";
import { MdRefresh } from "react-icons/md";
import SalesTable from "../../Table";
import Limiter from "../../../Limiter";
const CollectedCommisions = function ({
    CalculateCommisionRate = () => {},
    SetTotalEarnings = () => {},
    OnChange = () => {},
    Dispatch,
    Notify,
    Lang,
    Rtl
}) {
    const { UserAccessToken } = useSelector((state) => state.Auth);
    const [Filter, SetFilter] = useState({
        Limit: 10,
        Page: 1,
        Sort: "DESC",
        OrderBy: "SalesCreatedAt",
        SearchBy: "",
        Search: "",
        To: "",
        From: ""
    });
    const OnChangeFilter = (Key, Value) => {
        if (typeof Key == "object") {
            SetFilter({
                ...Filter,
                ...Key
            });
            return;
        }
        SetFilter({
            ...Filter,
            [Key]: Value
        });
    };
    const {
        data,
        isLoading,
        refetch: refetchData,
        isUninitialized,
        isError,
        error
    } = useGetCollectedSalesQuery(BodyHelper.SubUsersFilter(Filter), {
        skip: !UserAccessToken,
        refetchOnMountOrArgChange: true
    });
    useEffect(() => {
        if (isError) {
            const LogOutCodes = [401, 403];
            if (LogOutCodes.includes(error.status)) {
                const Msg = Helper.ValidateErrorMessage(error);
                Notify("error", Msg);
                Dispatch(LogoutR());
                clearAllListeners();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError]);
    const OnRefetch = () => {
        if (!isUninitialized) refetchData();
    };
    const ProcessData = useMemo(() => {
        let Data = data?.data?.results;

        return {
            Data: data?.data ? Data : [],
            Meta: data?.data ? data?.data?.meta : {}
        };
    }, [data?.data]);
    useEffect(() => {
        let TotalEarnings = 0;
        if (ProcessData.Data?.length > 0) {
            ProcessData.Data.forEach((Item) => {
                let { SalesUnitPrice, SalesCommission } = Item;
                const { YourProfits } = CalculateCommisionRate(SalesUnitPrice, SalesCommission);
                TotalEarnings += parseFloat(YourProfits);
            });
        }
        if (TotalEarnings > 0) {
            SetTotalEarnings(TotalEarnings);
        }
    }, [CalculateCommisionRate, ProcessData.Data, SetTotalEarnings]);
    return (
        <Box pos={"relative"}>
            <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base: "column",
                    md: "row"
                }}
                py={1}
            >
                <Heading as={"h3"} fontSize={"lg"} h={"2rem"} lineHeight={"2rem"}>
                    ◯ {Lang?.SALES_PAGE?.LABELS?.COMMISSION_COLLECTED || "عمولات تم تحصيلها"}
                </Heading>
                <Flex gap={1} alignItems={"center"}>
                    <Limiter
                        Limit={Filter.Limit}
                        OnChange={(e) => OnChangeFilter("Limit", e.target.value)}
                        size={"sm"}
                    />
                    <IconButton
                        onClick={() => OnRefetch()}
                        icon={<MdRefresh />}
                        className="Sales-Page-Btn-Bg Sales-Page-Color"
                        type="button"
                        title={Lang?.SALES_PAGE?.BUTTONS?.REFRESH || "تحديث"}
                        h={"2rem"}
                        w={"2rem"}
                        fontSize={"1.5rem"}
                    />
                </Flex>
            </Flex>
            <SalesTable
                CalculateCommisionRate={CalculateCommisionRate}
                OnEditOrDelete={OnChange}
                OnChange={OnChangeFilter}
                BodyData={isLoading ? [] : ProcessData.Data}
                IsLoading={isLoading}
                Lang={Lang}
                Rtl={Rtl}
                OrderBy={Filter.OrderBy}
                Sort={Filter.Sort}
            />
        </Box>
    );
};

export default memo(CollectedCommisions);
