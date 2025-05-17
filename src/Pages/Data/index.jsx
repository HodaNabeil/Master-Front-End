import { ExpiredMessage, Spinner } from "@/Common";
import { useLang, useNotify, useValidateRole, useValidateSection } from "@/Hooks";
import { LogoutR, SetAppData, SetFilter, useGetCdnListQuery, useGetDataQuery } from "@/Redux";
import { BodyHelper, Helper } from "@/Utility";
import { Box, Flex } from "@chakra-ui/react";
import { clearAllListeners } from "@reduxjs/toolkit";
import { lazy, startTransition, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const CdnTypes = ["Matrial", "Layout", "PriceList"];
const Pages = {
    1: lazy(() => import("./1")),
    2: lazy(() => import("./2"))
};
const ModalState = {
    CompoundId: "",
    Type: "",
    SendType: "",
    Title: "",
    Content: "",
    IsOpen: false
};
const ViewDataState = {
    IsOpen: false,
    Title: "",
    Content: ""
};
export default function AppDataPage({ Socket }) {
    const { Version, ServerStatus } = useSelector((state) => state.Helper);
    const { IsPersonal } = useValidateRole();
    const { IsCommercial, SelectedCityId } = useValidateSection();
    const Notify = useNotify();
    const Lang = useLang();
    const Dispatch = useDispatch();
    const Filter = useSelector((state) => state.Filter);
    const { City, Section } = useSelector((state) => state.Public);
    const { SelectedItem } = useSelector((state) => state.AppData);
    const { UserAccessToken, UserSelectedResidential, UserSelectedCommercial, UserId } =
        useSelector((state) => state.Auth);
    const [ViewData, SetViewData] = useState(ViewDataState);
    const [Modal, SetModal] = useState(ModalState);
    const SectionsOptions = useMemo(() => {
        return Lang?.DATA_PAGE?.TABS?.SECTIONS?.length > 0 ? Lang?.DATA_PAGE?.TABS?.SECTIONS : [];
    }, [Lang?.DATA_PAGE?.TABS?.SECTIONS]);
    useEffect(() => {
        const AllSectionsOptions =
            Lang?.DATA_PAGE?.TABS?.SECTIONS?.length > 0 ? Lang?.DATA_PAGE?.TABS?.SECTIONS : [];
        const GetbSections = Section ? Section?.map((sec) => sec.SectionId) : [];
        const OldSelectedSec = Helper.GetStorage("Section");
        if (AllSectionsOptions?.length < 0 || !GetbSections?.length < 0 || Filter.DataSectionId)
            return;
        if (OldSelectedSec) {
            const IsExits = GetbSections.includes(OldSelectedSec?.value);
            let NewSec = OldSelectedSec;
            if (!IsExits) {
                NewSec = AllSectionsOptions?.find((item) => item.value == GetbSections[0]);
            }
            if (!NewSec) return;
            Dispatch(
                SetFilter({
                    DataSectionId: NewSec ? NewSec : null
                })
            );
            Helper.SetStorage("Section", NewSec);
        } else {
            const NewSction = AllSectionsOptions[0];
            Dispatch(
                SetFilter({
                    DataSectionId: NewSction
                })
            );
            Helper.SetStorage("Section", NewSction);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Lang?.DATA_PAGE?.TABS?.SECTIONS?.length, Section]);
    const CityOptions = useMemo(() => {
        const OldSelectedSection = Helper.GetStorage("Section");
        let Section = Filter.DataSectionId?.value;
        if (!Filter.DataSectionId && OldSelectedSection) {
            Section = OldSelectedSection?.value;
        }
        if (!Section) {
            Section = SectionsOptions[0]?.value;
        }
        const Filterd = City?.filter((C) => C.CitySectionId == Section);
        return Filterd?.length > 0
            ? Filterd?.map((C) => ({
                  label: C.CityName,
                  value: C.CityId,
                  id: C.CityId
              }))
            : [];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [City, Filter.DataSectionId?.value, SectionsOptions?.length]);
    useEffect(() => {
        const OldSelectedCity = Helper.GetStorage("City");
        if (OldSelectedCity) {
            // Filter.NotifyCityId
            // HandleOldCity(OldSelectedCity, OldSelectedSection);
            Dispatch(
                SetFilter({
                    DataCityId: OldSelectedCity
                })
            );
        } else if (!OldSelectedCity && CityOptions.length > 0) {
            const NewCity = CityOptions[0];
            Dispatch(
                SetFilter({
                    DataCityId: [NewCity]
                })
            );
            Helper.SetStorage("City", [NewCity]);
        } else {
            // eslint-disable-next-line no-console
            console.log("Wating For City ...");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [CityOptions?.length]);
    // const
    const {
        data,
        isFetching,
        refetch: refetchData,
        isUninitialized,
        isError,
        error
    } = useGetDataQuery(BodyHelper.Data(Filter), {
        skip:
            !Filter.DataCityId ||
            Filter.DataCityId.length == 0 ||
            typeof Filter?.DataSectionId != "object" ||
            !UserAccessToken,
        refetchOnMountOrArgChange: true
    });
    useEffect(() => {
        if (isError) {
            const LogOutCodes = [401, 403];
            if (LogOutCodes.includes(error.status)) {
                const Msg = Helper.ValidateErrorMessage(error);
                Notify("error", Msg);
                Dispatch(LogoutR());
                if (Socket) {
                    Socket.Emit("Logout", UserId);
                }
                clearAllListeners();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError]);
    const ProcessData = useMemo(() => {
        let Data = data?.data?.results;
        if (!IsPersonal) {
            let Selected = IsCommercial ? UserSelectedCommercial : UserSelectedResidential;
            if (Selected?.length > 0) {
                const GetCityIfFound = Selected?.find(
                    (item) => item.UserAreaCityId == SelectedCityId
                );
                if (GetCityIfFound) {
                    let SelectedIds = GetCityIfFound.UserAreaValue;
                    if (SelectedIds?.length > 0) {
                        Data = Data?.filter((item) => SelectedIds.includes(item.DataAreaId));
                    }
                }
            }
        }
        return {
            Data: data?.data ? Data : [],
            SideBar: data?.data ? data?.data?.Filter : [],
            Meta: data?.data ? data?.data?.meta : {}
        };
    }, [
        IsCommercial,
        IsPersonal,
        SelectedCityId,
        UserSelectedCommercial,
        UserSelectedResidential,
        data?.data
    ]);
    // ============================================== Delete after add new view
    useEffect(() => {
        if (ProcessData.Data?.length > 0) {
            Dispatch(SetAppData({ SelectedItem: ProcessData.Data[0] }));
        }
    }, [ProcessData]);
    // ============================================== end Delete after add new view
    useEffect(() => {
        if (ServerStatus.Main) return;
        if (!isUninitialized) {
            refetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ServerStatus.Main, isUninitialized]);
    const HandleReset = useCallback(
        (WithSelected = true) => {
            if (Modal.IsOpen) {
                SetModal(ModalState);
            }
            if (ViewData.IsOpen) {
                SetViewData(ViewDataState);
            }
            if (WithSelected) {
                Dispatch(SetAppData({ SelectedItem: null }));
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [Modal.IsOpen, ViewData.IsOpen]
    );
    useEffect(() => {
        if (SelectedItem?.DataId) {
            HandleReset(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SelectedItem?.DataId]);
    const OnSetModalData = useCallback(
        (Data) => {
            let { Type, Extra } = Data || {
                Extra: ""
            };
            let error = false;
            switch (Type) {
                case "DataCoordinates":
                    if (!Data.Content)
                        error = Lang?.ERRORS?.NO_COORDINATES?.replace("{{Compound}}", Extra);
                    break;
                default:
                    break;
            }
            if (error) {
                Notify("error", error);
                return;
            }
            startTransition(() => {
                SetModal({
                    CompoundId: Data.CompoundId,
                    Title: Data.Title,
                    Content: Data.Content,
                    Type: Data.Type,
                    SendType: Data.SendType ? Data.SendType : "",
                    Size: Data?.Size ? Data.Size : null,
                    Extra: Data?.Extra ? Data?.Extra : null,
                    IsOpen: true
                });
                SetViewData(ViewDataState);
            });
        },
        [Lang?.ERRORS?.NO_COORDINATES, Notify]
    );
    const OnSetFileViewData = (Data) => {
        startTransition(() => {
            SetViewData({
                IsOpen: true,
                Title: Data.Title,
                Content: Data.Content,
                Type: Data.Type,
                CompoundId: Data.CompoundId
            });
        });
    };
    const {
        data: CdnData,
        isFetching: IsCdnLoading,
        isError: isCdnerror,
        error: CdnError
    } = useGetCdnListQuery(Modal.Content, {
        skip: !Modal.Content || !CdnTypes.includes(Modal.Type),
        refetchOnMountOrArgChange: true
    });
    useEffect(() => {
        if (isCdnerror) {
            SetModal(ModalState);
            const Msg = Helper.ValidateErrorMessage(CdnError);
            Notify(CdnError.status == 503 ? "error" : "info", Msg);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCdnerror]);
    useEffect(() => {
        if (Filter.DataViewTab) {
            HandleReset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Filter.DataViewTab]);
    useEffect(() => {
        if (Version) {
            HandleReset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Version]);
    const MainProps = {
        OnSetFileViewData,
        OnSetModalData,
        IsCdnLoading,
        SetViewData,
        ProcessData,
        HandleReset,
        isFetching,
        isCdnerror,
        ViewData,
        SetModal,
        CdnData,
        Notify,
        Filter,
        Modal,
        Lang
    };
    const PageToView = useMemo(() => {
        const Component = Pages[Version];
        return Component;
    }, [Version]);
    if (City?.length < 1 || CityOptions?.length < 1)
        return (
            <Flex fontSize={"3xl"} justifyContent={"center"} alignItems={"center"} h={"100vh"}>
                <Spinner Width={200} />
            </Flex>
        );
    return (
        <Box h={"100vh"} pos={"relative"}>
            <Suspense
                fallback={
                    <Flex
                        fontSize={"3xl"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        h={"100vh"}
                    >
                        <Spinner Width={200} />
                    </Flex>
                }
            >
                <PageToView {...MainProps} Socket={Socket} />
            </Suspense>
            <ExpiredMessage />
        </Box>
    );
}
