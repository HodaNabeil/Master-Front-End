import { Helper } from "@/Utility";
import { Flex, Input, InputGroup, InputRightAddon, Text } from "@chakra-ui/react";
import { useMemo } from "react";

export default function MidHeroButtons({
    Lang,
    State,
    TotalPrice,
    CapRate,
    setTotalPrice = () => {},
    setCapRate = () => {}
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
            setCapRate(ValueToPresent);
        };
        Helper.HandlePayPlanDiscount(CapRate, TotalPrice, State.Bua);
        return [
            {
                Label: Lang?.DATA_PAGE?.LABELS?.TotalUnitPrice || "Total Unit Price",
                Value: Helper.NumberWithCommas(TotalPrice),
                Bg: "",
                Color: "#e8e76b",
                Type: "TotalPrice",
                OnChange: OnChangeTotalPrice,
                Extra: false
            },
            {
                Label: Lang?.DATA_PAGE?.LABELS?.CapRate || "CAP Rate",
                Value: CapRate * 100,
                Bg: "",
                Color: "#e8e76b",
                Type: "Discount",
                OnChange: OnChangeDiscount,
                Extra: "%"
            },
            {
                Label: Lang?.DATA_PAGE?.LABELS?.OperatingTime || "Operating Time",
                Value: CapRate * 100,
                Bg: "",
                Color: "#e8e76b",
                Type: "Discount",
                OnChange: OnChangeDiscount,
                Extra: Lang?.PUBLIC?.WORDS?.YEARS || "Years"
            }
        ];
    }, [
        CapRate,
        Lang?.DATA_PAGE?.LABELS?.CapRate,
        Lang?.DATA_PAGE?.LABELS?.OperatingTime,
        Lang?.DATA_PAGE?.LABELS?.TotalUnitPrice,
        Lang?.PUBLIC?.WORDS?.YEARS,
        State.Bua,
        TotalPrice,
        setCapRate,
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
                            w={"7rem"}
                            textAlign={"center"}
                            bg={item.Bg}
                            color={item.Color}
                            fontSize={"0.7rem"}
                            whiteSpace={"nowrap"}
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
                                w={"10rem"}
                                dir="ltr"
                                h={"2rem"}
                                justifyContent={"space-between"}
                            >
                                <Input
                                    variant={"flushed"}
                                    type="text"
                                    rounded={"full"}
                                    value={item.Value || ""}
                                    onChange={OnChange}
                                    fontSize={"0.8rem"}
                                    w={"100%"}
                                    textAlign={"center"}
                                    border={"none"}
                                    h={"2rem"}
                                />
                                {Extra && (
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
                                )}
                            </InputGroup>
                        ) : (
                            <Text
                                rounded={"full"}
                                border={"1px solid"}
                                py={2}
                                px={3}
                                w={"10rem"}
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
