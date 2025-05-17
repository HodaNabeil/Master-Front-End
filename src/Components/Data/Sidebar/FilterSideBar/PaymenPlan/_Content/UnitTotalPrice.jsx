import { Flex, Input, Text } from "@chakra-ui/react";
import { Helper } from "@/Utility";

export default function UnitTotalPrice({ OnChange = () => {}, State, Lang }) {
    return (
        <>
            <Text
                className="Label-Payment-Plan"
                w={{
                    base: "60%",
                    md: "40%"
                }}
            >
                {Lang?.SIDEBAR?.LABEL?.UNIT_TOTL_PRICE}
            </Text>
            <Flex
                alignItems={"center"}
                gap={{
                    base: "10px",
                    md: "30px"
                }}
                textTransform={"capitalize"}
                fontWeight={"bold"}
                fontSize={"18px"}
                // color={Theme.Init.colors.ModlePaymentColor[colorMode]}
            >
                {/**"""""""""""" Start Budget From""""""""""""""""""""**/}
                <Flex
                    alignItems={{
                        base: "flex-start",
                        sm: "center"
                    }}
                    flexDir={{
                        base: "column",
                        sm: "row"
                    }}
                    gap="5px"
                    w={"50%"}
                >
                    <Text className="Small-Label-Payment-Plan"> {Lang?.FROM}</Text>
                    <Input
                        type="text"
                        size={"sm"}
                        className="Input-Payment-Plan"
                        value={Helper.NumberWithCommas(State.DataUnitTotalPriceFrom)}
                        onChange={(e) => {
                            OnChange("DataUnitTotalPriceFrom", e.target.value);
                        }}
                    />
                </Flex>

                {/**""""""""""" Start Budget To"""""""""""""""**/}
                <Flex
                    alignItems={{
                        base: "flex-start",
                        sm: "center"
                    }}
                    flexDir={{
                        base: "column",
                        sm: "row"
                    }}
                    gap="5px"
                    w={"50%"}
                >
                    <Text className="Small-Label-Payment-Plan"> {Lang?.TO}</Text>
                    <Input
                        type="text"
                        size={"sm"}
                        className="Input-Payment-Plan"
                        value={Helper.NumberWithCommas(State.DataUnitTotalPriceTo)}
                        name={"DataUnitTotalPriceTo"}
                        onChange={(e) => {
                            OnChange("DataUnitTotalPriceTo", e.target.value);
                        }}
                    />
                </Flex>
            </Flex>
        </>
    );
}
