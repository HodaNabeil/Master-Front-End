import { SetPublicData } from "@/Redux";
import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContectItem from "./ContectItem";
import { useLang } from "@/Hooks";
import { Helper } from "@/Utility";
export default function NotificationsComponent() {
    const Dispatch = useDispatch();
    const Lang = useLang();
    const { SelectedNotification } = useSelector((state) => state.Public);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const OnClose = () => {
        if (SelectedNotification) {
            Dispatch(
                SetPublicData({
                    SelectedNotification: null
                })
            );
        }
        onClose();
    };
    useEffect(() => {
        if (SelectedNotification) {
            onOpen();
        } else {
            if (isOpen) {
                OnClose();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SelectedNotification, isOpen]);
    const { NotifySrc, NotifyTitle, NotifyMessage, NotifyMimeType } = SelectedNotification || {};

    if (!SelectedNotification) return null;
    const IsTitleArabic = Helper.IsArabic(NotifyTitle);

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => OnClose()}
            // closeOnEsc={false}
            // closeOnOverlayClick={false}
            isCentered={true}
        >
            <ModalOverlay />
            <ModalContent w={"max-content"} maxW={"container.lg"}>
                <ModalBody
                    p={1}
                    rounded={"lg"}
                    position={"relative"}
                    w={"100%"}
                    overflow={"hidden"}
                >
                    <ContectItem
                        Src={NotifySrc ? NotifySrc : NotifyMessage}
                        MimeType={NotifyMimeType}
                        onClick={() => OnClose()}
                    />
                </ModalBody>
                <ModalFooter alignItems={"center"} justifyContent={"space-between"} py={2}>
                    {NotifyTitle && <Text dir={IsTitleArabic ? "rtl" : "ltr"}>{NotifyTitle}</Text>}
                    <Flex alignItems={"center"} justifyContent={"space-between"} gap={2}>
                        <Button
                            colorScheme="blue"
                            className="Tab Shadow"
                            mr={3}
                            size={"sm"}
                            onClick={() => OnClose()}
                        >
                            {Lang?.CLOSE}
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
