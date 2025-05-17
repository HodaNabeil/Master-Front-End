import { Spinner } from "@/Common";
import {
    ResetWpData,
    SetWpData,
    UpdateUserData,
    useDeleteSessionMutation,
    useGetOrCreateSessionQuery
} from "@/Redux";
import { Helper } from "@/Utility";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const QrCodeComponent = ({ Lang, Rtl, Toast }) => {
    const Dispatch = useDispatch();
    const { UserPhoneNumber } = useSelector((state) => state.Auth);
    const { IsConnected, Name, Phone, Avatar } = useSelector((state) => state.Wp);
    const [
        DeleteSession,
        { isError: IsDeleteError, error: DeleteError, isLoading: isDeleteLoading }
    ] = useDeleteSessionMutation();
    const {
        data,
        isFetching: isLoading,
        isError,
        error
    } = useGetOrCreateSessionQuery(
        {
            SessionKey: UserPhoneNumber,
            Webhook: false,
            WebhookUrl: ""
        },
        {
            skip: IsConnected,
            refetchOnMountOrArgChange: true
        }
    );
    useEffect(() => {
        if (IsDeleteError) {
            const Msg = Helper.ValidateErrorMessage(DeleteError);
            Toast("error", Msg);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [IsDeleteError]);
    useEffect(() => {
        if (isError) {
            const Msg = Helper.ValidateErrorMessage(error);
            Toast("error", Msg);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError]);
    useEffect(() => {
        if (data?.data) {
            const { SessionWaUser, SessionPhoneConnected, isNew, Qrcode } = data.data || {};
            let Data = {};
            if (!isNew) {
                if(SessionWaUser?.WaPhone) {
                    Data = {
                        IsConnected: SessionPhoneConnected,
                        Name: SessionWaUser.WaName,
                        Phone: SessionWaUser.WaPhone,
                        Avatar: SessionWaUser.WaAvatar
                    };
                }else {
                    Data = {
                        Avatar: "/Img/whatsapp.webp",
                        IsConnected: false,
                        Name: "",
                        Phone: ""
                    };
                }
            } else {
                Data = {
                    Avatar: Qrcode
                };
                Dispatch(
                    UpdateUserData({
                        UserIsConnectedSession: false
                    })
                );
            }
            Dispatch(SetWpData(Data));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.data]);
    const HandleDelete = async () => {
        // const { data } =
        await DeleteSession({ SessionKey: UserPhoneNumber });
        Dispatch(ResetWpData());
        Dispatch(
            UpdateUserData({
                UserIsConnectedSession: false
            })
        );
    };
    return (
        <>
            <Flex w={"100%"} justifyContent={"center"} mt={1} flexDir={"column"}>
                <Box className="flex_center" w={"100%"} px={{ base: 4, md: 6 }}>
                    <Box
                        boxSize={{
                            base: "15rem",
                            md: "22rem"
                        }}
                    >
                        {isLoading ? (
                            <Spinner Width={200} />
                        ) : (
                            <Image
                                boxSize={"100%"}
                                objectFit="cover"
                                src={Avatar}
                                fallbackSrc="/Img/whatsapp.webp"
                                rounded={"lg"}
                                alt="whatsapp"
                            />
                        )}
                    </Box>
                </Box>
                {IsConnected && (
                    <Flex
                        flexDir={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        mt={2}
                        w={"100%"}
                    >
                        <Box
                            p={{ base: 4, md: 6 }}
                            w={{
                                base: "100%",
                                md: "22rem"
                            }}
                            dir={Rtl ? "rtl" : "ltr"}
                        >
                            <Text fontWeight={"black"}>
                                {Lang?.SETTINGS_PAGE?.USER_NAME} :{" "}
                                <span style={{ marginLeft: "2px", fontWeight: "normal" }}>
                                    {Name}
                                </span>{" "}
                            </Text>
                            <Text fontWeight={"black"}>
                                {Lang?.SETTINGS_PAGE?.NUMBER} :{" "}
                                <span style={{ marginLeft: "2px", fontWeight: "normal" }}>
                                    {Phone}
                                </span>
                            </Text>
                            <Button
                                fontWeight={"bold"}
                                variant={"solid"}
                                mt="10px"
                                w="100%"
                                className="Shadow"
                                isLoading={isDeleteLoading}
                                isDisabled={isDeleteLoading}
                                onClick={() => HandleDelete()}
                            >
                                {Lang?.SETTINGS_PAGE?.DELETE_SESSION}
                            </Button>
                        </Box>
                    </Flex>
                )}
            </Flex>
        </>
    );
};

export default memo(QrCodeComponent);
