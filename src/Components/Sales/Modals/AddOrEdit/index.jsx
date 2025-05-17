import { Collapse, CustomMultiCheckBox, UploadHelper } from "@/Common";
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
    Button,
    useDisclosure,
    Text,
    Spinner,
    FormLabel,
    Divider,
    Flex,
    FormControl,
    Input,
    Textarea
} from "@chakra-ui/react";
import { memo, useEffect, useId, useMemo, useRef } from "react";
const MainH = "2rem";
const AddOrEditSales = ({
    State,
    IsOpen,
    OnClose,
    OnChange = () => {},
    OnSubmit = () => {},
    IsLoading = false,
    Options = [],
    DevLoading = true,
    Lang,
    Rtl
}) => {
    const {
        Files,
        Tab,
        SalesDeveloper,
        SalesProject,
        SalesCustomer,
        SalesExecutive,
        SalesDate,
        SalesUnitPrice,
        SalesUnitType,
        SalesNote
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
        if (Tab == "Edit") return false;
        if (!SalesDeveloper?.value || !SalesProject?.value) return true;
        return false;
    }, [SalesDeveloper?.value, SalesProject?.value, Tab]);
    return (
        <Modal isOpen={IsOpen} onClose={OnClose} isCentered={true}>
            <ModalOverlay />
            <ModalContent
                as={"form"}
                autoComplete="off"
                onSubmit={(e) => OnSubmit(e, State)}
                w={{
                    base: "100%",
                    md: "fit-content"
                }}
                maxW={{
                    base: "100%",
                    md: "max-content"
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
                    <span>{Lang?.SALES_PAGE?.LABELS?.[Tab == "Edit" ? "EDIT" : "ADD"]}</span>
                    <ModalCloseButton pos={"inherit"} className="Shadow" rounded={"full"} />
                </ModalHeader>
                <ModalBody
                    w={{
                        base: "100%",
                        md: "fit-content"
                    }}
                    minW={{
                        base: "100%",
                        md: "35rem"
                    }}
                >
                    {Tab == "Add" && (
                        <>
                            <UploadHelper
                                OnChange={(e) => OnChange("Files", e)}
                                Value={Files}
                                Label={
                                    Lang?.SALES_PAGE?.LABELS?.UPLOADER || "قم بتحميل صور من العقد"
                                }
                                Max={2}
                            />
                            <Divider my={1} className="Sales-Page-Border-Color" />
                        </>
                    )}
                    <Flex
                        flexDir={"column"}
                        gap={{
                            base: 1,
                            md: 2
                        }}
                    >
                        {Tab == "Add" && (
                            <>
                                <SelectWithDrop
                                    Rtl={Rtl}
                                    Lang={Lang}
                                    Label={
                                        Lang?.SALES_PAGE?.LABELS?.SalesDeveloper ||
                                        "اسم المطور العقاري"
                                    }
                                    Name="SalesDeveloper"
                                    Value={SalesDeveloper}
                                    OnChange={(e) => OnChange("SalesDeveloper", e)}
                                    Options={Options?.Dev}
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
                            </>
                        )}
                        <SelectWithDrop
                            Rtl={Rtl}
                            Lang={Lang}
                            Label={Lang?.SALES_PAGE?.LABELS?.SalesUnitType || "نوع الوحدة"}
                            Name="SalesUnitType"
                            Value={SalesUnitType}
                            OnChange={(e) => OnChange("SalesUnitType", e)}
                            Options={Options?.Types}
                            isLoading={DevLoading}
                            Extra={!SalesProject?.value  && Tab == "Add"}
                        />
                        <FlexInput
                            Label={Lang?.SALES_PAGE?.LABELS?.SalesUnitPrice || "سعر الوحدة"}
                            Name="SalesUnitPrice"
                            OnChange={(e) => OnChange("SalesUnitPrice", e)}
                            Value={Helper.NumberWithCommas(SalesUnitPrice)}
                            isDisabled={IsDisabledAll}
                            Rtl={Rtl}
                        />
                        <FlexInput
                            Label={Lang?.SALES_PAGE?.LABELS?.SalesDate || "تاريخ البيع"}
                            Name="SalesDate"
                            OnChange={(e) => OnChange("SalesDate", e)}
                            Value={SalesDate ? Helper.HandleMomentDate(SalesDate) : ""}
                            type="date"
                            isDisabled={IsDisabledAll}
                            Rtl={Rtl}
                        />
                        <FlexInput
                            Label={Lang?.SALES_PAGE?.LABELS?.SalesCustomer || "اسم العميل"}
                            Name="SalesCustomer"
                            OnChange={(e) => OnChange("SalesCustomer", e)}
                            Value={SalesCustomer}
                            isDisabled={IsDisabledAll}
                            Rtl={Rtl}
                        />
                        <FlexInput
                            Label={Lang?.SALES_PAGE?.LABELS?.SalesExecutive || "اسم العميل"}
                            Name="SalesExecutive"
                            OnChange={(e) => OnChange("SalesExecutive", e)}
                            Value={SalesExecutive}
                            isDisabled={IsDisabledAll}
                            Rtl={Rtl}
                        />
                        <FlexInput
                            Label={Lang?.SALES_PAGE?.LABELS?.SalesNote || "ملاحظات"}
                            Name="SalesNote"
                            OnChange={(e) => OnChange("SalesNote", e)}
                            Value={SalesNote}
                            isDisabled={IsDisabledAll}
                            Rtl={Rtl}
                            type="textarea"
                        />
                    </Flex>
                </ModalBody>
                <ModalFooter justifyContent={"center"}>
                    <Button
                        w={"15rem"}
                        maxH={"2rem"}
                        rounded={"lg"}
                        type="submit"
                        className="Sales-Page-Btn-Bg Sales-Page-Color"
                        fontWeight={"bold"}
                        isLoading={IsLoading}
                        isDisabled={IsLoading}
                    >
                        {Lang?.SALES_PAGE?.BUTTONS?.ACCEPT_DATA || "تأكيد البيانات"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default memo(AddOrEditSales);
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
    ...props
}) {
    const UniqeId = useId();
    const LabelFontSize = Label?.length > 15 ? "0.75rem" : "inherit";
    return (
        <FormControl
            display={"flex"}
            flexDir={{
                base: "column",
                md: "row"
            }}
            alignItems={{
                base: "flex-start",
                md: "center"
            }}
            justifyContent={"center"}
            gap={{
                base: 0,
                md: 1
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
                    md: "40%"
                }}
            >
                {Label}
            </FormLabel>
            {props.type != "textarea" ? (
                <Input
                    name={Name}
                    id={UniqeId}
                    onChange={(e) => OnChange(e.target.value)}
                    value={Value}
                    className={"Sales-Page-Border-Color"}
                    h={MainH}
                    px={1}
                    w={{
                        base: "100%",
                        md: "60%"
                    }}
                    {...props}
                />
            ) : (
                <Textarea
                    name={Name}
                    id={UniqeId}
                    onChange={(e) => OnChange(e.target.value)}
                    value={Value}
                    className={"Sales-Page-Border-Color"}
                    w={{
                        base: "100%",
                        md: "60%"
                    }}
                    {...props}
                />
            )}
        </FormControl>
    );
}
