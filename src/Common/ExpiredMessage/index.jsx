import { useLang, useValidateRole } from "@/Hooks";
import { SetHelperData } from "@/Redux";
import { Box, CloseButton, Flex } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ExpiredMessage() {
    const Lang = useLang();
    const Dispatch = useDispatch();
    const { IsSubUser } = useValidateRole();
    const { UserExpiry } = useSelector((state) => state.Auth);
    const { ExpiredMessage } = useSelector((state) => state.Helper);
    const IsExpired = useMemo(() => {
        const { Diff, IsToday } = UserExpiry;
        if (!Diff && Diff != 0)
            return {
                IsExpired: false,
                isToday: false,
                Diff: 4
            };
        return {
            IsExpired: Diff <= 3,
            IsToday,
            Diff
        };
    }, [UserExpiry]);
    const Show = useMemo(() => {
      if(IsSubUser) return false;
        return !ExpiredMessage || !IsExpired.IsExpired ? false : true;
    }, [ExpiredMessage, IsExpired.IsExpired, IsSubUser]);
    useEffect(() => {
        if (IsExpired.IsExpired && !ExpiredMessage) {
            setTimeout(() => {
                Dispatch(SetHelperData({ ExpiredMessage: true }));
            }, 3000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    let Message = useMemo(() => {
        if (IsExpired.IsToday) {
            return Lang?.PUBLIC?.TODAY_EXPIRED_MESSAGE
                ? Lang?.PUBLIC?.TODAY_EXPIRED_MESSAGE
                : "Your Account Will Expire Today At Mid Night";
        }
        return Lang?.PUBLIC?.EXPIRED_MESSAGE
            ? Lang?.PUBLIC?.EXPIRED_MESSAGE
            : "{{days}} Days Left To Expire Your Account";
    }, [IsExpired.IsToday, Lang?.PUBLIC?.EXPIRED_MESSAGE, Lang?.PUBLIC?.TODAY_EXPIRED_MESSAGE]);

    return (
        <Box
            pos={"absolute"}
            top={"0"}
            left={{
                base: "2%",
                sm: "0"
            }}
            w={{
                base: "95%",
                sm: "60%",
                md: "30rem"
            }}
            h={"7rem"}
            zIndex={"100"}
            rounded={"lg"}
            bg={"#C40C0C"}
            className="Shadow"
            // className="Shadow Main-Background"
            transform={Show ? "translateY(0)" : "translateY(-100%)"}
            opacity={Show ? 1 : 0}
            transition={"all .5s ease-in-out"}
        >
            <CloseButton
                className="Shadow"
                border={"1px solid"}
                pos={"absolute"}
                top={"0.5rem"}
                right={"0.5rem"}
                rounded={"full"}
                onClick={() => Dispatch(SetHelperData({ ExpiredMessage: false }))}
            />
            <Flex
                h={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
                fontSize={"1.1rem"}
                fontWeight={"bold"}
            >
                {Message?.replace("{{days}}", IsExpired.Diff)}
            </Flex>
        </Box>
    );
}
