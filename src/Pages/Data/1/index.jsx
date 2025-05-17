import { OldVersionNavbar, Spinner } from "@/Common";
import { AppDataPopupsHelperOld, VersionOneSidebar } from "@/Components";
import { useWindowSize } from "@/Hooks";
import { Box, Flex } from "@chakra-ui/react";
import { lazy, memo, Suspense, useMemo } from "react";
import { useSelector } from "react-redux";
const BasicTable = lazy(() => import("@/Components/Data/_OldVersion/Basic"));
const DetailsTable = lazy(() => import("@/Components/Data/_OldVersion/Details"));
const SmallAppDataContent = lazy(() => import("@/Components/Data/_DataContent"));
const DataOldVersionPage = ({
    OnSetFileViewData,
    OnSetModalData,
    SelectedItem,
    IsCdnLoading,
    SetViewData,
    ProcessData,
    isFetching,
    isCdnerror,
    ViewData,
    SetModal,
    CdnData,
    Socket,
    Notify,
    Filter,
    Modal,
    Lang
}) => {
    const { width } = useWindowSize();
    const { ToggleSideBar, NavHeight, Rtl } = useSelector((state) => state.Helper);
    const IsMobile = width < 768;
    const ProcessViewTable = useMemo(() => {
        return width < 768
            ? SmallAppDataContent
            : Filter.DataViewTab == "Basic"
            ? BasicTable
            : Filter.DataViewTab == "Details"
            ? DetailsTable
            : BasicTable;
    }, [Filter.DataViewTab, width]);
    const { width: WindowWidth } = useWindowSize();
    const GridCols = {
        NavHeight: {
            base: NavHeight,
            sm: NavHeight,
            md: NavHeight,
            lg: NavHeight
        },
        SidbarSize: {
            "2xl": Rtl ? (ToggleSideBar ? 320 : 270) : 270,
            xl: Rtl ? (ToggleSideBar ? 320 : 260) : 260,
            lg: Rtl ? (ToggleSideBar ? 320 : 250) : 250,
            md: Rtl ? (ToggleSideBar ? 320 : 290) : 300
        },
        SmallSideBar: 50,
        Main: 30,
        Col1: {
            base: 30,
            md: 30,
            lg: 11,
            xl: 10,
            "2xl": WindowWidth > 1600 ? 6 : 7
        },
        Col2: {
            base: 30,
            md: 30,
            lg: 19,
            xl: 20,
            "2xl": WindowWidth > 1600 ? 24 : 23
        }
    };
    const MainLayout = {
        NavSideWidth: {
            base: `100%`,
            md: ToggleSideBar ? `${GridCols.SidbarSize.md}px` : `${GridCols.SmallSideBar}px`,
            lg: ToggleSideBar ? `${GridCols.SidbarSize.lg}px` : `${GridCols.SmallSideBar}px`,
            xl: ToggleSideBar ? `${GridCols.SidbarSize.xl}px` : `${GridCols.SmallSideBar}px`
        },
        SideWidth: {
            base: "100%",
            sm: "60%",
            md: `${GridCols.SidbarSize.md}px`,
            lg: `${GridCols.SidbarSize.lg}px`,
            xl: `${GridCols.SidbarSize.xl}px`
        },
        MainWidth: {
            base: "100%",
            md: ToggleSideBar ? `${WindowWidth - GridCols.SidbarSize.md}px` : `${WindowWidth}px`,
            lg: ToggleSideBar ? `${WindowWidth - GridCols.SidbarSize.lg}px` : `${WindowWidth}px`,
            xl: ToggleSideBar ? `${WindowWidth - GridCols.SidbarSize.xl}px` : `${WindowWidth}px`
        },
        MainLeft: {
            base: "0",
            md: !ToggleSideBar ? 0 : `${GridCols.SidbarSize.md}px`,
            lg: !ToggleSideBar ? 0 : `${GridCols.SidbarSize.lg}px`,
            xl: !ToggleSideBar ? 0 : `${GridCols.SidbarSize.xl}px`
        }
    };
    const DirProps = Rtl
        ? {
              right: 0
          }
        : {
              left: 0
          };
    const MainDirProps = Rtl
        ? {
              right: MainLayout.MainLeft
          }
        : {
              left: MainLayout.MainLeft
          };
    return (
        <>
            <Box
                w={MainLayout.SideWidth}
                pos={"fixed"}
                top={{
                    base: `${NavHeight}vh`,
                    md: 0
                }}
                {...DirProps}
                transform={ToggleSideBar ? `translateX(0)` : `translateX(${Rtl ? "100" : "-100"}%)`}
                transition={"all 0.5s ease"}
                zIndex={{
                    base: 10,
                    md: "unset",
                    lg: 1
                }}
                className="Main-Background-Top"
            >
                <VersionOneSidebar
                    SideBarApiData={ProcessData.SideBar}
                    SmallSize={GridCols.SmallSideBar}
                    NavHeight={NavHeight}
                    Rtl={Rtl}
                    Socket={Socket}
                />
            </Box>
            <Box
                w={MainLayout.MainWidth}
                top={0}
                pos={"fixed"}
                transition={"all 0.4s ease"}
                {...MainDirProps}
            >
                <OldVersionNavbar
                    Tab={Filter.DataViewTab}
                    DataCount={Filter.DataCityId.length > 0 ? ProcessData.Data?.length : 0}
                    GridCols={GridCols}
                    MainLayout={MainLayout}
                    WindowWidth={WindowWidth}
                    Lang={Lang}
                    Socket={Socket}
                />
                <Suspense
                    fallback={
                        <Flex
                            fontSize={"3xl"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            h={"90vh"}
                        >
                            <Spinner Width={200} />
                        </Flex>
                    }
                >
                    <ProcessViewTable
                        OnSetModalData={OnSetModalData}
                        SelectedItem={SelectedItem}
                        IsLoading={isFetching}
                        {...(IsMobile && { GridCols })}
                        Modal={Modal}
                        Data={isFetching ? [] : ProcessData.Data}
                        maxH={{
                            base: "",
                            sm: `${100 - NavHeight - 1}vh`,
                            md: `${100 - NavHeight - 1}vh`
                        }}
                    />
                </Suspense>
            </Box>
            <AppDataPopupsHelperOld
                OnSetFileViewData={OnSetFileViewData}
                IsCdnLoading={IsCdnLoading}
                SetViewData={SetViewData}
                isCdnerror={isCdnerror}
                ViewData={ViewData}
                SetModal={SetModal}
                CdnData={CdnData}
                Notify={Notify}
                Modal={Modal}
                Lang={Lang}
            />
        </>
    );
};

export default memo(DataOldVersionPage);
