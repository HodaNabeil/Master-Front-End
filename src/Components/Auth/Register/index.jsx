import { Box, Button, Flex, Text } from "@chakra-ui/react";
import FirstRegistration from "./First";
import SecondRegistration from "./Second";
import ThirdRegistration from "./Third";
import { cloneElement, useState } from "react";
import "./Register.css";
const Register = ({ Lang, setActiveTab, state, HandleChange, HandleSubmit, IsLoading, Rtl }) => {
    const [ActiveStep, setActiveStep] = useState("FirstRegistration");

    const RegisterSteps = {
        FirstRegistration: (
            <FirstRegistration
                setActiveStep={setActiveStep}
                state={state}
                HandleChange={HandleChange}
                Lang={Lang}
                Rtl={Rtl}
            />
        ),
        SecondRegistration: (
            <SecondRegistration
                setActiveStep={setActiveStep}
                state={state}
                HandleChange={HandleChange}
                Lang={Lang}
                Rtl={Rtl}
            />
        ),
        ThirdRegistration: (
            <ThirdRegistration
                setActiveStep={setActiveStep}
                state={state}
                HandleChange={HandleChange}
                HandleSubmit={HandleSubmit}
                IsLoading={IsLoading}
                Lang={Lang}
                Rtl={Rtl}
            />
        )
    };
    return (
        <Box className="container-register">
            {cloneElement(RegisterSteps[ActiveStep], setActiveStep)}
            <Flex gap={"10px"} alignItems={"center"} mt={"10px"}
                                dir={Rtl ? "rtl" : "ltr"}

            >
                <Text color={"whiteAlpha.700"} textTransform={"capitalize"}>
                    {Lang?.AUTH_PAGE?.ASK?.HAVE_ACCOUNT}
                </Text>
                <Button
                    onClick={() => setActiveTab("Login")}
                    colorScheme="blue"
                    color={"blue.300"}
                    variant="link"
                >
                    {Lang?.AUTH_PAGE?.BUTTONS?.Login}
                </Button>
            </Flex>
        </Box>
    );
};

export default Register;
