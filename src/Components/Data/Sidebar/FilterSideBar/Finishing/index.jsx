import Label from "@/Common/Label";
import TypeFilter from "../TypeFilter";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import FilterResult from "../../FilterResult";
import { useMemo } from "react";
import { Collapse } from "@/Common";
const Finishing = ({ State, OnChange, OnToggleTab, Options = [], Tabs, Lang }) => {
    const { isOpen, onToggle } = useDisclosure({
        defaultIsOpen: false
    });
    const Result = useMemo(() => {
        let result = [];
        if (State?.DataFinishingId?.label) {
            result.push({
                Label: "",
                Value: State.DataFinishingId.label,
                HandleFont: true
            });
        }
        return result;
    }, [State.DataFinishingId.label]);
    return (
        <Box mt="10px">
            <TypeFilter
                text={Lang?.SIDEBAR?.LABEL?.FINISHING || "Finishing"}
                OnToggleTab={OnToggleTab}
                isOpen={isOpen}
                onToggle={onToggle}
                Name={"Finishing"}
                Tabs={Tabs}
                AllowToggleTab={true}
            />
            <Collapse IsOpen={isOpen}>
                <Flex
                    p="0"
                    direction="row"
                    // bg={'red.500'}
                >
                    {Options && Options?.map((item) => {
                        const IsSelected = State.DataFinishingId.id == item.id;
                        return (
                            <Label
                                key={`FinalStage_${item.id}`}
                                Item={{ id: item.id, label: item.label, value: item.id }}
                                Name="DataFinishingId"
                                AllowToggle={false}
                                IsSelected={IsSelected}
                                HandleOnClick={OnChange}
                                px={".2rem"}
                            />
                        );
                    })}
                </Flex>
            </Collapse>
            <FilterResult Result={Result} Name={"Finishing"} />
        </Box>
    );
};

export default Finishing;
