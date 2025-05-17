import { Helper } from "@/Utility";
import { Flex, Text } from "@chakra-ui/react";
import { useMemo } from "react";

export default function ROIContent({ LeftBg, RightBg, Lang, ...rest }) {
    const Cels = useMemo(() => {
        const {
            UnitPriceDelivery,
            UnitPriceAfterInstalmentYears,
            AmountPaidDelivery,
            AmountPaidAfterDelivery,
            TotalRentAfterDelivery,
            NetRentInstalmentAfterDelivery,
            TotalRevenue,
            NetProfit,
            TotalEquityPaid,
            UnitPVatPurchasing,
            UnitPVafterInstalment,
            EquityPVatPurchasing,
            ROI,
            ROE,
            IRR,
            Leverage,
            PaybackPeriodFromRentafterDelivery,
            ROINPV,
            ROENPV
        } = Lang?.DATA_PAGE?.LABELS || {};
        return [
            {
                Label: UnitPriceDelivery || "Unit Price @ Delivery",
                Value: "-"
                // Value: Helper.NumberWithCommas(8788000)
            },
            {
                Label:
                    UnitPriceAfterInstalmentYears ||
                    "Unit Price After Instalment Years ( Appreciation )",
                Value: "-"
                // Value: Helper.NumberWithCommas(21867356)
            },
            {
                Label: AmountPaidDelivery || "Amount Paid @ Delivery",
                Value: "-"
                // Value: Helper.NumberWithCommas(2000000)
            },
            {
                Label: AmountPaidAfterDelivery || "Amount Paid After Delivery",
                Value: "-"
                // Value: Helper.NumberWithCommas(2000000)
            },
            {
                Label: TotalRentAfterDelivery || "Total Rent After Delivery",
                Value: "-"
                // Value: Helper.NumberWithCommas(4394000)
            },
            {
                Label: NetRentInstalmentAfterDelivery || "Net Rent - Instalment After Delivery",
                Value: "-"
                // Value: Helper.NumberWithCommas(2349000)
            },
            {
                Label: TotalRevenue || "Total Revenue",
                Value: "-"
                // Value: Helper.NumberWithCommas(24261356)
            },
            {
                Label: NetProfit || "Net Profit",
                Value: "-"
                // Value: Helper.NumberWithCommas(22261356)
            },
            {
                Label: TotalEquityPaid || "Total Equity Paid",
                Value: "-"
                // Value: Helper.NumberWithCommas(22261356)
            },
            {
                Label: UnitPVatPurchasing || "Unit PV at Purchasing",
                Value: "-"
                // Value: Helper.NumberWithCommas(2000000)
            },
            {
                Label: UnitPVafterInstalment || "Unit PV after Instalment",
                Value: "-"
                // Value: Helper.NumberWithCommas(5058648)
            },
            {
                Label: EquityPVatPurchasing || "Equity PV at Purchasing",
                Value: "-"
                // Value: Helper.NumberWithCommas(1676870)
            },
            {
                Label: ROI || "ROI",
                Value: "-",
                // Value: "557%",
                spcial: true
            },
            {
                Label: ROE || "ROE",
                Value: "-",
                // Value: "1113%",
                spcial: true
            },
            {
                Label: IRR || "IRR",
                Value: "-",
                // Value: "1395",
                spcial: true
            },
            {
                Label: Leverage || "Leverage",
                Value: "-",
                // Value: "2,00",
                spcial: true
            },
            {
                Label:
                    PaybackPeriodFromRentafterDelivery || "Payback Period From Rent after Delivery",
                Value: "-",
                // Value: 5,
                spcial: true
            },
            {
                Label: ROINPV || "ROI - NPV",
                Value: "-",
                // Value: "78%",
                spcial: true
            },
            {
                Label: ROENPV || "ROE - NPV",
                Value: "-",
                // Value: "203%",
                spcial: true
            }
        ];
    }, [Lang?.DATA_PAGE?.LABELS]);
    let GlobalStyle = {
        gap: 0.5,
        py: 1
    };
    return (
        <Flex
            bg={LeftBg}
            rounded={"2xl"}
            h={"100%"}
            w={"100%"}
            fontWeight={"bold"}
            justifyContent={"space-between"}
            overflowY={"auto"}
            maxH={"40rem"}
            border={"2px solid"}
            {...rest}
        >
            <Flex
                flexDir={"column"}
                justifyContent={"space-between"}
                // p={2}
                h={"100%"}
                gap={GlobalStyle.gap}
                px={"1rem"}
            >
                {Cels.map((item, index) => {
                    return (
                        <Text as={"span"} key={index} py={GlobalStyle.py}>
                            {item.Label}
                        </Text>
                    );
                })}
            </Flex>
            <Flex
                flexDir={"column"}
                justifyContent={"space-between"}
                h={"100%"}
                rounded={"xl"}
                textAlign={"center"}
                w={"25%"}
                bg={RightBg}
                border={"2px solid"}
                gap={GlobalStyle.gap}
            >
                {Cels.map((item, index) => {
                    const { spcial, Value } = item || {};
                    return (
                        <Text
                            as={"span"}
                            key={index}
                            bg={spcial ? "#00ed27" : ""}
                            color={spcial ? "black" : ""}
                            w={spcial ? "100%" : ""}
                            mx={"auto"}
                            // rounded={"lg"}
                            py={GlobalStyle.py}
                        >
                            {Value}
                        </Text>
                    );
                })}
            </Flex>
        </Flex>
    );
}
