import { ThemeColors } from "@/Utility";
import { Box, Checkbox, Flex, Input, Text, useColorMode } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

const CustomMultiCheckBox = ({
    Name,
    Value = "",
    Options = [],
    OnChange = () => {},
    IsMulti = false, // false => object , true => array of objects
    // IsClearable = false, // true => Show Clear All Selected Button
    IsRequired = false, // True => DisAllow Empty Or Null Value
    AllowFilter = false,
    DirectionRow = false,
    BgActive = true,
    Lang,
    MaxH="12rem"
}) => {
    const { Rtl } = useSelector((state) => state.Helper);
    const { colorMode } = useColorMode();
    const [Search, setSearch] = useState("");
    const HandleSelect = (Option, IsSelected) => {
        let NewData = Option;
        if (IsMulti) {
            NewData = IsSelected
                ? Value?.filter((old) => old.value != Option.value)
                : [...Value, Option];
            if (IsRequired && NewData.length == 0) return;
        } else if (!IsMulti && IsSelected) {
            if(IsRequired) return;
            NewData = "";
        }
        OnChange({
            Name,
            Value: NewData
        });
    };
    const IsSelected = (Option) => {
        if (!IsMulti) return Value ? Value?.value == Option?.value : false;
        return Value ? (Value.find((Item) => Item.value == Option?.value) ? true : false) : false;
    };
    const ValidateOptions = useMemo(() => {
        if (!Options || Options?.length == 0) return [];
        return Options?.filter((Item) => {
            return Item?.label
                ?.toString()
                ?.toLowerCase()
                ?.includes(Search?.toString()?.toLowerCase());
        });
    }, [Options, Search]);
    const DirProps = Rtl
        ? {
              pr: DirectionRow ? 0 : 1.5
          }
        : {
              pl: DirectionRow ? 0 : 1.5
          };
    return (
        <>
            {AllowFilter && Options?.length > 0 && (
                <Box py="8px" px={"10px"}>
                    <Input
                        type="text"
                        placeholder="search ..."
                        value={Search}
                        onChange={(e) => setSearch(e.target.value)}
                        display={"block"}
                        w={"100%"}
                        size={"sm"}
                        borderRadius={"6px"}
                        _placeholder={{
                            fontSize: "17px",
                            whiteSpace: "2px"
                        }}
                    />
                </Box>
            )}
            <Flex
                flexDirection={DirectionRow ? "row" : "column"}
                maxH={MaxH}
                overflowY={DirectionRow || ValidateOptions?.length < 7 ? "hidden" : "auto"}
                sx={{
                    "&::-webkit-scrollbar": {
                        width: "5px"
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#f0f0f0 ",
                        borderRadius: "10px", // optional: round edges
                        cursor: "pointer"
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "#0e2d3f"
                    } // scrollbar track color => transparent
                }}
                flexWrap={DirectionRow ? "nowrap" : "nowrap"}
                justifyContent={DirectionRow ? '"flex-start"' : ""}
                gap={1}
                w={"100%"}
                mt={1}
                {...DirProps}
            >
                {ValidateOptions?.length > 0 ? (
                    ValidateOptions?.map((Option) => {
                        const Key = `${Name}_Option_${Option.id}`;
                        const IsSelectedItem = IsSelected(Option);
                        return DirectionRow ? (
                            <Box
                                key={Key}
                                className={
                                    BgActive ? (IsSelectedItem ? "BgActive-Wrap" : " ") : null
                                }
                                // px={0}
                                py={0}
                                // py={".1rem"}
                                px={Option.id > 9 ? "0.5" : 1.5}
                                _hover={{
                                    bgGradient: IsSelectedItem
                                        ? ""
                                        : ThemeColors.SidebarElementBgColorHover[colorMode]
                                }}
                                color={"white"}
                                fontWeight={"extrabold"}
                                cursor={"pointer"}
                                fontSize={"clamp(.8rem,1vw,1rem)"}
                                onClick={() => HandleSelect(Option, IsSelectedItem)}
                                rounded={"md"}
                                border={"2px solid "}
                                borderColor={ThemeColors.CardResultBorderColor[colorMode]}
                                // borderColor={colorMode == "dark" ? (IsSelectedItem ? "#47bb77" : colorMode === "dark" ? "#344e5d" : "#8795a5") : "#8795a5"}
                            >
                                {Option.label}
                            </Box>
                        ) : (
                            <Flex
                                key={Key}
                                ml={"15px"}
                                zIndex={"5"}
                                transition={"all 0.3s"}
                                className={BgActive ? (IsSelectedItem ? "BgActive" : " ") : null}
                                cursor={"pointer"}
                                p={"0 .9rem"}
                                alignItems={"center"}
                                gap={2}
                                _hover={{
                                    bgGradient: ThemeColors.SidebarElementBgColorHover[colorMode]
                                }}
                                onClick={() => HandleSelect(Option, IsSelectedItem)}
                            >
                                <Checkbox
                                    key={Key}
                                    id={Key}
                                    size="md"
                                    p={0}
                                    isChecked={IsSelectedItem}
                                    borderColor={colorMode === "dark" ? "#344e5d" : "#8795a5"}
                                />
                                <Text fontSize={".8rem"} p={0} whiteSpace={"nowrap"}>
                                    {Option.label}
                                </Text>
                            </Flex>
                        );
                    })
                ) : (
                    <Box p="10px" w="100%">
                        {Lang?.NO_OPTIONS}
                    </Box>
                )}
            </Flex>
        </>
    );
};

export default CustomMultiCheckBox;
