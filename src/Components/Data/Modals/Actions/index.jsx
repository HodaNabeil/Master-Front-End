import { Helper } from "@/Utility";
import {
    Box,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text
} from "@chakra-ui/react";
export default function ActionModal({
    OnClose = () => {},
    Data = {
        IsOpen: false,
        Title: "",
        Content: ""
    }
}) {
    const IsContact = Data.Type == "Contacts";
    const IsArabic = Helper.IsArabic(Data.Content);
    const ArabicProps = IsArabic
        ? {
              direction: "rtl",
              textAlign: "right",
              padding: "10px",
              whiteSpace: "pre-line",
              overflow: "auto",
              maxH: "90vh",
              maxW: "100%",
              w: {
                  base: "100vw",
                  md: "90vw"
              }
          }
        : {};
    return (
        <>
            <Modal
                isOpen={Data.IsOpen}
                onClose={OnClose}
                isCentered={true}
                motionPreset="slideInLeft"
            >
                <ModalOverlay />
                <ModalContent
                    className="Main-Modal"
                    transform={"translateX(-110%) scale(0.1)"}
                    transition={".5s ease-in-out"}
                    minW={"max-content"}
                >
                    <ModalHeader py={1}>{Data.Title}</ModalHeader>
                    <ModalCloseButton rounded={"full"} />
                    <ModalBody {...ArabicProps}>
                        {IsContact && Data.Content}
                        {!IsContact && (
                            <Box
                                fontSize="sm"
                                textAlign={IsArabic ? "right" : "left"}
                                direction={IsArabic ? "rtl" : "ltr"}
                            >
                                {Data.Content?.split("~")?.map((item, index) => (
                                    <Text key={index}>{item}</Text>
                                ))}
                            </Box>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
