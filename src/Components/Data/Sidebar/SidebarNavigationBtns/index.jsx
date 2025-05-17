import { Flex } from "@chakra-ui/react";
import CogsModal from "../../Modals/Cogs";
import NotificationsCard from "../../Modals/Notifications";

const SidebarNavigationButton = ({ Socket, dirction = "row", IconSize, ...rest }) => {
    return (
        <Flex 
        alignItems={"center"}
        flexDir={dirction}
        py={0}
        my={0} 
        {...rest}
         >
            <CogsModal Socket={Socket} {...(IconSize && { ...IconSize })} />
            <NotificationsCard Socket={Socket} {...(IconSize && { ...IconSize })} />
        </Flex>
    );
};

export default SidebarNavigationButton;
