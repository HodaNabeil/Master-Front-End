import { useMemo } from "react";
import {
    Box,
    Divider,
    Flex,
    Stack,
    Switch,
    Text,
    Tooltip,
    Spinner as ChakraSpinner
} from "@chakra-ui/react";
import { Spinner } from "@/Common";
import { useSelector } from "react-redux";

const MatrialView = ({
    Data = {
        IsOpen: false,
        Title: "",
        Content: "",
        Extra: null
    },
    Lang,
    OnSetFileViewData = () => {},
    CdnData,
    IsLoading = true,
    FileViewLoading = false,
    IsModel = true,
    ModalsProps = {
        OnChecked: () => {},
        RichedLimit: false,
        Checked: {}
    }
}) => {
    const { Rtl } = useSelector((state) => state.Helper);
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
    const FindCdnList = useMemo(() => {
        return CdnData?.data?.Files;
    }, [CdnData]);
    let MaxTextLength = 20;

    return (
        <Box w={"100%"} h={"90%"} mt={"5%"}>
            <Box
                {...MainProps}
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
                    <Stack p={"4"} overflow={"auto"}>
                        {Data.Extra && (
                            <Switch
                                colorScheme="green"
                                size={"sm"}
                                mr={Rtl ? 2 : 0}
                                ml={Rtl ? 0 : 2}
                                isChecked={ModalsProps.Checked.Description}
                                onChange={(e) =>
                                    ModalsProps.OnChecked("Description", e.target.checked)
                                }
                                cursor={"pointer"}
                                display={"flex"}
                                alignItems={"center"}
                            >
                                <span>{Lang?.DATA_PAGE?.VIEWS?.MATRIAL?.Description}</span>
                            </Switch>
                        )}
                        {FindCdnList ? (
                            Object.entries(FindCdnList)?.map(([Folder, Files], FolderIndex) => {
                                if (Files.length == 0) return null;
                                const IsAllSelected =
                                    ModalsProps.Checked[Folder].length == Files.length;
                                return (
                                    <div key={Folder}>
                                        <Switch
                                            display={"flex"}
                                            alignItems={"center"}
                                            colorScheme="green"
                                            mr={Rtl ? 2 : 0}
                                            ml={Rtl ? 0 : 2}
                                            size={"sm"}
                                            name={Folder}
                                            isChecked={IsAllSelected}
                                            onChange={() =>
                                                ModalsProps.OnChecked(
                                                    Folder,
                                                    Files?.map((file) => file.FileUrl),
                                                    "All"
                                                )
                                            }
                                            cursor={"pointer"}
                                        >
                                            <Flex alignItems={"center"} w={"100%"}>
                                                <span>
                                                    {Lang?.DATA_PAGE?.VIEWS?.MATRIAL?.[Folder]}{" "}
                                                </span>
                                                <Text
                                                    ml={Rtl ? "unset" : 10}
                                                    mr={Rtl ? 10 : "unset"}
                                                >
                                                    {ModalsProps.Checked[Folder].length} :{" "}
                                                    {Files.length}
                                                </Text>
                                            </Flex>
                                        </Switch>
                                        {Files?.map((File, index) => {
                                            const IsSeleced = ModalsProps.Checked[Folder].includes(
                                                File?.FileUrl
                                            );
                                            const IsLoading = FileViewLoading
                                                ? FileViewLoading == File.FileUrl
                                                : false;
                                            return (
                                                <Flex
                                                    display="flex"
                                                    alignItems="center"
                                                    key={`${Folder}_File_${index}`}
                                                    ml={6}
                                                    cursor={"pointer"}
                                                    mt={1}
                                                >
                                                    <Switch
                                                        colorScheme="green"
                                                        mr={Rtl ? 6 : 0}
                                                    ml={Rtl ? 0 : 6}
                                                        size={"sm"}
                                                        isChecked={IsSeleced}
                                                        value={File.FileUrl}
                                                        onChange={() =>
                                                            ModalsProps.OnChecked(
                                                                Folder,
                                                                File.FileUrl
                                                            )
                                                        }
                                                        isDisabled={
                                                            ModalsProps.RichedLimit && !IsSeleced
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    <Box
                                                        mb="0"
                                                        px={"3"}
                                                        border={"#166083 1px solid"}
                                                        rounded={"md"}
                                                        cursor={"pointer"}
                                                        color={"black"}
                                                        bg={"#6bcfb7"}
                                                        _hover={{
                                                            bg: "#f2ad46",
                                                            color: "black"
                                                        }}
                                                        onClick={() => {
                                                            if (IsLoading) return;
                                                            OnSetFileViewData({
                                                                Title: File.FileName,
                                                                Content: File.FileUrl
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
                                                </Flex>
                                            );
                                        })}
                                        {FolderIndex !== Object.keys(FindCdnList).length - 1 && (
                                            <Divider
                                                border={"1px solid"}
                                                mt={1}
                                                w={"50%"}
                                                mx={"auto"}
                                            />
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <Flex fontSize={"3xl"} justifyContent={"center"} alignItems={"center"}>
                                <Spinner Width={200} />
                            </Flex>
                        )}
                    </Stack>
                )}
            </Box>
        </Box>
    );
};
export default MatrialView;
