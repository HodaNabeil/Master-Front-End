import { Button, Text } from "@chakra-ui/react";
import { InputField, PhoneInput } from "@/Common";
import { useNotify } from "@/Hooks";
import { Validation } from "@/Utility";
import { useMemo } from "react";

const FirstRegistration = ({ Lang, setActiveStep, state, HandleChange, Rtl }) => {
    const toast = useNotify();
    const handleSubmitButton = (e) => {
        e.preventDefault();
        const errors = Validation.StepOneRegister(state);
        if (errors.length == 0) {
            setActiveStep("SecondRegistration");
        } else {
            toast("error", Lang?.VALIDATION?.[errors[0]]);
        }
    };

    const NextBtn = useMemo(() => {
        const DataToReturn = {
            IsDisabled: false,
            Bg: "green.600"
        };
        const errors = Validation.StepOneRegister(state);
        if (errors.length > 0) {
            DataToReturn.IsDisabled = true;
            DataToReturn.Bg = "red.700";
        }
        return {
            ...DataToReturn,
            Errors: errors
        };
    }, [state]);
    return (
        <form onSubmit={handleSubmitButton}>
            {NextBtn.Errors?.map((Err) => (
                <Text color="red.500" dir={Rtl ? "rtl" : "ltr"} key={Err}>
                    ※ {Lang?.VALIDATION?.[Err]}
                </Text>
            ))}
            <InputField
                Label={Lang?.AUTH_PAGE?.INPUTS?.USER_NAME}
                Name="UserName"
                Value={state.UserName}
                OnChange={HandleChange}
                IsAuth={true}
            />
            <InputField
                Label={Lang?.AUTH_PAGE?.INPUTS?.EMAIL}
                Name="UserEmail"
                Value={state.UserEmail}
                OnChange={HandleChange}
                Type="email"
                IsAuth={true}
            />
            <PhoneInput
                Name="UserPhoneNumber"
                Label={Lang?.AUTH_PAGE?.INPUTS?.PHONE_NUMBER}
                Value={state.UserPhoneNumber}
                OnChange={HandleChange}
                OnCountryChange={(e) =>
                    HandleChange({ target: { name: "UserCountryCode", value: e ? e : "" } })
                }
                IsAuth={true}
            />
            <InputField
                Label={Lang?.AUTH_PAGE?.INPUTS?.PASSWORD}
                Name="UserPassword"
                Value={state.UserPassword}
                OnChange={HandleChange}
                Type="password"
                IsAuth={true}
            />
            <Button
                type="submit"
                textTransform="capitalize"
                width="100%"
                color="white"
                letterSpacing="2px"
                fontWeight="500"
                transition="0.3s"
                bg={NextBtn.Bg}
                _hover={{ backgroundColor: NextBtn.Bg }}
            >
                {Lang?.NEXT}
            </Button>
        </form>
    );
};

export default FirstRegistration;
