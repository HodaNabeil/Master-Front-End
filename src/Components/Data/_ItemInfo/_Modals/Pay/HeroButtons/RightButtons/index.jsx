import { SiteLogo } from "@/Common";
import { Helper } from "@/Utility";
import { Flex, Text } from "@chakra-ui/react";
import { useMemo } from "react";

export default function RightHeroButtons({ Lang, State, TotalPrice, Discount }) {
    let Options = useMemo(() => {
        Helper.HandlePayPlanDiscount(Discount, TotalPrice, State.Bua);
        let FinelPrice = TotalPrice - TotalPrice * Discount;
        return [
            {
                Label: Lang?.DATA_PAGE?.LABELS?.FinalPrice || "Finel Price",
                Value: Helper.NumberWithCommas(FinelPrice?.toFixed(0)),
                Bg: "#19d204",
                Color: "#000",
                Extra: Lang?.DATA_PAGE?.LE || "LE"
            }
        ];
    }, [Lang, State, TotalPrice, Discount]);

    return (
        <Flex flexDir={"column"} gap={2} w={"15rem"}>
            <Flex justifyContent={"center"} w={"100%"}>
                <SiteLogo p={1} w={"100%"} rounded={"full"} h={"4.5rem"} />
            </Flex>
            {Options.map((item, index) => {
                const { Extra } = item || {};
                return (
                    <Flex key={index} gap={1} alignItems={"center"}>
                        <Text
                            as={"span"}
                            rounded={"full"}
                            border={"1px solid"}
                            py={2}
                            px={1}
                            h={"2rem"}
                            lineHeight={"1rem"}
                            minW={"7rem"}
                            textAlign={"center"}
                            bg={item.Bg}
                            color={item.Color}
                        >
                            {item.Label}
                        </Text>
                        <Text
                            rounded={"full"}
                            border={"1px solid"}
                            py={2}
                            px={1}
                            minW={"7rem"}
                            textAlign={"center"}
                            bg={item.Bg}
                            color={item.Color}
                            gap={1}
                            h={"2rem"}
                            lineHeight={"1rem"}
                        >
                            <span>{item.Value}</span>
                            {Extra && <span style={{ margin: "0 5px" }}>{Extra}</span>}
                        </Text>
                    </Flex>
                );
            })}
        </Flex>
    );
}
