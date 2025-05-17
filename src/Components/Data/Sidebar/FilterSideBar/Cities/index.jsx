import { Box, useDisclosure } from "@chakra-ui/react";
import { Collapse, CustomMultiCheckBox, Label } from "@/Common";

import TypeFilter from "../TypeFilter";
import { useMemo } from "react";
import FilterResultMap from "../../FilterResultMap";

export default function Cities({
    Lang,
    OnChange,
    OnDispatch,
    DataCityId,
    State,
    Tabs,
    OnToggleTab,
    Options = [],
    SubOptions = {},
    OnUnSelectItem = () => {}
}) {
    const { isOpen, onToggle } = useDisclosure();
    const Result = useMemo(() => {
        let result = [];
        if (DataCityId?.filter((item) => item)?.length > 0) {
            DataCityId?.forEach((City) => {
                result.push({
                    Label: "",
                    Value: City.label
                });
            });
        }
        return result;
    }, [DataCityId]);
    const SubResult = useMemo(() => {
        let result = [];
        if (State?.DataAreaId?.length > 0) {
            State?.DataAreaId?.forEach((Area) => {
                result.push({
                    Label: "",
                    Value: Area.label,
                    OnClick: () => OnUnSelectItem("DataAreaId", Area)
                });
            });
        }
        return result;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [State?.DataAreaId]);
    return (
        <Box pt="0px">
            <TypeFilter
                Name={"City"}
                text={Lang?.SIDEBAR?.LABEL?.City || "Cities"}
                isOpen={isOpen}
                onToggle={onToggle}
                Tabs={Tabs}
                OnToggleTab={OnToggleTab}
            />
            <Box
                maxHeight={"250px"}
                overflowY={"scroll"}
                sx={{
                    "&::-webkit-scrollbar": {
                        width: "5px"
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#4b7a95", // scrollbar color
                        borderRadius: "10px", // optional: round edges
                        cursor: "pointer"
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "#f0f0f0" // scrollbar track color
                    }
                }}
            >
                <Collapse IsOpen={isOpen}>
                    {Options?.length > 0 ? (
                        Options?.map((Item) => {
                            const IsSelected = DataCityId?.find((Old) => Old.value == Item.value)
                                ? true
                                : false;

                            return (
                                <Label
                                    key={`CitiesLabel_${Item.value}`}
                                    Item={Item}
                                    IsSelected={IsSelected}
                                    AllowToggle={true}
                                    HandleOnClick={OnDispatch}
                                    Name={"DataCityId"}
                                >
                                    {SubOptions[Item.label] && (
                                        <CustomMultiCheckBox
                                            Name={"DataAreaId"}
                                            Value={State.DataAreaId}
                                            Options={SubOptions[Item.label]}
                                            IsMulti={true}
                                            OnChange={(e) => OnChange(e)}
                                            Lang={Lang}
                                        />
                                    )}
                                </Label>
                            );
                        })
                    ) : (
                        <div>{Lang?.NO_OPTIONS}</div>
                    )}
                </Collapse>
            </Box>
            <FilterResultMap
                Name={"CityReult"}
                Result={Result}
                SubResult={SubResult}
                Target="Value"
                SubTarget="Value"
            />
        </Box>
    );
}
