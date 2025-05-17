import CogsModal from "@/Components/Data/Modals/Cogs";
import { Theme } from "@/Utility";
import { Flex } from "@chakra-ui/react";
import SiteLogo from "../SiteLogo";
const Navbar = ({ ...rest }) => {
    return (
        <Flex
            as="header"
            roundedBottom={"lg"}
            alignItems={"center"}
            w={"100%"}
            h={Theme.PublicConfig.NavbarHeight}
            px={1}
            gap={4}
            // className="Shadow"
            {...rest}
        >
            <CogsModal />
            <SiteLogo h={"2.5rem"} />
        </Flex>
    );
};

export default Navbar;
