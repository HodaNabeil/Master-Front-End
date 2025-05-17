import { ThemeColors } from "@/Utility";
import { Checkbox, Flex, IconButton, Text, useColorMode, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Collapse from "../Collapse";
const Lable = ({
    Item,
    Name, // City , Area // required => e.target.name
    IsSelected = false,
    AllowToggle = false,
    HandleOnClick = () => {},
    children = <div></div>,
    FlexStart = false,
    BgActive = true,
    ...rest
}) => {
    const { colorMode } = useColorMode();
    const { isOpen, onToggle } = useDisclosure();
    useEffect(() => {
        if (!IsSelected && isOpen) {
            onToggle();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [IsSelected, isOpen]);
    if (!Item) return null;
    return (
        <>
            <Flex
                className={`   ${BgActive ? (IsSelected ? "BgActive shadow" : "") : null}         `}
                _hover={{
                    bgGradient: ThemeColors.SidebarElementBgColorHover[colorMode]
                }}
                alignItems={"center"}
                justifyContent={FlexStart ? "flex-start" : "space-between"}
                transition={"0.5s"}
                mt={1}
                cursor={"pointer"}
            >
                <Flex
                    w={"100%"}
                    p={"0 .9rem"}
                    onClick={() =>
                        HandleOnClick({
                            Name,
                            Value: IsSelected ? "" : Item
                        })
                    }
                    gap={2}
                    {...rest}
                >
                    <Checkbox
                        id={`${Name}_${Item.value}`}
                        isChecked={IsSelected}
                        value={Item.value}
                        name={Name}
                        borderColor={colorMode === "dark" ? " #344e5d " : "#8795a5"}
                    />
                    <Text fontSize={".9rem"} whiteSpace={"nowrap"}>
                        {Item.label}
                    </Text>
                </Flex>
                {IsSelected && AllowToggle && (
                    <IconButton
                        _hover={{
                            bg: ThemeColors.NavIconColor[colorMode == "dark" ? "light" : "dark"]
                        }}
                        bg={ThemeColors.NavIconColor[colorMode == "dark" ? "light" : "dark"]}
                        zIndex={"5"}
                        variant="solid"
                        size={"xs"}
                        className="BtnTogleSideBar"
                        icon={isOpen ? <FaAngleUp /> : <FaAngleDown />}
                        onClick={onToggle}
                    />
                )}
            </Flex>
            <Collapse IsOpen={isOpen}>{children}</Collapse>
        </>
    );
};

export default Lable;
