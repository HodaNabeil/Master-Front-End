import { memo, useEffect, useMemo, useState } from "react";
import ItemInfoHero from "./Hero";
import { Box, Flex, useColorMode } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useLang, useNotify, useValidateSection } from "@/Hooks";
import { useGetContactsMutation, useGetInfoQuery } from "@/Redux";
import { Spinner } from "@/Common";
import ActionButtons from "./ActionButtons";
import PhasInfo from "./PhasInfo";
import PaymentPlan from "./PaymentPlan";
import ContactsTable from "../ContactsTable";
function ItemInfo({ OnSetModalData, Modal }) {
    const SelectedItem = useSelector((state) => state.AppData).SelectedItem;
    const { colorMode } = useColorMode();
    const IsDark = colorMode == "dark";
    const Lang = useLang();
    const Notify = useNotify();
    const { SelectedSection } = useValidateSection();
    const { DataCompoundId, DataDeveloperId, DataDeveloper, DataCityId } = SelectedItem || {};
    const [SelectedPhas, SetSelectedPhas] = useState(null);
    const [SelectedPayPlan, setSelectedPayPlan] = useState(null);
    const { data, isLoading, isFetching } = useGetInfoQuery(
        {
            // CompoundId: 1,
            // SectionId: 1
            CompoundId: DataCompoundId,
            SectionId: SelectedSection
        },
        {
            skip: !DataCompoundId || !SelectedSection,
            refetchOnMountOrArgChange: true
        }
    );
    const ProcessData = useMemo(() => {
        if (!data?.data)
            return {
                PhasesBtns: [],
                PriceListData: {
                    Data: null,
                    Finishing: null
                },
                Full: []
            };
        const Details = data?.data || [];
        const PhasesBtns = [];
        let PriceListData = {
            Data: null,
            Finishing: null
        };
        Details.forEach((item) => {
            const {
                DataDetails,
                DataFinishing,
                DataPhas,
                DataPhasId,
                DataStatus,
                DataPhasCachDiscount,
                DataPhasClubFees,
                DataPhasDelivry,
                DataPhasMaintence,
                DataPhasParkingFees
            } = item;
            PhasesBtns.push({
                DataPhasId,
                DataPhas,
                DataStatus,
                DataPhasCachDiscount,
                DataPhasClubFees,
                DataPhasDelivry,
                DataPhasMaintence,
                DataPhasParkingFees
            });
            const IsDetailsObject = Object.keys(DataDetails).length > 0;
            const IsFinishingObject = DataFinishing ? Object.keys(DataFinishing).length > 0 : false;
            if (IsDetailsObject) {
                if (!PriceListData.Data) PriceListData.Data = {};
                Object.assign(PriceListData.Data, DataDetails);
            }
            if (IsFinishingObject) {
                if (!PriceListData.Finishing) PriceListData.Finishing = {};
                Object.assign(PriceListData.Finishing, DataFinishing);
            }
        });
        return {
            PhasesBtns: PhasesBtns,
            PriceListData: PriceListData,
            Full: Details
        };
    }, [data?.data]);
    useEffect(() => {
        if (!SelectedPhas && ProcessData.PhasesBtns?.length > 0) {
            SetSelectedPhas(ProcessData.PhasesBtns[0]);
        }
    }, [ProcessData.PhasesBtns, SelectedPhas]);
    const OnSelectPhas = (Phas) => {
        SetSelectedPhas(Phas);
    };
    const SelectedPhasData = useMemo(() => {
        if (!SelectedPhas) return null;
        return ProcessData.Full.find((item) => item.DataPhasId == SelectedPhas.DataPhasId);
    }, [ProcessData.Full, SelectedPhas]);
    const [FindContacts, { isLoading: IsContactLoading }] = useGetContactsMutation();
    const OnSetContacts = async () => {
        const { data } = await FindContacts({
            DeveloperId: DataDeveloperId,
            City: DataCityId,
            Section: SelectedSection
        });
        const Data = data?.data?.results;
        if (!Data || Data.length === 0) {
            Notify("warn", Lang?.ERRORS?.NO_CONTACTS?.replace("{{Developer}}", DataDeveloper));
            return;
        }
        OnSetModalData({
            CompoundId: DataCompoundId,
            Type: "Contacts",
            Title: Lang?.DATA_PAGE?.ACTIONS?.CONTACTS || "Contacts",
            Content: <ContactsTable Data={Data} IsLoading={IsContactLoading} />
        });
    };
    if (!SelectedItem) return null;
    let Heights = {
        Hero: 5.5,
        Actions: 2.5,
        Info: 2.5,
        PayCard: 6.7,
        PayText: 1.5
    };
    return !isFetching && ProcessData ? (
        <Box w={"100%"} h={"100%"} p={1} rounded={"lg"}>
            <Box w={"100%"} h={"100%"} p={1} rounded={"lg"}>
                <ItemInfoHero
                    IsContactLoading={IsContactLoading}
                    SelectedPhasData={SelectedPhasData}
                    setSelectedPayPlan={setSelectedPayPlan}
                    OnSetContacts={OnSetContacts}
                    OnSelectPhas={OnSelectPhas}
                    PhasOptions={ProcessData.PhasesBtns}
                    isLoading={isLoading}
                    PayPlan={SelectedPayPlan}
                    Item={SelectedItem}
                    Phas={SelectedPhas}
                    Lang={Lang}
                    MainH={`${Heights.Hero}rem`}
                />
                <ActionButtons
                    OnSetModalData={OnSetModalData}
                    Notify={Notify}
                    Lang={Lang}
                    Item={SelectedItem}
                    Modal={Modal}
                    IsDark={IsDark}
                    mt={4}
                    h={`${Heights.Actions}rem`}
                    w={{
                        md: "100%",
                        lg: "27rem",
                        xl: "30rem"
                    }}
                />
                <PhasInfo
                    Phas={SelectedPhas}
                    Lang={Lang}
                    IsDark={IsDark}
                    mt={2}
                    h={`${Heights.Info}rem`}
                    w={{
                        md: "100%",
                        lg: "27rem",
                        xl: "30rem"
                    }}
                />
                <PaymentPlan
                    setSelectedPayPlan={setSelectedPayPlan}
                    SelectedPayPlan={SelectedPayPlan}
                    SelectedPhas={SelectedPhas}
                    ProcessData={ProcessData}
                    Options={SelectedPhasData ? SelectedPhasData.DataPayPlans : []}
                    SelectedPhasData={SelectedPhasData}
                    IsDark={IsDark}
                    Item={SelectedItem}
                    Lang={Lang}
                    height={{
                        Card: `${Heights.PayCard}rem`,
                        Text: `${Heights.PayText}rem`,
                    }}
                />
            </Box>
        </Box>
    ) : isFetching ? (
        <Flex w={"100%"} h={"100%"} alignItems={"center"} justifyContent={"center"}>
            <Spinner Width={200} />
        </Flex>
    ) : (
        <Flex w={"100%"} h={"100%"} alignItems={"center"} justifyContent={"center"}>
            {Lang?.NO_DATA}
        </Flex>
    );
}
export default memo(ItemInfo);
