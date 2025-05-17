import { CogsModalSmall, SidebarToggle } from "@/Components";
import { Flex, Grid, GridItem, Text, useColorMode } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import SiteLogo from "../SiteLogo";
import Sorting from "./Sorting";
import { useEffect, useMemo } from "react";
import { SetHelperData } from "@/Redux";
import WhatsAppSender from "../WhatsAppSender";
import { useLang } from "@/Hooks";
import { Theme } from "@/Utility";
export default function NewVersion({
    SmBreakPoints,
    WindowWidth,
    MainLayout,
    Breakpoint,
    DataCount = 0,
    GridCols,
    SenderData,
    Socket
}) {
    const { colorMode } = useColorMode();
    const IsDark = useMemo(() => colorMode == "dark", [colorMode]);
    const { ToggleSideBar, Rtl } = useSelector((state) => state.Helper);
    const { SelectedItem: Item } = useSelector((state) => state.AppData);
    const Dispatch = useDispatch();
    const Lang = useLang();
    useEffect(() => {
        function HandleGetNavbarHeight() {
            const NavElm = document.getElementById("Navbar-New");
            if (NavElm) {
                const NavHeight = ((NavElm.offsetHeight / window.innerHeight) * 100).toFixed(2);
                const ViewType = window.innerWidth > 768 ? "Desktop" : "Mobile";
                Dispatch(
                    SetHelperData({
                        NavHeight,
                        ViewType
                    })
                );
            }
        }
        HandleGetNavbarHeight();
        window.addEventListener("resize", HandleGetNavbarHeight);
        return () => {
            window.removeEventListener("resize", HandleGetNavbarHeight);
        };
    }, [Breakpoint, Dispatch]);
    return (
        <Flex
            // as="header"
            // dir={Rtl ? "rtl" : "ltr"}
            w={{
                base: "100%",
                md: ToggleSideBar
                    ? "100%"
                    : `${WindowWidth - GridCols.SmallSideBar - (!ToggleSideBar ? 0 : 30)}px`,
                lg: ToggleSideBar ? "100%" : `${WindowWidth - GridCols.SmallSideBar - 15}px`
            }}
            as="header"
            dir={Rtl ? "rtl" : "ltr"}
            // w={"100%"}
            h={Theme.PublicConfig.NavbarHeight}
            pos={"sticky"}
            top={0}
            left={0}
            className="Main-Navbar"
            zIndex={"14"}
            id="Navbar-Old"
            rowGap={1}
            py={1}
        >
            <Flex
                flexDir={"column"}
                w={{
                    ...MainLayout.MainWidth,
                    base: `calc(${MainLayout.MainWidth.base} - ${MainLayout.NavSideWidth.base})%`
                }}
                transition={`all 0.4s ease`}
                px={2}
                dir={Rtl ? "rtl" : "ltr"}
                className="red"
            >
                <Grid
                    templateColumns={{
                        base: "repeat(13, 1fr)",
                        md: `repeat(${GridCols.Main}, 1fr)`
                    }}
                    gap={1}
                    pl={Rtl ? 4 : 0}
                    pr={Rtl ? 0 : 4}
                    transition={`all 0.4s ease`}
                    dir={Rtl ? "rtl" : "ltr"}
                >
                    {SmBreakPoints.includes(Breakpoint) && (
                        <GridItem
                            colSpan={3}
                            transition={"all .5s ease"}
                            display={"flex"}
                            justifyContent={"center"}
                            gap={1}
                        >
                            <SidebarToggle boxSize={"2.5rem"} Version={2} />
                            <Flex
                                h={"2.5rem"}
                                w={"2.5rem"}
                                alignItems={"center"}
                                justifyContent={"center"}
                            >
                                <CogsModalSmall
                                    fontSize={"1.5rem"}
                                    h={"2.2rem"}
                                    w={"2rem"}
                                    p={1}
                                    size={"md"}
                                    rounded={"xl"}
                                    bg={!IsDark ? "#387995" : "white"}
                                    color={!IsDark ? "white" : "#387995"}
                                    _hover={{
                                        bg: !IsDark ? "#387995" : "white",
                                        color: !IsDark ? "white" : "#387995"
                                    }}
                                    _active={{
                                        bg: !IsDark ? "#387995" : "white",
                                        color: !IsDark ? "white" : "#387995"
                                    }}
                                    Socket={Socket}
                                />
                            </Flex>
                        </GridItem>
                    )}
                    <GridItem
                        colSpan={{
                            ...GridCols.Col1,
                            base: 10,
                            sm: 10
                        }}
                        display={"flex"}
                        gap={0}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Flex alignItems={"center"}>
                            <SiteLogo h={"2.8rem"} pt={".22rem"} />
                        </Flex>
                        <Sorting Lang={Lang} />
                    </GridItem>
                    <GridItem
                        colSpan={GridCols.Col2}
                        display={{
                            base: "none",
                            lg: "flex"
                        }}
                        alignItems={"center"}
                        // gap={5}
                        dir={"ltr"}
                        px={5}
                    >
                        <Flex w={"100%"}>
                            <WhatsAppSender
                                WithLabel={false}
                                Item={Item}
                                Type={SenderData.SendType}
                                Data={SenderData.Data}
                            />
                        </Flex>
                        {Item && (
                            <Text
                                w={{
                                    lg: "40%",
                                    xl: "50%"
                                }}
                                textAlign={"center"}
                                fontSize={{
                                    lg: ".8rem",
                                    xl: "1rem"
                                }}
                            >
                                {Item.DataCompound}
                            </Text>
                        )}
                    </GridItem>
                </Grid>
                <Grid
                    templateColumns={`repeat(${GridCols.Main}, 1fr)`}
                    gap={1}
                    transition={`all 0.4s ease`}
                    dir={Rtl ? "rtl" : "ltr"}
                >
                    <GridItem colSpan={GridCols.Col1} display={"flex"} flexDir={"column"} gap={0}>
                        <Flex
                            alignItems={"center"}
                            justifyContent={"start"}
                            gap={2}
                            dir={Rtl ? "rtl" : "ltr"}
                        >
                            {Lang?.DATA_PAGE?.PROJECT_COUNT}
                            <Text
                                color={"blackAlpha.800"}
                                className=" BoxPriceItem"
                                style={{
                                    width: "40px",
                                    fontSize: "15px"
                                }}
                            >
                                {DataCount}
                            </Text>
                            {/* {Breakpoint} */}
                        </Flex>
                    </GridItem>
                </Grid>
            </Flex>
        </Flex>
    );
}
