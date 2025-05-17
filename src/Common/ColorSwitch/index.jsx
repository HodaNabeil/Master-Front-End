import { ThemeColors } from "@/Utility";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ColorSwitch() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <IconButton
            color={ThemeColors.NavIconColor[colorMode]}
            icon={colorMode == "dark" ? <FaSun /> : <FaMoon />}
            onClick={() => toggleColorMode()}
            backgroundColor={
                ThemeColors.NavIconColor[colorMode === "dark" ? "light" : "dark"]
            }
            className="Shadow"
            rounded={"full"}
        />
    );
}
