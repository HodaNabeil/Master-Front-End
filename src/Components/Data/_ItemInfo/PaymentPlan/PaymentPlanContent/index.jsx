import { Box, Flex, Text } from "@chakra-ui/react";
import PaymentPlanItem from "../PaymentPlanItem";
import { useEffect } from "react";

export default function PaymentPlanContent({
    SelectedPayPlan = null,
    OnSelctPayPlan = () => {},
    Options = [],
    IsDark,
    Lang,
    dirction = "row",
    height = {
        Card: "6.7rem",
        Text: "1.5rem"
    },
    ...rest
}) {
    useEffect(() => {
        if (Options.length > 0) {
            OnSelctPayPlan(Options[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Options]);
    const DirctionStyle =
        dirction == "row"
            ? {
                  columnGap: "1",
                  flexWrap: "nowrap",
                  overflowX: Options?.length > 0 ? "auto" : "hidden",
                  maxH: "18.5rem",
                  h: height.Card
              }
            : {
                  rowGap: "1",
                  flexWrap: "wrap",
                  overflowY: Options?.length > 0 ? "auto" : "hidden",
                  maxH: "50rem"
              };
    return (
        <div>
            <Box {...rest}>
                <Flex
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    w={"100%"}
                    px={2}
                    h={height.Text}
                >
                    <Text fontWeight={"bold"} fontSize={"1.2rem"}>
                        {Lang?.DATA_PAGE?.ACTIONS?.PAYMENT_PLAN || "Payment Plans"}
                    </Text>
                    <Text fontWeight={"bold"} fontSize={"0.9rem"}>
                        <Text as={"span"} color={"red"}>
                            {" "}
                            {Lang?.DATA_PAGE?.ACTIONS?.PAY_PLAN_NOTE_HEAD || "ملاحظات : "}
                        </Text>{" "}
                        {Lang?.DATA_PAGE?.ACTIONS?.PAY_PLAN_NOTE ||
                            "يرجى العلم أن الأسعار الحالية بعد الخصم"}
                    </Text>
                </Flex>
                <Flex
                    justifyContent={Options?.length > 2 ? "space-between" : "start"}
                    sx={{
                        "&::-webkit-scrollbar": {
                            width: "5px"
                        }
                    }}
                    {...DirctionStyle}
                >
                    {Options?.length > 0 ? (
                        Options.map((item) => {
                            const { PayPlanId } = item;
                            return (
                                <PaymentPlanItem
                                    key={PayPlanId}
                                    OnSelect={() => OnSelctPayPlan(item)}
                                    Lang={Lang}
                                    Item={item}
                                    IsActive={PayPlanId == SelectedPayPlan?.PayPlanId}
                                    IsDark={IsDark}
                                />
                            );
                        })
                    ) : (
                        <Text textAlign={"center"} fontSize={"1.5rem"} w={"100%"}>
                            {Lang?.NO_DATA}
                        </Text>
                    )}
                </Flex>
            </Box>
        </div>
    );
}
