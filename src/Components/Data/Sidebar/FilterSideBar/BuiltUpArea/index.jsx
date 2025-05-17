import { Collapse } from "@/Common";
import TypeFilter from "../TypeFilter";
import { Helper, ThemeColors } from "@/Utility";
import { Box, Flex, Input, Text, useDisclosure } from "@chakra-ui/react";
import { BsCheck2Circle } from "react-icons/bs";

const BuiltUpArea = ({ OnToggleTab, OnChange, colorMode, State, Lang, Tabs }) => {
    const { isOpen, onToggle } = useDisclosure();
    return (
        <Box pt={"10px"}>
            <TypeFilter
                text={Lang?.SIDEBAR?.LABEL?.BUILT_UP_AREA || "Built Up Area"}
                isOpen={isOpen}
                onToggle={onToggle}
                Name={"BuiltUpArea"}
                OnToggleTab={OnToggleTab}
                Tabs={Tabs}
            />
            <Collapse IsOpen={isOpen}>
                <Flex
                    p="2px"
                    // py={"8px"}
                    alignItems={"center"}
                    gap={"10px"}
                >
                    <Box>
                        <Text
                            fontWeight={"medium"}
                            fontSize={".9rem"}
                            pb={"2px"}
                            color={
                                colorMode == "dark"
                                    ? ThemeColors.SecoendColor.dark
                                    : ThemeColors.SecoendColor.light
                            }
                        >
                            {Lang?.FROM}
                        </Text>
                        <Input
                            mb="6px"
                            size="sm"
                            borderRadius={"6px"}
                            value={Helper.NumberWithCommas(State.DataBuiltUpAreaFrom)}
                            onChange={(e) =>
                                OnChange({
                                    Name: "DataBuiltUpAreaFrom",
                                    Value: e.target.value
                                })
                            }
                            type="text"
                        />
                    </Box>
                    <Box>
                        <Text
                            fontWeight={"medium"}
                            fontSize={".9rem"}
                            pb={"2px"}
                            color={ThemeColors.SecoendColor[colorMode]}
                        >
                            {Lang?.TO}
                        </Text>
                        <Input
                            type="text"
                            mb="6px"
                            size="sm"
                            borderRadius={"6px"}
                            value={Helper.NumberWithCommas(State.DataBuiltUpAreaTo)}
                            onChange={(e) =>
                                OnChange({
                                    Name: "DataBuiltUpAreaTo",
                                    Value: e.target.value
                                })
                            }
                        />
                    </Box>
                </Flex>
            </Collapse>
            {/* """""""""""" */}
            {(State?.DataBuiltUpAreaFrom || State?.DataBuiltUpAreaTo) && !isOpen && (
                <Flex
                    my={"6px"}
                    alignItems={"center"}
                    justifyContent={{
                        base: "space-between",
                        lg: "initial"
                    }}
                    gap={{
                        lg: "20px"
                    }}
                    p={{
                        base: "2px",
                        md: "6px"
                    }}
                    border="1px solid  #ffffff36 !important"
                    bg={
                        colorMode === "dark"
                            ? ThemeColors.CardResultOptionsBgColor.dark
                            : ThemeColors.CardResultOptionsBgColor.light
                    }
                    borderRadius="3px"
                >
                    {State?.DataBuiltUpAreaFrom && (
                        <Flex
                            alignItems={"center"}
                            gap={{
                                base: "2px",
                                lg: "6px"
                            }}
                        >
                            <Text
                                fontWeight={"bold"}
                                color={
                                    colorMode === "dark"
                                        ? ThemeColors.NavIconColor.dark
                                        : ThemeColors.NavIconColor.light
                                }
                                fontSize={"15px"}
                            >
                                {Lang?.FROM}
                            </Text>

                            {/* ================================ From ================================================== */}
                            <Flex alignItems={"center"} gap={"4px"}>
                                <Box as="span">
                                    <BsCheck2Circle
                                        color={
                                            colorMode == "dark"
                                                ? ThemeColors.ActiveStateColor.dark
                                                : ThemeColors.ActiveStateColor.light
                                        }
                                        style={{
                                            fontSize: {
                                                base: "10px",
                                                sm: "12px",
                                                md: "13px"
                                            }
                                        }}
                                    />
                                </Box>

                                <Box
                                    as="span"
                                    fontWeight={"normal"}
                                    style={{
                                        color:
                                            colorMode == "dark"
                                                ? ThemeColors.NavIconColor.dark
                                                : ThemeColors.NavIconColor.light
                                    }}
                                >
                                    {State?.DataBuiltUpAreaFrom}
                                </Box>
                            </Flex>
                        </Flex>
                    )}

                    {/* """"""""""""""""""""""""""""""" To """"""""""""""""""""""""""""""""""" */}

                    {State?.DataBuiltUpAreaTo && (
                        <Flex
                            alignItems={"center"}
                            gap={{
                                base: "2px",
                                lg: "6px"
                            }}
                        >
                            <Text
                                fontWeight={"bold"}
                                color={
                                    colorMode === "dark"
                                        ? ThemeColors.NavIconColor.dark
                                        : ThemeColors.NavIconColor.light
                                }
                                fontSize={"15px"}
                            >
                                {Lang?.TO}
                            </Text>

                            <Flex alignItems={"center"} gap={"4px"}>
                                <Box as="span">
                                    <BsCheck2Circle
                                        color={
                                            colorMode == "dark"
                                                ? ThemeColors.ActiveStateColor.dark
                                                : ThemeColors.ActiveStateColor.light
                                        }
                                        style={{
                                            fontSize: {
                                                base: "10px",
                                                sm: "12px",
                                                md: "13px"
                                            }
                                        }}
                                    />
                                </Box>
                                <Box
                                    as="span"
                                    // ======================================= Media =======================================================

                                    fontWeight={"normal"}
                                    style={{
                                        color:
                                            colorMode == "dark"
                                                ? ThemeColors.NavIconColor.dark
                                                : ThemeColors.NavIconColor.light
                                    }}
                                >
                                    {State?.DataBuiltUpAreaTo}
                                </Box>
                            </Flex>
                        </Flex>
                    )}
                </Flex>
            )}
        </Box>
    );
};

export default BuiltUpArea;
