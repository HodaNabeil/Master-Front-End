import { BiSolidChevronsUp } from "react-icons/bi";
import { Flex, Icon, useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";
import { BiSolidChevronsDown } from "react-icons/bi";
import { ThemeColors } from "@/Utility";
import { useSelector } from "react-redux";
const TypeFilter = ({
    Name,
    text,
    isOpen,
    onToggle,
    Tabs = [],
    OnToggleTab = () => {},
    AllowToggleTab = true
    // ALLow
}) => {
    const { Rtl } = useSelector((state) => state.Helper);
    const { colorMode } = useColorMode();
    useEffect(() => {
        if (AllowToggleTab) {
            if (!Tabs.includes(Name) && isOpen) {
                onToggle();
            } else if (Tabs.includes(Name) && !isOpen) {
                onToggle();
            }
        }
    }, [Tabs, Name, AllowToggleTab, isOpen, onToggle]);
    const DirProps = Rtl
        ? {
              mr: "4%"
          }
        : {
              ml: "4%"
          };
    return (
        <Flex
            onClick={() => {
                if (AllowToggleTab) {
                    OnToggleTab(Name);
                    if(!isOpen) {
                        onToggle(true);
                    }
                } else {
                    if (Name == "PaymentPlan") {
                        OnToggleTab();
                    }
                    onToggle(true);
                }
            }}
            bg={ThemeColors.SidebarChooseOption[colorMode]}
            w={"68%"}
            p={".3rem .9rem"}
            cursor={"pointer"}
            alignItems={"center"}
            justifyContent={"space-between"}
            fontSize={".9rem"}
            {...DirProps}
        >
            <span>{text}</span>
            <Icon as={isOpen ? BiSolidChevronsUp : BiSolidChevronsDown} />
        </Flex>
    );
};

export default TypeFilter;
