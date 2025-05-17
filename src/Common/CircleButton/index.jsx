import { ThemeColors } from "@/Utility";
import { Flex, useColorModeValue } from "@chakra-ui/react";

const CircleButton = ({ Icon = false, Text, OnClick = () => {}, IsActive = false, ...rest }) => {
    const BgColor = useColorModeValue(
        ThemeColors.CircleButtonBgColor.light,
        ThemeColors.CircleButtonBgColor.dark
    );
    const BgColorActive = useColorModeValue(
        ThemeColors.ActiveBackgroundColor.light,
        ThemeColors.ActiveBackgroundColor.dark
    );
    return (
        <Flex
            className="CircleButton Shadow"
            alignItems="center"
            justifyContent={"center"}
            onClick={OnClick}
            cursor={"pointer"}
            bg={IsActive ? BgColorActive : BgColor}
            border="none"
            rounded={"xl"}
            py={1}
            {...rest}
        >
            <span>{Icon}</span>
            <span>{Text}</span>
        </Flex>
    );
};

export default CircleButton;
