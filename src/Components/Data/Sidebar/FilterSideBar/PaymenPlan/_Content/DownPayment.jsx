import { Flex, Text } from "@chakra-ui/react";
import CustomSelect from "../CustomSelect";

export default function PaymentPlan({
    OnReset = () => {},
    OnChange = () => {},
    Options,
    State,
    Lang,
    Rtl
}) {
    return (
        <>
            <Text
                className="Label-Payment-Plan"
                w={{
                    base: "60%",
                    md: "40%"
                }}
            >
                {Lang?.SIDEBAR?.LABEL?.DOWN_PAYMENT}
            </Text>
            {/* """""""""""""""""""""""""""""""  DataDownPayment   From""""""""""""""""""""""""""""""""""""" */}
            <Flex
                alignItems={"center"}
                gap={{
                    base: "10px",
                    md: "30px"
                }}
                //  my={"10px"}
            >
                <Flex
                    alignItems={{
                        base: "flex-start",
                        sm: "center"
                    }}
                    flexDir={{
                        base: "column",
                        sm: "row"
                    }}
                    gap={"5px"}
                    position={"relative"}
                    w={"50%"}
                >
                    <Text className="Small-Label-Payment-Plan">{Lang?.FROM}</Text>
                    <CustomSelect
                        OnChange={(e) => OnChange(e, "DataDownPaymentFrom")}
                        OnReset={() => OnReset("DataDownPaymentFrom")}
                        value={State.DataDownPaymentFrom}
                        Options={Options}
                        Name={"DownPayment_From_"}
                        Lang={Lang}
                        Rtl={Rtl}
                    />
                </Flex>
                {/* """"""""""""""""""""""""""""""" DataDownPayment To """"""""""""""""""""""""""""""""" */}

                <Flex
                     alignItems={{
                        base: "flex-start",
                        sm: "center"
                    }}
                    flexDir={{
                        base: "column",
                        sm: "row"
                    }}
                    gap={"5px"}
                    position={"relative"}
                    w={"50%"}
                >
                    <Text className="Small-Label-Payment-Plan">{Lang?.TO}</Text>
                    <CustomSelect
                        OnChange={(e) => OnChange(e, "DataDownPaymentTo")}
                        OnReset={() => OnReset("DataDownPaymentTo")}
                        value={State.DataDownPaymentTo}
                        Options={Options}
                        Name={"DownPayment_To_"}
                        Lang={Lang}
                        Rtl={Rtl}
                    />
                </Flex>
            </Flex>
        </>
    );
}
