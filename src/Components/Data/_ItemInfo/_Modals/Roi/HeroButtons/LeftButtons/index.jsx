import { Flex } from "@chakra-ui/react";
import TypeDrop from "./Type";
import AreaDrop from "./Area";
import { useEffect, useMemo } from "react";

export default function LeftHerroButtons({
    PhasOptions = {
        Type: [],
        Area: null,
        Prices: null
    },
    State,
    setState,
    LeftBg,
    Lang
}) {
    const AreaOptions = useMemo(() => {
        const { Area } = PhasOptions;
        if (!Area) return [];
        return Area[State.Type] || [];
    }, [PhasOptions, State.Type]);
    const OnChange = (Name, Value) => {
        if (typeof Name == "object") {
            setState((prev) => ({
                ...prev,
                ...Name
            }));
            return;
        }
        let Updated = {
            [Name]: Value
        };
        if (Name == "Bua") {
            const { Prices } = PhasOptions;
            if (Prices) {
                Updated.TotalPrice = Prices[Value];
            }
        }
        setState((prev) => ({
            ...prev,
            ...Updated
        }));
    };
    useEffect(() => {
        if (State.Type) {
            const NewArea = AreaOptions[0];
            if (NewArea) {
                const { Prices } = PhasOptions;
                OnChange({
                    Bua: NewArea,
                    TotalPrice: Prices[NewArea] ? Prices[NewArea] : 0
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [State.Type]);
    return (
        <Flex alignItems={"center"} gap={2}>
            <TypeDrop
                OnChange={(Value) => OnChange("Type", Value)}
                LeftBg={LeftBg}
                Options={PhasOptions.Type}
                Value={State.Type}
                Lang={Lang}
            />
            <AreaDrop
                OnChange={(Value) => OnChange("Bua", Value)}
                LeftBg={LeftBg}
                Options={AreaOptions}
                Value={State.Bua}
                Lang={Lang}
            />
            {/* <Text
                rounded={"full"}
                border={"1px solid"}
                py={2}
                px={3}
                minW={"7rem"}
                textAlign={"center"}
            >
                {Lang?.TABLES?.Outdoor || "Outdoor"}
            </Text> */}
        </Flex>
    );
}
