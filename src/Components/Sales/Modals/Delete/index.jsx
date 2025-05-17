import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogOverlay,
    Button
} from "@chakra-ui/react";
import { memo } from "react";

function DeleteModalSales({
    OnClose = () => {},
    OnSubmit = () => {},
    IsLoading = false,
    IsOpen,
    State,
    Lang,
}) {
    return (
        <AlertDialog isOpen={IsOpen} onClose={OnClose} isCentered={true}>
            <AlertDialogOverlay>
                <AlertDialogContent
                    as={"form"}
                    onSubmit={(e) => OnSubmit(e, State)}
                    className="Main-Modal"
                >
                    <AlertDialogBody
                        fontSize="lg"
                        wordBreak={"break-word"}
                        whiteSpace={"pre-line"}
                        minH={"10rem"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        textAlign={"center"}
                    >
                        {Lang?.PUBLIC?.DELETE_MESSAGE?.replace("{{Name}}", "") ||
                            "Are you sure? \n You can't undo this action afterwards."}
                    </AlertDialogBody>
                    <AlertDialogFooter gap={2} justifyContent={"center"}>
                        <Button colorScheme="blue" onClick={OnClose}>
                            {Lang?.CLOSE}
                        </Button>
                        <Button
                            colorScheme="red"
                            variant="solid"
                            type="submit"
                            className="Shadow"
                            isLoading={IsLoading}
                            isDisabled={IsLoading}
                        >
                            {Lang?.SUBMIT}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}
export default memo(DeleteModalSales);
