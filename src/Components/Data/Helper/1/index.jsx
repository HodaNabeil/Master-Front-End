import { Spinner } from "@/Common";
import { Flex } from "@chakra-ui/react";
import { lazy, startTransition, Suspense, useEffect, useMemo } from "react";
const ActionsModal = lazy(() => import("../../Modals/Actions"));
const MapModal = lazy(() => import("../../Modals/Map"));
const MatrialView = lazy(() => import("../../View/Matrial"));
const LayoutsView = lazy(() => import("../../View/Layouts"));
const PriceListView = lazy(() => import("../../View/PriceList"));
const FileView = lazy(() => import("@/Common/FileView"));
export default function AppDataPopupsHelperOld({
    OnSetFileViewData,
    IsCdnLoading,
    SetViewData,
    isCdnerror,
    ViewData,
    SetModal,
    CdnData,
    Notify,
    Modal,
    Lang
}) {
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
    return (
        <Suspense
            fallback={
                <Flex fontSize={"3xl"} justifyContent={"center"} alignItems={"center"} h={"90vh"}>
                    <Spinner Width={200} />
                </Flex>
            }
        >
            {ModalView ? (
                <ModalView
                    Data={Modal}
                    FileViewLoading={ViewData.IsOpen ? ViewData.Content : false}
                    OnClose={() =>
                        SetModal({
                            CompoundId: "",
                            Type: "",
                            SendType: "",
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
        </Suspense>
    );
}
