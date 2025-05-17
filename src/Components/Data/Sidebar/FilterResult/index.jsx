import { ThemeColors } from "@/Utility";
import { Flex, Icon, Text, useColorMode } from "@chakra-ui/react";
import { BsCheck2Circle } from "react-icons/bs";

export default function FilterResult({
    Result = [
        {
            Label: "From",
            Value: 1,
            HandleFont: false
        },
        {
            Label: "To",
            Value: 2,
            HandleFont: false
        }
    ],
    Name = ""
}) {
    const { colorMode } = useColorMode();
    if (Result?.length === 0) return null;
    return (
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
            bg={ThemeColors.CardResultOptionsBgColor[colorMode]}
            borderRadius="3px"
            maxH={"15rem"}
            overflow={"auto"}
        >
            {Result && Result?.map((item, index) => {
                return (
                    <Flex
                        key={`${Name}_${index}`}
                        alignItems={"center"}
                        gap={{
                            base: "2px",
                            lg: "6px"
                        }}
                    >
                        {item.Label && (
                            <Text
                                fontWeight={"bold"}
                                color={ThemeColors.NavIconColor[colorMode]}
                                fontSize={"15px"}
                            >
                                {item.Label}
                            </Text>
                        )}
                        <Flex alignItems={"center"} gap={"4px"}>
                            <Icon
                                as={BsCheck2Circle}
                                color={ThemeColors.ActiveStateColor[colorMode]}
                                fontSize={{
                                    base: "10px",
                                    sm: "12px",
                                    md: "14px"
                                }}
                            />
                            <Text
                                fontWeight={"normal"}
                                fontSize={{
                                    base: "12px",
                                    sm: item?.HandleFont ? "11px" : "12px",
                                    md: item?.HandleFont ? "11px" : "13px",
                                    lg: item?.HandleFont ? "14px" : "14px"
                                }}
                                color={ThemeColors.NavIconColor[colorMode]}
                            >
                                {item.Value}
                            </Text>
                        </Flex>
                    </Flex>
                );
            })}
        </Flex>
    );
}
