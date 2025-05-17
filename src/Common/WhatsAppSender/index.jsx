import { Flex, IconButton, Text } from "@chakra-ui/react";
import PhoneInput from "../PhoneInput";
import { IoLogoWhatsapp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Helper, RoutingManager, Validation } from "@/Utility";
import { useSelector } from "react-redux";
import { useLang, useNotify } from "@/Hooks";
import { useSendMessageMutation } from "@/Redux";
export default function WhatsAppSender({
    Type = "",
    Item = null,
    Data = {
        CompoundId: "",
        FileUrl: "",
        Message: "",
        Files: [],
        Extra: ""
    },
    WithLabel = true,
    ...rest
}) {
    const Notify = useNotify();
    const Lang = useLang();
    const { UserPhoneNumber, UserIsConnectedSession } = useSelector((state) => state.Auth);
    const [State, SetState] = useState({
        PhoneNumber: "",
        CountDown: 0,
        RunTimer: false
    });
    const Seconds = String(State.CountDown % 60).padStart(2, 0);
    const Minutes = String(Math.floor(State.CountDown / 60)).padStart(1, 0);
    const [SendMessage, { isLoading, isError, error }] = useSendMessageMutation();
    useEffect(() => {
        if (isError) {
            const Msg = Helper.ValidateErrorMessage(error);
            Notify("error", Msg);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError]);
    useEffect(() => {
        let timerId;
        if (State.RunTimer) {
            SetState((prev) => ({
                ...prev,
                CountDown: 60 * Helper.WhatsAppTime
            }));
            timerId = setInterval(() => {
                SetState((prev) => ({
                    ...prev,
                    CountDown: prev.CountDown - 1
                }));
            }, 1000);
        } else {
            clearInterval(timerId);
        }
        return () => clearInterval(timerId);
    }, [State.RunTimer]);
    useEffect(() => {
        if (State.CountDown < 0 && State.RunTimer) {
            SetState({
                CountDown: 0,
                RunTimer: false
            });
        }
    }, [State.CountDown, State.RunTimer]);
    const OnSendWhatsApp = async () => {
        if (!UserIsConnectedSession) {
            Notify("info", Lang?.ERRORS?.NO_CONNECTION?.replace("{key}", UserPhoneNumber));
            return;
        }
        let body = {
            CompoundId: Data.CompoundId,
            SessionKey: UserPhoneNumber,
            To: State.PhoneNumber?.startsWith("+") ? State.PhoneNumber?.slice(1) : State.PhoneNumber
        };
        let method = "PATCH";
        switch (Type) {
            case "List":
                body.Message = Data.Message?.replaceAll("~~", "\n")?.replaceAll("~", "\n");
                body.Files = Data.Files;
                method = "POST";
                break;
            case "Coordinates": {
                const Msg = Item
                    ? RoutingManager.ProjectLink?.replace(
                          "{{Project}}",
                          Item?.DataCompound
                      )?.replace("{{Id}}", Item?.DataCompoundId)
                    : Data.Extra;
                body.Message = Msg?.replaceAll(" ", "_");
                method = "PUT";
                break;
            }
            default:
                body.FileUrl = Data.FileUrl;
                break;
        }
        const Validate = Validation.WhatsAppSender(body, Type);
        if (Validate?.length > 0) return Notify("error", Lang?.VALIDATION?.[Validate[0]]);
        const { data } = await SendMessage({
            method,
            body
        });
        if (data && !data?.error) {
            if (Type == "List") {
                const { Failed, Success } = data.data;
                if (Failed?.length > 0) {
                    Failed.forEach((item) => {
                        const { Type: FileType, FileName } = item;
                        if (FileType == "Text") {
                            Notify("info", Lang?.WHASTAPP_SENDER?.DESCRIPTION_FAILD_TO_SEND);
                        } else if (FileType == "File") {
                            Notify(
                                "info",
                                Lang?.WHASTAPP_SENDER?.FILE_FAILD_TO_SEND?.replace(
                                    "{{File}}",
                                    FileName?.replaceAll("%20", " ")
                                )
                            );
                        }
                    });
                }
                if (Success?.length > 0) {
                    Notify(
                        "success",
                        Lang?.WHASTAPP_SENDER?.SUCCESS_SENT_FILES?.replace(
                            "{{Count}}",
                            Success.length
                        )
                    );
                }
                SetState((prev) => ({
                    ...prev,
                    RunTimer: true,
                    CountDown: 60 * Helper.WhatsAppTime
                }));
            } else {
                Notify("success", data.message);
            }
        }
    };
    return (
        <Flex flexDir={"column"} gap={0} my={0}>
            {WithLabel && (
                <>
                    {State.RunTimer && (
                        <Flex m={"auto"}>
                            <span>{Lang?.WHASTAPP_SENDER?.TIME_LEFT}</span>
                            <Text color="red.400">
                                {Minutes ?? 0}:{Seconds ?? 0}
                            </Text>
                        </Flex>
                    )}
                    <Flex m={"auto"} gap={1}>
                        <span> {Lang?.WHASTAPP_SENDER?.SEND_TO_LABEL}</span>
                        <Text color="red.400">{State.PhoneNumber}</Text>
                    </Flex>
                </>
            )}
            <Flex alignItems={"center"} gap="3px" mt={0}>
                <PhoneInput
                    Label=""
                    Name="PhoneNumber"
                    Value={State.PhoneNumber}
                    defaultCountry="EG"
                    OnChange={(e) => {
                        SetState((prev) => ({
                            ...prev,
                            PhoneNumber: e.target.value
                        }));
                    }}
                />
                {State.RunTimer ? (
                    <Flex
                        h={"2rem"}
                        w={"2.1rem"}
                        fontSize={"clamp(0.7rem, 2vw, 0.9rem)"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        className="Shadow"
                        rounded={"full"}
                        cursor={"pointer"}
                        onClick={() => {
                            Notify("info", Lang?.WHASTAPP_SENDER?.WAITING);
                        }}
                    >{`${Minutes ?? 0}:${Seconds ?? 0}`}</Flex>
                ) : (
                    <IconButton
                        icon={<IoLogoWhatsapp />}
                        label="Send"
                        aria-label="Send"
                        transform={"scale(1)"}
                        _hover={{
                            transform: "scale(1.1)"
                        }}
                        border={"none"}
                        outline={"none"}
                        rounded={"full"}
                        fontSize={"1.9rem"}
                        size={"sm"}
                        h={"2rem"}
                        w={"2rem"}
                        p={0}
                        transition={"transform 0.3s ease"}
                        onClick={() => OnSendWhatsApp()}
                        isLoading={State.RunTimer || isLoading}
                        isDisabled={State.RunTimer || Type == "" || isLoading}
                        {...rest}
                    />
                )}
            </Flex>
        </Flex>
    );
}
