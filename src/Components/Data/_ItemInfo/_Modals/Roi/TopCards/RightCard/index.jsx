import { Box, Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function RightCard({ PublicProps, LeftBg, RightBg, Lang, ...rest }) {
    /*
    PriceApprecitionTD
    PriceApprecitionAD,
    DiscountRate
    */
    const { ROI } = useSelector((State) => State.Public);
    const { PriceApprecitionTD, PriceApprecitionAD, DiscountRate } = ROI || {};
    return (
        <Flex
            bg={LeftBg}
            rounded={"xl"}
            maxH={"8rem"}
            w={"50%"}
            fontWeight={"bold"}
            justifyContent={"space-between"}
            {...rest}
        >
            <Box {...PublicProps} whiteSpace={"nowrap"}>
                <Text>
                    {Lang?.DATA_PAGE?.LABELS?.PriceApprecitionTD ||
                        "Price Apprecition % Till Delivery"}
                </Text>
                <Text>
                    {Lang?.DATA_PAGE?.LABELS?.PriceApprecitionAD ||
                        "Price Apprecition % After Delivery"}
                </Text>
                <Text>{Lang?.DATA_PAGE?.LABELS?.DiscountRate || "Dicount Rate"}</Text>
            </Box>
            <Box
                bg={RightBg}
                rounded={"xl"}
                textAlign={"center"}
                w={"30%"}
                color={"#ffdc68"}
                {...PublicProps}
            >
                <Text>{PriceApprecitionTD ? `${PriceApprecitionTD} %` : "-"}</Text>
                <Text>{PriceApprecitionAD ? `${PriceApprecitionAD} %` : "-"}</Text>
                <Text>{DiscountRate ? `${DiscountRate} %` : "-"}</Text>
            </Box>
        </Flex>
    );
}
