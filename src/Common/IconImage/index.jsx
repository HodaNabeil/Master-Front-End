import { Button, Image, useColorModeValue } from "@chakra-ui/react";
export default function IconImage({
    Src = "/Img/Not_Found.webp",
    Alt = "",
    OnClick = () => {},
    ...rest
}) {
    const Bg = useColorModeValue("#002d3e", "white");
    const Color = useColorModeValue("white", "#002d3e");
    return (
        <Button
            type="button"
            title={Alt}
            aria-label={Alt}
            onClick={OnClick}
            p={0}
            bg={Bg}
            border={"none"}
            _hover={{ bg: Bg }}
            _loading={{ bg: Bg, color:Color }}
            {...rest}
        >
            <Image
                src={Src}
                alt={Alt}
                title={Alt}
                loading="lazy"
                aria-hidden="true"
                aria-orientation="vertical"
                aria-label={Alt}
                w={"100%"}
                h={"100%"}
            />
        </Button>
    );
}
