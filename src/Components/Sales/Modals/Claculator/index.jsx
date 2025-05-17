import { Collapse, CustomMultiCheckBox } from "@/Common";
import { useGetDevDetailsQuery } from "@/Redux";
import { Helper } from "@/Utility";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Text,
    Spinner,
    FormLabel,
    Flex,
    FormControl,
    Input
} from "@chakra-ui/react";
import { memo, useEffect, useId, useMemo, useRef, useState } from "react";
const MainH = "2rem";
const SalesClaculator = ({
    CalculateCommisionRate = () => {},
    IsOpen = false,
    OnClose = () => {},
    OnSubmit = () => {},
    DevOptions = [],
    DevLoading = true,
    Lang,
    Rtl
}) => {
    const [State, SetState] = useState({
        SalesDeveloper: "",
        SalesProject: "",
        TransactionValue: "",
        CommissionRate: "",
        TotalCommission: "",
        TotalTax: "",
        NetCommission: "",
        CheckValue: "",
        YourProfits: ""
    });
    const {
        SalesDeveloper,
        SalesProject,
        TransactionValue,
        CommissionRate,
        TotalCommission,
        TotalTax,
        NetCommission,
        CheckValue,
        YourProfits
    } = State || {};
    const { data, isFetching } = useGetDevDetailsQuery(
        {
            DeveloperId: SalesDeveloper?.value
        },
        {
            skip: !SalesDeveloper || !SalesDeveloper?.value,
            refetchOnMountOrArgChange: true
        }
    );
    const ProcessProjectOptions = useMemo(() => {
        if (!data || !data?.data) return [];
        return data?.data?.map((item) => ({
            label: item?.CompoundName,
            value: item?.CompoundId,
            id: item?.CompoundId,
            ComValue: item?.ComValue
        }));
    }, [data]);
    const IsDisabledAll = useMemo(() => {
        if (!SalesDeveloper?.value || !SalesProject?.value) return true;
        return false;
    }, [SalesDeveloper?.value, SalesProject?.value]);
    useEffect(() => {
        if (CommissionRate != "" && TransactionValue != "") {
            const { TotalCommission, CheckValue, TotalTax, NetCommission, YourProfits } = CalculateCommisionRate(
                TransactionValue,
                CommissionRate
            );
            SetState((prev) => ({
                ...prev,
                TotalCommission: `${Helper.NumberWithCommas(TotalCommission)}`,
                CheckValue: `${Helper.NumberWithCommas(CheckValue)}`,
                TotalTax: `${Helper.NumberWithCommas(TotalTax)}`,
                NetCommission: `${Helper.NumberWithCommas(NetCommission)}`,
                YourProfits: `${Helper.NumberWithCommas(YourProfits)}`
            }));
        }
    }, [CalculateCommisionRate, CommissionRate, TransactionValue]);
    const OnChange = (Name, Value) => {
        if (Name == "TransactionValue" && Value != "") {
            const val = Value.replace(/\D/g, "");
            const limitedValue = val.slice(0, 9);
            let FloatNumber = Helper.ConvertToFloat(limitedValue);
            if (isNaN(FloatNumber) && val !== "") {
                // Notify("info", "Numbers Only");
                return;
            }
            Value = !isNaN(FloatNumber) ? FloatNumber : "";
        }
        let NewData = {
            [Name]: Value
        };
        if (Name == "SalesProject") {
            NewData.CommissionRate = Value?.ComValue ? Value?.ComValue : "";
        }
        if (Name == "SalesDeveloper" && SalesProject?.value) {
            NewData.TransactionValue = "";
            NewData.SalesProject = "";
            NewData.CommissionRate = "";
            NewData.TotalCommission = "";
            NewData.NetCommission = "";
            NewData.CheckValue = "";
            NewData.YourProfits = "";
        }
        SetState((prev) => ({
            ...prev,
            ...NewData
        }));
    };

    return (
        <Modal
            isOpen={IsOpen}
            onClose={OnClose}
            isCentered={true}
        >
            <ModalOverlay />
            <ModalContent
                as={"form"}
                autoComplete="off"
                onSubmit={(e) => OnSubmit(e, State)}
                w={{
                    base: "100%",
                    sm: "fit-content"
                }}
                maxW={{
                    base: "100%",
                    sm: "max-content"
                }}
                className="Main-Modal"
            >
                <ModalHeader
                    py={1}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    w={"100%"}
                    dir={Rtl ? "rtl" : "ltr"}
                >
                    <span>{Lang?.SALES_PAGE?.LABELS?.Claculator}</span>
                    <ModalCloseButton pos={"inherit"} className="Shadow" rounded={"full"} />
                </ModalHeader>
                <ModalBody
                    w={{
                        base: "100%",
                        sm: "fit-content"
                    }}
                    minW={{
                        base: "100%",
                        sm: "25rem"
                    }}
                    display={"flex"}
                    flexDir={"column"}
                    gap={{
                        base: 0,
                        sm: 2
                    }}
                    py={"4rem"}
                >
                    <SelectWithDrop
                        Rtl={Rtl}
                        Lang={Lang}
                        Label={Lang?.SALES_PAGE?.LABELS?.SalesDeveloper || "اسم المطور العقاري"}
                        Name="SalesDeveloper"
                        Value={SalesDeveloper}
                        OnChange={(e) => OnChange("SalesDeveloper", e)}
                        Options={DevOptions.Dev}
                        isLoading={DevLoading}
                    />
                    <SelectWithDrop
                        Rtl={Rtl}
                        Lang={Lang}
                        Label={Lang?.SALES_PAGE?.LABELS?.SalesProject || "اسم المشروع"}
                        Name="SalesProject"
                        Value={SalesProject}
                        OnChange={(e) => OnChange("SalesProject", e)}
                        Options={ProcessProjectOptions}
                        isLoading={isFetching}
                        Extra={!SalesDeveloper?.value}
                    />
                    <FlexCol
                        Label={Lang?.SALES_PAGE?.LABELS?.CommissionRate || "نسبة العمولة"}
                        Value={CommissionRate ? `${CommissionRate * 100} %` : ""}
                        flexDir={"row"}
                        Rtl={Rtl}
                    />
                    <FlexInput
                        Label={Lang?.SALES_PAGE?.LABELS?.TransactionValue || "قيمة الصفقة"}
                        Name="TransactionValue"
                        OnChange={(e) => OnChange("TransactionValue", e)}
                        Value={Helper.NumberWithCommas(TransactionValue)}
                        isDisabled={IsDisabledAll}
                        flexDir={"row"}
                        Rtl={Rtl}
                    />
                    <FlexCol
                        Label={Lang?.SALES_PAGE?.LABELS?.TotalCommission || "العمولة الاجمالية"}
                        Value={`${TotalCommission} ${TotalCommission ? Lang?.DATA_PAGE?.LE : ""}`}
                        flexDir={"row"}
                        Rtl={Rtl}
                    />
                    <FlexCol
                        Label={Lang?.SALES_PAGE?.LABELS?.CheckValue || "قيمة الشيك"}
                        Value={`${CheckValue} ${CheckValue ? Lang?.DATA_PAGE?.LE : ""}`}
                        flexDir={"row"}
                        Rtl={Rtl}
                    />
                    <FlexCol
                        Label={Lang?.SALES_PAGE?.LABELS?.TotalTax || "اجمالي الضريبة"}
                        Value={`${TotalTax} ${TotalTax ? Lang?.DATA_PAGE?.LE : ""}`}
                        flexDir={"row"}
                        Rtl={Rtl}
                    />

                    <FlexCol
                        Label={Lang?.SALES_PAGE?.LABELS?.NetCommission || "صافي العمولة"}
                        Value={`${NetCommission} ${NetCommission ? Lang?.DATA_PAGE?.LE : ""}`}
                        flexDir={"row"}
                        Rtl={Rtl}
                    />
                    <FlexCol
                        Label={Lang?.SALES_PAGE?.LABELS?.YourProfits || "ارباحك"}
                        Value={`${YourProfits} ${YourProfits ? Lang?.DATA_PAGE?.LE : ""}`}
                        flexDir={"row"}
                        Rtl={Rtl}
                    />
                </ModalBody>
                <ModalFooter justifyContent={"center"} mb={"3rem"}>
                    {Lang?.SALES_PAGE?.MESSAGE || "بالاضافة لأي حوافز من المطور"}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default memo(SalesClaculator);
function SelectWithDrop({
    Value = "",
    Name = "",
    Label = "",
    Lang,
    Rtl = false,
    OnChange = () => {},
    Options = [],
    IsMulti = false,
    isLoading = true,
    Extra = false,
    ...props
}) {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const dropdownRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);
    return (
        <FormControl ref={dropdownRef} dir={Rtl ? "rtl" : "ltr"}>
            <Flex
                border={"1px"}
                className={"Sales-Page-Border-Color"}
                cursor={"pointer"}
                onClick={isLoading || Extra ? () => {} : onToggle}
                fontWeight={"bold"}
                rounded={"md"}
                px={1}
                h={MainH}
                lineHeight={MainH}
                textAlign={isLoading ? "center" : ""}
                htmlFor="none"
                alignItems={"center"}
                justifyContent={"space-between"}
            >
                {isLoading ? <Spinner mx={"auto"} /> : Label}
                <span> {Value ? Value?.label : ""}</span>
                {(!Options || Options?.length < 1) && !isLoading && !Extra && (
                    <span>{Lang?.NO_DATA || "لا يوجد بيانات"}</span>
                )}
            </Flex>
            {Options && Options?.length > 0 ? (
                <Collapse IsOpen={isOpen}>
                    <CustomMultiCheckBox
                        Name={Name}
                        AllowFilter={true}
                        IsMulti={IsMulti}
                        OnChange={(e) => OnChange(e.Value)}
                        Options={Options}
                        Value={Value}
                        Lang={Lang}
                        MaxH={"10rem"}
                        {...props}
                    />
                </Collapse>
            ) : (
                <Collapse IsOpen={isOpen}>
                    <Text textAlign={"center"}>{Lang?.NO_DATA || "لا يوجد بيانات"}</Text>
                </Collapse>
            )}
        </FormControl>
    );
}

function FlexInput({
    Label = "",
    Name = "",
    OnChange = () => {},
    Value = "",
    Rtl = false,
    flexDir,
    ...props
}) {
    const UniqeId = useId();
    const LabelFontSize = flexDir ? "inherit" : Label?.length > 15 ? "0.75rem" : "inherit";
    return (
        <FormControl
            display={"flex"}
            flexDir={{
                base: "column",
                sm: flexDir == "column" ? flexDir : "row"
            }}
            alignItems={{
                base: "flex-start",
                sm: flexDir == "column" ? "flex-start" : "center"
            }}
            justifyContent={"center"}
            gap={{
                base: 0,
                sm: flexDir == "column" ? 0 : 1
            }}
            dir={Rtl ? "rtl" : "ltr"}
        >
            <FormLabel
                fontWeight={"bold"}
                rounded={"md"}
                htmlFor={UniqeId}
                m={0}
                h={MainH}
                lineHeight={MainH}
                fontSize={LabelFontSize}
                whiteSpace={"nowrap"}
                w={{
                    base: "100%",
                    sm: flexDir == "column" ? "100%" : "40%"
                }}
            >
                {Label}
            </FormLabel>
            <Input
                name={Name}
                id={UniqeId}
                onChange={(e) => OnChange(e.target.value)}
                value={Value}
                className={"Sales-Page-Border-Color"}
                h={MainH}
                px={1}
                textAlign={"center"}
                w={{
                    base: "100%",
                    sm: flexDir == "column" ? "100%" : "60%"
                }}
                {...props}
            />
        </FormControl>
    );
}
function FlexCol({ Label = "", Value = "", Rtl = false, flexDir }) {
    const UniqeId = useId();
    const LabelFontSize = flexDir ? "inherit" : Label?.length > 15 ? "0.75rem" : "inherit";
    return (
        <FormControl
            display={"flex"}
            flexDir={{
                base: "column",
                sm: flexDir == "column" ? flexDir : "row"
            }}
            alignItems={{
                base: "flex-start",
                sm: flexDir == "column" ? "flex-start" : "center"
            }}
            justifyContent={"center"}
            gap={{
                base: 0,
                sm: flexDir == "column" ? 0 : 1
            }}
            dir={Rtl ? "rtl" : "ltr"}
        >
            <FormLabel
                fontWeight={"bold"}
                rounded={"md"}
                htmlFor={UniqeId}
                m={0}
                h={MainH}
                lineHeight={MainH}
                fontSize={LabelFontSize}
                whiteSpace={"nowrap"}
                w={{
                    base: "100%",
                    sm: flexDir == "column" ? "100%" : "40%"
                }}
            >
                {Label}
            </FormLabel>
            <Text
                border={"1px solid"}
                className={"Sales-Page-Border-Color"}
                h={MainH}
                lineHeight={MainH}
                px={1}
                rounded={"md"}
                textAlign={"center"}
                w={{
                    base: "100%",
                    sm: flexDir == "column" ? "100%" : "60%"
                }}
            >
                {Value ? Value : ""}
            </Text>
        </FormControl>
    );
}
