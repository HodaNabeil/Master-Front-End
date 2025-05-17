import { Spinner } from "@/Common";
import { Box, CloseButton, Flex } from "@chakra-ui/react";
import { lazy, startTransition, Suspense, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
const ActionsModal = lazy(() => import("../../Modals/Actions/V2"));
const MapModal = lazy(() => import("../../Modals/Map/Content"));
const MatrialView = lazy(() => import("../../View/Matrial/V2"));
const LayoutsView = lazy(() => import("../../View/Layouts/V2"));
const PriceListView = lazy(() => import("../../View/PriceList/V2"));
const ItemInfo = lazy(() => import("../../_ItemInfo"));
const FileView = lazy(() => import("@/Common/FileView/V2"));
export default function AppDataPopupsHelper({
    OnSetFileViewData,
    OnSetModalData = () => {},
    IsCdnLoading,
    SetViewData,
    isCdnerror,
    ViewData,
    SetModal,
    CdnData,
    Notify,
    Modal,
    Lang,
    ModalsProps = {
        OnChecked: () => {},
        RichedLimit: false,
        Checked: {}
    },
}) {
    const { SelectedItem } = useSelector((state) => state.AppData);
    const ModalView = useMemo(() => {
        if (!Modal.Content || isCdnerror || IsCdnLoading) return null;
        switch (Modal.Type) {
            case "DataUrl":
            case "DataCoordinates":
                return MapModal;
            case "Matrial":
                return MatrialView;
            case "Layout":
                return LayoutsView;
            case "PriceList":
                return PriceListView;
            default:
                return ActionsModal;
        }
    }, [IsCdnLoading, Modal, isCdnerror]);
    useEffect(() => {
        if (Modal.Content && !isCdnerror && !IsCdnLoading && !Modal.IsOpen) {
            startTransition(() => {
                SetModal((prev) => ({
                    ...prev,
                    IsOpen: true
                }));
            });
        }
    }, [Modal, isCdnerror, IsCdnLoading, SetModal]);
    const ModalFileView = useMemo(() => {
        if (!ViewData.IsOpen) return null;
        return FileView;
    }, [ViewData.IsOpen]);
    // return null;
    const IsModalOpen = useMemo(() => {
        if (ModalView && !ModalFileView) return true;
        if (ModalFileView) return true;
        if (Modal.IsOpen && !ModalFileView) return true;
        return false;
    }, [Modal.IsOpen, ModalFileView, ModalView]);
    return (
        <Suspense
            fallback={
                <Flex fontSize={"3xl"} justifyContent={"center"} alignItems={"center"} h={"90vh"}>
                    <Spinner Width={200} />
                </Flex>
            }
        >
            {SelectedItem ? (
                <Box pos={"relative"} w={"100%"} h={"100%"} overflow={"hidden"}>
                    {IsModalOpen ? (
                        <>
                            {ModalView && !ModalFileView ? (
                                <ModalView
                                    Data={Modal}
                                    FileViewLoading={ViewData.IsOpen ? ViewData.Content : false}
                                    OnClose={() =>
                                        SetModal({
                                            Type: "",
                                            Title: "",
                                            Content: "",
                                            IsOpen: false
                                        })
                                    }
                                    Lang={Lang}
                                    Notify={Notify}
                                    OnSetFileViewData={OnSetFileViewData}
                                    CdnData={CdnData}
                                    IsLoading={IsCdnLoading}
                                    IsModel={false}
                                    ModalsProps={ModalsProps}
                                />
                            ) : null}
                            {ModalFileView ? (
                                <ModalFileView
                                    Data={ViewData}
                                    OnClose={() =>
                                        SetViewData({
                                            IsOpen: false,
                                            Title: "",
                                            Content: ""
                                        })
                                    }
                                    Lang={Lang}
                                    Notify={Notify}
                                />
                            ) : null}
                            {Modal.IsOpen && !ModalFileView && (
                                <CloseButton
                                    onClick={() =>
                                        SetModal({
                                            CompoundId: "",
                                            Type: "",
                                            SendType: "",
                                            Title: "",
                                            Content: "",
                                            IsOpen: false
                                        })
                                    }
                                    className="Main-Modal Shadow"
                                    size="sm"
                                    border={"1px solid"}
                                    rounded={"full"}
                                    pos={"absolute"}
                                    zIndex={1}
                                    top={"0"}
                                    right={0}
                                />
                            )}
                        </>
                    ) : (
                        <ItemInfo OnSetModalData={OnSetModalData} Modal={Modal}/>
                    )}
                </Box>
            ) : null}
        </Suspense>
    );
}

