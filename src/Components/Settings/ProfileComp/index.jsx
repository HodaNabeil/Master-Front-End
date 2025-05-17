import { InputField } from "@/Common";
import { useUpdateUserMutation } from "@/Redux";
import { Helper, Validation } from "@/Utility";
import { Button, Flex, Text } from "@chakra-ui/react";
import { memo, useEffect, useMemo, useState } from "react";

const ProfileComponent = ({ Lang, Rtl ,Toast}) =>  {
    const [State, setState] = useState({
        OldPassword: "",
        NewPassword: "",
        ConfirmNewPassword: ""
    });
    const [UpdateUser, { isError, error, isLoading }] = useUpdateUserMutation();
    useEffect(() => {
        if (isError) {
            const Msg = Helper.ValidateErrorMessage(error);
            Toast("error", Msg);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError]);
    const HandleSubmit = async (e) => {
        e.preventDefault();
        const Validete = Validation.Profile(State);
        if (Validete.length > 0) {
            return Toast("error", Validete[0]);
        }
        const { data } = await UpdateUser({
            UserOldPassword: State.OldPassword,
            UserPassword: State.NewPassword
        });
        if (data) {
            const { error, message } = data;
            Toast(error ? "info" : "success", message);
        }
    };
    const HandleChange = (e, fieldName) => {
        setState((prev) => ({
            ...prev,
            [fieldName]: e.target.value
        }));
    };
    const NextBtn = useMemo(() => {
        const DataToReturn = {
            IsDisabled: false,
            Bg: "green.600"
        };
        const errors = Validation.Profile(State);
        if (errors.length > 0) {
            DataToReturn.IsDisabled = true;
            DataToReturn.Bg = "red.700";
        }
        return {
            ...DataToReturn,
            Errors: errors
        };
    }, [State]);
    return (
        <>
            <Flex w={"100%"} justifyContent={"center"} mt={1}
            px={{ base: 4, md: 6 }}
            >
                <Flex
                    as={"form"}
                    p={"4"}
                    flexDir={"column"}
                    className="Shadow"
                    rounded={"lg"}
                    onSubmit={HandleSubmit}
                    w={{
                        base: "100%",
                        md: "22rem"
                    }}
                    gap={2}
                >
                    <div>
                        {NextBtn.Errors?.map((Err) => (
                            <Text color="red.500" dir={Rtl ? "rtl" : "ltr"} key={Err}>
                                ※ {Lang?.VALIDATION?.[Err]}
                            </Text>
                        ))}
                    </div>
                    <InputField
                        Type="password"
                        Label={Lang?.AUTH_PAGE?.INPUTS?.OLD_PASSWORD}
                        placeholder={"old Password"}
                        Value={State.OldPassword}
                        OnChange={(e) => HandleChange(e, "OldPassword")}
                    />

                    <InputField
                        Type="password"
                        Label={Lang?.AUTH_PAGE?.INPUTS?.NEW_PASSWORD}
                        placeholder={"new Password"}
                        Value={State.NewPassword}
                        OnChange={(e) => HandleChange(e, "NewPassword")}
                    />
                    <InputField
                        Type="password"
                        Label={Lang?.AUTH_PAGE?.INPUTS?.CONFIRM_NEW_PASSWORD}
                        placeholder={"confirm New Password"}
                        Value={State.ConfirmNewPassword}
                        OnChange={(e) => HandleChange(e, "ConfirmNewPassword")}
                    />

                    <Button
                        type="submit"
                        w={"50%"}
                        fontWeight={"bold"}
                        className="Shadow"
                        mt={2}
                        mx={"auto"}
                        bg={NextBtn.Bg}
                        isLoading={isLoading}
                        _hover={{ backgroundColor: NextBtn.Bg }}
                        isDisabled={isLoading || NextBtn.IsDisabled}
                    >
                        {Lang?.UPDATE}
                    </Button>
                </Flex>
            </Flex>
        </>
    );
}
export default memo(ProfileComponent);