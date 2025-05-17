import { InputField, SelectField } from "@/Common";
import { useNotify } from "@/Hooks";
import { Validation } from "@/Utility";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useMemo } from "react";

const SecondRegistration = ({ Lang, setActiveStep, state, HandleChange, Rtl }) => {
    const toast = useNotify();
    const RolesData = useMemo(() => {
        return Lang?.AUTH_PAGE?.OPTIONS?.ROLES ? Lang?.AUTH_PAGE?.OPTIONS?.ROLES : [];
    }, [Lang?.AUTH_PAGE?.OPTIONS?.ROLES]);
    const StartValue = 5;
    const Increment = 5;
    const NumOptions = 20;
    const UsersCountOptions = [
        {
            Name: Lang?.CHOOSE,
            Value: ""
        },
        ...Array.from({ length: NumOptions }, (_, index) => ({
            Name: StartValue + index * Increment,
            Value: StartValue + index * Increment
        })).concat({
            Name: "&#8734;",
            Value: 10000000
        })
    ];
    const CompanyId = useMemo(() => {
        return RolesData.find((role) => role.Key === "Company")?.Value;
    }, [RolesData]);

    const handleSubmitButton = (e) => {
        e.preventDefault();
        const IsCompany = state.UserRoleId == CompanyId;
        const errors = Validation.StepTwoRegister(state, IsCompany);
        if (errors.length < 1) {
            return setActiveStep("ThirdRegistration");
        } else toast("error", Lang?.VALIDATION?.[errors[0]]);
    };

    const NextBtn = useMemo(() => {
        const DataToReturn = {
            IsDisabled: false,
            Bg: "green.600"
        };
        const IsCompany = state.UserRoleId == CompanyId;
        if (IsCompany) {
            const errors = Validation.StepTwoRegister(state, IsCompany);
            if (errors.length > 0) {
                DataToReturn.IsDisabled = true;
                DataToReturn.Bg = "red.700";
            }
            DataToReturn.Errors = errors;
        }
        return DataToReturn;
    }, [CompanyId, state]);
    return (
        <form onSubmit={handleSubmitButton}>
            {NextBtn.Errors?.map((Err) => (
                <Text color="red.500" key={Err} dir={Rtl ? "rtl" : "ltr"}>
                    ※ {Lang?.VALIDATION?.[Err]}
                </Text>
            ))}
            <SelectField
                Id="UserRoleId"
                Label={Lang?.AUTH_PAGE?.INPUTS?.ROLE}
                Value={state.UserRoleId}
                OnChange={HandleChange}
                Name="UserRoleId"
                Options={RolesData}
                color="white"
                bg="#030625"
                _hover={{ bg: "#0f133d" }}
                IsAuth={true}
            />

            {state.UserRoleId == CompanyId && (
                <>
                    <InputField
                        Label={Lang?.AUTH_PAGE?.INPUTS?.COMPANY_NAME}
                        Name="UserCompanyName"
                        Value={state.UserCompanyName}
                        OnChange={HandleChange}
                        IsAuth={true}
                    />
                    <SelectField
                        Id="UsersCount"
                        Label={Lang?.AUTH_PAGE?.INPUTS?.USERS_COUNT}
                        Value={state.UserSubUsersCount}
                        OnChange={HandleChange}
                        Name="UserSubUsersCount"
                        Options={UsersCountOptions}
                        color="white"
                        bg="#030625"
                        _hover={{ bg: "#0f133d" }}
                        IsAuth={true}
                    />
                </>
            )}
            <Flex gap={"20px"} my={"10px"} justifyContent={"space-between"} alignItems={"center"}>
                <Button
                    size="md"
                    width="100%"
                    backgroundColor="transparent"
                    style={{ border: "1px solid white " }}
                    color="white"
                    _hover={{ backgroundColor: "#fffefe2e" }}
                    onClick={() => setActiveStep("FirstRegistration")}
                >
                    {Lang?.PREV}
                </Button>
                <Button
                    color="white"
                    bg={NextBtn.Bg}
                    isDisabled={NextBtn.IsDisabled}
                    width="100%"
                    size="md"
                    type="submit"
                    _hover={{ backgroundColor: NextBtn.Bg }}
                >
                    {Lang?.NEXT}
                </Button>
            </Flex>
        </form>
    );
};

export default SecondRegistration;
