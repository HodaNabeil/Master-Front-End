import { AspectRatio, Box, CloseButton, Flex, IconButton, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { BsFullscreenExit, BsFullscreen } from "react-icons/bs";
import ZoomableImage from "../ZoomableImage";
import { Helper, RoutingManager } from "@/Utility";
import { FaDownload } from "react-icons/fa";
import OverLay from "../Overlay";
import { useWindowSize } from "@/Hooks";
import { WhatsAppSender } from "..";
const FileView = ({
    OnClose = () => {},
    Data = {
        IsOpen: false,
        Title: "",
        Content: "",
        Type: ""
    },
    Notify,
    Lang
}) => {
    const FullScreenElement = useRef(null);
    const IFrameElement = useRef(null);
    const [IsFullScreen, setIsFullScreen] = useState(false);
    const { Rtl } = useSelector((state) => state.Helper);
    const ImageData = useMemo(() => {
        if (!Data.Content) return null;
        const ImageExt = ["jpg", "png", "jpeg", "gif", "svg", "webp", "tiff", "bmp"];
        const PdfExt = ["pdf"];
        const DocExt = ["doc", "docx"];
        const FileExt = Data.Content.split(".").pop().toLowerCase();
        const FileName = Data.Content.split("/").pop();
        return {
            IsImage: ImageExt.includes(FileExt),
            IsPdf: PdfExt.includes(FileExt),
            IsDoc: DocExt.includes(FileExt),
            FileUrl: Data.Content,
            FileOriginalName: FileName
        };
    }, [Data.Content]);
    useEffect(() => {
        if (ImageData) {
            if (!ImageData.IsImage && !ImageData.IsPdf && !ImageData.IsDoc) {
                Notify("info", Lang?.ERRORS?.FILE_VIEW_NOT_ALLOWED);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [!ImageData?.IsImage, ImageData?.IsPdf]);
    useEffect(() => {
        document.addEventListener("fullscreenchange", () => {
            const isFull = document.fullscreenElement;
            startTransition(() => {
                setIsFullScreen(isFull ? true : false);
            });
        });
    }, [setIsFullScreen]);
    const ProcessUrl = (url) => {
        const Process = `${RoutingManager.CDNUrl}${url}?Base64=false&ForWord=${
            window.location.origin
        }&T=${Date.now()}`;
        return Process;
    };
    const HandleDownloadFile = (File) => {
        let NewUrl = ProcessUrl(File.FileUrl);
        Helper.DownloadFileFromLink(NewUrl);
    };
    function ChunkBase64(base64, size) {
        const base64Data = base64.includes(",") ? base64.split(",")[1] : base64;
        const regex = new RegExp(`.{1,${size}}`, "g");
        return base64Data.match(regex);
    }
    useEffect(() => {
        const RenderChunkedPDF = (Base64String, FileMimeType) => {
            if (!Base64String?.startsWith(`data:${FileMimeType};base64,`)) {
                return;
            }
            const Chunks = ChunkBase64(Base64String, 1000000); // 1 MB Chunks
            const reassembledBase64 = `data:${FileMimeType};base64,` + Chunks.join("");
            try {
                const ByteCharacters = atob(reassembledBase64.split(",")[1]);
                const ByteArray = new Uint8Array(ByteCharacters.length)?.map((_, i) =>
                    ByteCharacters.charCodeAt(i)
                );
                const BlobData = new Blob([ByteArray], { type: FileMimeType });
                const ObjectURL = URL.createObjectURL(BlobData);
                return ObjectURL;
            } catch {
                // return;
            }
        };
        if (ImageData) {
            if (ImageData.IsPdf) {
                const GetFileBlob = RenderChunkedPDF(ImageData.FileUrl, ImageData.FileMimeType);
                if (IFrameElement.current && GetFileBlob) {
                    IFrameElement.current.src = GetFileBlob;
                    return () => {
                        URL.revokeObjectURL(GetFileBlob);
                    };
                }
            }
            if (ImageData.IsDoc) {
                Helper.DownloadFile(ImageData.FileUrl, ImageData.FileName?.replaceAll("%20", " "));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ImageData, IFrameElement.current]);
    const { height: WindowHeight, width: WindowWidth } = useWindowSize();
    const CalcHeight = useMemo(() => {
        const HandlGetSize = () => {
            if (IsFullScreen) return { H1: "", H2: "100%" };
            const MainElemet = document.getElementById("Data-Right-Box");
            if (!MainElemet) {
                return { H1: "", H2: "100%" };
            }
            const mainElemetHeight = MainElemet?.clientHeight ? MainElemet.clientHeight : 597;
            const maxHeight = mainElemetHeight * 0.9;
            const element1Height = Math.round(maxHeight * 0.12); // 12% for the first element
            const element2Height = Math.round(maxHeight * 1);
            return {
                H1: `${element1Height / 16}rem`,
                H2: `${element2Height / 16}rem`
            };
        };
        return HandlGetSize();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [IsFullScreen, WindowWidth, WindowHeight]);
    console.log({
        Data
    });
    return (
        <OverLay>
            <Box
                pos={"fixed"}
                top={{
                    base: 0,
                    md: "clamp(5%, 2vh, 10%)"
                }}
                left={{
                    base: 0,
                    md: "10vw"
                }}
                minW={{
                    base: "100vw",
                    md: "80vw"
                }}
                className="Main-Modal Shadow"
                ref={FullScreenElement}
                py={2}
                zIndex={"modal"}
                rounded={"lg"}
            >
                <Box
                    direction={Rtl ? "row-reverse" : "row"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    w={"96%"}
                    className="Shadow"
                    rounded={"lg"}
                    py={1}
                    px={1}
                    ml={"2%"}
                >
                    <div dir={Rtl ? "rtl" : "ltr"}>{Data.Title?.replaceAll("%20", " ")}</div>

                    <Flex alignItems={"center"} gap={2}>
                        <IconButton
                            cursor={"pointer"}
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
                        />
                        {(ImageData?.IsPdf || ImageData?.IsDoc) && (
                            <IconButton
                                cursor={"pointer"}
                                bg={"gray.500"}
                                rounded={"full"}
                                onClick={() => HandleDownloadFile(ImageData)}
                                _hover={{
                                    bg: "blue.300",
                                    color: "black"
                                }}
                                size={"sm"}
                                transition={".5s"}
                                fontSize={"1.2rem"}
                                icon={<FaDownload />}
                            />
                        )}

                        {Data?.Type == "Layout" && (
                            <WhatsAppSender
                                Type={"Layout"}
                                WithLabel={false}
                                Data={{
                                    CompoundId: Data.CompoundId,
                                    FileUrl: Data.Content,
                                }}
                            />
                        )}
                    </Flex>
                    <CloseButton
                        rounded={"full"}
                        pos={"initial"}
                        onClick={() => {
                            if (IsFullScreen) {
                                Helper.ToggleFullScreen(FullScreenElement, setIsFullScreen);
                            }
                            OnClose();
                        }}
                    />
                </Box>
                <Box
                    zIndex={13}
                    rounded={"lg"}
                    w={"100%"}
                    id="Data-Right-Box"
                    px={1}
                    mt={1}
                    h={{
                        base: "100vh",
                        sm: window.innerHeight < 273 ? "clamp(80vh, 2vh, 100vh)" : "100vh",
                        md: "80vh"
                    }}
                >
                    {Data.IsOpen && (
                        <>
                            {ImageData && (
                                <>
                                    {ImageData?.IsDoc && (
                                        <Box
                                            h={"80%"}
                                            maxW="100%"
                                            maxH={"100%"}
                                            border={"1px solid"}
                                            borderRadius={"20px"}
                                            mt={"3px"}
                                            ratio={1}
                                            display={"flex"}
                                            alignItems={"center"}
                                            justifyContent={"center"}
                                            flexDir={"column"}
                                        >
                                            {Lang?.ERRORS?.FILE_VIEW_NOT_ALLOWED?.split("\n")?.map(
                                                (line, index) => (
                                                    <Text key={index}>{line}</Text>
                                                )
                                            )}
                                        </Box>
                                    )}
                                    {ImageData.IsPdf && (
                                        <AspectRatio
                                            h={"auto"}
                                            maxW="100%"
                                            maxH={"100%"}
                                            border={"1px solid"}
                                            borderRadius={"20px"}
                                            mt={"3px"}
                                            ratio={1}
                                        >
                                            <iframe
                                                src={ProcessUrl(ImageData.FileUrl)}
                                                ref={IFrameElement}
                                                title={ImageData.FileOriginalName}
                                                height={"100%"}
                                                width={"100%"}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                referrerPolicy="strict-origin-when-cross-origin"
                                                style={{
                                                    objectFit: "cover",
                                                    width: "100%",
                                                    height: "100%",
                                                    borderRadius: "20px"
                                                }}
                                                allowFullScreen
                                            />
                                        </AspectRatio>
                                    )}
                                    {ImageData.IsImage && (
                                        <>
                                            <ZoomableImage
                                                Src={ProcessUrl(ImageData.FileUrl)}
                                                Alt={ImageData.FileOriginalName}
                                                width={"100%"}
                                                height={CalcHeight.H2}
                                                maxH={CalcHeight.H2}
                                                rounded={"lg"}
                                                ratio={1}
                                                IsFullScreen={IsFullScreen}
                                            />
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </Box>
            </Box>
        </OverLay>
    );
};

export default FileView;
