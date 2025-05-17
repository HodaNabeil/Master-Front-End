import { Helper, RoutingManager } from "@/Utility";
import { AspectRatio, Center, Flex, Image } from "@chakra-ui/react";
import { useMemo } from "react";

export default function ContectItem({ OnClick = () => {}, MimeType, Src }) {
    const ItemMimeType = useMemo(() => {
        if (MimeType?.startsWith("image/")) {
            return "Image";
        }
        if (MimeType?.startsWith("video/")) {
            return "Video";
        }
        if (MimeType?.startsWith("/pdf")) {
            return "Document";
        }
        return "Message";
    }, [MimeType]);
    const IsArabic = ItemMimeType == "Message" ? Helper.IsArabic(Src) : false;
    const ArabicProps = IsArabic
        ? {
              textAlign: "right"
          }
        : {
              textAlign: "left"
          };
    const ProcessUrl = (url) => {
        const Process = `${RoutingManager.CDNUrl}${url}?Base64=false&ForWord=${
            window.location.origin
        }&T=${Date.now()}`;
        return Process;
    };
    return (
        <Center
            h={ItemMimeType == "Message" ? "auto" : "61vh"}
            transition={"all 0.5s ease-in-out"}
            className="Center"
        >
            {ItemMimeType == "Message" ? (
                <Flex
                    width={"100%"}
                    minW={{
                        base: "100%",
                        md: "30rem"
                    }}
                    maxW={{
                        base: "100%",
                        md: "30rem"
                    }}
                    height={"100%"}
                    rounded={"lg"}
                    justifyContent={Src?.length > 100 ? "flex-start" : "center"}
                    flexDir={"column"}
                    px={4}
                    onClick={OnClick}
                    // bg={"red"}
                    style={{
                        direction: IsArabic ? "rtl" : "ltr",
                        whiteSpace: "pre-line",
                    }}
                    maxH={"61vh"}
                    overflowY={'auto'}
                    overflowX={'hidden'}
                    {...ArabicProps}
                >
                    {Src?.split("~")?.map((item, index) => (
                        <span key={index}>{item}</span>
                    ))}
                </Flex>
            ) : (
                <>
                    {ItemMimeType == "Image" && (
                        <Image
                            src={ProcessUrl(Src)}
                            width={"100%"}
                            height={"100%"}
                            rounded={"lg"}
                            backgroundSize={"cover"}
                            backgroundRepeat={"no-repeat"}
                            backgroundPosition={"center"}
                            cursor={"pointer"}
                            onClick={OnClick}
                        />
                    )}
                    {ItemMimeType == "Video" && (
                        <AspectRatio
                            h={"auto"}
                            // w={"100%"}
                            // maxW="100%"
                            minW={{
                                base: "98vw",
                                md: "30rem",
                                lg: "60em"
                            }}
                            w={"100%"}
                            bg={"red"}
                            maxH={"100%"}
                            border={"1px solid"}
                            borderRadius={"20px"}
                            mt={"3px"}
                            ratio={1}
                            onClick={OnClick}
                        >
                            <iframe
                                src={Src ? Src?.replace("watch?v=", "embed/") : "#"}
                                title={"Video"}
                                // height={"100%"}
                                // width={"100%"}
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
                    {ItemMimeType == "Document" && (
                        <AspectRatio
                            h={"auto"}
                            maxW="100%"
                            maxH={"100%"}
                            minW={{
                                base: "98vw",
                                md: "30rem"
                            }}
                            border={"1px solid"}
                            borderRadius={"20px"}
                            mt={"3px"}
                            ratio={1}
                            onClick={OnClick}
                        >
                            <iframe
                                src={ProcessUrl(Src)}
                                title={"PDF"}
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
                </>
            )}
        </Center>
    );
}
