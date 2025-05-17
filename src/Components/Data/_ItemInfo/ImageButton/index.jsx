import { Box, Button, Image, Spinner, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function ImageButton({
    onClick = () => {},
    isLoading = false,
    isDisabled = false,
    TextBg,
    ImgBg = "#497a94",
    ImgColor,
    Label,
    src,
    ImgSize = "2.2rem",
    ...rest
}) {
    const { Rtl } = useSelector((state) => state.Helper);
    const RtlStyle = {
        [Rtl ? "roundedLeft" : "roundedRight"]: "2xl",
        [Rtl ? "mr" : "ml"]: "-1",
    };
    return (
        <div dir={Rtl ? "rtl" : "ltr"}>
            <Button
                display={"flex"}
                onClick={isDisabled ? void 0 : onClick}
                w={"100%"}
                mx={0}
                px={0}
                h={ImgSize}
                textAlign={"center"}
                cursor={isDisabled ? "not-allowed" : "pointer"}
                border={"none"}
                _hover={{
                    bg: "transparent"
                }}
                {...rest}
            >
                <Box
                    h={ImgSize}
                    w={ImgSize}
                    bg={ImgBg ? ImgBg : ""}
                    color={ImgColor ? ImgColor : ""}
                    rounded={"xl"}
                    zIndex={2}
                >
                    {!isLoading ? (
                        <Image src={src} h={"100%"} w={"100%"} objectFit={"cover"} rounded={"lg"} />
                    ) : (
                        <Spinner h={"100%"} w={"100%"} emptyColor="#0086c5" />
                    )}
                </Box>
                <Text>
                    <Text
                        as={"span"}
                        bg={TextBg ? TextBg : ""}
                        h={ImgSize}
                        lineHeight={ImgSize}
                        px={2}
                        whiteSpace={"nowrap"}
                        fontSize={"clamp(0.8rem, 0.9rem, 1rem)"}
                        {...RtlStyle}
                    >
                        {Label}
                    </Text>
                </Text>
            </Button>
        </div>
    );
}

{
    /* <button className="custom-button">
<img
    src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
    alt="Icon"
    className="icon"
/>
<span className="text">Key Account</span>
</button> */
}
