import { useMemo, useState } from "react";
import {
    Box,
    CloseButton,
    Divider,
    Flex,
    HStack,
    Stack,
    Switch,
    Text,
    Tooltip,
    Spinner as ChakraSpinner
} from "@chakra-ui/react";
import { Spinner, WhatsAppSender } from "@/Common";
import { useSelector } from "react-redux";

const MatrialView = ({
    OnClose = () => {},
    Data = {
        CompoundId: "",
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
    IsModel = true
}) => {
    const { Rtl } = useSelector((state) => state.Helper);
    let MaxArraySize = 15;
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
    const FindCdnList = useMemo(() => {
        return CdnData?.data?.Files;
    }, [CdnData]);
    const [RichedLimit, SetRichedLimit] = useState(false);
    const [Checked, setChecked] = useState({
        Description: false,
        Brochure: [],
        Contract: [],
        MasterPlan: [],
        Photos: []
    });
    let MaxTextLength = 20;
    const ValidateAllFiles = useMemo(() => {
        const All = [
            ...Checked.Brochure,
            ...Checked.Contract,
            ...Checked.MasterPlan,
            ...Checked.Photos
        ];
        if (All.length >= MaxArraySize) {
            SetRichedLimit(All.length >= MaxArraySize);
        } else {
            SetRichedLimit(false);
        }
        return All;
    }, [Checked.Brochure, Checked.Contract, Checked.MasterPlan, Checked.Photos, MaxArraySize]);
    const HandleSelect = (Name, File, Type = "Single") => {
        let NewData = Checked[Name];
        const StillNeded = MaxArraySize - ValidateAllFiles.length;
        if (Type == "Single") {
            const isSelected = NewData.includes(File);
            if (StillNeded == 0 && !isSelected) return;
            if (isSelected) {
                NewData = NewData?.filter((item) => item !== File);
            } else {
                NewData = [...NewData, File];
            }
            setChecked((prev) => ({
                ...prev,
                [Name]: NewData
            }));
            return;
        }
        const New = NewData.length == 0 ? File.slice(0, StillNeded) : [];
        setChecked((prev) => ({
            ...prev,
            [Name]: StillNeded == 0 ? [] : New
        }));
    };
    return (
        <Box
            {...MainProps}
            border={"1px solid"}
            className="Main-Modal Shadow"
            rounded={"lg"}
            w={{
                base: "calc(2rem *9)",
                sm: "calc(2rem *10)"
            }}
            zIndex={"25"}
            dir={Rtl ? "rtl" : "ltr"}
        >
            <Flex
                rounded={"lg"}
                px={"2"}
                zIndex={14}
                alignItems={"center"}
                flexDir={"column"}
                className="Main-Modal Shadow"
                gap={0}
            >
                <HStack justifyContent={"space-between"} w={"100%"} p={1} mb={"-2"}>
                    <span>{Data.Title}</span>
                    <CloseButton
                        onClick={() => OnClose()}
                        size="sm"
                        border={"1px solid"}
                        rounded={"full"}
                    />
                </HStack>
                <WhatsAppSender
                    Type="List"
                    Data={{
                        CompoundId: Data.CompoundId,
                        Message: Checked.Description ? Data.Extra : null,
                        Files: ValidateAllFiles
                            ? ValidateAllFiles?.map((F) => ({
                                  FileUrl: F
                              }))
                            : []
                    }}
                />
            </Flex>
            {IsLoading ? (
                <Flex fontSize={"3xl"} justifyContent={"center"} alignItems={"center"}>
                    <Spinner Width={200} />
                </Flex>
            ) : (
                <Stack
                    p={"4"}
                    h={{
                        base: "25em",
                        sm: IsVertical
                            ? window.innerHeight < 273
                                ? "clamp(10em, 2vh, 20em)"
                                : "clamp(17em, 2vh, 20em)"
                            : "30em"
                    }}
                    overflow={"auto"}
                >
                    {Data.Extra && (
                        <Switch
                            colorScheme="green"
                            size={"sm"}
                            mr={Rtl ? 2 : 0}
                            ml={Rtl ? 0 : 2}
                            isChecked={Checked.Description}
                            onChange={(e) =>
                                setChecked((prev) => ({
                                    ...prev,
                                    Description: e.target.checked
                                }))
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
                            const IsAllSelected = Checked[Folder].length == Files.length;
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
                                            HandleSelect(
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
                                            ml={Rtl ? "unset" : 10} mr={Rtl ? 10 : "unset"}
                                            >
                                                {Checked[Folder].length} : {Files.length}
                                            </Text>
                                        </Flex>
                                    </Switch>
                                    {Files?.map((File, index) => {
                                        const IsSeleced = Checked[Folder].includes(File?.FileUrl);
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
                                                    // mr={2}
                                                    mr={Rtl ? 6 : 0}
                                                    ml={Rtl ? 0 : 6}
                                                    size={"sm"}
                                                    isChecked={IsSeleced}
                                                    value={File.FileUrl}
                                                    onChange={() =>
                                                        HandleSelect(Folder, File.FileUrl)
                                                    }
                                                    isDisabled={
                                                        RichedLimit && !IsSeleced ? true : false
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
                                                                          ?.replaceAll("%20", " ")
                                                                          ?.replaceAll("%2", " ") +
                                                                      "..."
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
    );
};
export default MatrialView;
