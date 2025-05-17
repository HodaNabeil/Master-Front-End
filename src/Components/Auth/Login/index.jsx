import { Box, Button, Flex, Text } from "@chakra-ui/react";

import "./login.css";

import { InputField, PhoneInput } from "@/Common";

const Login = ({ Lang, setActiveTab, state, HandleSubmit, HandleChange, IsLoading, Rtl }) => {
    return (
        <Box marginTop={"6px"}>
            <form onSubmit={(e) => HandleSubmit(e, "Login", state)}>
                <PhoneInput
                    Name="Method"
                    Label={Lang?.AUTH_PAGE?.INPUTS?.PHONE_NUMBER}
                    Value={state.Method}
                    OnChange={HandleChange}
                    IsAuth={true}
                />
                <InputField
                    Label={Lang?.AUTH_PAGE?.INPUTS?.PASSWORD}
                    Name="Password"
                    Value={state.Password}
                    OnChange={HandleChange}
                    Type="password"
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

            <Flex
                alignItems={"center"}
                flexDir={"column"}
            >
                <Flex
                    dir={Rtl ? "rtl" : "ltr"}
                    alignItems={"center"}
                    gap={1}
                    w={"100%"}
                >
                    <Text color={"whiteAlpha.800"} size={"17px"} fontWeight={"light"}>
                        {Lang?.AUTH_PAGE?.ASK?.DONT_HAVE_ACCOUNT}
                    </Text>
                    <Button
                        onClick={() => setActiveTab("Register")}
                        colorScheme="blue"
                        variant="link"
                    >
                        {Lang?.AUTH_PAGE?.BUTTONS?.Register}
                    </Button>
                </Flex>
                <Box dir={Rtl ? "rtl" : "ltr"} w={"100%"}>
                    <Button
                        onClick={() => setActiveTab("Forget")}
                        colorScheme="blue"
                        variant="link"
                        dir={Rtl ? "rtl" : "ltr"}
                    >
                        {Lang?.AUTH_PAGE?.BUTTONS?.Forget}
                    </Button>
                </Box>
            </Flex>
        </Box>
    );
};

export default Login;
