import { WhatsAppSender } from "@/Common";
import {
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay
} from "@chakra-ui/react";
import MapContent from "./Content";
export default function MapModal({
    OnClose = () => {},
    Data = {
        Type: "",
        IsOpen: false,
        Title: "",
        Content:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.4522405693306!2d31.49013817435534!3d30.02388096954688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145822f58900525d%3A0x54cfdf9a541547ae!2s90%20Avenue%20Compound!5e0!3m2!1sen!2seg!4v1700918391014!5m2!1sen!2seg"
    }
}) {
    let Props = {
        h: "98vh",
        minW: "98vw",
        top: "1vh",
        left: "1vh",
        ...(Data?.Size ? Data.Size : {})
    };
    return (
        <>
            <Modal isOpen={Data.IsOpen} onClose={OnClose} isCentered={true}>
                <ModalOverlay />
                <ModalContent
                    rounded={"2xl"}
                    pos={"fixed"}
                    transform={"translateX(-110%) scale(0.1)"}
                    transition={".5s ease-in-out"}
                    {...Props}
                >
                    <Flex
                        maxW={"20rem"}
                        pos={"absolute"}
                        zIndex={1}
                        top={"0"}
                        right={"0"}
                        rounded={"full"}
                        px={Data.Type == "DataCoordinates" ? 2 : 0}
                        py={0}
                        alignItems={"center"}
                        className="Main-Modal Shadow"
                    >
                        {Data.Type == "DataCoordinates" && (
                            <WhatsAppSender
                                Type={"Coordinates"}
                                WithLabel={false}
                                Data={{
                                    CompoundId: Data.CompoundId,
                                    Message: Data.Content,
                                    Extra : Data.Extra
                                }}
                            />
                        )}
                        <ModalCloseButton
                            pos={"initial"}
                            top={"0"}
                            right={"0"}
                            bg={"gray.500"}
                            zIndex={1}
                            rounded={"full"}
                        />
                    </Flex>
                    <ModalBody h={"100%"} w={"100%"} rounded={"3xl"} p={0}>
                        <MapContent Data={Data} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
