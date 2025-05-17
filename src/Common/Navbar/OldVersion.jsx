import { CogsModalSmall, SidebarToggle } from "@/Components";
import {
    Box,
    Checkbox,
    Flex,
    Grid,
    GridItem,
    Image,
    Text,
    useBreakpoint,
    useColorMode
} from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import SiteLogo from "../SiteLogo";
import { SetFilter, SetHelperData } from "@/Redux";
import { Theme } from "@/Utility";
export default function OldVersion({
    DataCount,
    Lang,
    Tab,
    Socket
    // ...rest
}) {
    const BreakPoint = useBreakpoint();
    const { colorMode } = useColorMode();
    const Dispatch = useDispatch();
    const { IsCityScape } = useSelector((state) => state.Filter);
    const { Rtl, ToggleSideBar } = useSelector((state) => state.Helper);
    const { Events } = useSelector((state) => state.Public);
    const ProcessTabs = useMemo(() => {
        return Lang?.DATA_PAGE?.TABS?.OLD_VERSION ? Lang?.DATA_PAGE?.TABS?.OLD_VERSION : [];
    }, [Lang?.DATA_PAGE?.TABS?.OLD_VERSION]);
    useEffect(() => {
        function HandleGetNavbarHeight() {
            const NavElm = document.getElementById("Navbar-Old");
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
    }, [BreakPoint, Dispatch]);
    const LogoHeight = "2.5rem";
    return (
        <Flex
            as="header"
            dir={Rtl ? "rtl" : "ltr"}
            w={"100%"}
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
            {BreakPoint == "base" || BreakPoint == "sm" ? (
                <Grid
                    w={"100%"}
                    templateColumns="repeat(13, 1fr)"
                    gap={1}
                    px={2}
                    py={0}
                    m={0}
                    zIndex={"14"}
                >
                    <GridItem
                        colSpan={3}
                        transition={"all .5s ease"}
                        display={"flex"}
                        // alignItems={'center'}
                        justifyContent={"center"}
                        gap={1}
                    >
                        <SidebarToggle
                            boxSize={{
                                base: "2.5rem",
                                sm: "2.5rem"
                            }}
                            Version={1}
                        />
                        <Box pos={"realative"}>
                            <CogsModalSmall
                                boxSize={{
                                    base: "2.5rem",
                                    sm: "2.5rem"
                                }}
                                Socket={Socket}
                            />
                        </Box>

                        {/* {BreakPoint} */}
                    </GridItem>
                    <GridItem
                        colSpan={10}
                        display={{ base: "flex", md: "flex" }}
                        alignItems={"center"}
                        justifyContent={"start"}
                        flexDir={"column"}
                    >
                        <Flex alignItems={"center"} justifyContent={"start"} w={"100%"}>
                            <SiteLogo h={LogoHeight} />
                        </Flex>
                        <Flex w={"100%"} justifyContent={"start"} alignItems={"center"}>
                            <Flex
                                alignItems={"center"}
                                gap="5px"
                                zIndex={"10"}
                                whiteSpace={"nowrap"}
                            >
                                {Lang?.DATA_PAGE?.PROJECT_COUNT}
                                <Text color={"blackAlpha.800"} className=" BoxPriceItem">
                                    {DataCount}
                                </Text>
                            </Flex>
                            {Events.Cityscape && (
                                <Checkbox
                                    ml={4}
                                    isChecked={IsCityScape}
                                    onChange={(e) =>
                                        Dispatch(
                                            SetFilter({
                                                IsCityScape: e.target.checked
                                            })
                                        )
                                    }
                                    borderColor={colorMode == "dark" ? "#678396" : "#8795a5"}
                                    dir={"ltr"}
                                    alignItems={"center"}
                                >
                                    <Box h={8}>
                                        <Image
                                            h={"100%"}
                                            w={"100%"}
                                            src="/Img/Cityscape-full.webp"
                                            alt="Cityscape"
                                            aria-label="Cityscape"
                                        />
                                    </Box>
                                </Checkbox>
                            )}
                        </Flex>
                    </GridItem>
                </Grid>
            ) : (
                <Grid
                    w={"100%"}
                    templateColumns="repeat(13, 1fr)"
                    gap={1}
                    px={2}
                    py={0}
                    m={0}
                    zIndex={"10"}
                >
                    <GridItem
                        colSpan={{
                            md: ToggleSideBar ? 0 : 2,
                            xl: ToggleSideBar ? 0 : 1
                        }}
                        px={ToggleSideBar ? 0 : 2}
                        opacity={ToggleSideBar ? 0 : 1}
                        transition={"all .5s ease"}
                    >
                        <SidebarToggle boxSize={"2.8rem"} Version={1} />
                    </GridItem>
                    <GridItem
                        colSpan={{
                            base: 6,
                            md: 4,
                            xl: ToggleSideBar ? 4 : 5,
                            "2xl": ToggleSideBar ? 4 : 5
                        }}
                        display={{ base: "flex", md: "flex" }}
                        alignItems={"center"}
                        justifyContent={"start"}
                        flexDir={"column"}
                        py={1}
                        transition={"all .5s ease"}
                    >
                        <Flex
                            alignItems={"center"}
                            justifyContent={"start"}
                            minH={"50%"}
                            w={"100%"}
                        >
                            <SiteLogo h={LogoHeight} />
                            {/* {BreakPoint} */}
                        </Flex>
                        <Flex
                            alignItems={"center"}
                            justifyContent={"start"}
                            pos={"relative"}
                            left={0}
                            flexDir={Rtl ? "row-reverse" : "row"}
                            display={"flex"}
                            minH={"50%"}
                            dir={Rtl ? "rtl" : "ltr"}
                            w={"100%"}
                        >
                            {ProcessTabs &&
                                ProcessTabs?.map((item, index) => {
                                    const IsSelected = item.Value == Tab;
                                    const DirProps = Rtl
                                        ? {
                                              right: index == 0 ? 0 : "4rem"
                                          }
                                        : {
                                              left: index == 0 ? 0 : "4rem"
                                          };
                                    return (
                                        <Box
                                            key={index}
                                            py={"0.5"}
                                            onClick={() => {
                                                Dispatch(
                                                    SetFilter({
                                                        DataViewTab: item.Value
                                                    })
                                                );
                                            }}
                                            px={3}
                                            rounded={"full"}
                                            textAlign={"center"}
                                            w={"5rem"}
                                            pos={"absolute"}
                                            fontSize={".8rem"}
                                            {...DirProps}
                                            className={`Tab-Border ${
                                                IsSelected ? "Tab-Selected" : "Tab"
                                            }`}
                                            transition={"left .3s ease"}
                                            cursor={"pointer"}
                                            zIndex={IsSelected ? "2" : "1"}
                                        >
                                            {item.Label}
                                        </Box>
                                    );
                                })}
                        </Flex>
                    </GridItem>
                    <GridItem
                        colSpan={{
                            md: ToggleSideBar ? 8 : 6,
                            lg: ToggleSideBar ? 8 : 7
                        }}
                        display={{ base: "flex", md: "flex" }}
                        alignItems={"center"}
                        justifyContent={"end"}
                        flexDir={"column"}
                        w={"100%"}
                        px={2}
                        transition={"all .5s ease"}
                    >
                        <Flex justifyContent={"end"} w={"100%"}>
                            <Flex
                                alignItems={"center"}
                                gap={1}
                                zIndex={"10"}
                                whiteSpace={"nowrap"}
                                fontSize={{
                                    md: ".9rem",
                                    lg: "1rem"
                                }}
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
                            </Flex>
                            {Events.Cityscape && (
                                <Checkbox
                                    ml={1}
                                    isChecked={IsCityScape}
                                    onChange={(e) =>
                                        Dispatch(
                                            SetFilter({
                                                IsCityScape: e.target.checked
                                            })
                                        )
                                    }
                                    borderColor={colorMode == "dark" ? "#678396" : "#8795a5"}
                                    dir={"ltr"}
                                >
                                    <Box
                                        h={{
                                            md: 7,
                                            lg: 8
                                        }}
                                    >
                                        <Image
                                            h={"100%"}
                                            w={"100%"}
                                            src="/Img/Cityscape-full.webp"
                                            alt="Cityscape"
                                            aria-label="Cityscape"
                                        />
                                    </Box>
                                </Checkbox>
                            )}
                        </Flex>
                    </GridItem>
                </Grid>
            )}
        </Flex>
    );
}
