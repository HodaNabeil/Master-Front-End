import { SelectField } from "@/Common";
import { Button, Flex } from "@chakra-ui/react";
import { useMemo } from "react";

export default function CompaniesFilter({
    SecttionsOptions = [],
    CityOptions = [],
    IsAllSelected = false,
    IsLoading = false,
    OnChange = () => {},
    OnReset = () => {},
    OnSave = () => {},
    State,
    Lang,
    Rtl = false
}) {
    const SecKey = useMemo(() => {
        let Sec = SecttionsOptions?.find((Sec) => Sec.Value == State?.SectionId);
        return Sec?.Name;
    }, [SecttionsOptions, State?.SectionId]);
    return (
        <Flex
            alignItems={"center"}
            justifyContent={"center"}
            gap={"2"}
            dir={Rtl ? "rtl" : "ltr"}
            px={{ base: 2, md: 0 }}
            flexDir={{
                base: "column",
                md: "row"
            }}
        >
            <Flex
                gap={2}
                w={{
                    base: "100%",
                    md: "50%"
                }}
            >
                <Button
                    variant={"outline"}
                    className="Shadow"
                    type="button"
                    bg={"red.500"}
                    _hover={{ bg: "red.600" }}
                    h={8}
                    w={"100%"}
                    py={3}
                    onClick={() => OnReset(State)}
                    isLoading={IsLoading}
                    isDisabled={IsLoading}
                >
                    {Lang?.RESET_SECTION?.replace("{{Section}}", SecKey)}
                </Button>
                <SelectField
                    Options={SecttionsOptions}
                    Value={State?.SectionId || ""}
                    OnChange={(e) => OnChange("SectionId", e.target.value)}
                    Size="sm"
                    dir={"ltr"}
                />
                <SelectField
                    Options={CityOptions}
                    Value={State?.CityId || ""}
                    OnChange={(e) => OnChange("CityId", e.target.value)}
                    Size="sm"
                    dir={"ltr"}
                />
            </Flex>
            <Flex gap={2}>
                <Button
                    variant={"outline"}
                    className="Shadow"
                    type="button"
                    h={8}
                    py={3}
                    bg={"green.500"}
                    _hover={{ bg: "green.600" }}
                    onClick={() => OnSave(State, "Save")}
                    isLoading={IsLoading}
                    isDisabled={IsLoading}
                >
                    {Lang?.SAVE}
                </Button>
                <Button
                    variant={"outline"}
                    className="Shadow"
                    type="button"
                    h={8}
                    py={3}
                    bg={"blue.500"}
                    _hover={{ bg: "blue.600" }}
                    onClick={() => OnSave(State, "All")}
                    isLoading={IsLoading}
                    isDisabled={IsLoading}
                >
                    {IsAllSelected ? Lang?.UNSELECT_ALL : Lang?.SELECT_ALL}
                </Button>
            </Flex>
        </Flex>
    );
}
