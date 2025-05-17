import { Box, Flex, Text } from "@chakra-ui/react";
import { useMemo } from "react";

export default function PhasInfo({ Lang, Phas = null, IsDark = true, ...rest }) {
    const InfoData = useMemo(() => {
        const {
            DataPhasCachDiscount,
            DataPhasClubFees,
            DataPhasDelivry,
            DataPhasMaintence,
            DataPhasParkingFees
        } = Phas || {};
        return [
            {
                Label: Lang?.DATA_PAGE?.LABELS?.DELIVERY || "Delivery",
                Value: DataPhasDelivry ? DataPhasDelivry : "-"
            },
            {
                Label: Lang?.DATA_PAGE?.LABELS?.CLUB_FEES || "Club Fees",
                Value: DataPhasClubFees ? DataPhasClubFees : "-"
            },
            {
                Label: Lang?.DATA_PAGE?.LABELS?.CASH_DISCOUNT || "Cash Discount",
                Value: DataPhasCachDiscount ? `${DataPhasCachDiscount}%` : "-"
            },
            {
                Label: Lang?.DATA_PAGE?.LABELS?.MAINTANCE || "Maintance",
                Value: DataPhasMaintence ? DataPhasMaintence : "-"
            },
            {
                Label: Lang?.DATA_PAGE?.LABELS?.PARKING_FEES || "Parking Fees",
                Value: DataPhasParkingFees ? DataPhasParkingFees : "-"
            }
        ];
    }, [
        Lang?.DATA_PAGE?.LABELS?.CASH_DISCOUNT,
        Lang?.DATA_PAGE?.LABELS?.CLUB_FEES,
        Lang?.DATA_PAGE?.LABELS?.DELIVERY,
        Lang?.DATA_PAGE?.LABELS?.MAINTANCE,
        Lang?.DATA_PAGE?.LABELS?.PARKING_FEES,
        Phas
    ]);
    return (
        <Flex
            flexWrap={"nowrap"}
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={"1rem"}
            {...rest}
        >
            {InfoData?.map((item, index) => (
                <InfoItem key={index} Label={item?.Label} Value={item?.Value} IsDark={IsDark} />
            ))}
        </Flex>
    );
}
function InfoItem({ Label, Value, IsDark }) {
    return (
        <Box fontSize={"0.8rem"} textAlign={"center"} whiteSpace={'nowrap'}>
            <Text >{Label}</Text>
            <Text color={IsDark ? "#42c6da" : "#41b3c3"}>{Value}</Text>
        </Box>
    );
}
