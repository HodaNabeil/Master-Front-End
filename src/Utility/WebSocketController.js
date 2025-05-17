import {
    CreateNotification,
    DeleteNotification,
    LoginR,
    LogoutR,
    ResetWpData,
    SetNotifications,
    SetPublicData,
    SetWpData,
    UpdateNotification,
    UpdateUserData
} from "@/Redux";
import Helper from "./Helper";
import { clearAllListeners } from "@reduxjs/toolkit";
import { FindLang } from "@/Utility/_FindLang";
import Store from "@/Redux/Store";
class WebSocketController {
    constructor({ dispatch, navigate, Notify, Lang, socket, User }) {
        this.dispatch = dispatch;
        this.Notify = Notify;
        this.navigate = navigate;
        this.Socket = socket;
        this.User = User;
        this.SetLang(Lang);
    }
    async SetLang(Lang) {
        const FindLocal = await FindLang(Lang);
        this.Lang = FindLocal;
    }
    Error(data) {
        const LogOutCodes = [401, 403];
        const { code, message } = data;
        this.Notify("error", message);
        if (LogOutCodes.includes(code)) {
            this.dispatch(LogoutR());
            clearAllListeners();
        }
    }
    NotifyMessage(Title, Message) {
        if ("Notification" in window) {
            Notification.requestPermission().then((permission) => {
                if (permission == "granted") {
                    new Notification(Title, {
                        body: Message ? Message : ""
                    });
                } else {
                    let AllowedNotification = Helper.GetStorage("AllowedNotification");
                    if (!AllowedNotification) {
                        Helper.SetStorage("AllowedNotification", true);
                        this.Notify(
                            "warn",
                            "If you want to receive notifications, please allow notifications. In your browser Settings."
                        );
                    }
                }
            });
        }
    }
    // Root
    RootIndex(data) {
        const { Device, User } = data.data;
        if (Device?.DeviceValue) {
            Helper.SetStorage("Device", Device?.DeviceValue);
        }
        if (User) {
            const OldUSerData = Helper.GetStorage("User");
            const UData = {
                UserId: User.UserId,
                UserName: User.UserName,
                UserEmail: User.UserEmail,
                UserPhoneNumber: User.UserPhoneNumber,
                UserCompanyName: User.UserCompanyName,
                UserRole: User.UserRole,
                UserSelectedResidential: User.UserSelectedResidential,
                UserSelectedCommercial: User.UserSelectedCommercial,
                UserAccessToken: User.UserAccessToken,
                UserIsActive: User.UserIsActive,
                UserIsConnectedSession: User?.UserIsConnectedSession
            };
            Object.assign(OldUSerData, UData);
            if (User?.UserExpiry) {
                Object.assign(OldUSerData, { UserExpiry: User?.UserExpiry });
            }
            this.dispatch(LoginR(OldUSerData));
            delete data.data?.User;
        }
        this.dispatch(SetPublicData(data.data));
    }
    IntegrationQrCode(data) {
        const { message } = data;
        const { QRCode } = data.data || {};
        const UserData = Helper.GetStorage("User");
        const { UserIsConnectedSession } = UserData;
        const IsSettings = window.location.pathname == "/Settings";
        if (!UserIsConnectedSession && IsSettings) {
            if (QRCode) {
                this.Notify("info", this.Lang.WHASTAPP_SENDER?.MESSAGES?.[message]);
                this.dispatch(
                    SetWpData({
                        Avatar: QRCode
                    })
                );
                this.dispatch(
                    UpdateUserData({
                        UserIsConnectedSession: false
                    })
                );
            }
            if (QRCode == null) {
                this.Notify("error", this.Lang.WHASTAPP_SENDER?.MESSAGES?.[`${message}_NULL`]);
                this.dispatch(
                    SetWpData({
                        Avatar: "/Img/whatsapp.webp"
                    })
                );
                this.dispatch(
                    UpdateUserData({
                        UserIsConnectedSession: false
                    })
                );
            }
        }
    }
    IntegrationConnecting(data) {
        const { message } = data;
        const IsSettings = window.location.pathname == "/Settings";
        if (IsSettings) {
            this.Notify("warn", this?.Lang.WHASTAPP_SENDER?.MESSAGES?.[message]);
        }
    }
    IntegrationConnected(data) {
        const { message, data: UserDetails } = data;
        const IsSettings = window.location.pathname == "/Settings";
        if (IsSettings) {
            this.Notify("success", this.Lang?.WHASTAPP_SENDER?.MESSAGES?.[message]);
        }
        // const UserData = Helper.GetStorage("User");
        // const {UserIsConnectedSession} = UserData;
        if (UserDetails) {
            const Data = {
                IsConnected: true,
                Name: UserDetails.WaName,
                Phone: UserDetails.WaPhone,
                Avatar: UserDetails.WaAvatar
            };
            this.dispatch(SetWpData(Data));
            this.dispatch(
                UpdateUserData({
                    UserIsConnectedSession: true
                })
            );
        }
    }
    IntegrationDelete(data) {
        const { data: UserDetails } = data;
        this.Notify("warn", this.Lang?.WHASTAPP_SENDER?.MESSAGES?.["OnDisConnected"]);
        if (UserDetails) {
            this.dispatch(ResetWpData());
            this.dispatch(
                UpdateUserData({
                    UserIsConnectedSession: false
                })
            );
        }
    }
    SubUserSettings(data) {
        if (data?.data) {
            this.dispatch(UpdateUserData(data?.data));
        }
    }
    NotificationRestore(data) {
        const { Refetch, PlaceMent } = data.data || {};
        const { UserId } = Helper.GetStorage("User");
        const { value: SelectedSection } = Helper.GetStorage("Section");
        if (Refetch && UserId) {
            this.Socket.Emit(PlaceMent, {
                command: "Index",
                query: {
                    UId: UserId,
                    Section: SelectedSection
                }
            });
        }
    }
    NotificationIndex(data) {
        const { code, data: NotificationData } = data;
        const { results: Notifications } = NotificationData;
        if (code == 201 || code == 200) {
            this.dispatch(SetNotifications(Notifications));
        }
    }
    NotificationCreate(data) {
        const { code, data: NotificationData } = data;
        if ((code == 201 || code == 200) && NotificationData) {
            this.dispatch(CreateNotification(NotificationData));
        }
    }
    NotificationUpdate(data) {
        const { code, data: NotificationData } = data;
        if (code == 200 && NotificationData) {
            this.dispatch(UpdateNotification(NotificationData));
            this.NotifyMessage(NotificationData?.NotifyTitle, NotificationData?.NotifyMessage);
        }
    }
    NotificationDelete(data) {
        const { code, data: NotificationData } = data;
        if (code == 200 && NotificationData) {
            this.dispatch(DeleteNotification(NotificationData?.NotifyId));
        }
    }
    UserUpdate(data) {
        const User = data?.data;
        if (User) {
            const UData = {
                UserId: User.UserId,
                UserName: User.UserName,
                UserEmail: User.UserEmail,
                UserPhoneNumber: User.UserPhoneNumber,
                UserCompanyName: User.UserCompanyName,
                UserRole: User.UserRole,
                UserSelectedResidential: User.UserSelectedResidential,
                UserSelectedCommercial: User.UserSelectedCommercial,
                UserIsActive: User.UserIsActive,
                UserIsConnectedSession: User?.UserIsConnectedSession
            };
            if (User?.UserAccessToken) {
                UData.UserAccessToken = User?.UserAccessToken;
            }
            if (User?.UserExpiry) {
                UData.UserExpiry = User?.UserExpiry;
            }

            this.dispatch(LoginR(UData));
        }
    }
    UserRestore(data) {
        const { Refetch, PlaceMent } = data.data || {};
        if (Refetch) {
            const Device = Helper.GetStorage("Device");
            const { UserId, UserRole } = this.User || {};
            this.Socket.Emit(PlaceMent, {
                command: "Index",
                query: {
                    UId: UserId,
                    UDevice: Device,
                    URole: UserRole ? UserRole?.RoleKey : ""
                }
            });
        }
    }
    UserLogout(data) {
        const { code, message, data: Body } = data;
        if (code == 200) {
            const { DeviceValue, IsAll } = Body;
            if (IsAll) {
                this.dispatch(LogoutR());
                clearAllListeners();
                this.Notify("info", message);
            } else {
                const HaveDevice = Store.GetState("Public");
                if (HaveDevice?.Device && HaveDevice?.Device?.DeviceValue == DeviceValue) {
                    this.dispatch(LogoutR());
                    clearAllListeners();
                    this.Notify("info", message);
                }
            }
        }
    }
}
export default WebSocketController;
