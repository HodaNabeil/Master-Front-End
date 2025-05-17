import { InputField, MultiSelect, PhoneInput, SelectField } from "@/Common";
import { Validation } from "@/Utility";
import {
    Button,
    Flex,
    Grid,
    GridItem,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text
} from "@chakra-ui/react";
import { useMemo } from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
export default function CreateOrUpdate({
    OnClose = () => {},
    OnChange = () => {},
    OnSubmit = () => {},
    isLoading,
    Lang,
    State,
    Rtl
}) {
    const { City, Section } = useSelector((state) => state.Public);
    const SectionData = useMemo(() => {
        const AllSelected = Section?.map((sec) => sec.SectionId);
        const Data = Lang?.DATA_PAGE?.TABS?.SECTIONS ? Lang?.DATA_PAGE?.TABS?.SECTIONS : [];
        return Data?.filter((sec) => AllSelected.includes(sec.value));
    }, [Lang?.DATA_PAGE?.TABS?.SECTIONS, Section]);
    const Cities = useMemo(() => {
        if (City.length > 0) {
            return City.reduce((prev, curr) => {
                const { CitySectionId, CityName, CityId } = curr || {};
                if (!prev[CitySectionId]) {
                    prev[CitySectionId] = [];
                }
                prev[CitySectionId].push({
                    CityId: CityId,
                    CityName: CityName,
                    CitySectionId: CitySectionId,
                    Icon: <FaCheck />
                });
                return prev;
            }, {});
        }
        return {};
    }, [City]);
    const Sections = useMemo(() => {
        return SectionData
            ? SectionData?.map((section) => ({
                  SectionName: section.ViewLabel,
                  SectionKey: section.label,
                  SectionId: section.value
              }))
            : [];
    }, [SectionData]);

    const NextBtn = useMemo(() => {
        const DataToReturn = {
            IsDisabled: false,
            Bg: "green.600"
        };
        let errors = Validation.SubUser(State, State.IsEdit);
        errors = errors?.map((err) => {
            if (err.includes(".")) {
                const Key = err.split(".")[1];
                const LangKey = Sections.find((x) => x.SectionKey == Key);
                return Lang?.VALIDATION?.SECTION_IS_EMPTY?.replaceAll(
                    "{{Key}}",
                    LangKey?.SectionName
                );
            }
            return Lang?.VALIDATION?.[err];
        });
        if (errors.length > 0) {
            DataToReturn.IsDisabled = true;
            DataToReturn.Bg = "red.700";
        }
        return {
            ...DataToReturn,
            Errors: errors
        };
    }, [Lang, Sections, State]);
    const handleSelectSection = (Value, IsSelected = false) => {
        let NewData = IsSelected
            ? State.UserSections?.filter((item) => item?.SectionId != Value?.SectionId)
            : [...State.UserSections, Value];
        OnChange("UserSections", NewData);
    };
    const Spans = {
        base: 6,
        sm: 3,
        md: 3
    };
    return (
        <Modal isOpen={State.IsOpen} onClose={OnClose}>
            <ModalOverlay />
            <ModalContent
                as={"form"}
                onSubmit={(e) => OnSubmit(e, State, State.IsEdit ? "Update" : "Create")}
                dir={Rtl ? "rtl" : "ltr"}
                className="Main-Modal"
                w={{
                    base: "100%",
                    sm: "fit-content"
                }}
                maxW={{
                    base: "100%",
                    sm: "max-content"
                }}
            >
                <ModalHeader
                    py={1}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    {State.IsEdit ? Lang?.UPDATE : Lang?.CREATE}
                    <ModalCloseButton pos={"inherit"} rounded={"full"} />
                </ModalHeader>
                <ModalBody
                    w={{
                        base: "100%",
                        sm: "fit-content"
                    }}
                >
                    <div>
                        {NextBtn.Errors?.map((Err, index) => (
                            <Text color="red.500" dir={Rtl ? "rtl" : "ltr"} key={index}>
                                ※ {Err}
                            </Text>
                        ))}
                    </div>
                    <Grid
                        templateColumns={`repeat(${Spans.base}, 1fr)`}
                        gap={1}
                        w={"100%"}
                        display={"grid"}
                        alignItems={"end"}
                    >
                        <GridItem colSpan={Spans}>
                            <InputField
                                Type="text"
                                Name="UserName"
                                Id={"UserName"}
                                Label={Lang?.AUTH_PAGE?.INPUTS?.USER_NAME}
                                placeholder={Lang?.AUTH_PAGE?.INPUTS?.USER_NAME}
                                Value={State.UserName}
                                OnChange={(e) => OnChange("UserName", e.target.value)}
                            />
                        </GridItem>
                        <GridItem colSpan={Spans}>
                            <InputField
                                Type="email"
                                Name="UserEmail"
                                Id={"UserEmail"}
                                Label={Lang?.AUTH_PAGE?.INPUTS?.EMAIL}
                                placeholder={Lang?.AUTH_PAGE?.INPUTS?.EMAIL}
                                Value={State.UserEmail}
                                OnChange={(e) => OnChange("UserEmail", e.target.value)}
                            />
                        </GridItem>
                        <GridItem colSpan={Spans}>
                            <SelectField
                                Name="UserJobTitle"
                                Id="UserJobTitle"
                                Label={Lang?.AUTH_PAGE?.INPUTS?.JOB_TITLE}
                                Options={Lang?.DASHBOARD_PAGE?.OPTIONS?.JOB_TITLE}
                                Value={State?.UserJobTitle}
                                OnChange={(e) => OnChange("UserJobTitle", e.target.value)}
                            />
                        </GridItem>
                        <GridItem colSpan={Spans}>
                            <PhoneInput
                                Name="UserPhoneNumber"
                                Id="UserPhoneNumber"
                                Label={Lang?.AUTH_PAGE?.INPUTS?.PHONE_NUMBER}
                                Value={State.UserPhoneNumber}
                                OnChange={(e) => OnChange("UserPhoneNumber", e.target.value)}
                                IsAuth={false}
                            />
                        </GridItem>
                        <GridItem colSpan={Spans.base}>
                            <Flex alignItems={"center"} gap={2}>
                                {Sections &&
                                    Sections?.map((Sec) => {
                                        const isSelected = State.UserSections?.find(
                                            (x) => x.SectionKey == Sec.SectionKey
                                        );
                                        return (
                                            <Flex
                                                key={Sec.SectionId}
                                                p={1}
                                                w={"50%"}
                                                rounded={"lg"}
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                                gap={3}
                                                className="Shadow"
                                                cursor={"pointer"}
                                                onClick={() => handleSelectSection(Sec, isSelected)}
                                            >
                                                <Text>{Sec.SectionName}</Text>
                                                {isSelected && (
                                                    <Icon
                                                        as={FaCheck}
                                                        bg={"green"}
                                                        h={"1.5rem"}
                                                        w={"1.5rem"}
                                                        p={1}
                                                        rounded={"full"}
                                                    />
                                                )}
                                            </Flex>
                                        );
                                    })}
                            </Flex>
                        </GridItem>
                        {SectionData &&
                            SectionData?.map((Sec) => {
                                const CitySelectorName = Sec.label;
                                const IsSelectedSection = State.UserSections?.find(
                                    (x) => x.SectionKey == CitySelectorName
                                );
                                if (!IsSelectedSection) return null;
                                return (
                                    <GridItem
                                        colSpan={Spans}
                                        key={`CitySelector_${CitySelectorName}`}
                                    >
                                        <MultiSelect
                                            Name={CitySelectorName}
                                            Type={"City"}
                                            InitialData={Cities[Sec.value]}
                                            Selected={State[CitySelectorName]}
                                            OnChange={(e) =>
                                                OnChange(CitySelectorName, e.target.value)
                                            }
                                            Label={Lang?.AUTH_PAGE?.INPUTS?.CITY?.replace(
                                                "{{Key}}",
                                                Sec.ViewLabel
                                            )}
                                            IsShow={IsSelectedSection ? true : false}
                                            Rtl={Rtl}
                                        />
                                    </GridItem>
                                );
                            })}
                        <GridItem colSpan={State.UserSections?.length > 1 ? Spans.base : Spans}>
                            <InputField
                                Type="password"
                                Name="UserPassword"
                                Id={"UserPassword"}
                                Label={Lang?.AUTH_PAGE?.INPUTS?.PASSWORD}
                                placeholder={Lang?.AUTH_PAGE?.INPUTS?.PASSWORD}
                                Value={State.UserPassword}
                                OnChange={(e) => OnChange("UserPassword", e.target.value)}
                            />
                        </GridItem>
                    </Grid>
                </ModalBody>
                <ModalFooter gap={2} justifyContent={"center"}>
                    <Button
                        colorScheme="blue"
                        onClick={OnClose}
                        _hover={{
                            bg: "blue.700",
                            color: "white"
                        }}
                        className="Shadow"
                        transition={".5s ease-in-out"}
                    >
                        {Lang?.CLOSE}
                    </Button>
                    <Button
                        type="submit"
                        color={"white"}
                        bg={NextBtn.Bg}
                        isLoading={isLoading}
                        _hover={{ backgroundColor: NextBtn.Bg }}
                        isDisabled={isLoading || NextBtn.IsDisabled}
                        transition={".5s ease-in-out"}
                    >
                        {Lang?.SUBMIT}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
