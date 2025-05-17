import { Helper, ThemeColors } from "@/Utility";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { BsCheck2Circle } from "react-icons/bs";

const CardReusltUser = ({ colorMode, State, Lang, HaveData }) => {
    let UnitType = useMemo(() => {
        return Lang?.SIDEBAR?.OPTIONS?.UNIT_TOTL_PRICE_TYPES?.find(
            (item) => item.Value === State?.DataUnitPriceType
        );
    }, [Lang?.SIDEBAR?.OPTIONS?.UNIT_TOTL_PRICE_TYPES, State?.DataUnitPriceType]);
    return (
        <Box
            my={"6px"}
            gap={"8px"}
            p="5px 8px"
            border="1px solid  #ffffff36 !important"
            bg={ThemeColors.CardResultOptionsBgColor[colorMode]}
            borderRadius="3px"
        >
            {State?.DataUnitPriceType && HaveData.UnitPrice && (
                <Flex gap="5px" alignItems={"center"}>
                    <BsCheck2Circle
                        style={{
                            color: ThemeColors.ActiveStateColor[colorMode]
                        }}
                    />
                    <Text color={ThemeColors.SecoendColor[colorMode]}>{UnitType?.Label}</Text>
                </Flex>
            )}
            {HaveData.UnitPrice && (
                <Flex gap="5px" alignItems="center">
                    <BsCheck2Circle
                        style={{
                            color: ThemeColors.ActiveStateColor[colorMode]
                        }}
                    />
                    <>
                        <Box
                            as="span"
                            fontSize={"0.9rem"}
                            style={{
                                color: ThemeColors.SecoendColor[colorMode]
                            }}
                        >
                            {Lang?.SIDEBAR?.RESULT_LABEL?.UNIT_TOTL_PRICE}
                        </Box>
                        {State?.DataUnitTotalPriceFrom && (
                            <Text
                                as="span"
                                style={{
                                    color: ThemeColors.SecoendColor[colorMode]
                                }}
                                fontSize={"clamp(0.7rem, 2vw, 0.9rem)"}
                            >
                                {Helper.NumberWithCommas(State.DataUnitTotalPriceFrom)}
                            </Text>
                        )}
                        {State?.DataUnitTotalPriceTo && (
                            <>
                                <span
                                    style={{
                                        color: ThemeColors.SecoendColor[colorMode]
                                    }}
                                >
                                    {Lang?.TO}
                                </span>
                                <Text
                                    as="span"
                                    fontSize={"clamp(0.7rem, 2vw, 0.9rem)"}
                                    color={ThemeColors.SecoendColor[colorMode]}
                                >
                                    {Helper.NumberWithCommas(State.DataUnitTotalPriceTo)}
                                </Text>
                            </>
                        )}
                    </>
                </Flex>
            )}

            {HaveData.Years && (
                <>
                    <Flex gap="5px" alignItems={"center"}>
                        <Box
                            as="span"
                            style={{
                                color: ThemeColors.ActiveStateColor[colorMode]
                            }}
                        >
                            <BsCheck2Circle />
                        </Box>
                        {Lang?.SIDEBAR?.RESULT_LABEL?.YEARS}
                        {State?.DataYearsFrom && (
                            <Box
                                as="span"
                                style={{
                                    color: ThemeColors.SecoendColor[colorMode]
                                }}
                            >
                                {Lang?.FROM} {State?.DataYearsFrom}
                            </Box>
                        )}
                        {State.DataYearsTo && (
                            <Box
                                as="span"
                                style={{
                                    color: ThemeColors.SecoendColor[colorMode]
                                }}
                            >
                                {Lang?.TO} {State.DataYearsTo}
                            </Box>
                        )}
                    </Flex>
                </>
            )}

            {HaveData.DownPayment && (
                <Flex gap="5px" alignItems={"center"}>
                    <Box
                        as="span"
                        style={{
                            color: ThemeColors.ActiveStateColor[colorMode]
                        }}
                    >
                        <BsCheck2Circle />
                    </Box>
                    <Box
                        style={{
                            color: ThemeColors.SecoendColor[colorMode]
                        }}
                        as="span"
                    >
                        {Lang?.SIDEBAR?.RESULT_LABEL?.DWON_PAYMENT}
                    </Box>
                    {State.DataDownPaymentFrom && (
                        <Box
                            as="span"
                            style={{
                                color: ThemeColors.SecoendColor[colorMode]
                            }}
                        >
                            {parseFloat((State.DataDownPaymentFrom * 100)?.toFixed(2))} 
                        </Box>
                    )}

                    {State.DataDownPaymentTo && (
                        <Box
                            as="span"
                            style={{
                                color: ThemeColors.SecoendColor[colorMode]
                            }}
                        >
                            {Lang?.TO} {parseFloat((State.DataDownPaymentTo * 100)?.toFixed(2))} 
                        </Box>
                    )}
                     %
                </Flex>
            )}
        </Box>
    );
};

export default CardReusltUser;
