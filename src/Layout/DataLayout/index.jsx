import { Box, Flex } from "@chakra-ui/react";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export default function DataLayout({
    Col1 = null,
    Col2 = null,
    Version = 1,
    NavHeight,
    SidbarSize,
    MainSize,
    MainLeft
}) {
    const { ToggleSideBar, Rtl, NavHeight: MainNavHeight } = useSelector((state) => state.Helper);
    const IsVersionOne = Version == 1;
    const HandleWidth = useMemo(() => {
        if (IsVersionOne) {
            return {
                Col1: {
                    h: {
                        base: `${100 - NavHeight.base}vh`,
                        md: "100vh"
                    },
                    w: SidbarSize,
                    position: "fixed",
                    ...(Rtl
                        ? {
                              right: "0"
                          }
                        : {
                              left: "0"
                          }),
                    top: {
                        base: `${NavHeight.base}vh`,
                        sm: `${NavHeight.sm}vh`,
                        md: ToggleSideBar ? `${NavHeight.md}vh` : "0",
                        lg: ToggleSideBar ? `${NavHeight.lg}vh` : "0",
                        xl: ToggleSideBar ? `${NavHeight.xl}vh` : "0",
                        "2xl": ToggleSideBar ? `${NavHeight["2xl"]}vh` : "0"
                    },
                    transform: {
                        base: Rtl
                            ? ToggleSideBar
                                ? "translateX(0)"
                                : "translateX(100%)"
                            : ToggleSideBar
                            ? "translateX(0)"
                            : "translateX(-100%)",
                        md: ""
                    },
                    transition: ".5s"
                },
                Col2: {
                    h: "100vh",
                    w: MainSize,
                    position: "fixed",
                    ...(Rtl
                        ? {
                              right: MainLeft
                          }
                        : {
                              left: MainLeft
                          })
                }
            };
        }
        return {
            Col1: {
                // h: {
                //     base: `95vh`,
                //     md: `${100 - NavHeight.md}vh`
                // },
                w: SidbarSize,
                position: {
                    base: "fixed",
                    // md: ToggleSideBar ? "inherit" : "absolute"
                    md: ToggleSideBar ? "initial" : "fixed"
                },
                ...(Rtl
                    ? {
                          right: "0"
                      }
                    : {
                          left: "0"
                      }),
                // mr: "50px",
                top: {
                    base: `${NavHeight.base}vh`,
                    sm: `${NavHeight.sm}vh`,
                    md: ToggleSideBar ? `${NavHeight.md}vh` : "0",
                    lg: ToggleSideBar ? `${NavHeight.md}vh` : "0"
                },
                transform: {
                    base: Rtl
                        ? ToggleSideBar
                            ? "translateX(0)"
                            : "translateX(100%)"
                        : ToggleSideBar
                        ? "translateX(0)"
                        : "translateX(-100%)",
                    md: "translateX(0)"
                },
                transition: ".5s"
            },
            Col2: {
                // h: {
                //     base: "100%",
                //     md: `${100 - NavHeight.md}vh`
                // },
                w: MainSize,
                position: {
                    base: "fixed",
                    md: ToggleSideBar ? "initial" : "fixed"
                },
                ...(Rtl
                    ? {
                          right: MainLeft
                      }
                    : {
                          left: MainLeft
                      })
                // top: {
                //     base: `${NavHeight.base}vh`,
                //     sm: `${NavHeight.sm}vh`,
                //     md: `${NavHeight.md}vh`,
                //     lg: `${NavHeight.lg}vh`
                // }
            }
        };
    }, [IsVersionOne, MainLeft, MainSize, NavHeight, Rtl, SidbarSize, ToggleSideBar]);
    return (
        <Flex className="Main-Background" dir={Rtl ? "rtl" : "ltr"} h={`${100 - MainNavHeight}vh`}>
            {Col1 && (
                <Box
                    // zIndex={13}
                    zIndex={{
                        base: IsVersionOne ? 13 : 13,
                        md: "unset"
                    }}
                    className={"Main-Background"}
                    {...HandleWidth.Col1}
                >
                    {Col1}
                </Box>
            )}
            {Col2 && (
                <Box
                    transition={`all 0.4s ease`}
                    className="Main-Background"
                    zIndex={{
                        base: "10",
                        md: "12"
                    }}
                    {...HandleWidth.Col2}
                >
                    {Col2}
                </Box>
            )}
        </Flex>
    );
}
