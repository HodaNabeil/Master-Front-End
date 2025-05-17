import { Table } from "@/Common";
import { useLang, useValidateSection } from "@/Hooks";
import { Helper, RoutingManager } from "@/Utility";
import { Box, Flex, Icon, Image, SimpleGrid, Stack, Text, Tooltip } from "@chakra-ui/react";
import { useMemo } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import ActionsButtons from "../../ActionsButtons";
import { SetAppData } from "@/Redux";
export default function BasicData({ OnSetModalData, IsLoading = true, Data = [], Modal, ...rest }) {
    const Lang = useLang();
    const Dispatch = useDispatch();
    const { Rtl } = useSelector((state) => state.Helper);
    const { Events } = useSelector((state) => state.Public);
    const { SelectedItem } = useSelector((state) => state.AppData);
    const { IsCommercial } = useValidateSection();
    const THeadData = [
        {
            Label: "Last update",
            Sort: "ASC",
            OrderBy: "DataDate",
            size: "6rem"
        },
        {
            Label: "Developer",
            Sort: "ASC",
            OrderBy: "DataDeveloper",
            size: "12rem"
        },
        {
            Label: "Compound",
            Sort: "ASC",
            OrderBy: IsCommercial ? "DataCompoundId" : "DataCompound",
            size: "14rem"
        },
        {
            Label: "Status",
            Sort: "ASC",
            OrderBy: "DataStatus",
            size: "6.4rem"
        },
        {
            Label: "Locations",
            Sort: "ASC",
            OrderBy: "DataArea",
            size: "10.77rem"
        },
        {
            Label: "Acres",
            Sort: "ASC",
            OrderBy: "DataAcres_ProjectArea",
            size: Rtl ? "5.2rem" : "5rem"
        },
        {
            Label: "Co. Policy",
            Sort: "ASC",
            OrderBy: "DataPolicy",
            size: Rtl ? "7.2rem" : "6.2rem"
        }
    ];
    let ColsSize = THeadData.reduce((o, key) => ({ ...o, [key.OrderBy]: key.size }), {});
    const DataToRender = useMemo(() => {
        if (Data.length < 1) return null;
        const OnSelect = (item, IsSelected) => {
            if (IsSelected) return;
            Dispatch(SetAppData({ SelectedItem: item }));
        };
        return Data?.map((item) => {
            const {
                DataId,
                DataAcres_ProjectArea,
                DataDeveloperId,
                DataDeveloper,
                DataCompound,
                DataCompoundId,
                DataPolicy,
                DataStatus,
                DataArea,
                DataDate,
                DataNote,
                DataCoordinates,
                DataIsCityScape
            } = item;
            const { IsToday, IsYesTerday, Format, Diff } = DataDate || {};
            const IsSelected = SelectedItem ? SelectedItem.DataId == item.DataId : null;
            const ProcessDate = IsToday
                ? Lang?.PUBLIC?.TODAY || "Today"
                : IsYesTerday
                ? Lang?.PUBLIC?.YESTERDAY || "Yesterday"
                : Format?.Date;
            const IsUpdated = Diff > -4;
            const UniqeId = `Image-${DataId}`;
            return {
                IsSelected,
                OnSelect: () => OnSelect(item, IsSelected),
                Data: [
                    {
                        Label: (
                            <Flex
                                direction="column"
                                justifyContent={"center"}
                                w={ColsSize["DataDate"]}
                            >
                                <span style={{ textAlign: "center" }}>{ProcessDate}</span>
                                {IsUpdated && (
                                    <Flex
                                        alignItems={"center"}
                                        justify={"center"}
                                        gap={1}
                                        w={"100%"}
                                    >
                                        {Lang?.PUBLIC?.UPDATED || "Updated"}
                                        <Icon as={BsFillPatchCheckFill} color={"green.500"} />
                                    </Flex>
                                )}
                            </Flex>
                        ),
                        IsSticky: false,
                        Extra: null
                    },
                    {
                        Label: (
                            <SimpleGrid
                                columns={2}
                                spacing={0}
                                py={"0.5"}
                                alignItems={"center"}
                                mr={Rtl ? "0" : "5"}
                                ml={Rtl ? "5" : "0"}
                                w={ColsSize["DataDeveloper"]}
                            >
                                <Box
                                    h={"40px"}
                                    w={"60px"}
                                    rounded={"lg"}
                                    bg={"#102d3f"}
                                    // p={1}
                                    className="Shadow imageLoader"
                                    id={UniqeId}
                                >
                                    <Image
                                        rounded={"lg"}
                                        src={`/Img/Developer/${DataDeveloperId}.${Helper.DeveloperImgExtintion}`}
                                        alt={DataDeveloper}
                                        h={"100%"}
                                        w={"100%"}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "/Img/Not_Found.webp";
                                        }}
                                        onLoad={() => {
                                            const frame = document.getElementById(UniqeId);
                                            frame.classList.remove("imageLoader");
                                        }}
                                    />
                                </Box>
                                <Text ml={Rtl ? 0 : "-20px"} mr={Rtl ? "-20px" : 0}>
                                    {DataDeveloper}
                                </Text>
                            </SimpleGrid>
                        ),
                        IsSticky: false,
                        Extra: null
                    },
                    {
                        Label: (
                            <Box
                                mr={Rtl ? "-2" : "1"}
                                ml={Rtl ? 1 : "-2"}
                                w={ColsSize["DataCompound"]}
                                py={"1"}
                            >
                                <SimpleGrid columns={2} alignItems={"center"} gap={0}>
                                    <Flex gap={1}>
                                        {DataNote ? (
                                            <Tooltip
                                                label={Lang?.DATA_PAGE?.ACTIONS?.NOTES || "Notes"}
                                                aria-label={
                                                    Lang?.DATA_PAGE?.ACTIONS?.NOTES || "Notes"
                                                }
                                            >
                                                <Image
                                                    src="/Img/Notes.svg"
                                                    transition={"0.3s"}
                                                    _hover={{
                                                        transform: "scale(1.3)"
                                                    }}
                                                    cursor={"pointer"}
                                                    w={"1.2rem"}
                                                    h={"1.2rem"}
                                                    onClick={() =>
                                                        OnSetModalData({
                                                            CompoundId: DataCompoundId,
                                                            Type: "Notes",
                                                            Title:
                                                                Lang?.DATA_PAGE?.ACTIONS?.NOTES ||
                                                                "Notes",
                                                            Content: DataNote
                                                        })
                                                    }
                                                />
                                            </Tooltip>
                                        ) : null}
                                        {Events.Cityscape && DataIsCityScape ? (
                                            <Tooltip
                                                label={
                                                    Lang?.DATA_PAGE?.ACTIONS?.CITYSCAPE ||
                                                    "Cityscape"
                                                }
                                                aria-label={
                                                    Lang?.DATA_PAGE?.ACTIONS?.CITYSCAPE ||
                                                    "Cityscape"
                                                }
                                            >
                                                <Image
                                                    src="/Img/Cityscape.webp"
                                                    _hover={{
                                                        transform: "scale(1.3)"
                                                    }}
                                                    cursor={"pointer"}
                                                    transition={"0.3s"}
                                                    w={"1.2rem"}
                                                    h={"1.2rem"}
                                                    onClick={() =>
                                                        OnSetModalData({
                                                            CompoundId: DataCompoundId,
                                                            Type: "CityScape",
                                                            Title:
                                                                Lang?.DATA_PAGE?.ACTIONS
                                                                    ?.CITYSCAPE || "Cityscape",
                                                            Content: (
                                                                <Stack
                                                                    direction={"column"}
                                                                    alignItems={"center"}
                                                                    justifyContent={"center"}
                                                                    gap={1}
                                                                >
                                                                    {Lang?.DATA_PAGE?.MESSAGES?.CITYSCAPE?.split(
                                                                        "~"
                                                                    )?.map((item, index) => (
                                                                        <Text key={index}>
                                                                            {item}
                                                                        </Text>
                                                                    ))}
                                                                </Stack>
                                                            )
                                                        })
                                                    }
                                                />
                                            </Tooltip>
                                        ) : null}
                                    </Flex>
                                    <Text
                                        ml={Rtl ? "0" : "-4.2em"}
                                        mr={Rtl ? "-4.2em" : "0"}
                                        className="text-ellipsis"
                                    >
                                        <Tooltip label={DataCompound} aria-label={DataCompound}>
                                            {DataCompound}
                                        </Tooltip>
                                    </Text>
                                    {IsSelected && (
                                        <ActionsButtons
                                            OnSetModalData={OnSetModalData}
                                            Modal={Modal}
                                            Lang={Lang}
                                            Item={item}
                                        />
                                    )}
                                </SimpleGrid>
                            </Box>
                        ),
                        IsSticky: false,
                        Extra: null
                    },
                    {
                        Label: (
                            <Text
                                w={ColsSize["DataStatus"]}
                                textAlign={"center"}
                                color={Helper.StatusColor[DataStatus] || ""}
                            >
                                {DataStatus ? Lang?.DATA_PAGE?.STATUS_DATA?.[DataStatus] : "-"}
                            </Text>
                        ),
                        IsSticky: false,
                        Extra: null
                    },
                    {
                        Label: (
                            <Box
                                w={ColsSize["DataAreaId"]}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                gap={1}
                            >
                                <Stack
                                    direction={"row"}
                                    alignItems={"center"}
                                    justify={"left"}
                                    w={"100%"}
                                >
                                    <Icon
                                        as={MdLocationPin}
                                        className="Locaion-Icon"
                                        boxSize={"1.7rem"}
                                        rounded={"full"}
                                        fontSize={"1.5rem"}
                                        onClick={() =>
                                            OnSetModalData({
                                                CompoundId: DataCompoundId,
                                                Type: "DataCoordinates",
                                                SendType: "Coordinates",
                                                Title: "",
                                                Content: DataCoordinates,
                                                Extra: RoutingManager.ProjectLink?.replace(
                                                    "{{Project}}",
                                                    DataCompound
                                                )?.replace("{{Id}}", DataCompoundId)
                                            })
                                        }
                                    />
                                    <Box w={"100%"} textAlign={"left"}>
                                        {DataArea}
                                    </Box>
                                </Stack>
                            </Box>
                        ),
                        IsSticky: false,
                        Extra: null
                    },
                    {
                        Label: (
                            <Text textAlign={"center"} w={ColsSize["DataAcres_ProjectArea"]}>
                                {DataAcres_ProjectArea}
                            </Text>
                        ),
                        IsSticky: false,
                        Extra: null
                    },
                    {
                        Label: (
                            <Text textAlign={"center"} w={ColsSize["DataPolicy"]}>
                                {DataPolicy}
                            </Text>
                        ),
                        IsSticky: false,
                        Extra: null
                    }
                ]
            };
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ColsSize, Data, Events.Cityscape, Lang, Modal, OnSetModalData, Rtl, SelectedItem?.DataId]);
    return (
        <>
            <Table
                THeadData={THeadData}
                BodyData={DataToRender ? DataToRender : []}
                IsLoading={IsLoading}
                {...rest}
            />
        </>
    );
}
