import { Box, Divider, Flex, Text } from "@chakra-ui/react";

export default function PaymentPlanItem({
    Lang,
    Item = null,
    IsActive = false,
    IsDark = true,
    OnSelect = () => {},
    ...rest
}) {
    if (!Item) return null;
    const ValueColor = IsActive ? "" : "#2fe3ee";
    const LabelColor = IsActive ? "#0e2b3c" : "";
    const BoxBg = IsActive ? "green.500" : IsDark ? "#0c2c3e" : "#5e8faa";
    const { PayPlanAllBulks, PayPlanDwonPayment, PayPlanInstalment, PayPlanType, PayPlanDiscount } =
        Item || {};
    const PrepareDiscount =
        PayPlanDiscount < 101 ? `- (${PayPlanDiscount * 100}%)` : `${PayPlanDiscount}`;
    return (
        <Flex
            minW={"15rem"}
            w={"15rem"}
            bg={BoxBg}
            rounded={"lg"}
            p={1}
            border={IsActive ? "2px solid " : ""}
            onClick={IsActive ? void 0 : OnSelect}
            h={"6rem"}
            cursor={"pointer"}
            {...rest}
        >
            <Flex
                justifyContent={"center"}
                textAlign={"center"}
                flexDir={"column"}
                fontSize={"0.8rem"}
                fontWeight={"bold"}
                h={"100%"}
                w={"45%"}
                color={LabelColor}
            >
                <Text as={"span"} lineHeight={"0.9rem"}>
                    {PayPlanDwonPayment * 100} %
                </Text>
                <Text as={"span"} lineHeight={"0.9rem"}>
                    {Lang?.DATA_PAGE?.LABELS?.DOWN_PAYMENT || "Down Payment"}
                </Text>
                <Text as={"span"} lineHeight={"0.9rem"}>
                    {PayPlanInstalment} {Lang?.PUBLIC?.WORDS?.YEARS || "Years"}
                </Text>
                <Text as={"span"} lineHeight={"0.9rem"}>
                    {Lang?.DATA_PAGE?.PAY_PALN_TYPES?.[PayPlanType] || ""}
                </Text>
            </Flex>
            <Divider orientation="vertical" borderWidth={"1px"} mx={1} borderColor={LabelColor} />
            <Box
                display={"flex"}
                justifyContent={PayPlanAllBulks?.length < 100 ? "center" : "start"}
                flexDir={"column"}
                fontSize="0.7rem"
                textAlign={"left"}
                overflowY={"auto"}
                overflowX={"hidden"}
                color={ValueColor}
                maxH={"5.5rem"}
                dir={"ltr"}
                h={"100%"}
                w={"55%"}
                sx={{
                    "&::-webkit-scrollbar": {
                        width: "5px"
                    }
                }}
                px={0}
            >
                {PayPlanAllBulks != "0" &&
                    PayPlanAllBulks?.trim()
                        ?.split("~")
                        ?.map((item, index) => (
                            <Text key={index} whiteSpace={"warp"} as={"span"}>
                                {item}
                            </Text>
                        ))}
                <Text whiteSpace={"warp"} as={"span"}>
                    {PrepareDiscount} Discount
                </Text>
            </Box>
        </Flex>
    );
}
