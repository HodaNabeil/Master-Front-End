import { useCallback, useEffect, useId, useState } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { TbZoomIn, TbZoomOut, TbZoomReset } from "react-icons/tb";
const ZoomableImage = ({
    Src = null,
    Alt = "Master V",
    width = "100%",
    height = "100%",
    PlaceMent = null,
    IsFullScreen = false,
    ...props
}) => {
    const UniqeId = useId();
    const [ZoomLevel, setZoomLevel] = useState(1);
    const [OffsetX, setOffsetX] = useState(0);
    const [OffsetY, setOffsetY] = useState(0);
    const [IsDragging, setIsDragging] = useState(false);
    const [DragStartX, setDragStartX] = useState(0);
    const [DragStartY, setDragStartY] = useState(0);
    const { ViewType, Rtl } = useSelector((state) => state.Helper);
    const HandleZoomIn = () => setZoomLevel((prevZoom) => prevZoom + 0.1);
    const HandleZoomOut = () => setZoomLevel((prevZoom) => Math.max(1, prevZoom - 0.1));
    const HandleMouseUp = () => setIsDragging(false);
    const HandleMouseDown = useCallback(
        (e) => {
            if (ZoomLevel > 1) {
                setIsDragging(true);
                setDragStartX(e.clientX);
                setDragStartY(e.clientY);
            }
        },
        [ZoomLevel]
    );
    const HandleMouseMove = (e) => {
        if (!IsDragging) return;
        const offsetXChange = e.clientX - DragStartX;
        const offsetYChange = e.clientY - DragStartY;
        setOffsetX((prevOffsetX) => prevOffsetX + offsetXChange);
        setOffsetY((prevOffsetY) => prevOffsetY + offsetYChange);
        setDragStartX(e.clientX);
        setDragStartY(e.clientY);
    };
    const HandleResetZoom = () => {
        setZoomLevel(1);
        setOffsetX(0);
        setOffsetY(0);
    };
    useEffect(() => {
        if (ZoomLevel == 1 && (OffsetX != 0 || OffsetY != 0)) {
            setOffsetX(0);
            setOffsetY(0);
        }
    }, [OffsetX, OffsetY, ZoomLevel]);
    let Srcs = Src?.split("&T=")?.[0]
    useEffect(() => {
        if (Srcs) {
            HandleResetZoom();
        }
    }, [Srcs]);
    const ButtonProps = PlaceMent
        ? {
              w: PlaceMent?.pos != "sticky" ? "" : "7rem",
              ...PlaceMent
          }
        : {
              pos: "sticky",
              top: "1rem",
              ...(Rtl
                  ? {
                        right: "1rem"
                    }
                  : {
                        left: "1rem"
                    }),
              w: PlaceMent?.pos != "sticky" ? "" : "7rem"
          };
    return (
        <Box
            width={width}
            h={height}
            onMouseDown={HandleMouseDown}
            onMouseMove={HandleMouseMove}
            onMouseUp={HandleMouseUp}
            p={2}
            pos={"relative"}
            {...props}
        >
            {ViewType == "Desktop" 
            // && IsFullScreen
             && (
                <Flex
                    maxW={ZoomLevel == 1 ? "2.6rem" : "7rem"}
                    gap={"5px"}
                    border={"1px solid gray"}
                    color={"white"}
                    bg={"gray.800"}
                    padding={"5px"}
                    rounded={"full"}
                    className="Shadow"
                    zIndex={"2"}
                    h={"2.6rem"}
                    {...ButtonProps}
                >
                    <Box
                        onClick={HandleZoomIn}
                        cursor={"zoom-in"}
                        rounded={"full"}
                        bg={"gray.500"}
                        color={"white"}
                        width={"30px"}
                        height={"30px"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        fontSize={"20px"}
                        fontWeight={"bold"}
                    >
                        <TbZoomIn />
                    </Box>
                    {ZoomLevel > 1 && (
                        <>
                            <Box
                                onClick={HandleZoomOut}
                                cursor={"zoom-out"}
                                rounded={"full"}
                                bg={"gray.500"}
                                color={"white"}
                                width={"30px"}
                                height={"30px"}
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                fontSize={"20px"}
                                fontWeight={"bold"}
                            >
                                <TbZoomOut />
                            </Box>
                            <Box
                                onClick={HandleResetZoom}
                                cursor={"all-scroll"}
                                rounded={"full"}
                                bg={"red.500"}
                                color={"white"}
                                width={"30px"}
                                height={"30px"}
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <TbZoomReset />
                            </Box>
                        </>
                    )}
                </Flex>
            )}
            <Box
                style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    transform: `scale(${ZoomLevel})`,
                    transition: "transform 0.3s ease",
                    cursor: ZoomLevel > 1 ? "all-scroll" : "default"
                }}
                mt={{
                    base: "auto",
                    md: "-3rem"
                    // md: PlaceMent?.pos != "sticky" ? "auto":"-3rem"
                }}
                // maxH={
                //     IsFullScreen
                //         ? "100vh"
                //         : {
                //               base: "xl",
                //               md: "3xl"
                //           }
                // }
                // overflowY={{
                //     base: "auto",
                //     md: ZoomLevel > 1 ? "hidden" : "auto"
                // }}
                overflow={"hidden"}
                rounded={"lg"}
                className="Shadow imageLoader"
                id={UniqeId}
            >
                <Image
                    transform={`translate(${OffsetX}px, ${OffsetY}px)`}
                    src={Src}
                    alt={Alt}
                    title={Alt}
                    rounded={"md"}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/Img/Not_Found.webp";
                    }}
                    cursor={ZoomLevel > 1 ? "move" : ""}
                    bgSize={'100% 100% !important'}
                    pointerEvents={"none"}
                    width={"100%"}
                    h={"100%"}
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
        </Box>
    );
};

export default ZoomableImage;
