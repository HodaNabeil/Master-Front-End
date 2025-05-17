import { Flex, Text } from "@chakra-ui/react";
import CustomSelect from "../CustomSelect";

export default function Years({
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
                className=" Label-Payment-Plan"
                w={{
                    base: "60%",
                    md: "40%"
                }}
            >
                {Lang?.SIDEBAR?.LABEL?.YEARS}
            </Text>
            {/**"""""""""""""" Start   Installment Years From """"""""""""""""""""""**/}
            <Flex
                alignItems={"center"}
                gap={{
                    base: "20px",
                    md: "30px"
                }}
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
                    {/** """""""""""""  Start From Years  """""""""""""""" **/}
                    <Text className="Small-Label-Payment-Plan"> {Lang?.FROM}</Text>
                    <CustomSelect
                        OnChange={(e) => OnChange(e, "DataYearsFrom")}
                        OnReset={() => OnReset("DataYearsFrom")}
                        value={State.DataYearsFrom}
                        Options={Options}
                        Name={"Years_From_"}
                        Lang={Lang}
                        Rtl={Rtl}
                    />
                </Flex>
                {/**"""""""""""""""""""""" Start  Years  To"""""""""""""""""""""""""**/}
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
                    justifyContent={"space-between"}
                    position={"relative"}
                    w={"50%"}
                >
                    <Text className="Small-Label-Payment-Plan">{Lang?.TO}</Text>
                    <CustomSelect
                        OnChange={(e) => OnChange(e, "DataYearsTo")}
                        OnReset={() => OnReset("DataYearsTo")}
                        value={State.DataYearsTo}
                        Options={Options}
                        Name={"Years_To_"}
                        Lang={Lang}
                        Rtl={Rtl}
                    />
                </Flex>
            </Flex>
        </>
    );
}
