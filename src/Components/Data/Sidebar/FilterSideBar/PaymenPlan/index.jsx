import "./css.css";

import TypeFilter from "../TypeFilter";
import { Helper, ThemeColors } from "@/Utility";
import {
    Box,
    Button,
    Flex,
    Modal,
    ModalOverlay,
    Radio,
    RadioGroup,
    Stack,
    useDisclosure,
    ModalBody,
    ModalContent,
    ModalCloseButton,
    ModalFooter
} from "@chakra-ui/react";
import { startTransition, useMemo, useState } from "react";
import CardReusltUser from "./CardReusltuser";
import { useLang, useNotify } from "@/Hooks";
import DownPayment from "./_Content/DownPayment";
import Years from "./_Content/Years";
import UnitTotalPrice from "./_Content/UnitTotalPrice";

const PaymenPlan = ({
    OnToggleTab,
    colorMode,
    SetState,
    Options = {
        Years: [],
        DownPayment: []
    },
    State,
    Tabs,
    Rtl
}) => {
    const Lang = useLang();
    const Notify = useNotify();
    const { isOpen, onToggle } = useDisclosure();
    const [StateManager, setStateManager] = useState({
        DataUnitPriceType: State.DataUnitPriceType,
        DataUnitTotalPriceFrom: "",
        DataUnitTotalPriceTo: "",
        DataYearsFrom: "",
        DataYearsTo: "",
        DataDownPaymentFrom: "",
        DataDownPaymentTo: ""
    });
    const OnChanget = (Name, Value) => {
        let NewData = Value;
        const NumbersCols = ["DataUnitTotalPriceFrom", "DataUnitTotalPriceTo"];
        if (NumbersCols.includes(Name)) {
            const val = Value.replace(/\D/g, "");
            const limitedValue = val.slice(0, 9);
            let dd = Helper.ConvertToFloat(limitedValue);
            if (isNaN(dd) && val !== "") {
                Notify("info", "Numbers Only");
            }
            NewData = !isNaN(dd) ? dd : "";
        }
        setStateManager((prev) => ({
            ...prev,
            [Name]: NewData
        }));
    };
    const HandleonChangeSelect = (e, fieldName) => {
        setStateManager((prev) => ({
            ...prev,
            [fieldName]: e.target.value
        }));
    };
    const ResetField = (fieldName) => {
        setStateManager((prev) => ({
            ...prev,
            [fieldName]: ""
        }));
    };
    const OnClose = () => {
        onToggle();
        if (isOpen) {
            // OnToggleTab();
        }
    };
    const HaveData = useMemo(() => {
        let Years = State?.DataYearsFrom || State?.DataYearsTo ? true : false;
        let DownPayment = State.DataDownPaymentTo || State.DataDownPaymentFrom ? true : false;
        let UnitPrice = State?.DataUnitTotalPriceTo || State?.DataUnitTotalPriceFrom ? true : false;
        return {
            DownPayment,
            UnitPrice,
            Years,
            HaveOne: Years || DownPayment || UnitPrice
        };
    }, [
        State?.DataUnitTotalPriceTo,
        State?.DataUnitTotalPriceFrom,
        State?.DataYearsFrom,
        State?.DataYearsTo,
        State.DataDownPaymentTo,
        State.DataDownPaymentFrom
    ]);
    return (
        <Box pt={"10px"}>
            <TypeFilter
                Name={"PaymentPlan"}
                text={Lang?.SIDEBAR?.LABEL?.PAYMENT_PLAN || "Payment Plan"}
                onToggle={OnClose}
                Tabs={Tabs}
                OnToggleTab={OnToggleTab}
                // Eng Sabry
                isOpen={isOpen}
                AllowToggleTab={false}
            />
            <Modal onClose={OnClose} isOpen={isOpen} isCentered={true}>
                <Box className="PaymenPlan-ModalOverlay">
                    <ModalOverlay />
                </Box>
                <ModalContent
                    className="Main-Modal Shadow"
                    transform={"translateX(-110%) scale(0.1)"}
                    transition={".5s ease-in-out"}
                >
                    <ModalCloseButton rounded={"full"} />
                    <ModalBody
                        p={"2rem"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        flexDirection={"column"}
                    >
                        {/* """"""""""""""""" Start Payment Method  """"""""""""""""""""""""""" */}
                        <RadioGroup
                            fontWeight={"extrabold"}
                            onChange={(e) =>
                                setStateManager((prev) => ({
                                    ...prev,
                                    DataUnitPriceType: e
                                }))
                            }
                            value={StateManager.DataUnitPriceType}
                        >
                            <Stack direction="row" gap={"50px"}>
                                {Lang?.SIDEBAR?.OPTIONS?.UNIT_TOTL_PRICE_TYPES?.map((item) => (
                                    <Radio key={item.Value} value={item.Value} colorScheme="green">
                                        <Box as="span" className="Header-Payment-Method">
                                            {item.Label}
                                        </Box>
                                    </Radio>
                                ))}
                            </Stack>
                        </RadioGroup>
                        {/**"""""""""""""""" End  Payment Method  """"""""""""""""""""""""""" **/}
                        {/**"""""""""""""" Start Budget""""""""""""""""""""""""""**/}
                        <Flex direction={"column"} dir={Rtl ? "rtl" : "ltr"} gap={"2"}>
                            <UnitTotalPrice OnChange={OnChanget} State={StateManager} Lang={Lang} />
                            {/**"""""""""""""""""""""""""""" End Budget"""""""""""""""""""**/}
                            {/**""""""""""""""""Start  Installment Years """""""""""""""""""""""""""""*/}
                            <Years
                                OnChange={HandleonChangeSelect}
                                OnReset={ResetField}
                                Options={Options.Years}
                                State={StateManager}
                                Lang={Lang}
                                Rtl={Rtl}
                            />
                            {/**""""""""""""""  End Installment Years From """"""""""""""""""""""**/}
                            {/*"""""""""""""""""""" Start Payment Plan  """""""""""""""""""" */}
                            <DownPayment
                                OnChange={HandleonChangeSelect}
                                OnReset={ResetField}
                                Options={Options.DownPayment}
                                State={StateManager}
                                Lang={Lang}
                                Rtl={Rtl}
                            />
                        </Flex>
                    </ModalBody>

                    <ModalFooter justifyContent={"space-between"} alignItems={"center"}>
                        <Button
                            onClick={() => {
                                startTransition(() => {
                                    SetState({
                                        type: "Change",
                                        payload: { ...StateManager }
                                    });
                                    OnClose();
                                });
                            }}
                            bg={ThemeColors.ActiveBackgroundColor[colorMode]}
                            _hover={{
                                bg: ThemeColors.ActiveBackgroundColor[colorMode]
                            }}
                            variant={"solid"}
                            color={"#fff"}
                            width={"fit-content"}
                            m="auto"
                            className="flex_center"
                        >
                            {Lang?.OK}
                        </Button>

                        <Button
                            style={{ width: "70px" }}
                            variant={"solid"}
                            color={"#fff"}
                            width={"fit-content"}
                            m="auto"
                            className="flex_center"
                            bg="red.500"
                            onClick={OnClose}
                            _hover={{
                                background: "red.500"
                            }}
                        >
                            {Lang?.CLOSE}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* =========================== Eng Sabry ================================ */}
            {HaveData.HaveOne && (
                <CardReusltUser
                    colorMode={colorMode}
                    State={State}
                    Lang={Lang}
                    HaveData={HaveData}
                />
            )}
        </Box>
    );
};

export default PaymenPlan;
