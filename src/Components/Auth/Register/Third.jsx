import { MultiSelect, SelectField } from "@/Common";
import { Validation } from "@/Utility";
import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";

const ThirdRegistration = ({
    Lang,
    setActiveStep,
    HandleChange,
    state,
    HandleSubmit,
    IsLoading,
    Rtl
}) => {
    const { City } = useSelector((state) => state.Public);
    const SectionData = useMemo(() => {
        return Lang?.DATA_PAGE?.TABS?.SECTIONS ? Lang?.DATA_PAGE?.TABS?.SECTIONS : [];
    }, [Lang?.DATA_PAGE?.TABS?.SECTIONS]);
    const Cities = useMemo(() => {
        const CitiesData = {};
        SectionData?.map((Sec) => {
            CitiesData[Sec.label] = [];
            City?.map((city) => {
                CitiesData[Sec.label].push({
                    CityId: city.CityId,
                    CityName: city.CityName,
                    CitySectionId: Sec.value,
                    Icon: <FaCheck />
                });
            });
        });
        return CitiesData;
    }, [City, SectionData]);
    const Sections = useMemo(() => {
        return SectionData?.map((section) => ({
            SectionName: section.ViewLabel,
            SectionKey: section.label,
            SectionId: section.value
        }));
    }, [SectionData]);
    const NextBtn = useMemo(() => {
        const DataToReturn = {
            IsDisabled: false,
            Bg: "green.600"
        };
        let errors = Validation.Register(state, Lang);
        errors = errors.map((err) => {
            if (err.includes(".")) {
                const Key = err.split(".")[1];
                const LangKey = Sections.find((x) => x.SectionKey == Key);
                return Lang?.VALIDATION?.SECTION_IS_EMPTY?.replaceAll(
                    "{{Key}}",
                    LangKey?.SectionName
                );
            }
            return Lang?.VALIDATION[err];
        });
        if (errors.length > 0) {
            DataToReturn.IsDisabled = true;
            DataToReturn.Bg = "red.700";
        }
        return {
            ...DataToReturn,
            Errors: errors
        };
    }, [Lang, Sections, state]);
    const handleSelectSection = (Value, IsSelected = false) => {
        let NewData = IsSelected
            ? state.UserSections?.filter((item) => item?.SectionId != Value?.SectionId)
            : [...state.UserSections, Value];
        HandleChange({
            target: {
                name: "UserSections",
                value: NewData
            }
        });
    };
    return (
        <form onSubmit={(e) => HandleSubmit(e, "Register", state)}>
            {NextBtn.Errors?.map((Err) => (
                <Text color="red.500" key={Err} dir={Rtl ? "rtl" : "ltr"}>
                    ※ {Err}
                </Text>
            ))}
            <Box
                dir={Rtl ? "rtl" : "ltr"}
                // h={2}
                py={1}
            >
                {Lang?.AUTH_PAGE?.INPUTS?.SECTION}
            </Box>
            <Flex alignItems={"center"} gap={2}>
                {Sections &&
                    Sections?.map((Sec) => {
                        const isSelected = state.UserSections?.find(
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
            {SectionData &&
                SectionData?.map((Sec) => {
                    const CitySelectorName = Sec.label;
                    const IsSelectedSection = state.UserSections?.find(
                        (x) => x.SectionKey == CitySelectorName
                    );
                    return (
                        <MultiSelect
                            key={`CitySelector_${CitySelectorName}`}
                            Name={CitySelectorName}
                            Type={"City"}
                            InitialData={Cities[CitySelectorName]}
                            Selected={state[CitySelectorName]}
                            OnChange={HandleChange}
                            Label={Lang?.AUTH_PAGE?.INPUTS?.CITY?.replace("{{Key}}", Sec.ViewLabel)}
                            IsShow={IsSelectedSection ? true : false}
                            Rtl={Rtl}
                        />
                    );
                })}
            <SelectField
                Id="Plan"
                Label={Lang?.AUTH_PAGE?.INPUTS?.PLAN}
                Value={state.UserPlan}
                OnChange={HandleChange}
                Name="UserPlan"
                Options={Lang?.AUTH_PAGE?.OPTIONS?.PLAN}
                color="white"
                bg="#030625"
                _hover={{ bg: "#0f133d" }}
                IsAuth={true}
            />
            <Flex justifyContent="space-between" my="10px">
                <Button onClick={() => setActiveStep("SecondRegistration")}>{Lang?.PREV}</Button>
                <Button
                    type="submit"
                    color="white"
                    bg={NextBtn.Bg}
                    size="md"
                    _hover={{ backgroundColor: NextBtn.Bg }}
                    isLoading={IsLoading}
                    isDisabled={NextBtn.IsDisabled || IsLoading}
                >
                    {Lang?.AUTH_PAGE?.BUTTONS?.Register}
                </Button>
            </Flex>
        </form>
    );
};

export default ThirdRegistration;
