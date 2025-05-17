import { Flex, Stack, useDisclosure } from "@chakra-ui/react";
import PhasOptions from "./PhasOptions";
import PayModal from "../_Modals/Pay";
import ButtonImg from "./ButtonImg";
import RoiModal from "../_Modals/Roi";
import { useEffect, useMemo, useState } from "react";
import { Helper } from "@/Utility";

export default function PhasesButtons({
    setSelectedPayPlan,
    SelectedPhasData,
    OnSelectPhas = () => {},
    Options = [],
    PayPlan = null,
    IsDark = true,
    Phas = null,
    Item = null,
    Lang
}) {
    const { isOpen, onToggle, onOpen } = useDisclosure();
    const BtnImgSize = "2.5rem";
    let [State, setState] = useState({
        Type: "",
        Bua: "",
        TotalPrice: 0
    });
    const ProcessSelectedPhasData = useMemo(() => {
        let DataToReturn = {
            Type: [],
            Area: {},
            Prices: {}
        };
        const { PayPlanDiscount } = PayPlan || {};
        if (SelectedPhasData) {
            const { DataDetails } = SelectedPhasData;
            if (Object.keys(DataDetails).length > 0) {
                for (const [key, value] of Object.entries(DataDetails)) {
                    if (key) {
                        DataToReturn.Type.push(key);
                    }
                    if (Array.isArray(value)) {
                        value.forEach((element) => {
                            if (!DataToReturn.Area[key]) {
                                DataToReturn.Area[key] = [];
                            }
                            DataToReturn.Area[key].push(element.DetailBuiltUpArea);
                            if (!DataToReturn.Prices[element.DetailBuiltUpArea]) {
                                DataToReturn.Prices[element.DetailBuiltUpArea] = parseInt(
                                    Helper.HandlePayPlanDiscount(
                                        PayPlanDiscount,
                                        element.DetailUnitTotalPrice,
                                        element.DetailBuiltUpArea
                                    )
                                );
                            }
                        });
                    }
                }
            } else {
                DataToReturn.Type = [];
                DataToReturn.Area = null;
                DataToReturn.Prices = null;
            }
        }

        return DataToReturn;
    }, [PayPlan, SelectedPhasData?.DataDetails]);
    useEffect(() => {
        if (ProcessSelectedPhasData) {
            const { Type, Area, Prices } = ProcessSelectedPhasData;
            if (Type.length > 0) {
                setState((prev) => ({
                    ...prev,
                    Type: Type[0],
                    Bua: Area ? Area[Type[0]][0] : "",
                    TotalPrice: Area ? Prices[Area[Type[0]][0]] : ""
                }));
            } else {
                setState((prev) => ({
                    ...prev,
                    Type: "",
                    Bua: "",
                    TotalPrice: 0
                }));
            }
        }
    }, [ProcessSelectedPhasData]);
    useEffect(() => {
        if (Options?.length > 1) {
            onOpen();
        }
    }, [Options?.length, onOpen]);
    return (
        <section>
            <Flex flexDir={"row-reverse"} alignItems={"center"} pos={"relative"} gap={0}>
                <Stack gap={1}>
                    <ButtonImg
                        src="/Img/Info/Phases.png"
                        alt="Phases"
                        isOpen={isOpen}
                        onToggle={onToggle}
                        BtnImgSize={BtnImgSize}
                    />
                    <PayModal
                        PhasOptions={ProcessSelectedPhasData}
                        State={State}
                        setState={setState}
                        BtnImgSize={BtnImgSize}
                        PayPlan={PayPlan}
                        Phas={Phas}
                        Item={Item}
                        Lang={Lang}
                        PaymentPlansOptions={SelectedPhasData ? SelectedPhasData.DataPayPlans : []}
                        setSelectedPayPlan={setSelectedPayPlan}
                    />
                    <RoiModal
                        PhasOptions={ProcessSelectedPhasData}
                        State={State}
                        setState={setState}
                        BtnImgSize={BtnImgSize}
                        PayPlan={PayPlan}
                        Phas={Phas}
                        Item={Item}
                        Lang={Lang}
                        PaymentPlansOptions={SelectedPhasData ? SelectedPhasData.DataPayPlans : []}
                        setSelectedPayPlan={setSelectedPayPlan}
                    />
                </Stack>
                <PhasOptions
                    OnSelectPhas={OnSelectPhas}
                    BtnImgSize={BtnImgSize}
                    Options={Options}
                    isOpen={isOpen}
                    IsDark={IsDark}
                    Phas={Phas}
                    Lang={Lang}
                />
            </Flex>
        </section>
    );
}
