import Label from "@/Common/Label";
import TypeFilter from "../TypeFilter";
import { ThemeColors } from "@/Utility";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import FilterResult from "../../FilterResult";
import { useMemo } from "react";
import { Collapse } from "@/Common";
const Delivery = ({ State, colorMode, OnChange, Options = [], OnToggleTab, Tabs, Lang }) => {
    const { isOpen, onToggle } = useDisclosure();
    const Result = useMemo(() => {
        let result = [];
        if (State?.DataDeliveryFrom?.label) {
            result.push({
                Label: Lang?.FROM,
                Value: State.DataDeliveryFrom.label,
                HandleFont: true
            });
        }
        if (State?.DataDeliveryTo?.label) {
            result.push({
                Label: Lang?.TO,
                Value: State.DataDeliveryTo.label,
                HandleFont: true
            });
        }
        return result;
    }, [Lang?.FROM, Lang?.TO, State.DataDeliveryFrom.label, State.DataDeliveryTo.label]);
    return (
        <Box mt="10px">
            <TypeFilter
                text={Lang?.SIDEBAR?.LABEL?.DELIVERY || "Delivery"}
                isOpen={isOpen}
                onToggle={onToggle}
                Name={"Delivery"}
                OnToggleTab={OnToggleTab}
                Tabs={Tabs}
            />
            <Collapse IsOpen={isOpen}>
                <Flex
                    gap={1}
                    pt="1"
                    px={{
                        base: 5,
                        sm: 1,
                        md: 0
                    }}
                >
                    <Box w={"50%"}>
                        <Box
                            fontWeight={"medium"}
                            fontSize={".9rem"}
                            as="h2"
                            color={ThemeColors.MainColor[colorMode]}
                            px={"1rem"}
                        >
                            {Lang?.FROM}
                        </Box>

                        <Flex direction="column">
                            {Options && Options?.map((Item) => {
                                const IsSelected = State?.DataDeliveryFrom?.id == Item.id;
                                return (
                                    <Label
                                        Name="DataDeliveryFrom"
                                        Item={Item}
                                        IsSelected={IsSelected}
                                        key={`ReadyFrom_${Item.id}`}
                                        AllowToggle={false}
                                        HandleOnClick={OnChange}
                                        FlexStart={true}
                                        BgActive={false}
                                    />
                                );
                            })}
                        </Flex>
                    </Box>
                    <Box>
                        <Box
                            fontWeight={"medium"}
                            fontSize={".9rem"}
                            as="h2"
                            color={ThemeColors.MainColor[colorMode]}
                            px={"1rem"}
                        >
                            {Lang?.TO}
                        </Box>
                        <Flex direction="column" mr="4px">
                            {Options && Options?.map((Item) => {
                                const IsSelected = State?.DataDeliveryTo.id == Item.id;
                                return (
                                    <Label
                                        IsSelected={IsSelected}
                                        key={`ReadyTo_${Item.id}`}
                                        Item={Item}
                                        Name="DataDeliveryTo"
                                        AllowToggle={false}
                                        HandleOnClick={OnChange}
                                        BgActive={false}
                                    />
                                );
                            })}
                        </Flex>
                    </Box>
                </Flex>
            </Collapse>
            <FilterResult Result={Result} Name={"Delivery"} />
        </Box>
    );
};

export default Delivery;
