import { RoutingManager } from "@/Utility";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogOverlay,
    AspectRatio,
    Box,
    Flex,
    Image,
    Text
} from "@chakra-ui/react";
import { memo, useEffect, useMemo, useState } from "react";

function ViewSalesFilesModal({ OnClose = () => {}, IsOpen = false, Files = [] }) {
    const [state, setState] = useState({
        Url: null
    });
    const ProcessUrl = (url) => {
        if (!url) return null;
        if (url?.startsWith("http")) return url;
        const Process = `${RoutingManager.CDNUrl}${url}?Base64=false&ForWord=${
            window.location.origin
        }&T=${Date.now()}`;
        return Process;
    };
    const GetFileTypeFromUrl = (Url) => {
        if (!Url) return null;
        const extension = Url.split(".").pop().toLowerCase();
        const ImageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
        if (ImageExtensions.includes(extension)) {
            return "image";
        } else if (extension === "pdf") {
            return "pdf";
        } else {
            return "No_Allowed";
        }
    };
    const OnClick = (file) => {
        setState({
            Url: file
        });
    };
    useEffect(() => {
        if (IsOpen && Files?.length > 0 && !state.Url) {
            setState({
                Url: Files[0]
            });
        }
    }, [Files, IsOpen, state.Url]);
    const PrepareFiles = useMemo(() => {
        if (!Files || Files?.length < 1) return null;
        return (
            <Flex
                justifyContent={Files?.length < 10 ? "center" : "flex-start"}
                alignItems={"center"}
                gap={1}
                overflowX={"auto"}
                overflowY={"hidden"}
                w={{
                    base: "25rem",
                    md: "45rem"
                }}
                mt={2}
                zIndex={5}
            >
                {/* {Array.from({ length: 12 }).map((file, index) => { */}
                {Files.map((file, index) => {
                    const IsSelected = state.Url == file;
                    return (
                        <Text
                            className={
                                IsSelected
                                    ? "Sales-Page-Btn-Bg-Selected Sales-Page-Color"
                                    : "Sales-Page-Btn-Bg Sales-Page-Color"
                            }
                            key={file}
                            h={"2rem"}
                            minW={"2rem"}
                            textAlign={"center"}
                            borderRadius={"6px"}
                            lineHeight={"2rem"}
                            onClick={() => OnClick(file)}
                            cursor={"pointer"}
                        >
                            {index + 1}
                        </Text>
                    );
                })}
            </Flex>
        );
    }, [Files, state.Url]);
    const ProcessFileView = useMemo(() => {
        if (!state.Url) return null;
        const Type = GetFileTypeFromUrl(state.Url);
        if (Type == "No_Allowed") return null;
        if (Type == "image")
            return (
                <Image
                    id="image"
                    src={ProcessUrl(state.Url)}
                    h={"100%"}
                    w={"100%"}
                    bgPosition={"center"}
                    bgPos={"100% 100%"}
                    bgSize={"cover"}
                    borderRadius={"6px"}
                    onError={(e) => {
                        e.onError = null;
                    }}
                />
            );
        else if (Type == "pdf")
            return (
                <AspectRatio h={"100%"} w={"100%"} ratio={16 / 9}>
                    <iframe
                        title="Video"
                        src={ProcessUrl(state.Url)}
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
            );
    }, [state.Url]);
    return (
        <div>
            <AlertDialog isOpen={IsOpen} onClose={OnClose} isCentered={true}>
                <AlertDialogOverlay
                    bg="blackAlpha.300"
                    backdropFilter="blur(10px) hue-rotate(90deg)"
                >
                    <AlertDialogContent
                        className="Main-Modal"
                        w={{
                            base: "100%",
                            md: "fit-content"
                        }}
                        maxW={{
                            base: "100%",
                            md: "max-content"
                        }}
                    >
                        <AlertDialogHeader />
                        <AlertDialogCloseButton />
                        <AlertDialogBody
                            fontSize="lg"
                            maxH={"90vh"}
                            overflow={"hidden"}
                            p={1}
                            display={"flex"}
                            flexDirection={"column"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            pos={"relative"}
                        >
                            <Box
                                w={{
                                    base: "99vw",
                                    md: "45rem"
                                }}
                                h={{
                                    base: "100%",
                                    md: "38rem"
                                }}
                                mt={4}
                            >
                                {ProcessFileView}
                            </Box>
                            {PrepareFiles}
                        </AlertDialogBody>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </div>
    );
}
export default memo(ViewSalesFilesModal);
