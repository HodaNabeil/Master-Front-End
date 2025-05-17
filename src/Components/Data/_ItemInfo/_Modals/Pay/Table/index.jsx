import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Text
} from "@chakra-ui/react";
import "./Table.css";
import { useMemo } from "react";
import { Helper } from "@/Utility";
export default function PayTable({
    ModelBg,
    LeftBg,
    RightBg,
    Lang,
    PayPlan,
    Phas = null,
    TotalPrice,
    Discount,
    Type
}) {
    let CaptionLabel = "تنويه هام :";
    let Caption = `
    هذا الجدول يمثل نظام سداد تقريبي بناءً على المعلومات المتاحة حاليًا\n
    وهو لأغراض الاسترشاد فقط. للحصول على تفاصيل نظام السداد الرسمية والمعتمدة\n
    يُرجى الرجوع إلى المطور العقاري مباشرة. لا يُعتد بهذا النظام كأساس لأي التزام مالي أو تعاقدي.
    `;
    let THeadData = useMemo(() => {
        return [
            {
                Label: Lang?.TABLES?.Installment || "Intsallment"
            },
            {
                Label: "(%)"
            },
            {
                Label: Lang?.TABLES?.Ammount || "Ammount"
            },
            {
                Label: Lang?.TABLES?.DueDate || "Due Date"
            }
        ];
    }, [Lang?.TABLES?.Ammount, Lang?.TABLES?.DueDate, Lang?.TABLES?.Installment]);
    const { DataPhasParkingFees, DataPhasClubFees, DataPhasMaintence } = Phas || {};
    const { PayPlanDwonPayment, PayPlanAllBulks, PayPlanInstalment } = PayPlan || {};
    let FinelPrice = TotalPrice - TotalPrice * Discount;
    let BodyData = useMemo(() => {
        const StartDate = new Date();
        let DateAfter3Mnothes = new Date();
        DateAfter3Mnothes.setMonth(DateAfter3Mnothes.getMonth() + 3);
        let ExtractedBulks = Helper.ExtractBulks(PayPlanAllBulks);
        let TotalMonthes = (PayPlanInstalment * 12) / 3;
        let TotalBulks =
            ExtractedBulks?.length > 0
                ? 1 - (ExtractedBulks.reduce((a, b) => a + b.present, 0) / 100 + PayPlanDwonPayment)
                : 1 - PayPlanDwonPayment;

        const DataToReturn = [
            [
                {
                    Value: Lang?.TABLES?.DownPayment || "Down Payment",
                    Color: "#fff",
                    Bg: "#939248"
                },
                { Value: `${PayPlanDwonPayment * 100} %`, Color: "#fff", Bg: "#939248" },
                {
                    Value: FinelPrice
                        ? `${Helper.NumberWithCommas(
                              (FinelPrice * PayPlanDwonPayment)?.toFixed(0)
                          )}` + Lang?.DATA_PAGE?.LE || "LE"
                        : "-",
                    Color: "#fff",
                    Bg: "#939248"
                },
                {
                    Value: Helper.FormatDateArabic(StartDate), // Today Date
                    date: StartDate,
                    Color: "#fff",
                    Bg: "#939248"
                }
            ]
        ];
        if (ExtractedBulks.length > 0) {
            ExtractedBulks.forEach((item, index) => {
                const { present, month } = item;
                let FixedNumber = FinelPrice ? (FinelPrice * (present / 100))?.toFixed(0) : 0;
                let NextQuarter = new Date(StartDate);
                NextQuarter.setMonth(NextQuarter.getMonth() + month);
                DataToReturn.push([
                    {
                        Value:
                            Lang?.DATA_PAGE?.PAY_MODAL?.BULK?.replace("{{INDEX}}", index + 1) ||
                            `Bulk ${index + 1}`,
                        Color: "#fff",
                        Bg: "#939248"
                    },
                    { Value: present ? `${present} %` : "-", Color: "#fff", Bg: "#939248" },
                    {
                        Value: FixedNumber
                            ? `${Helper.NumberWithCommas(FixedNumber)} ` + Lang?.DATA_PAGE?.LE ||
                              "LE"
                            : "-",
                        Color: "#fff",
                        Bg: "#939248"
                    },
                    {
                        Value: Helper.FormatDateArabic(NextQuarter),
                        date: NextQuarter,
                        Color: "#fff",
                        Bg: "#939248"
                    }
                ]);
            });
        }
        // PayPlanDwonPayment
        let QuerterPresintage = TotalBulks / TotalMonthes;
        Array.from({ length: TotalMonthes }, (_, index) => {
            let QuarterIndex = index * 3;
            let NextQuarter = new Date(PayPlanDwonPayment == 0 ? StartDate : DateAfter3Mnothes);
            NextQuarter.setMonth(NextQuarter.getMonth() + QuarterIndex);
            let FixedNumber = FinelPrice ? (FinelPrice * QuerterPresintage)?.toFixed(0) : 0;
            let LabelKey = index + 1 < 4 ? index + 1 : 4;
            DataToReturn.push([
                {
                    Value:
                        Lang?.DATA_PAGE?.PAY_MODAL?.[LabelKey]?.replace("{{INDEX}}", index + 1) ||
                        `Bulk ${index + 1}`,
                    Color: ""
                },
                {
                    Value: !isNaN(QuerterPresintage)
                        ? `${(QuerterPresintage * 100)?.toFixed(2)} %`
                        : "-",
                    Color: ""
                },
                {
                    Value: FixedNumber
                        ? `${Helper.NumberWithCommas(FixedNumber)} ` + Lang?.DATA_PAGE?.LE || "LE"
                        : "-",
                    Color: ""
                },
                {
                    Value: Helper.FormatDateArabic(NextQuarter),
                    date: NextQuarter,
                    Color: ""
                }
            ]);
        });
        return DataToReturn?.sort((a, b) => a[3].date - b[3].date);
    }, [
        FinelPrice,
        Lang?.DATA_PAGE?.LE,
        Lang?.DATA_PAGE?.PAY_MODAL,
        Lang?.TABLES?.DownPayment,
        PayPlanAllBulks,
        PayPlanDwonPayment,
        PayPlanInstalment
    ]);
    let GlobalBodyStyle = {
        borderTop: `2px solid ${ModelBg}`
    };
    let GlobalFotterStyle = {
        borderTop: `4px solid ${ModelBg}`,
        bg: "#1d3a4b"
    };
    // let FinelPrice = TotalPrice - TotalPrice * Discount;
    // const FinelPhasMaintence = DataPhasMaintence < 101 ? DataPhasMaintence / 100 : DataPhasMaintence;
    return (
        <TableContainer className="PayTableContainer" rounded={"lg"} textTransform={"capitalize"}>
            <Table variant="unstyled" rounded={"lg"} size={"sm"}>
                <TableCaption dir="rtl" textAlign={"right"}>
                    <Text color={"red.400"}>{CaptionLabel}</Text>
                    {Caption?.split("\n").map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}
                </TableCaption>
                <Thead bg={LeftBg}>
                    <Tr>
                        {THeadData.map((item, i) => (
                            <Th key={i} textAlign={"center"}>
                                {item.Label}
                            </Th>
                        ))}
                    </Tr>
                </Thead>
                {Type && (
                    <>
                        <Tbody bg={RightBg}>
                            {BodyData.map((item, i) => (
                                <Tr key={i} {...GlobalBodyStyle}>
                                    {item.map((item, i) => (
                                        <Td
                                            key={i}
                                            color={item.Color}
                                            bg={item.Bg || ""}
                                            textAlign={"center"}
                                            borderInline={
                                                ![0, 3].includes(i) ? `2px solid ${ModelBg}` : ""
                                            }
                                        >
                                            {item.Value}
                                        </Td>
                                    ))}
                                </Tr>
                            ))}
                        </Tbody>
                        <Tfoot textTransform={"capitalize"}>
                            <Tr color={"#d3ff85"} bg={"#1d3a4b"} textAlign={"center"}>
                                <Th textAlign={"center"}>{Lang?.TABLES?.Total || "Total"}</Th>
                                <Th textAlign={"center"}>{TotalPrice ? "100%" : "-"}</Th>
                                <Th textAlign={"center"} isNumeric>
                                    {TotalPrice
                                        ? `${Helper.NumberWithCommas(FinelPrice)} ${
                                              Lang?.DATA_PAGE?.LE || "LE"
                                          }`
                                        : "-"}
                                </Th>
                                <Th></Th>
                            </Tr>
                            <Tr {...GlobalFotterStyle}>
                                <Th textAlign={"center"}>
                                    {Lang?.DATA_PAGE?.LABELS?.MAINTANCE || "Maintance"}
                                    {/* {Lang?.DATA_PAGE?.LABELS?.MAINTANCE || "Maintance"} ({" "}
                                     {DataPhasMaintence}% )
                                     {Lang?.DATA_PAGE?.LABELS?.MAINTANCE || "Maintance"} */}
                                </Th>
                                <Th textAlign={"center"} isNumeric>
                                    {TotalPrice ? DataPhasMaintence : "-"}
                                    {/* {TotalPrice
                                         ? `${Helper.NumberWithCommas(
                                               (TotalPrice * (DataPhasMaintence / 100)).toFixed(0)
                                           )} ${Lang?.DATA_PAGE?.LE || "LE"}`
                                         : "-"}{" "}
                                     {TotalPrice ? DataPhasMaintence : "-"} */}
                                </Th>
                                <Th textAlign={"center"}>{Helper.FormatDateArabic()}</Th>
                                <Th></Th>
                            </Tr>
                            <Tr {...GlobalFotterStyle}>
                                <Th textAlign={"center"}>
                                    {Lang?.DATA_PAGE?.LABELS?.CLUB_FEES || "Club Fees"}
                                </Th>
                                <Th textAlign={"center"} isNumeric>
                                    {DataPhasClubFees}
                                </Th>
                                <Th></Th>
                                <Th></Th>
                            </Tr>
                            <Tr {...GlobalFotterStyle}>
                                <Th textAlign={"center"}>
                                    {Lang?.DATA_PAGE?.LABELS?.PARKING_FEES || "Parking Fees"}
                                </Th>
                                <Th textAlign={"center"} isNumeric>
                                    {DataPhasParkingFees}
                                </Th>
                                <Th></Th>
                                <Th></Th>
                            </Tr>
                        </Tfoot>
                    </>
                )}
            </Table>
        </TableContainer>
    );
}
