import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { FaDownload } from "react-icons/fa";
import {
    Flex,
    IconButton,
    Tooltip,
    GridItem,
    Box,
    Grid,
    Image,
    CloseButton
} from "@chakra-ui/react";
import { OverLay, Spinner, WhatsAppSender, ZoomableImage } from "@/Common";
import { Helper, RoutingManager } from "@/Utility";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { MdViewSidebar } from "react-icons/md";
const PriceListView = ({
    OnClose = () => {},
    Data = {
        IsOpen: false,
        Title: "",
        Content: {
            Type: "PriceList",
            CompoundId: "",
            CityId: ""
        },
        Extra: ""
    },
    Lang,
    CdnData,
    IsLoading = true
}) => {
    const FullScreenElement = useRef(null);
    const [IsFullScreen, setIsFullScreen] = useState(false);
    const [state, setState] = useState({
        title: Data.Title,
        view: "",
        path: "",
        open: false
    });
    const FindCdnList = useMemo(() => {
        return CdnData?.data?.Files ? CdnData?.data?.Files : null;
    }, [CdnData]);
    useEffect(() => {
        if (Data.IsOpen && FindCdnList?.length > 0) {
            setState((prev) => {
                return {
                    ...prev,
                    path: FindCdnList[0].FileUrl,
                    view: FindCdnList[0].FullUrl,
                    open: true
                };
            });
        } else {
            setState((prev) => ({
                ...prev,
                view: "",
                path: "",
                open: true
            }));
        }
    }, [Data.IsOpen, FindCdnList]);
    const HandleSelectFile = (item) => {
        setState({
            ...state,
            path: item.FileUrl,
            view: item.FullUrl
        });
    };
    const ProcessUrl = (url) => {
        const Process = `${RoutingManager.CDNUrl}${url}?Base64=false&ForWord=${
            window.location.origin
        }&T=${Date.now()}`;
        return Process;
    };
    const HandleDownloadFile = async (FileUrl, type) => {
        let NewUrl = ProcessUrl(FileUrl);
        if (type == "Download") {
            Helper.DownloadFileFromLink(NewUrl);
        } else {
            Helper.PrintImage(NewUrl);
        }
    };
    const OnSelect = (Key, Value) => {
        startTransition(() => {
            setState({
                ...state,
                [Key]: Value
            });
        });
    };
    return (
        <OverLay>
            <Box
                minH={window.innerHeight < 500 ? "90vh" : "100vh"}
                h={"fit-content"}
                minW={"80vw"}
                w={{
                    base: "100vw",
                    md: "85vw"
                }}
                pos={"fixed"}
                top={"0"}
                px={2}
                left={{
                    base: 0,
                    md: "7.5vw"
                }}
                className="Main-Modal Shadow"
                transform={"translateX(0) scale(1)"}
                opacity={1}
                transition={"all 0.5s ease"}
                zIndex={"modal"}
                bg={"red"}
            >
                <Flex
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    w={{
                        base: "auto",
                        md: "100%"
                    }}
                    fontSize={"1rem"}
                    py={1}
                >
                    <Box fontSize={"1rem"}>
                        <WhatsAppSender
                            WithLabel={false}
                            Type={Data.SendType}
                            Data={{
                                CompoundId: Data.CompoundId,
                                FileUrl: state.path
                            }}
                        />
                    </Box>
                    <Flex alignItems={"center"} gap={2}>
                        {window.innerWidth > 768 && (
                            <Tooltip label={Lang?.FULL_SCREEN} hasArrow={true} gutter={0}>
                                <IconButton
                                    cursor={"pointer"}
                                    aria-label={Lang?.FULL_SCREEN}
                                    bg={"gray.500"}
                                    rounded={"full"}
                                    onClick={() =>
                                        Helper.ToggleFullScreen(FullScreenElement, setIsFullScreen)
                                    }
                                    _hover={{
                                        bg: "blue.300",
                                        color: "black"
                                    }}
                                    size={"sm"}
                                    fontSize={"1.2rem"}
                                    icon={IsFullScreen ? <BsFullscreenExit /> : <BsFullscreen />}
                                />
                            </Tooltip>
                        )}
                        <Tooltip label={Lang?.DOWNLOAD} hasArrow={true} gutter={0}>
                            <IconButton
                                aria-label={Lang?.DOWNLOAD}
                                size={"sm"}
                                display={{
                                    base: "none",
                                    md: "flex"
                                }}
                                rounded={"full"}
                                fontSize={"1.2rem"}
                                icon={<FaDownload />}
                                onClick={() => HandleDownloadFile(state.path, "Download")}
                            />
                        </Tooltip>
                        <CloseButton
                            pos={"initial"}
                            rounded={"full"}
                            onClick={OnClose}
                            className="Shadow"
                        />
                    </Flex>
                </Flex>
                <Box>
                    {IsLoading ? (
                        <Flex fontSize={"3xl"} justifyContent={"center"} alignItems={"center"}>
                            <Spinner Width={200} />
                        </Flex>
                    ) : (
                        <Box ref={FullScreenElement} pos={"relative"} className="Main-Modal">
                            {FindCdnList && FindCdnList.length > 0 ? (
                                <Grid templateColumns="repeat(24, 1fr)">
                                    {state.open && (
                                        <GridItem
                                            colSpan={{
                                                base: 24,
                                                md: state.open ? 3 : 0
                                            }}
                                            rounded={"md"}
                                            border={"1px solid"}
                                            borderColor={"gray"}
                                            transition={"grid-column 0.5s ease"}
                                            py={1}
                                            // pl={1}
                                            pr={state.open ? 0 : 1}
                                        >
                                            <Flex
                                                justifyContent={"space-between"}
                                                alignItems={"center"}
                                            >
                                                <Box
                                                    display={{
                                                        base: "block",
                                                        md: state.open ? "block" : "none"
                                                    }}
                                                >
                                                    {Lang?.DATA_PAGE?.PHASES}
                                                </Box>
                                                <Flex
                                                    justifyContent={"space-between"}
                                                    gap={1}
                                                    alignItems={"center"}
                                                >
                                                    <IconButton
                                                        aria-label={Lang?.DOWNLOAD}
                                                        display={{
                                                            base: "flex",
                                                            md: "none"
                                                        }}
                                                        size={"sm"}
                                                        fontSize={"1.2rem"}
                                                        icon={<FaDownload />}
                                                        onClick={() =>
                                                            HandleDownloadFile(
                                                                state.path,
                                                                "Download"
                                                            )
                                                        }
                                                        className="Main-Modal Shadow"
                                                    />
                                                    <IconButton
                                                        onClick={() =>
                                                            OnSelect("open", !state.open)
                                                        }
                                                        icon={<MdViewSidebar />}
                                                        size={"sm"}
                                                        rounded={"full"}
                                                        fontSize={"1.2rem"}
                                                        transform={"rotate(180deg)"}
                                                        zIndex={10}
                                                        className="Main-Modal Shadow"
                                                    />
                                                </Flex>
                                            </Flex>
                                            <Box
                                                maxH={IsFullScreen ? "100vh" : "lg"}
                                                overflowY={{
                                                    base: "unset",
                                                    md: "auto"
                                                }}
                                                overflowX={{
                                                    base: "auto",
                                                    md: "unset"
                                                }}
                                                w={"100%"}
                                                display={{
                                                    base: "-webkit-box",
                                                    md: "flex"
                                                }}
                                                flexDirection={{
                                                    base: "row",
                                                    md: "column"
                                                }}
                                                gap={"2"}
                                                py={2}
                                                px={"1px"}
                                            >
                                                {FindCdnList &&
                                                    FindCdnList?.map((item, index) => {
                                                        const Url = ProcessUrl(item.FileUrl);
                                                        const UniqeId = `SmImage-${index}`;
                                                        if (!Url) return null;
                                                        return (
                                                            <Box
                                                                key={index}
                                                                rounded={"md"}
                                                                className="imageLoader"
                                                                id={UniqeId}
                                                            >
                                                                <Image
                                                                    onClick={() => {
                                                                        HandleSelectFile(item);
                                                                    }}
                                                                    cursor={"pointer"}
                                                                    rounded={"lg"}
                                                                    src={Url}
                                                                    filter={
                                                                        state.view === item.FullUrl
                                                                            ? "hue-rotate(250deg)"
                                                                            : "brightness(1)"
                                                                    }
                                                                    boxSize={{
                                                                        base: "4rem",
                                                                        md: "8rem"
                                                                    }}
                                                                    onError={(e) => {
                                                                        e.onError = null;
                                                                        e.target.src =
                                                                            "/Img/Not_Found.webp";
                                                                    }}
                                                                    onLoad={() => {
                                                                        const frame =
                                                                            document.getElementById(
                                                                                UniqeId
                                                                            );
                                                                        frame.classList.remove(
                                                                            "imageLoader"
                                                                        );
                                                                    }}
                                                                />
                                                            </Box>
                                                        );
                                                    })}
                                            </Box>
                                        </GridItem>
                                    )}
                                    <GridItem
                                        colSpan={{
                                            base: 24,
                                            md: state.open ? 21 : 24
                                        }}
                                        rounded={"md"}
                                        position={"relative"}
                                    >
                                        {!state.open && (
                                            <IconButton
                                                onClick={() => OnSelect("open", !state.open)}
                                                icon={<MdViewSidebar />}
                                                size={"sm"}
                                                rounded={"full"}
                                                fontSize={"1.2rem"}
                                                transform={"rotate(180deg)"}
                                                pos={"absolute"}
                                                top={{
                                                    base: "-10px",
                                                    md: "0px"
                                                }}
                                                left={{
                                                    md: 0,
                                                    base: "95%"
                                                }}
                                                zIndex={10}
                                                className="Main-Modal Shadow"
                                            />
                                        )}
                                        {state.view && (
                                            <ZoomableImage
                                                Src={ProcessUrl(state.path)}
                                                width={"100%"}
                                                height={"auto"}
                                                rounded={"md"}
                                                overflow={"auto"}
                                                maxH={{
                                                    base: "auto",
                                                    md: IsFullScreen
                                                        ? "100vh"
                                                        : window.innerHeight < 500
                                                        ? "80vh"
                                                        : "90vh"
                                                }}
                                                PlaceMent={{
                                                    pos: "sticky",
                                                    top: "10px",
                                                    left: "30px"
                                                }}
                                                IsFullScreen={IsFullScreen}
                                            />
                                        )}
                                    </GridItem>
                                </Grid>
                            ) : (
                                <Flex
                                    fontSize={"3xl"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                >
                                    <Spinner Width={200} />
                                </Flex>
                            )}
                            {IsFullScreen && (
                                <IconButton
                                    cursor={"pointer"}
                                    aria-label={Lang?.FULL_SCREEN}
                                    bg={"gray.500"}
                                    rounded={"full"}
                                    onClick={() =>
                                        Helper.ToggleFullScreen(FullScreenElement, setIsFullScreen)
                                    }
                                    _hover={{
                                        bg: "blue.300",
                                        color: "black"
                                    }}
                                    size={"sm"}
                                    transition={".5s"}
                                    fontSize={"1.2rem"}
                                    icon={IsFullScreen ? <BsFullscreenExit /> : <BsFullscreen />}
                                    pos={"fixed"}
                                    top={0}
                                    left={{
                                        base: "5%",
                                        md: "50%"
                                    }}
                                    zIndex={"modal"}
                                />
                            )}
                        </Box>
                    )}
                </Box>
            </Box>
        </OverLay>
    );
};

export default PriceListView;
