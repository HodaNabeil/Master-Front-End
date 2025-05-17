import {
    Box,
    Divider,
    Flex,
    Icon,
    IconButton,
    Image,
    MenuItem,
    useColorMode
} from "@chakra-ui/react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { RoutingManager, ThemeColors } from "@/Utility";
import { LogoutR } from "@/Redux";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ColorSwitch, LangSwitch, SiteLogo, VersionSwitch } from "@/Common";
import {
    MdCompare,
    MdDashboard,
    MdOutlineDataset,
    MdOutlineWifiTethering,
    MdOutlineWifiTetheringOff,
    MdSettings
} from "react-icons/md";
import { useLang, useValidateRole } from "@/Hooks";
export default function Content({ Socket, IsModal = true }) {
    const { IsCompany, IsGold } = useValidateRole();
    const { colorMode } = useColorMode();
    const { UserName, UserPhoneNumber, UserCompanyName, UserRole, UserIsConnectedSession, UserId } =
        useSelector((state) => state.Auth);
    const { ServerStatus, Rtl, Version } = useSelector((state) => state.Helper);
    const PathName = useLocation().pathname;
    const Lang = useLang();
    const Navigate = useNavigate();
    const Dispatch = useDispatch();
    const HandleGoTo = (Path) => Navigate(Path);
    const IsDataPage = useMemo(
        () =>
            PathName?.split("?")[0]?.toLowerCase() ==
            RoutingManager.Client.Data.Path?.toLowerCase(),
        [PathName]
    );
    function HandleLogout() {
        if (Socket) {
            Socket.Emit("Logout", UserId);
        }
        Dispatch(LogoutR());
        HandleGoTo(RoutingManager.Client.Auth.Path);
    }
    const ProcessRoleText = useMemo(() => {
        if (UserRole) {
            const { RoleKey } = UserRole;
            return ["Company", "SubUser"].includes(RoleKey) ? UserCompanyName : RoleKey;
        }
        return null;
    }, [UserCompanyName, UserRole]);
    const Routes = useMemo(() => {
        const RoutesIcons = {
            Home: MdOutlineDataset,
            Data: MdOutlineDataset,
            Settings: MdSettings,
            Dashboard: MdDashboard,
            Comparison: MdCompare,
            Sales: MdCompare
        };
        return Object.values(RoutingManager.Client)
            ?.filter(
                (Rout) =>
                    (IsCompany && Rout.Name == "Dashboard") ||
                    (IsGold && Rout.Name == "Sales") ||
                    Rout.Allowed
            )
            ?.map((Rout) => ({
                ...Rout,
                Name: Lang?.NAVBAR?.ROUTES?.[Rout.Name]
                    ? Lang?.NAVBAR?.ROUTES?.[Rout.Name]
                    : Rout.Name,
                Icon: RoutesIcons[Rout.Name]
            }));
    }, [IsCompany, IsGold, Lang?.NAVBAR?.ROUTES]);
    const VersionViewText = useMemo(() => {
        const FindVersion = Lang?.VERSIONS?.find((v) => v.Value == Version);
        return Lang?.VERSION_VIEW?.replace("{{Version}}", FindVersion?.Label);
    }, [Lang?.VERSIONS, Lang?.VERSION_VIEW, Version]);
    const ValidateRouteItem = useMemo(() => {
        if (IsModal) return MenuItem;
        return Flex;
    }, [IsModal]);
    return (
        <>
            <Flex flexDir={"column"} alignItems={"center"}>
                <SiteLogo h={"9rem"} py={"2.5rem"} w={"100%"} maxW={"15rem"} />
                <Box as="h4" mt={2} fontWeight={"bold"} dir={Rtl ? "rtl" : "ltr"}>
                    {Lang?.DATA_PAGE?.ACCOUNT} {ProcessRoleText}
                </Box>
                <h6 dir={Rtl ? "rtl" : "ltr"}>
                    {UserName} - {UserPhoneNumber}
                </h6>
                <Divider />
                <Flex alignItems={"center"} columnGap={2} dir={Rtl ? "rtl" : "ltr"}>
                    {Lang?.SERVER}
                    <Icon
                        as={ServerStatus.Main ? MdOutlineWifiTethering : MdOutlineWifiTetheringOff}
                        color={ServerStatus.Main ? "green" : "red"}
                        fontSize={"2rem"}
                    />
                </Flex>
                <Flex alignItems={"center"} columnGap={2} dir={Rtl ? "rtl" : "ltr"}>
                    {Lang?.WHASTAPP_SENDER?.STATUS}
                    <Icon
                        as={
                            UserIsConnectedSession
                                ? MdOutlineWifiTethering
                                : MdOutlineWifiTetheringOff
                        }
                        color={UserIsConnectedSession ? "green" : "red"}
                        fontSize={"2rem"}
                    />
                </Flex>
                {IsDataPage && <h3 dir={Rtl ? "rtl" : "ltr"}>{VersionViewText}</h3>}
                <Divider />
            </Flex>
            {Routes?.map((Rout) => {
                const IsSelected = Rout.Path?.toLowerCase() == PathName?.toLowerCase();
                let IconToShow = Rout.Icon ? Rout.Icon : null;
                return (
                    <ValidateRouteItem
                        key={Rout.Name}
                        mt={2}
                        isDisabled={IsSelected}
                        icon={<IconToShow />}
                        rounded={"md"}
                        className={`Shadow Menu-Navbar-MenuItem-Bg${IsSelected ? "-Active" : ""}`}
                        onClick={() => HandleGoTo(Rout.Path)}
                    >
                        {Rout.Name}
                    </ValidateRouteItem>
                );
            })}
            {IsDataPage && (
                <VersionSwitch
                    Lang={Lang}
                    mt={3}
                    display={{
                        base: "none",
                        md: "flex"
                    }}
                />
            )}
            <LangSwitch mt={2} />
            <Flex alignItems={"center"} justifyContent={"space-between"} mx={"25%"} mt={1}>
                <IconButton
                    color={ThemeColors.NavIconColor[colorMode]}
                    icon={<RiLogoutCircleLine />}
                    onClick={HandleLogout}
                    bg={"red.500"}
                    _hover={{
                        bg: "red.700"
                    }}
                    rounded={"full"}
                    transition={"all .3s ease-in-out"}
                    className="Shadow"
                />
                <ColorSwitch />
            </Flex>
        </>
    );
}
