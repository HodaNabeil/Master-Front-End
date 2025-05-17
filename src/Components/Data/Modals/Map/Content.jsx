import { AspectRatio, Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
let SingleView = ["DataCoordinates"];
export default function MapContent({ Data, IsModel = true }) {
    const ModalProps = IsModel
        ? {
              border: "3px solid aquamarine",
              rounded: "3xl"
          }
        : {};
    const [ShowUrl, SetViewUrl] = useState("");
    const PagintionData = useMemo(() => {
        if (SingleView.includes(Data.Type))
            return {
                has: false,
                data: []
            };
        let Length = Data.Content?.length;
        return {
            has: Length > 1,
            data: Data.Content
        };
    }, [Data.Content, Data.Type]);
    useEffect(() => {
        if (SingleView.includes(Data.Type)) {
            SetViewUrl(Data.Content);
        } else {
            if (!Data.Content || !Array.isArray(Data.Content) || Data.Content?.length == 0) return;
            SetViewUrl(Data.Content[0]);
        }
    }, [Data.Content, Data.Type]);
    return (
        <Box as="section" h={"100%"} pos={"relative"}>
            <AspectRatio {...ModalProps} ratio={16 / 9} w={"100%"} h={"100%"} zIndex={1}>
                <ContentView Url={ShowUrl} IsModel={IsModel} />
            </AspectRatio>
            {PagintionData.has && (
                <Pagination Options={PagintionData.data} Url={ShowUrl} OnSelect={SetViewUrl} />
            )}
        </Box>
    );
}

function ContentView({ Url, IsModel = true }) {
    Url = Url?.replace("watch?v=", "embed/");
    return (
        <iframe
            title={"coordinates"}
            style={
                IsModel
                    ? {
                          border: "1px solid",
                          borderRadius: "20px"
                      }
                    : {}
            }
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            src={Url}
            allowFullScreen={true}
            loading="lazy"
            // referrerPolicy="no-referrer-when-downgrade"
        />
    );
}

function Pagination({ Options = [], Url, OnSelect = () => {} }) {
    return (
        <Flex
            pos={"absolute"}
            bottom={"2"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
            // bg={"red"}
            h={"2.5rem"}
            w={"100%"}
            zIndex={"10"}
        >
            {Options.map((item, index) => {
                const IsSelected = Url == item;
                return (
                    <Text
                        as={"span"}
                        key={index}
                        boxSize={"2rem"}
                        bg={IsSelected ? "green.500" : "blue.500"}
                        color={"white"}
                        _hover={{
                            bg: IsSelected ? "green.700" : "blue.700",
                            transform: "scale(1.1)",
                            transition: "all 0.5s ease"
                        }}
                        lineHeight={"2rem"}
                        textAlign={"center"}
                        cursor={"pointer"}
                        rounded={"full"}
                        onClick={() => OnSelect(item)}
                    >
                        {index + 1}
                    </Text>
                );
            })}
        </Flex>
    );
}
