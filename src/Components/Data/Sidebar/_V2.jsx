import FilterSideBar from "./FilterSideBar";
import { Box, Flex } from "@chakra-ui/react";
import SidebarNavigationButton from "./SidebarNavigationBtns";
import SidebarToggle from "./SidebarToggle";

export default function VersionTwoSidebar({
    SideBarApiData,
    ToggleSideBar,
    SmBreakPoints,
    Breakpoint,
    SmallSize,
    NavHeight,
    SideWidth,
    Rtl,
    zIndex = {},
    OnResetAll = () => {},
    Socket
}) {
    const DirProps = Rtl
        ? {
              right: 0
          }
        : {
              left: 0
          };
    const SmDirProps = Rtl
        ? {
              right: 0,
              borderLeft: "1px solid"
          }
        : {
              left: 0,
              borderRight: "1px solid"
          };
    return (
        <>
            {!SmBreakPoints.includes(Breakpoint) && (
                <Flex
                    h={"100vh"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    w={`${SmallSize}px`}
                    pos={"fixed"}
                    top={0}
                    {...SmDirProps}
                    // transform={
                    //     !ToggleSideBar ? `translateX(0)` : `translateX(${Rtl ? "200" : "-200"}%)`
                    // }
                    zIndex={{
                        base: 20,
                        md: "unset",
                        lg: 1
                    }}
                    opacity={!ToggleSideBar ? 1 : 0}
                    pt={`${NavHeight}vh`}
                    transition={"all 0.6s ease-in"}
                >
                    <SidebarToggle boxSize={"2.8rem"} Version={2} />
                    <SidebarNavigationButton
                        mt={"35vh"}
                        dirction={"column-reverse"}
                        w={{
                            base: "",
                            md: "100%"
                        }}
                        Socket={Socket}
                        IconSize={{
                            boxSize: "2.5rem"
                        }}
                    />
                </Flex>
            )}
            <Box
                w={SideWidth}
                pos={"fixed"}
                top={{
                    base: `${NavHeight}vh`,
                    md: 0
                }}
                {...DirProps}
                transform={ToggleSideBar ? `translateX(0)` : `translateX(${Rtl ? "200" : "-200"}%)`}
                opacity={ToggleSideBar ? 1 : 0}
                zIndex={zIndex}
                transition={"all 0.2s ease-in"}
                className="Main-Background-Top"
            >
                <Flex
                    transition={`all 0.2s ease`}
                    justifyContent={"space-between"}
                    pl={!Rtl ? 5 : "unset"}
                    pr={!Rtl ? "unset" : 5}
                    gap={1}
                    h={`${NavHeight}vh`}
                    dir={Rtl ? "rtl" : "ltr"}
                    display={{ base: "none", md: "flex" }}
                    py={1}
                >
                    <Box w={"80%"}>
                        <SidebarNavigationButton
                            dirction={"row"}
                            pr={{
                                base: 0,
                                md: Rtl ? 10 : 24
                            }}
                            Socket={Socket}
                            IconSize={{
                                boxSize: "2.5rem"
                            }}
                        />
                    </Box>
                    <Box h={"20%"}>
                        <SidebarToggle boxSize={"2.8rem"} Version={2} />
                    </Box>
                </Flex>
                <FilterSideBar
                    SideBarApiData={SideBarApiData}
                    NavHeight={{
                        base: NavHeight,
                        sm: NavHeight,
                        md: NavHeight,
                        lg: NavHeight,
                        xl: NavHeight,
                        "2xl": NavHeight
                    }}
                    MidProps={{
                        className: "Main-Background"
                    }}
                    Rtl={Rtl}
                    OnResetAll={OnResetAll}
                />
            </Box>
        </>
    );
}
