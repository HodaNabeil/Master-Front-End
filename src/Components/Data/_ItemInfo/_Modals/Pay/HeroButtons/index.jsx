import { Flex, Text } from "@chakra-ui/react";
import PayTopButton from "../../_TopButton";
import LeftHerroButtons from "./LeftButtons";
import MidHeroButtons from "./MidButtons";
import RightHeroButtons from "./RightButtons";

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
    ProjectName,
    TotalPrice,
    Discount,
    setTotalPrice = () => {},
    setDiscount = () => {},
    ...rest
}) {
    return (
        <Flex
            w={"100%"}
            alignItems={"flex-end"}
            gap={"1"}
            h={"7rem"}
            {...rest}
        >
            <Flex alignItems={"center"} flexDir={"column"} gap={2}>
                <PayTopButton
                    LeftBg={LeftBg}
                    Label={Lang?.DATA_PAGE?.LABELS?.ProjectName || "Project Name"}
                    ProjectName={ProjectName}
                />
                <LeftHerroButtons
                    PhasOptions={PhasOptions}
                    State={State}
                    setState={setState}
                    LeftBg={LeftBg}
                    Lang={Lang}
                />
                <Text minW={"7rem"} h={"2rem"} /> {/* Spacer Only */}
            </Flex>
            <MidHeroButtons
                LeftBg={LeftBg}
                Lang={Lang}
                State={State}
                PayPlan={PayPlan}
                Phas={Phas}
                TotalPrice={TotalPrice}
                Discount={Discount}
                setTotalPrice={setTotalPrice}
                setDiscount={setDiscount}
            />
            <RightHeroButtons
                Lang={Lang}
                State={State}
                TotalPrice={TotalPrice}
                Discount={Discount}
            />
        </Flex>
    );
}
