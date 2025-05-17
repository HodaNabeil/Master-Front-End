import { useLang, useNotify } from "@/Hooks";
import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    Avatar,
    Text,
    IconButton
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { useSelector } from "react-redux";
export default function IpAdressReval() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const Notify = useNotify();
    const { IpAdress } = useSelector((state) => state.Helper);
    const [State, SetState] = useState("");
    const Lang = useLang();
    useEffect(() => {
        if (isOpen) {
            SetState(Lang?.PUBLIC?.IP_CHECK_1);
            setTimeout(() => {
                SetState(Lang?.PUBLIC?.IP_CHECK_2);
            }, 2000);
            setTimeout(() => {
                SetState(IpAdress);
            }, 4000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);
    const CopyToClipboard = () => {
        try {
            navigator.clipboard.writeText(IpAdress);
            Notify("success", Lang?.PUBLIC?.COPY_TO_CLIPBOARD);
        } catch {
            Notify("error", "Copy Failed");
        }
    };
    return (
        <>
            <Avatar
                onClick={onOpen}
                h={"2rem"}
                w={"2rem"}
                pos={"fixed"}
                top={"1rem"}
                left={"1rem"}
                zIndex={10}
                cursor={"pointer"}
                rounded={"full"}
                src="/Img/ip.png"
            />
            <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
                <ModalOverlay />
                <ModalContent className="Main-Modal">
                    <ModalCloseButton rounded={"full"} top={1} />
                    <ModalBody
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        minH={"5rem"}
                        gap={1}
                    >
                        <Text
                            fontSize={"clamp(.8rem, 1.5vw, 1rem)"}
                            fontWeight={"bold"}
                            color={"white"}
                            className="Title-Modal"
                        >
                            {State}
                        </Text>
                        {IpAdress == State && (
                            <IconButton
                                onClick={() => CopyToClipboard()}
                                icon={<MdContentCopy />}
                                h={"2rem"}
                                w={"2rem"}
                                size={"sm"}
                                rounded={"full"}
                                bg={"blue.500"}
                                color={"white"}
                                _hover={{ bg: "blue.600" }}
                            />
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
