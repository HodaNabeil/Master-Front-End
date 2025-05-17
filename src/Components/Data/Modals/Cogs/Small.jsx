import {
    Badge,
    Box,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    useDisclosure
} from "@chakra-ui/react";
import { TbMenu2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { SetHelperData } from "@/Redux";
import CogsModal from ".";
import NotificationsCard from "../Notifications";

const CogsModalSmall = ({ Socket, ...rest }) => {
    const { isOpen, onToggle } = useDisclosure();
    const { ToggleSideBar } = useSelector((state) => state.Helper);
    const [isSideWasOpen, setIsSideWasOpen] = useState(false);
    const Disptach = useDispatch();
    const { Notifications = [] } = useSelector((state) => state.Public);
    const NotificationsReadyToView = useMemo(() => {
        if (!Notifications || !Notifications.length) return null;
        return Notifications?.filter((item) => item.NotifyShow);
    }, [Notifications]);
    return (
        <Menu
            gutter={0}
            boundary={"scrollParent"}
            placement="auto"
            strategy="fixed"
            zIndex={"modal"}
            isOpen={isOpen}
            onOpen={() => {
                onToggle();
                if (ToggleSideBar) {
                    setIsSideWasOpen(true);
                    Disptach(SetHelperData({ ToggleSideBar: false }));
                }
            }}
            onClose={() => {
                onToggle();
                if (isSideWasOpen) {
                    setIsSideWasOpen(false);
                    Disptach(SetHelperData({ ToggleSideBar: true }));
                }
            }}
        >
            <Box pos={"relative"}>
                <MenuButton as={IconButton} icon={<TbMenu2 />} {...rest} />
                {NotificationsReadyToView && NotificationsReadyToView?.length > 0 && (
                    <Badge
                        position={"absolute"}
                        bottom={"-1"}
                        right={0}
                        zIndex={1}
                        variant="solid"
                        bg="red"
                        rounded={"full"}
                    >
                        {NotificationsReadyToView?.length}
                    </Badge>
                )}
            </Box>
            <MenuList
                py={0}
                w={{
                    base : "100%",
                    md : "fit-content"
                }}
                className="Main-Modal Shadow"
                zIndex={"modal"}
                transform={"translateX(-110%) scale(0.1)"}
                transition={".5s ease-in-out"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                pos={"relative"}
            >
                <CogsModal Socket={Socket} boxSize={"2.5rem"} />
                <NotificationsCard Socket={Socket} boxSize={"2.5rem"} />
            </MenuList>
        </Menu>
    );
};

export default CogsModalSmall;
