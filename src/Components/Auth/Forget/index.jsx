import { PhoneInput } from "@/Common";
import { Button, Flex, Text } from "@chakra-ui/react";

const Reset = ({ setActiveTab, HandleSubmit, state, HandleChange, IsLoading, Lang, Rtl }) => {
    return (
        <>
            <form onSubmit={(e) => HandleSubmit(e, "Forget", state)}>
                <PhoneInput
                    Name="UserPhoneNumber"
                    Label={Lang?.AUTH_PAGE?.INPUTS?.PHONE_NUMBER}
                    Value={state.UserPhoneNumber}
                    OnChange={HandleChange}
                    IsAuth={true}
                />
                <Button
                    type="submit"
                    colorScheme="whiteAlpha"
                    variant="outline"
                    color={"white"}
                    width={"100%"}
                    my="20px"
                    letterSpacing={"2px"}
                    transition={"0.3s"}
                    _hover={{ letterSpacing: "4px" }}
                    isLoading={IsLoading}
                    isDisabled={IsLoading}
                >
                    {Lang?.SUBMIT}
                </Button>
            </form>
            <Flex gap={"2"} alignItems={"center"} dir={Rtl ? "rtl" : "ltr"}>
                <Text color={"whiteAlpha.800"} size={"17px"} fontWeight={"light"}>
                    {Lang?.AUTH_PAGE?.ASK?.BACKTO}
                </Text>
                <Button onClick={() => setActiveTab("Login")} colorScheme="blue" variant="link">
                    {Lang?.AUTH_PAGE?.BUTTONS?.Login}
                </Button>
            </Flex>
        </>
    );
};

export default Reset;
