import { Collapse, CustomMultiCheckBox } from "@/Common";
import TypeFilter from "../TypeFilter";
import { Box, useDisclosure } from "@chakra-ui/react";
import FilterResultMap from "../../FilterResultMap";
import { useMemo } from "react";

const Developer = ({
    OnUnSelectItem = () => {},
    OnToggleTab,
    OnChange,
    State,
    Options = [],
    Tabs,
    Lang
}) => {
    const { isOpen, onToggle } = useDisclosure();

    const Result = useMemo(() => {
        let result = [];
        if (State?.DataDeveloperId?.length > 0) {
            State?.DataDeveloperId?.forEach((Item) => {
                result.push({
                    Label: "",
                    Value: Item.label,
                    OnClick: () => OnUnSelectItem("DataDeveloperId", Item)
                });
            });
        }
        return result;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [State?.DataDeveloperId]);
    return (
        <Box mt={"10px"}>
            <TypeFilter
                text={Lang?.SIDEBAR?.LABEL?.DEVELOPER || "Developer"}
                State={State}
                isOpen={isOpen}
                onToggle={onToggle}
                Name={"Developer"}
                OnToggleTab={OnToggleTab}
                Tabs={Tabs}
            />
            <Collapse IsOpen={isOpen}>
                <CustomMultiCheckBox
                    Name="DataDeveloperId"
                    AllowFilter={true}
                    IsMulti={true}
                    OnChange={OnChange}
                    Options={Options}
                    Value={State.DataDeveloperId}
                    Lang={Lang}
                />
            </Collapse>
            {State?.DataDeveloperId.length > 0 && (
                <FilterResultMap SubResult={Result} SubTarget="Value" />
            )}
        </Box>
    );
};

export default Developer;
