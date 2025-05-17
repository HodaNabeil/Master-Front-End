import { Collapse, CustomMultiCheckBox } from "@/Common";
import TypeFilter from "../TypeFilter";
import { Box, useDisclosure } from "@chakra-ui/react";
import { useMemo } from "react";
import FilterResultMap from "../../FilterResultMap";
import { useValidateSection } from "@/Hooks";

const Compound = ({
    OnToggleTab,
    OnChange,
    State,
    Options = [],
    Tabs,
    Lang,
    OnUnSelectItem = () => {}
}) => {
    const { IsCommercial } = useValidateSection();
    const { isOpen, onToggle } = useDisclosure();
    const Result = useMemo(() => {
        let result = [];
        if (State?.DataCompoundId?.length > 0) {
            State?.DataCompoundId?.forEach((Item) => {
                result.push({
                    Label: "",
                    Value: Item.label,
                    OnClick: () => OnUnSelectItem("DataCompoundId", Item)
                });
            });
        }
        return result;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [State?.DataCompoundId]);
    return (
        <Box mt={"10px"}>
            <TypeFilter
                text={
                    Lang?.SIDEBAR?.LABEL?.[IsCommercial ? "PROJECT" : "COMPOUND"] ||
                    (IsCommercial ? "Project" : "Compound")
                }
                State={State}
                isOpen={isOpen}
                onToggle={onToggle}
                Name={"Compound"}
                OnToggleTab={OnToggleTab}
                Tabs={Tabs}
            />
            <Collapse IsOpen={isOpen}>
                <CustomMultiCheckBox
                    Name="DataCompoundId"
                    AllowFilter={true}
                    IsMulti={true}
                    OnChange={OnChange}
                    Options={Options}
                    Value={State.DataCompoundId}
                    Lang={Lang}
                />
            </Collapse>
            {State?.DataCompoundId.length > 0 && (
                <FilterResultMap SubResult={Result} SubTarget="Value" />
            )}
        </Box>
    );
};

export default Compound;
