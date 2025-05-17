import { LoginR, SetHelperData, SetNewLang, SetServerStatus } from "@/Redux";
import { Helper, RoutingManager, WebSocketInstance } from "@/Utility";
import WebSocketController from "@/Utility/WebSocketController";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import NotificationsComponent from "../Notifications";
import { useNotify, useValidateSection } from "@/Hooks";
let checked = false;
export default function WebSocketEvents({ Socket, setSocket }) {
    const Notify = useNotify();
    const PathName = useLocation().pathname;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const User = Helper.GetStorage("User");
    const Device = Helper.GetStorage("Device");
    const OldLang = Helper.GetStorage("Lang");
    const ReadedNotifications = Helper.GetStorage("Notifications");
    const { SelectedNotification } = useSelector((state) => state.Public);
    const { IpAdress } = useSelector((state) => state.Helper);
    const { UserId } = useSelector((state) => state.Auth);
    const Version = Helper.GetStorage("Version");
    useEffect(() => {
        if (Version) {
            // Helper.UpdateVersion(Version);
            const GetWindowSize = Helper.GetScreenSize().width < 500;
            if (GetWindowSize) {
                dispatch(SetHelperData({ Version: 2 }));
            } else {
                dispatch(SetHelperData({ Version: Version }));
            }
        } else {
            Helper.SetStorage("Version", "2");
        }
    }, [Version, dispatch]);
    useEffect(() => {
        if (!OldLang) {
            dispatch(SetNewLang("en"));
        }
        if (User?.UserAccessToken) {
            dispatch(LoginR(User));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        const ConnectToSocket = (OldLang, Token) => {
            if (Socket) {
                Socket.Close();
            }
            const SocketInstace = RoutingManager.SocketConnection(OldLang, Token);
            const CustomeWebSocket = new WebSocketInstance(SocketInstace);
            CustomeWebSocket.Connect();
            setSocket(CustomeWebSocket);
        };
        if (OldLang) {
            dispatch(SetNewLang(OldLang));
            if (User?.UserAccessToken) {
                ConnectToSocket(OldLang, User?.UserAccessToken);
                return;
            }
            ConnectToSocket(OldLang);
        } else {
            dispatch(SetNewLang("en"));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [OldLang, User?.UserAccessToken]);
    useEffect(() => {
        const ProtectedRoutes = Object.values(RoutingManager.Client)
            ?.filter((Rout) => Rout.Protected)
            ?.map((Rout) => Rout.Path?.toLowerCase());
        if (!User?.UserAccessToken && ProtectedRoutes.includes(PathName?.toLowerCase())) {
            navigate(RoutingManager.Client.Auth.Path);
        }
        if (
            User?.UserAccessToken &&
            PathName?.toLowerCase() == RoutingManager.Client.Auth.Path?.toLowerCase()
            // PathName?.toLowerCase()?.includes(RoutingManager.Client.Auth.Path?.toLowerCase())
        ) {
            navigate(RoutingManager.Client.Data.Path);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [PathName, User?.UserAccessToken]);
    useEffect(() => {
        function HandleEvents(Controller, key, data) {
            const { command } = data;
            const ProcessCommand = `${key}${command}`;
            if (Controller[ProcessCommand]) {
                Controller[ProcessCommand](data);
            }
            if (key == RoutingManager.Commands.Error && Controller[RoutingManager.Commands.Error]) {
                Controller[RoutingManager.Commands.Error](data);
            }
        }
        function HandleVerifyUser(Connection, UId) {
            if (Connection == "Online") {
                dispatch(
                    SetServerStatus({
                        Main: true
                    })
                );
            }
            if (UId && Device) {
                Socket.Emit(RoutingManager.SocketEvents.Auth, {
                    command: "Verify",
                    body: {
                        UserId: UId,
                        UserDevice: Device || "",
                        UserConnection: Connection,
                        URole: User?.UserRole ? User?.UserRole?.RoleKey : ""
                    }
                });
            }
        }
        if (Socket) {
            Socket.On("connect", () => HandleVerifyUser("Online", UserId));
            Socket.OnError((Err) => {
                if (Err) {
                    dispatch(
                        SetServerStatus({
                            Main: false
                        })
                    );
                }
            });
            // Socket.OnAny((...args)=> {
            //     console.log(args)
            // })
            Socket.Emit(RoutingManager.SocketEvents.Root, {
                command: "Index",
                query: {
                    UId: UserId,
                    UDevice: Device,
                    URole: User?.UserRole ? User?.UserRole?.RoleKey : "",
                    Notifications: ReadedNotifications?.[Helper.DayDate]
                        ? ReadedNotifications?.[Helper.DayDate]
                        : []
                }
            });
            const Controller = new WebSocketController({
                dispatch: dispatch,
                Notify: Notify,
                navigate: navigate,
                Lang: OldLang,
                socket: Socket,
                User
            });
            Object.keys(RoutingManager.SocketEvents)?.map((key) => {
                let k = key.includes(":") ? key.replace(":", "") : key;
                Socket.On(key, (data) => HandleEvents(Controller, k, data));
            });
            return () => {
                Socket.Off("connect", () => HandleVerifyUser("Online", UserId));
                Object.keys(RoutingManager.SocketEvents)?.map((key) => {
                    let k = key.includes(":") ? key.replace(":", "") : key;
                    Socket.Off(key, (data) => HandleEvents(Controller, k, data));
                });
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Socket]);
    const { SelectedSection } = useValidateSection();
    useEffect(() => {
        if (Socket && SelectedSection) {
            Socket.Emit(RoutingManager.SocketEvents.Notification, {
                command: "Index",
                query: {
                    Section : SelectedSection
                }
            });
        }
    }, [Socket, SelectedSection]);
    useEffect(() => {
        const CheckIpAdress = async () => {
            try {
                const res = await fetch("https://api.ipify.org?format=json", {
                    method: "GET"
                });
                const data = await res.json();
                dispatch(
                    SetHelperData({
                        IpAdress: data.ip
                    })
                );
                Helper.SetStorage("IpAdress", data.ip);
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                // console.log(error);
            }
        };
        if (!IpAdress && !checked) {
            CheckIpAdress();
            checked = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [IpAdress]);
    const Viewer = useMemo(() => {
        if (!SelectedNotification || !UserId) return null;
        return <NotificationsComponent />;
    }, [SelectedNotification, UserId]);
    // return null
    return Viewer;
}
