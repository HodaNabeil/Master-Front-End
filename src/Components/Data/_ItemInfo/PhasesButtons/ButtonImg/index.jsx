import { Box, Image } from "@chakra-ui/react";

export default function ButtonImg({
    isOpen = false,
    onToggle = () => {},
    BtnImgSize = "2.5rem",
    src,
    alt = "Phases",
    ...rest
}) {
    return (
        <Box h={BtnImgSize} w={BtnImgSize} zIndex={2}>
            <Image
                src={src}
                alt={alt}
                boxSize={"100%"}
                onClick={onToggle}
                cursor={"pointer"}
                _hover={{
                    transform: "scale(1.1)",
                    transition: "transform 0.5s"
                }}
                bg={isOpen ? "green.500" : "#1b4b65"}
                rounded={"lg"}
                {...rest}
            />
        </Box>
    );
}
