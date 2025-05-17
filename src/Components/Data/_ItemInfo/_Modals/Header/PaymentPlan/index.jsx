import PaymentPlanContent from "../../../PaymentPlan/PaymentPlanContent";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    Flex,
    useColorMode,
    Text
} from "@chakra-ui/react";

export default function PaymentPlanPopver({
    SelectedPayPlan = null,
    setSelectedPayPlan = () => {},
    Options = [],
    ModelBg,
    LeftBg,
    Lang,
    ...rest
}) {
    const { colorMode } = useColorMode();
    const IsDark = colorMode == "dark";
    return (
        <Popover gutter={0} placement="bottom-start" trigger={"click"} closeOnBlur>
            <PopoverTrigger>
                <Flex
                    rounded={"full"}
                    px={3}
                    minW={"7rem"}
                    h={"2rem"}
                    lineHeight={"2rem"}
                    cursor={"pointer"}
                    justifyContent={"space-between"}
                    gap={1}
                    bg={LeftBg}
                >
                    <Text as={"span"} width={"100%"} textAlign={"center"} fontSize={"0.9rem"}>
                        {Lang?.DATA_PAGE?.ACTIONS?.PAYMENT_PLAN || "Payment Plans"}
                    </Text>
                    <span> ▼</span>
                </Flex>
            </PopoverTrigger>
            <PopoverContent
                transform={"translateX(-110%) scale(0.1)"}
                transition={".5s ease-in-out"}
                w={"50rem"}
                minH={"max-content"}
                bg={ModelBg}
                border={"4px solid"}
                rounded={"xl"}
            >
                <PopoverBody py={2} w={"50rem"} px={"2rem"}>
                    <PaymentPlanContent
                        OnSelctPayPlan={(PayPlan) => setSelectedPayPlan(PayPlan)}
                        SelectedPayPlan={SelectedPayPlan}
                        Options={Options}
                        IsDark={IsDark}
                        Lang={Lang}
                        dirction={"column"}
                        {...rest}
                    />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}
