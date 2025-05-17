import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { Collapse, CustomMultiCheckBox } from "@/Common";
import TypeFilter from "../TypeFilter";
import { useMemo } from "react";
import { useNotify } from "@/Hooks";
const Bedrooms = ({ OnToggleTab, OnChange, Options = [], State, Tabs, Lang }) => {
    const { isOpen, onToggle } = useDisclosure({
        // defaultIsOpen: true
    });
    const Notify = useNotify();
    const OnToggle = (IsHaveData, isClicked) => {
        if (IsHaveData && isClicked) {
            Notify("info", Lang?.SIDEBAR?.INFO?.BEDROOMS);
            return;
        }
        onToggle();
    };
    const IsHaveData = useMemo(() => {
        if (State?.DataBedRooms?.length > 0) {
            return true;
        }
        return false;
    }, [State?.DataBedRooms]);
    return (
        <Box mt={"10px"}>
            <TypeFilter
                text={Lang?.SIDEBAR?.LABEL?.BEDROOMS || "Bedrooms"}
                isOpen={isOpen}
                onToggle={(e) => OnToggle(IsHaveData, e)}
                Name={"BedRooms"}
                OnToggleTab={OnToggleTab}
                State={State}
                Tabs={Tabs}
                AllowToggleTab={true}
            />
            <Collapse IsOpen={IsHaveData ? true : isOpen}>
                <Flex
                    gap={{
                        base: "10px",
                        md: "10px",
                        lg: "15px"
                    }}
                    wrap={"wrap"}
                    py={"5px"}
                    px={"2px"}
                    rounded={"md"}
                    mt={1}
                    alignItems={"center"}
                    justifyContent={{
                        base: "center",
                        lg: "inherit"
                    }}
                    bg={"#104c70"}
                >
                    <CustomMultiCheckBox
                        Name={"DataBedRooms"}
                        IsMulti={true}
                        Options={Options}
                        OnChange={OnChange}
                        Value={State.DataBedRooms}
                        DirectionRow={true}
                        Lang={Lang}
                    />
                </Flex>
            </Collapse>
        </Box>
    );
};

export default Bedrooms;
