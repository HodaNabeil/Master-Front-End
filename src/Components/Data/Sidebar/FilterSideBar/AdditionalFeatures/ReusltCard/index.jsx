import { ThemeColors } from "@/Utility";
import { Box, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import FilterResultMap from "../../../FilterResultMap";
const ReusltCard = ({ colorMode, State, HaveData, AdditionalCols, OnUnSelectItem = () => {} }) => {
    const Result = useCallback(
        (Col) => {
            let ProcessCol = `Data${Col}`;
            if (HaveData?.[Col]) {
                return State?.[ProcessCol]?.map((Item) => ({
                    Label: "",
                    Value: Item.label,
                    OnClick: () => OnUnSelectItem(ProcessCol, Item)
                }));
            }
            return [];
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [HaveData, State]
    );
    return (
        <Box
            my={"6px"}
            gap={"8px"}
            p="5px 8px"
            border="1px solid  #ffffff36 !important"
            bg={ThemeColors.CardResultOptionsBgColor[colorMode]}
            borderRadius="3px"
        >
            {AdditionalCols && AdditionalCols?.map(({ Label, Value }) => {
                const Res = Result(Value);
                if (!HaveData?.[Value]) return null;
                return (
                    <Box key={Value}>
                        <Text>{Label}</Text>
                        <FilterResultMap SubResult={Res} SubTarget="Value" />
                    </Box>
                );
            })}
        </Box>
    );
};

export default ReusltCard;
