import { Box, Flex, Text } from "@chakra-ui/react";

export default function LeftCard({ LeftBg, RightBg, Lang, PublicProps, ...rest }) {
    return (
        <Flex
            bg={LeftBg}
            rounded={"xl"}
            w={"35%"}
            fontWeight={"bold"}
            justifyContent={"space-between"}
            h={"max-content"}
            maxH={"8rem"}
            {...rest}
        >
            <Box {...PublicProps}>
                <Text>{Lang?.SIDEBAR?.LABEL?.YEARS || "Installmnt Years"}</Text>
                <Text>{Lang?.SIDEBAR?.LABEL?.DELIVERY || "Delivery"} %</Text>
            </Box>
            <Box bg={RightBg} rounded={"xl"} textAlign={"center"} w={"40%"} {...PublicProps}>
                <Text>-</Text>
                <Text>-</Text>
            </Box>
        </Flex>
    );
}
