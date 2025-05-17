import { Box, Flex } from "@chakra-ui/react";
import LeftHerroButtons from "./LeftButtons";
import MidHeroButtons from "./MidButtons";

export default function HeroButtons({
    PhasOptions = {
        Type: [],
        Area: null
    },
    State,
    setState,
    LeftBg,
    Lang,
    PayPlan,
    Phas = null,
    TotalPrice,
    CapRate,
    setTotalPrice = () => {},
    setCapRate = () => {},
    ...rest
}) {
    return (
        <Flex
            w={"100%"}
            // alignItems={"flex-end"}
            gap={"10%"}
            h={"100%"}
            {...rest}
        >
            <Flex alignItems={"center"} flexDir={"column"} gap={2}>
                <LeftHerroButtons
                    PhasOptions={PhasOptions}
                    State={State}
                    setState={setState}
                    LeftBg={LeftBg}
                    Lang={Lang}
                />
            </Flex>
            <Box>
                <MidHeroButtons
                    LeftBg={LeftBg}
                    Lang={Lang}
                    State={State}
                    PayPlan={PayPlan}
                    Phas={Phas}
                    TotalPrice={TotalPrice}
                    CapRate={CapRate}
                    setTotalPrice={setTotalPrice}
                    setCapRate={setCapRate}
                />
            </Box>
        </Flex>
    );
}
