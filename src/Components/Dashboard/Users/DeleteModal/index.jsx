import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button
} from "@chakra-ui/react";
function DeleteModal({
    IsOpen = false,
    OnClose = () => {},
    OnSubmit = () => {},
    IsLoading = false,
    Label = "",
    Message = "Are you sure? You can't undo this action afterwards.",
    Lang
}) {
    return (
        <>
            <AlertDialog isOpen={IsOpen} onClose={OnClose} isCentered={true}>
                <AlertDialogOverlay>
                    <AlertDialogContent as={"form"} onSubmit={OnSubmit}>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            {Label}
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            {Message?.split("\n")?.map((item, index) => (
                                <p key={index}>{item}</p>
                            ))}
                        </AlertDialogBody>
                        <AlertDialogFooter gap={2}>
                            <Button
                                colorScheme="green"
                                _hover={{
                                    bg: "green.700",
                                    color: "white"
                                }}
                                onClick={OnClose}
                                transition={".5s ease"}
                                w={"50%"}
                            >
                                {Lang?.CLOSE}
                            </Button>
                            <Button
                                colorScheme="red"
                                w={"50%"}
                                _hover={{
                                    bg: "red.700",
                                    color: "white"
                                }}
                                type="submit"
                                //  ml={3}
                                transition={".5s ease"}
                                isLoading={IsLoading}
                                isDisabled={IsLoading}
                            >
                                {Lang?.DELETE}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}
export default DeleteModal;
