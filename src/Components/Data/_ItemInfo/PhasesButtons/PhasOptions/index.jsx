import { Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
export default function PhasOptions({
    Options = [],
    Phas = null,
    isOpen = false,
    IsDark = true,
    BtnImgSize,
    OnSelectPhas = () => {},
    Lang
}) {
    let ListBg = IsDark ? "#284455" : "#b6dded";
    const { Rtl } = useSelector((state) => state.Helper);
    const RtlStyle = {
        [Rtl ? "roundedRight" : "roundedLeft"]: "lg",
        [Rtl ? "left" : "right"]: isOpen ? `calc(${BtnImgSize} / 1.1)` : "0"
    };
    return (
        <Flex
            gap={1}
            pos={"absolute"}
            top={`0`}
            bg={ListBg}
            p={1}
            zIndex={1}
            maxW={isOpen ? "10rem" : "0"}
            w={isOpen ? "10rem" : "0"}
            overflowX={"auto"}
            overflowY={"hidden"}
            opacity={isOpen ? "1" : "0"}
            transition={"all 0.5s ease"}
            {...RtlStyle}
        >
            {Options?.length > 0 ? (
                Options.map((item, index) => {
                    const { DataPhasId } = item;
                    const IsSelected = Phas?.DataPhasId == DataPhasId;
                    return (
                        <Text
                            key={DataPhasId}
                            bg={IsSelected ? "green.500" : "white"}
                            color={IsSelected ? "white" : "#002e3e"}
                            h={"1.5rem"}
                            minW={"1.5rem"}
                            lineHeight={"1.5rem"}
                            textAlign={"center"}
                            rounded={"full"}
                            onClick={() => OnSelectPhas(item)}
                            cursor={"pointer"}
                        >
                            {index + 1}
                        </Text>
                    );
                })
            ) : (
                <Text textAlign={"center"} w={"100%"}>
                    {Lang?.NO_DATA || "No Data Founded"}
                </Text>
            )}
        </Flex>
    );
}
