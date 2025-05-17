import { Helper } from "@/Utility";
import { Flex, Input, InputGroup, InputRightAddon, Text } from "@chakra-ui/react";
import { useMemo } from "react";

export default function MidHeroButtons({
    Lang,
    State,
    TotalPrice,
    Discount,
    setTotalPrice = () => {},
    setDiscount = () => {}
}) {
    let Options = useMemo(() => {
        const OnChangeTotalPrice = (e) => {
            let Value = e.target.value;
            let NewData = Value;
            const val = Value.replace(/\D/g, "");
            const limitedValue = val.slice(0, 9);
            let FloatNumber = Helper.ConvertToFloat(limitedValue);
            if (isNaN(FloatNumber) && val !== "") return;
            NewData = !isNaN(FloatNumber) ? FloatNumber : "";
            // if (NewData < State.TotalPrice) NewData = State.TotalPrice ? State.TotalPrice : Value;
            setTotalPrice(NewData);
        };
        const OnChangeDiscount = (e) => {
            let Value = parseInt(e.target.value?.replace(/\D/g, ""));
            let ValueToPresent = Value ? Value / 100 : 0;
            if (ValueToPresent > 1) ValueToPresent = 1;
            setDiscount(ValueToPresent);
        };
        Helper.HandlePayPlanDiscount(Discount, TotalPrice, State.Bua);
        return [
            {
                Label: Lang?.DATA_PAGE?.LABELS?.OriginalPrice || "Original Price",
                Value: Helper.NumberWithCommas(TotalPrice),
                Bg: "",
                Color: "#e8e76b",
                Type: "TotalPrice",
                OnChange: OnChangeTotalPrice,
                Extra: Lang?.DATA_PAGE?.LE || "LE"
            },
            {
                Label: Lang?.DATA_PAGE?.LABELS?.OfferDiscount || "Offer Discount",
                Value: Discount * 100,
                Bg: "",
                Color: "#e8e76b",
                Type: "Discount",
                OnChange: OnChangeDiscount,
                Extra: "%"
            }
        ];
    }, [
        Discount,
        Lang?.DATA_PAGE?.LABELS?.OfferDiscount,
        Lang?.DATA_PAGE?.LABELS?.OriginalPrice,
        Lang?.DATA_PAGE?.LE,
        State.Bua,
        TotalPrice,
        setDiscount,
        setTotalPrice
    ]);
    return (
        <Flex flexDir={"column"} gap={2}>
            {Options.map((item, index) => {
                const { Type, Extra, OnChange } = item || {};
                return (
                    <Flex key={index} gap={1} alignItems={"center"} h={"2rem"}>
                        <Text
                            as={"span"}
                            rounded={"full"}
                            border={"1px solid"}
                            py={2}
                            px={1}
                            minW={"5rem"}
                            textAlign={"center"}
                            lineHeight={"1rem"}
                            bg={item.Bg}
                            color={item.Color}
                            fontSize={"0.7rem"}
                            whiteSpace={'nowrap'}
                        >
                            {item.Label}
                        </Text>
                        {Type ? (
                            <InputGroup
                                width={"100%"}
                                rounded={"full"}
                                bg={item.Bg}
                                color={item.Color}
                                border={"1px solid"}
                                minW={"9rem"}
                                dir="ltr"
                                h={"2rem"}
                                justifyContent={'space-between'}
                            >
                                <Input
                                    type="text"
                                    rounded={"full"}
                                    value={item.Value || ""}
                                    onChange={OnChange}
                                    fontSize={"0.8rem"}
                                    w={"auto"}
                                    maxW={"7rem"}
                                    variant={"flushed"}
                                    textAlign={"center"}
                                    border={"none"}
                                    h={"2rem"}
                                    lineHeight={"1rem"}
                                    />
                                <InputRightAddon
                                    px={1}
                                    bg={"transparent"}
                                    h={"2rem"}
                                    lineHeight={"1rem"}
                                    fontSize={"0.9rem"}
                                    rounded={"full"}
                                >
                                    {Extra}
                                </InputRightAddon>
                            </InputGroup>
                        ) : (
                            <Text
                                rounded={"full"}
                                border={"1px solid"}
                                py={2}
                                px={3}
                                minW={"9rem"}
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
                        )}
                    </Flex>
                );
            })}
        </Flex>
    );
}
