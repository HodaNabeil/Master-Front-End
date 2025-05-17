import { Box, Flex, Text, Tooltip, Spinner as ChakraSpinner } from "@chakra-ui/react";
import { useMemo } from "react";
import { FcOpenedFolder } from "react-icons/fc";
import { PiFoldersBold } from "react-icons/pi";
import { Spinner } from "@/Common";

export default function LayoutsView({
    OnSetFileViewData = () => {},
    CdnData,
    Data = {
        IsOpen: false,
        Title: "",
        Content: ""
    },
    IsLoading = true,
    FileViewLoading = false,
    IsModel = true
}) {
    let MaxTextLength = 20;
    const FindCdnList = useMemo(() => {
        return CdnData?.data?.Files ? Object.entries(CdnData?.data?.Files) : null;
    }, [CdnData]);
    const IsVertical = window.innerHeight < 500;
    const MainProps = IsModel
        ? {
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: {
                  base: IsLoading
                      ? "translateX(-110%) scale(0.1)"
                      : "translate(-50%, -50%) scale(1)",
                  md: IsLoading ? "translateX(-110%) scale(0.1)" : "translate(-28%, -50%) scale(1)",
                  lg: IsLoading ? "translateX(-110%) scale(0.1)" : "translate(-50%, -50%) scale(1)"
              },
              transition: "all 0.5s ease-in-out",
              zIndex: "15"
          }
        : {};
    return (
        <Box w={"100%"} h={"90%"} mt={"5%"}>
            <Box {...MainProps}
               rounded={"lg"}
               w={{
                   base: "calc(2rem *9)",
                   sm: "calc(2rem *10)"
               }}
            >
                {IsLoading ? (
                    <Flex fontSize={"3xl"} justifyContent={"center"} alignItems={"center"}>
                        <Spinner Width={200} />
                    </Flex>
                ) : (
                    <Box
                        p={"4"}
                        h={{
                            base: "25em",
                            sm: IsVertical ? "20em" : "30em"
                        }}
                        overflowY={"auto"}
                        overflowX={"hidden"}
                    >
                        {FindCdnList ? (
                            FindCdnList?.map(([Phas, phasData], mainIndex) => {
                                const Files = Object.entries(phasData);
                                if (Files.length == 0) return null;
                                return (
                                    <Box key={mainIndex}>
                                        <Flex
                                            pos={"relative"}
                                            my={1}
                                            _after={{
                                                content: "''",
                                                width: "100%",
                                                pos: "absolute",
                                                bottom: "-3px",
                                                borderBottom: "3px solid",
                                                rounded: "full"
                                            }}
                                        >
                                            <FcOpenedFolder />
                                            <Text ml={1}>{Phas}</Text>
                                        </Flex>
                                        <Box w={"85%"} ml={"10%"}>
                                            {Files?.map(([Type, TypeData], i) => (
                                                <div key={i}>
                                                    <Flex
                                                        pos={"relative"}
                                                        my={1}
                                                        _after={{
                                                            content: "''",
                                                            width: "50%",
                                                            pos: "absolute",
                                                            bottom: "-3px",
                                                            borderBottom: "3px solid",
                                                            rounded: "full"
                                                        }}
                                                    >
                                                        <PiFoldersBold />
                                                        <Text ml={2}>{Type}</Text>
                                                    </Flex>
                                                    {TypeData?.map((File, ind) => {
                                                        const IsLoading = FileViewLoading
                                                            ? FileViewLoading == File.FileUrl
                                                            : false;
                                                        return (
                                                            <Box
                                                                key={ind}
                                                                py={"0"}
                                                                px={"10px"}
                                                                mt={"0.5"}
                                                                border={"#166083 1px solid"}
                                                                rounded={"md"}
                                                                cursor={"pointer"}
                                                                color={"black"}
                                                                bg={"#6bcfb7"}
                                                                whiteSpace={"nowrap"}
                                                                _hover={{
                                                                    bg: "#f2ad46",
                                                                    color: "black"
                                                                }}
                                                                onClick={() => {
                                                                    if (IsLoading) return;
                                                                    OnSetFileViewData({
                                                                        Type: "Layout",
                                                                        Title: File.FileName,
                                                                        Content: File.FileUrl,
                                                                        CompoundId: Data.CompoundId
                                                                    });
                                                                }}
                                                                {...(IsLoading
                                                                    ? {
                                                                          display: "flex",
                                                                          justifyContent: "center"
                                                                      }
                                                                    : {})}
                                                            >
                                                                {IsLoading ? (
                                                                    <ChakraSpinner />
                                                                ) : (
                                                                    <Tooltip
                                                                        hasArrow={true}
                                                                        label={File.FileName.replaceAll(
                                                                            "%20",
                                                                            " "
                                                                        )}
                                                                        placement="top"
                                                                        color={"black"}
                                                                        bg={"#6bcfb7"}
                                                                        arrowShadowColor={"#166083"}
                                                                        border={"#166083 1px solid"}
                                                                        closeOnScroll={true}
                                                                        openDelay={1000}
                                                                    >
                                                                        <span>
                                                                            {File.FileName?.length >
                                                                            MaxTextLength
                                                                                ? File.FileName?.slice(
                                                                                      0,
                                                                                      MaxTextLength
                                                                                  )
                                                                                      ?.replaceAll(
                                                                                          "%20",
                                                                                          " "
                                                                                      )
                                                                                      ?.replaceAll(
                                                                                          "%2",
                                                                                          " "
                                                                                      ) + "..."
                                                                                : File.FileName?.replaceAll(
                                                                                      "%20",
                                                                                      " "
                                                                                  )}
                                                                        </span>
                                                                    </Tooltip>
                                                                )}
                                                            </Box>
                                                        );
                                                    })}
                                                </div>
                                            ))}
                                        </Box>
                                    </Box>
                                );
                            })
                        ) : (
                            <Flex fontSize={"3xl"} justifyContent={"center"} alignItems={"center"}>
                                <Spinner Width={200} />
                            </Flex>
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
}
