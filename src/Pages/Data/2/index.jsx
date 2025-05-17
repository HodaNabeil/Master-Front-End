import { NewVersionNavbar } from "@/Common";
import { useWindowSize } from "@/Hooks";
import { Box, Grid, GridItem, useBreakpoint } from "@chakra-ui/react";
import { memo, startTransition, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
    AppDataContent,
    AppDataPopupsHelper,
    AppDataPopupsHelperOld,
    VersionTwoSidebar
} from "@/Components";
let SmallBreakPoints = ["base", "sm", "md"];
const SmSideBreakPoints = ["base", "sm"];
const DataNewVersionPage = ({
    OnSetFileViewData,
    OnSetModalData,
    IsCdnLoading,
    SetViewData,
    HandleReset,
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
    const { width: WindowWidth, height: WindowHeight } = useWindowSize();
    const Breakpoint = useBreakpoint();
    const { ToggleSideBar, Rtl, NavHeight } = useSelector((state) => state.Helper);
    const GridCols = {
        NavHeight: {
            base: WindowHeight > 700 ? 9 : 10,
            sm: WindowHeight > 600 ? 8 : 18,
            md: WindowHeight > 650 ? 10 : 12,
            lg: 10,
            xl: 11,
            "2xl": 10
        },
        SidbarSize: {
            "2xl": Rtl ? (ToggleSideBar ? 320 : 270) : 270,
            xl: Rtl ? (ToggleSideBar ? 320 : 260) : 260,
            lg: Rtl ? (ToggleSideBar ? 320 : 250) : 250,
            md: Rtl ? (ToggleSideBar ? 320 : 290) : 300
        },
        SmallSideBar: 58,
        Main: 30,
        Col1: {
            base: 30,
            md: 30,
            lg: 13,
            xl: 10,
            "2xl": 9
        },
        Col2: {
            base: 30,
            md: 30,
            lg: 17,
            xl: 20,
            "2xl": 21
        }
    };
    const MainLayout = {
        NavSideWidth: {
            base: `28%`,
            md: ToggleSideBar ? `${GridCols.SidbarSize.md}px` : `${GridCols.SmallSideBar}px`,
            lg: ToggleSideBar ? `${GridCols.SidbarSize.lg}px` : `${GridCols.SmallSideBar}px`,
            xl: ToggleSideBar ? `${GridCols.SidbarSize.xl}px` : `${GridCols.SmallSideBar}px`
        },
        SideWidth: {
            base: "100%",
            sm: "50%",
            md: ToggleSideBar
                ? `${GridCols.SidbarSize.md}px`
                : `${GridCols.SidbarSize.md + GridCols.SmallSideBar}px`,
            lg: ToggleSideBar ? `${GridCols.SidbarSize.lg}px` : `${GridCols.SmallSideBar}px`,
            xl: ToggleSideBar ? `${GridCols.SidbarSize.xl}px` : `${GridCols.SmallSideBar}px`
        },
        MainWidth: {
            base: "100%",
            md: ToggleSideBar
                ? `${WindowWidth - GridCols.SidbarSize.md}px`
                : `${WindowWidth - GridCols.SmallSideBar - 8}px`,
            lg: ToggleSideBar
                ? `${WindowWidth - GridCols.SidbarSize.lg - 8}px`
                : `${WindowWidth - GridCols.SmallSideBar - 8}px`,
            xl: ToggleSideBar
                ? `${WindowWidth - GridCols.SidbarSize.xl}px`
                : `${WindowWidth - GridCols.SmallSideBar - 8}px`
        },
        MainLeft: {
            base: "0",
            md: ToggleSideBar ? `${GridCols.SidbarSize.md}px` : `${GridCols.SmallSideBar + 5}px`,
            lg: ToggleSideBar ? `${GridCols.SidbarSize.lg}px` : `${GridCols.SmallSideBar + 5}px`,
            xl: ToggleSideBar ? `${GridCols.SidbarSize.xl}px` : `${GridCols.SmallSideBar + 5}px`
        }
    };
    const HelperViewComponent = useMemo(() => {
        if (SmallBreakPoints.includes(Breakpoint)) return AppDataPopupsHelperOld;
        return AppDataPopupsHelper;
    }, [Breakpoint]);
    const MainDirProps = Rtl
        ? {
              right: MainLayout.MainLeft,
              mr: 1
          }
        : {
              left: MainLayout.MainLeft,
              ml: 1
          };
    let MaxArraySize = 15;
    const [RichedLimit, SetRichedLimit] = useState(false);
    const [Checked, setChecked] = useState({
        PriceListFile: "",
        Description: false,
        Brochure: [],
        Contract: [],
        MasterPlan: [],
        Photos: []
    });
    const ValidateAllFiles = useMemo(() => {
        const All = [
            ...Checked.Brochure,
            ...Checked.Contract,
            ...Checked.MasterPlan,
            ...Checked.Photos
        ];
        if (All.length >= MaxArraySize) {
            SetRichedLimit(All.length >= MaxArraySize);
        } else {
            SetRichedLimit(false);
        }
        return All;
    }, [Checked.Brochure, Checked.Contract, Checked.MasterPlan, Checked.Photos, MaxArraySize]);
    const OnChecked = (Name, File, Type = "Single") => {
        startTransition(() => {
            if (Name == "Description") {
                return setChecked((prev) => ({ ...prev, Description: File }));
            }
            if (Name == "PriceListFile") {
                return setChecked((prev) => ({ ...prev, PriceListFile: File }));
            }
            let NewData = Checked[Name];
            const StillNeded = MaxArraySize - ValidateAllFiles.length;
            if (Type == "Single") {
                const isSelected = NewData.includes(File);
                if (StillNeded == 0 && !isSelected) return;
                if (isSelected) {
                    NewData = NewData?.filter((item) => item !== File);
                } else {
                    NewData = [...NewData, File];
                }
                setChecked((prev) => ({
                    ...prev,
                    [Name]: NewData
                }));
                return;
            }
            const New = NewData.length == 0 ? File.slice(0, StillNeded) : [];
            setChecked((prev) => ({
                ...prev,
                [Name]: StillNeded == 0 ? [] : New
            }));
        });
    };
    const SenderData = useMemo(() => {
        const { Type, Extra, Content, CompoundId } = Modal || {};
        const { Content: ViwContent } = ViewData || {};
        switch (Type) {
            case "Matrial": {
                return {
                    SendType: "List",
                    Data: {
                        CompoundId: CompoundId,
                        Message: Checked.Description ? Extra : null,
                        Files: ValidateAllFiles
                            ? ValidateAllFiles?.map((F) => ({
                                  FileUrl: F
                              }))
                            : []
                    }
                };
            }
            case "Layout": {
                return {
                    SendType: "Layout",
                    Data: {
                        CompoundId: CompoundId,
                        FileUrl: ViwContent
                    }
                };
            }
            case "PriceList": {
                return {
                    SendType: "Single",
                    Data: {
                        CompoundId: CompoundId,
                        FileUrl: Checked.PriceListFile
                    }
                };
            }
            case "DataCoordinates": {
                return {
                    SendType: "Coordinates",
                    Data: {
                        CompoundId: CompoundId,
                        Message: Content,
                        Extra
                    }
                };
            }
            default:
                return {};
        }
    }, [Checked.Description, Checked.PriceListFile, Modal, ValidateAllFiles, ViewData]);
    const ModalsProps = {
        RichedLimit,
        OnChecked,
        Checked
    };
    const OnResetAll = () => {
        startTransition(() => {
            setChecked({
                PriceListFile: "",
                Description: false,
                Brochure: [],
                Contract: [],
                MasterPlan: [],
                Photos: []
            });
        });
        HandleReset();
    };
    return (
        <div>
            <VersionTwoSidebar
                SideBarApiData={ProcessData.SideBar}
                SmBreakPoints={SmSideBreakPoints}
                ToggleSideBar={ToggleSideBar}
                Breakpoint={Breakpoint}
                SmallSize={GridCols.SmallSideBar}
                SideWidth={MainLayout.SideWidth}
                NavHeight={NavHeight}
                Rtl={Rtl}
                zIndex={
                    ToggleSideBar
                        ? {
                              base: 10,
                              md: 1,
                              lg: 1
                          }
                        : -1
                }
                OnResetAll={OnResetAll}
                Socket={Socket}
            />
            <Box
                w={MainLayout.MainWidth}
                top={0}
                pos={"fixed"}
                {...MainDirProps}
                transition={"all 0.2s ease-in"}
            >
                <>
                    <NewVersionNavbar
                        SmBreakPoints={SmSideBreakPoints}
                        WindowWidth={WindowWidth}
                        Breakpoint={Breakpoint}
                        MainLayout={MainLayout}
                        DataCount={Filter.DataCityId?.length > 0 ? ProcessData.Data?.length : 0}
                        GridCols={GridCols}
                        SenderData={SenderData}
                        Socket={Socket}
                    />
                    <Grid
                        pl={1}
                        templateColumns={`repeat(${GridCols.Main}, 1fr)`}
                        gap={"5px"}
                        transition={"all 0.2s ease-in"}
                        dir={Rtl ? "rtl" : "ltr"}
                    >
                        <GridItem colSpan={GridCols.Col1}>
                            <AppDataContent
                                OnSetModalData={OnSetModalData}
                                IsLoading={isFetching}
                                GridCols={GridCols}
                                Modal={Modal}
                                Data={isFetching ? [] : ProcessData.Data}
                            />
                        </GridItem>
                        {!SmallBreakPoints.includes(Breakpoint) && (
                            <GridItem
                                colSpan={GridCols.Col2}
                                className="Data-Bg Right-Box"
                                id="Data-Right-Box"
                                h={{
                                    lg: `${100 - GridCols.NavHeight.lg}vh`,
                                    xl: `${100 - GridCols.NavHeight.xl}vh`,
                                    "2xl": `${100 - GridCols.NavHeight["2xl"]}vh`
                                }}
                                display={{
                                    base: "none",
                                    lg: "flex"
                                }}
                                rounded={"lg"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                pos={"relative"}
                            >
                                <HelperViewComponent
                                    OnSetFileViewData={OnSetFileViewData}
                                    OnSetModalData={OnSetModalData}
                                    IsCdnLoading={IsCdnLoading}
                                    SetViewData={SetViewData}
                                    isCdnerror={isCdnerror}
                                    ViewData={ViewData}
                                    SetModal={SetModal}
                                    CdnData={CdnData}
                                    Notify={Notify}
                                    Modal={Modal}
                                    Lang={Lang}
                                    ModalsProps={ModalsProps}
                                />
                            </GridItem>
                        )}
                    </Grid>
                </>
            </Box>
            {SmallBreakPoints.includes(Breakpoint) && (
                <HelperViewComponent
                    OnSetFileViewData={OnSetFileViewData}
                    OnSetModalData={OnSetModalData}
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
            )}
        </div>
    );
};
export default memo(DataNewVersionPage);
