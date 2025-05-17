import { Helper } from "@/Utility";
import { Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useCallback, useMemo } from "react";

export default function PriceList({
    Lang,
    IsDark,
    Item,
    Data = null,
    Finishing = null,
    SelectedPayPlan
}) {
    const { IsToday, IsYesTerday, Format } = Item?.DataDate || {};
    const THeadBg = IsDark ? "#0c2c3e" : "#5e8faa";
    const ProcessDate = useMemo(
        () =>
            IsToday
                ? Lang?.PUBLIC?.TODAY || "Today"
                : IsYesTerday
                ? Lang?.PUBLIC?.YESTERDAY || "Yesterday"
                : Format?.Date,
        [Format?.Date, IsToday, IsYesTerday, Lang?.PUBLIC?.TODAY, Lang?.PUBLIC?.YESTERDAY]
    );
    const THeadData = useMemo(() => {
        const LangFildes = Lang?.TABLES;
        let DataoReturn = [
            {
                Label: LangFildes?.Type || "Type",
                Sort: "",
                OrderBy: "Type"
            },
            {
                Label: LangFildes?.Bua || "Bua",
                Sort: "",
                OrderBy: "Bua"
            },
            {
                Label: LangFildes?.DataBedRooms || "Bedrooms",
                Sort: "",
                OrderBy: "DataBedRooms"
            },
            {
                Label: LangFildes?.InstallmentPrice || "Installment Price",
                Sort: "",
                OrderBy: "InstallmentPrice"
            },
            {
                Label: LangFildes?.CachPrice || "Cach Price",
                Sort: "",
                OrderBy: "CachPrice"
            },
            {
                Label: LangFildes?.Outdoor || "Outdoor",
                Sort: "",
                OrderBy: "Outdoor"
            },
            {
                Label: LangFildes?.DownPayment || "Down Payment",
                Sort: "",
                OrderBy: "DownPayment"
            },
            {
                Label: LangFildes?.Monthly || "Monthly",
                Sort: "",
                OrderBy: "Monthly"
            }
        ];
        return DataoReturn;
    }, [Lang?.TABLES]);

    const ProcessItems = useCallback(
        (TypeObj) => {
            if (!Array.isArray(TypeObj) || TypeObj.length === 0) {
                return {
                    Bua: ["-"],
                    Bedrooms: ["-"],
                    InstallmentPrice: ["-"],
                    CachPrice: ["-"],
                    DownPayment: ["-"],
                    Monthly: ["-"]
                };
            }
            const {
                PayPlanDiscount,
                PayPlanDwonPayment,
                PayPlanAllBulks,
                PayPlanInstalment,
                PayPlanType
            } = SelectedPayPlan || {};
            const HandleFinelPricesResult = (MainFrom, MainTo, { From = null, To = null } = {}) => {
                if (typeof MainFrom != "number") MainFrom = parseInt(MainFrom);
                if (typeof MainTo != "number") MainTo = parseInt(MainTo);
                return MainFrom && MainFrom != 0 && MainTo && MainTo != 0
                    ? `${Helper.NumberWithCommas(From ? From : MainFrom)} ${
                          Lang?.DATA_PAGE?.LE || "LE"
                      } : ${Helper.NumberWithCommas(To ? To : MainTo)}`
                    : MainFrom != 0
                    ? Helper.NumberWithCommas(From ? From : MainFrom)
                    : "-";
            };
            const HandlePrices = (From, To, Bua) => {
                const HandlePriceFrom = Helper.HandlePayPlanDiscount(PayPlanDiscount, From, Bua);
                const HandlePriceTo = Helper.HandlePayPlanDiscount(PayPlanDiscount, To, Bua);
                return {
                    From: HandlePriceFrom,
                    To: HandlePriceTo
                };
            };
            const HandleUtp = (PriceFrom, PriceTo, Bua) => {
                const HandlePrice = HandlePrices(PriceFrom, PriceTo, Bua);
                if (isNaN(parseInt(HandlePrice.From))) return "-";
                return HandleFinelPricesResult(PriceFrom, PriceTo, HandlePrice);
            };
            const HandleCacheUtp = (CachePriceFrom, CachePriceTo) => {
                if (isNaN(parseInt(CachePriceFrom))) return "-";
                return HandleFinelPricesResult(CachePriceFrom, CachePriceTo);
            };
            const HandleDownPayment = (PriceFrom, PriceTo, Dp, Bua) => {
                if (PayPlanType != 1) return "-";
                const { From, To } = HandlePrices(PriceFrom, PriceTo, Bua);
                if (!PriceFrom) return " -";
                let FixedNumberFrom = parseInt(From) * Dp;
                let FixedNumberTo = parseInt(To) * Dp;
                return HandleFinelPricesResult(PriceFrom, PriceTo, {
                    From: FixedNumberFrom?.toFixed(0),
                    To: FixedNumberTo?.toFixed(0)
                });
            };
            let ExtractedBulks = Helper.ExtractBulks(PayPlanAllBulks);
            let MonthlyPresent = 0;
            if (ExtractedBulks.length > 0) {
                ExtractedBulks = ExtractedBulks.reduce((acc, item) => {
                    return acc + item.present;
                }, 0);
                MonthlyPresent = parseFloat(
                    eval(`1 - ((ExtractedBulks / 100) + PayPlanDwonPayment)`)?.toFixed(2)
                );
            } else {
                MonthlyPresent = parseFloat((1 - PayPlanDwonPayment)?.toFixed(2));
            }
            const TotalMonthes = PayPlanInstalment * 12;
            const HandleMonthly = (PriceFrom, PriceTo, Bua) => {
                if (PayPlanType != 1) return "-";
                const { From, To } = HandlePrices(PriceFrom, PriceTo, Bua);
                let FixedNumberFrom = (parseInt(From) * MonthlyPresent) / TotalMonthes;
                let FixedNumberTo = (parseInt(To) * MonthlyPresent) / TotalMonthes;
                if (!PriceFrom) return "-";
                return HandleFinelPricesResult(PriceFrom, PriceTo, {
                    From: FixedNumberFrom?.toFixed(0),
                    To: FixedNumberTo?.toFixed(0)
                });
            };
            return TypeObj.reduce(
                (
                    acc,
                    {
                        DetailBuiltUpArea,
                        DetailBedRooms,
                        DetailUnitTotalPrice,
                        DetailUnitTotalPriceTo,
                        DetailUnitCachePriceFrom,
                        DetailUnitCachePriceTo,
                        DetailOutdoor
                    }
                ) => {
                    const ConcatedUtp = HandleUtp(
                        DetailUnitTotalPrice,
                        DetailUnitTotalPriceTo,
                        DetailBuiltUpArea
                    );
                    const ConcatedCachUtp = HandleCacheUtp(
                        DetailUnitCachePriceFrom,
                        DetailUnitCachePriceTo
                    );
                    const Monthly = HandleMonthly(
                        DetailUnitTotalPrice,
                        DetailUnitTotalPriceTo,
                        DetailBuiltUpArea
                    );
                    const DownPayment = HandleDownPayment(
                        DetailUnitTotalPrice,
                        DetailUnitTotalPriceTo,
                        PayPlanDwonPayment,
                        DetailBuiltUpArea
                    );

                    acc.Bua.push(DetailBuiltUpArea || "-");
                    acc.Bedrooms.push(DetailBedRooms || "-");
                    acc.InstallmentPrice.push(ConcatedUtp);
                    acc.CachPrice.push(ConcatedCachUtp);
                    acc.Outdoor.push(DetailOutdoor == "0" ? "-" : DetailOutdoor);
                    acc.DownPayment.push(DownPayment || "-");
                    acc.Monthly.push(Monthly || "-");
                    return acc;
                },
                {
                    Bua: [],
                    Bedrooms: [],
                    InstallmentPrice: [],
                    CachPrice: [],
                    Outdoor: [],
                    DownPayment: [],
                    Monthly: []
                }
            );
        },
        [Lang?.DATA_PAGE?.LE, SelectedPayPlan]
    );
    let ReplaceMets = useMemo(() => {
        return {
            Bua: Lang?.PUBLIC?.WORDS?.METR || "m",
            Bedrooms: Lang?.DATA_PAGE?.LABELS?.BEDROOMS || "Bedrooms",
            InstallmentPrice: Lang?.DATA_PAGE?.LE || "LE",
            CachPrice: Lang?.DATA_PAGE?.LE || "LE",
            DownPayment: Lang?.DATA_PAGE?.LE || "LE",
            Monthly: Lang?.DATA_PAGE?.LE || "LE"
        };
    }, [Lang?.DATA_PAGE?.LABELS?.BEDROOMS, Lang?.DATA_PAGE?.LE, Lang?.PUBLIC?.WORDS?.METR]);
    return (
        <div>
            <Flex alignItems={"center"} justifyContent={"flex-start"} w={"100%"} gap={6}>
                <Text fontWeight={"bold"} fontSize={"1.2rem"}>
                    {Lang?.DATA_PAGE?.ACTIONS?.PRICELIST || "Price List"}
                </Text>
                <Text display={"flex"} alignItems={"center"} gap={1}>
                    <Text as={"span"} fontSize={"1rem"}>
                        {Lang?.TABLES?.DataDate || "Last Update"}
                    </Text>
                    <Text as={"span"} fontSize={"1rem"} color={"green.500"}>
                        {ProcessDate}
                    </Text>
                </Text>
            </Flex>
            <TableContainer
                pos={"relative"}
                zIndex={1}
                role="region"
                aria-labelledby="caption"
                tabIndex="0"
                maxH={"45.5vh"}
            >
                <Table size={"sm"}>
                    <Thead
                        top={"0"}
                        // top={"-2.5"}
                        pos={"sticky"}
                        bg={THeadBg}
                    >
                        <Tr>
                            {THeadData.map((item) => {
                                const { Label, OrderBy } = item;
                                return (
                                    <Th
                                        key={Label + OrderBy}
                                        color={IsDark ? "white" : "black"}
                                        textTransform={"capitalize"}
                                    >
                                        {Label}
                                    </Th>
                                );
                            })}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {Data && Object.keys(Data)?.length > 0 ? (
                            <>
                                {Object.entries(Data).map(([TypeName, TypeObj]) => {
                                    let startTime = performance.now();
                                    while (performance.now() - startTime < 1) {
                                        // Do nothing for 1 ms per item to emulate extremely slow code
                                    }
                                    const DataFinishing = Finishing ? Finishing : "";
                                    const Items = ProcessItems(TypeObj);
                                    return (
                                        <Tr key={TypeName} fontSize={"0.8rem"}>
                                            <Td borderBottom={"2px solid"}>
                                                <Flex
                                                    display={"flex"}
                                                    alignItems={"flex-start"}
                                                    flexDir={"column"}
                                                    h={"100%"}
                                                >
                                                    {TypeName}
                                                    {DataFinishing[TypeName] && (
                                                        <p
                                                            style={{
                                                                color: "#2fe3ee"
                                                            }}
                                                        >
                                                            {Lang?.PUBLIC?.FINISHING?.[
                                                                DataFinishing[TypeName]
                                                            ] || DataFinishing[TypeName]}
                                                        </p>
                                                    )}
                                                </Flex>
                                            </Td>
                                            {Object.entries(Items).map(([key, values], idx) => {
                                                return (
                                                    <Td
                                                        key={idx}
                                                        textAlign={"center"}
                                                        borderBottom={"2px solid"}
                                                    >
                                                        {values.map((value, index) => (
                                                            <p key={index}>
                                                                {value}{" "}
                                                                {value && value != "-"
                                                                    ? ReplaceMets[key]
                                                                    : ""}
                                                            </p>
                                                        ))}
                                                    </Td>
                                                );
                                            })}
                                        </Tr>
                                    );
                                })}
                            </>
                        ) : (
                            <Tr>
                                <Td
                                    colSpan={THeadData.length}
                                    textAlign="center"
                                    fontSize="sm"
                                    py="8"
                                >
                                    {Lang?.NO_DATA}
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
}
