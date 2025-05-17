import { IoLocation } from "react-icons/io5";
import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { Helper, RoutingManager, ThemeColors } from "@/Utility";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { useId, useMemo, useRef } from "react";
import ItemActionButtons from "../../ActionsButtons/Sm";
import ItemNotifications from "../ItemNotifications";
import { EllipsisText } from "@/Common";
import { useDispatch, useSelector } from "react-redux";
import { SetAppData } from "@/Redux";
const ContentItem = ({ OnSetModalData, colorMode, Lang, Item, Rtl = false }) => {
    const ItemRef = useRef();
    const UniqeId = useId();
    const Dispatch = useDispatch();
    const SelectedItem = useSelector((state) => state.AppData).SelectedItem;
    const Sx = {
        R8: {
            fontSize: ".8rem",
            fontWeight: "medium",
            marginTop: "-.5rem"
        },
        MtMinus5: {
            marginTop: "-.3rem"
        }
    };
    const ProcessDate = useMemo(() => {
        if (!Item?.DataDate)
            return (
                <Text textAlign={"center"} w={"50%"}>
                    {"-"}
                </Text>
            );
        const IsYesTerdayOrToDay = Item?.DataDate?.IsYesTerday || Item?.DataDate?.IsToday;
        const ProcessText = Item?.DataDate?.IsToday
            ? Lang?.PUBLIC?.TODAY || "Today"
            : Item?.DataDate?.IsYesTerday
            ? Lang?.PUBLIC?.YESTERDAY || "Yesterday"
            : Item.DataDate?.Format?.Date;
        const IsUpdated = Item?.DataDate?.Diff > -4;
        return (
            <Flex
                flexDir={"column"}
                alignItems={"center"}
                justifyContent={"start"}
                fontWeight={"bold"}
                gap={0}
                py={0}
                w={"full"}
                fontSize={"x-small"}
            >
                <Text
                    className="text-ellipsis"
                    w={"100%"}
                    textAlign={Rtl ? "left" : "right"}
                    pr={Rtl ? "0" : IsYesTerdayOrToDay ? ".5rem" : 0}
                    pl={Rtl ? (IsYesTerdayOrToDay ? ".5rem" : 0) : "0"}
                >
                    {ProcessText}
                </Text>
                {IsUpdated && (
                    <Flex
                        alignItems={"center"}
                        justifyContent={"end"}
                        gap={"2px"}
                        mt={-1}
                        w={"100%"}
                    >
                        <Text>{Lang?.PUBLIC?.UPDATED}</Text>
                        <Icon as={BsFillPatchCheckFill} color={"green.600"} />
                    </Flex>
                )}
            </Flex>
        );
    }, [Item.DataDate, Lang?.PUBLIC?.TODAY, Lang?.PUBLIC?.UPDATED, Lang?.PUBLIC?.YESTERDAY, Rtl]);
    const ProcessStartBua = useMemo(() => {
        // m => Metr
        return Item.DataMinBuiltUpAreaFrom
            ? `${Item.DataMinBuiltUpAreaFrom} ${Lang?.PUBLIC?.WORDS?.METR || "m"}`
            : "-";
    }, [Item.DataMinBuiltUpAreaFrom, Lang?.PUBLIC?.WORDS?.METR]);
    const ProcessDelivery = useMemo(() => {
        const { DataDeliveryFrom, DataDeliveryTo } = Item;
        const Length = {
            base: 20,
            sm: 25,
            md: 25,
            lg: 15,
            xl: 25,
            "2xl": 25
        };
        let ToReturn = (
            <EllipsisText Text={Lang?.PUBLIC?.WORDS?.DELIVERY_TITLE || "R T M"} Length={Length} />
        );
        if (!DataDeliveryFrom && !DataDeliveryTo) return ToReturn;
        if (DataDeliveryFrom != 0 || DataDeliveryTo != 0) {
            if (DataDeliveryFrom == DataDeliveryTo) {
                ToReturn = (
                    <Text>{`${DataDeliveryFrom} ${
                        Lang?.PUBLIC?.WORDS?.DELIVERY || "Years "
                    }`}</Text>
                );
            } else {
                let From =
                    DataDeliveryFrom > 0 ? (
                        `${DataDeliveryFrom}`
                    ) : (
                        <EllipsisText
                            Text={Lang?.PUBLIC?.WORDS?.DELIVERY_TITLE || "R T M"}
                            Length={Length}
                        />
                    );
                let To =
                    DataDeliveryTo > 0 ? (
                        `${DataDeliveryTo} ${Lang?.PUBLIC?.WORDS?.DELIVERY || "Years"}`
                    ) : (
                        <EllipsisText
                            Text={Lang?.PUBLIC?.WORDS?.DELIVERY_TITLE || "R T M"}
                            Length={Length}
                        />
                    );
                ToReturn = (
                    <Flex
                        flexDir={"row"}
                        alignItems={"center"}
                        gap={1}
                        fontSize={{
                            base: "small",
                            md: "md",
                            lg: "x-small",
                            xl: "small"
                        }}
                    >
                        <Text>{From}</Text>
                        <Text>{" : "}</Text>
                        <Text>{To}</Text>
                    </Flex>
                );
            }
        }
        return <div>{ToReturn}</div>;
    }, [Item, Lang?.PUBLIC?.WORDS?.DELIVERY, Lang?.PUBLIC?.WORDS?.DELIVERY_TITLE]);
    const IsAllowedToViewAllDetails = Helper.ValidateStatus(Lang, Item?.DataStatus);
    const IsSelected = SelectedItem?.DataId == Item?.DataId;
    const ItemProps = {
        bg: "transparent",
        className: "shadow",
        rounded: "lg",
        _hover: {
            bg: "blue.500"
        }
    };
    const CLen = Item?.DataCompound?.length;
    const CompoundNameClampStartSize =
        CLen >= 21 && CLen <= 25 ? ".8rem" : CLen >= 25 ? ".7rem" : ".9rem";
    const OnSelect = (item, IsSelected) => {
        if (IsSelected) return;
        Dispatch(SetAppData({ SelectedItem: item }));
    };
    return (
        <Box
            className={`Card-Reuslt-Serach ${IsSelected ? "Item-Selected" : ""}`}
            cursor={"pointer"}
            p={"2px 3px 2px 3px"}
            onClick={() => OnSelect(Item, IsSelected)}
            mb=".3rem"
            id={`${Item?.DataId}_Row`}
            ref={ItemRef}
            px={2}
            dir={Rtl ? "rtl" : "ltr"}
            // bg={'red'}
        >
            <Flex
            // alignItems={"center"}
            // justifyContent={"space-between"}
            >
                <Flex gap={"2"} w={"75%"}>
                    <Box
                        h={"3.7rem"}
                        w={"4.3rem"}
                        minW={"4.3em"}
                        // h={"50px"}
                        // minW={"60px"}
                        // mt={"0.3rem"}
                        className="imageLoader"
                        id={UniqeId}
                    >
                        <Image
                            h={"100%"}
                            w={"100%"}
                            objectFit="fill"
                            bgSize={"contain"}
                            src={`/Img/Developer/${Item?.DataDeveloperId}.${Helper.DeveloperImgExtintion}`}
                            alt={Item?.DataDeveloper}
                            borderRadius={"6px"}
                            // =============== ?????????===============
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `/Img/Not_Found.webp`;
                            }}
                            onLoad={() => {
                                const frame = document.getElementById(UniqeId);
                                frame.classList.remove("imageLoader");
                            }}
                        />
                    </Box>
                    <Flex flexDir={"column"} gap={"0.5"} py={0} fontSize={".9rem"} w={"100%"}>
                        <Flex gap={"3"} w={"100%"} alignItems={"baseline"} whiteSpace={"nowrap"}>
                            <Text fontSize={`clamp(${CompoundNameClampStartSize}, 1vw, 1rem)`}>
                                {Item?.DataCompound}
                            </Text>
                            <Text
                                fontSize={`calc(clamp(${CompoundNameClampStartSize}, 1vw, 1rem) - 2px)`}
                            >
                                {Item?.DataAcres_ProjectArea}
                            </Text>
                        </Flex>
                        <span style={Sx.MtMinus5}>{Item?.DataDeveloper}</span>
                        <Flex
                            alignItems={"center"}
                            gap={"2px"}
                            style={{
                                ...Sx.R8,
                                ...Sx.MtMinus5
                            }}
                        >
                            <Icon
                                as={IoLocation}
                                color={ThemeColors.NavIconColor[colorMode]}
                                ml={Rtl ? 0 : -1}
                                mr={Rtl ? -1 : 0}
                                onClick={() =>
                                    OnSetModalData({
                                        Type: "DataCoordinates",
                                        SendType: "Coordinates",
                                        Title: "",
                                        Content: Item?.DataCoordinates,
                                        CompoundId: Item?.DataCompoundId,
                                        Extra: RoutingManager.ProjectLink?.replace(
                                            "{{Project}}",
                                            Item?.DataCompound
                                        )?.replace("{{Id}}", Item?.DataCompoundId)
                                    })
                                }
                                _hover={{
                                    bg: ThemeColors.NavIconColor[
                                        colorMode === "dark" ? "light" : "dark"
                                    ]
                                }}
                                transition={"all .3s ease"}
                                cursor={"pointer"}
                                rounded={"full"}
                            />
                            <span> | </span>
                            <EllipsisText
                                Text={Item?.DataArea}
                                Length={{
                                    base: 30,
                                    sm: 50,
                                    md: 35,
                                    lg: 26
                                }}
                            />
                        </Flex>
                    </Flex>
                </Flex>
                <Flex w={"25%"} flexDir={"column"} alignItems={"center"} gap={0} py={0} h={"100%"}>
                    <Flex
                        gap="5px"
                        alignItems={"center"}
                        justifyContent={"flex-end"}
                        w={"full"}
                        // opacity={IsSelected ? 1 : 0}
                        transition={"all .3s ease"}
                    >
                        <ItemNotifications
                            OnSetModalData={OnSetModalData}
                            IsSelected={IsSelected}
                            colorMode={colorMode}
                            ItemProps={ItemProps}
                            Item={Item}
                            Lang={Lang}
                        />
                        <ItemActionButtons
                            OnSetModalData={OnSetModalData}
                            IsSelected={IsSelected}
                            colorMode={colorMode}
                            ItemProps={ItemProps}
                            Item={Item}
                            Lang={Lang}
                        />
                    </Flex>
                    <Flex justifyContent={"flex-end"} w={"100%"}>
                        {ProcessDate}
                    </Flex>
                </Flex>
            </Flex>
            <Flex flexDir={"column"} p={0} gap={"0.5"} textAlign={"center"} mt={1.5}>
                {IsAllowedToViewAllDetails.IsAllowed ? (
                    <>
                        <Flex
                            alignItems={"center"}
                            gap={0}
                            mt={"-.3rem"}
                            mb={"-.2rem"}
                            fontSize={{
                                base: "small",
                                md: "md",
                                lg: "x-small",
                                xl: "small"
                            }}
                        >
                            <Text
                                color={
                                    colorMode === "dark"
                                        ? "whiteAlpha.800"
                                        : ThemeColors.NavIconColor.light
                                }
                                textAlign={Rtl ? "right" : "left"}
                                w={"40%"}
                            >
                                {Lang?.PUBLIC?.WORDS?.START_BUA || "Start Bua"}
                                {" : "}
                                <span className="Card-Reuslt-Serach-Price">{ProcessStartBua}</span>
                            </Text>
                            <Text color={Helper.StatusColor[Item?.DataStatus] || ""} w={"30%"}>
                                {Item?.DataStatus ? (
                                    <EllipsisText
                                        Text={Lang?.DATA_PAGE?.STATUS_DATA?.[Item?.DataStatus]}
                                        Length={10}
                                    />
                                ) : (
                                    "-"
                                )}
                            </Text>
                            <Text w={"30%"} textAlign={!Rtl ? "right" : "left"}>
                                {Item?.DataPolicy}
                            </Text>
                        </Flex>

                        <Flex
                            mt={"-.1rem"}
                            mb={"-.1rem"}
                            fontFamily={"Cairo"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <Flex
                                alignItems={"center"}
                                gap="1px"
                                className="Color-Title-Result-Search"
                                fontSize={{
                                    base: "small",
                                    md: "md",
                                    lg: "x-small",
                                    xl: "small"
                                }}
                            >
                                <Text>
                                    {Lang?.PUBLIC?.WORDS?.START_PRICE || "Start Price"}
                                    {" : "}
                                </Text>
                                <Text className="Card-Reuslt-Serach-Price">
                                    {Item?.DataMinUnitPrice ? (
                                        <>
                                            {Helper.NumberWithCommas(Item?.DataMinUnitPrice)}{" "}
                                            {Lang?.DATA_PAGE?.LE || "LE"}
                                        </>
                                    ) : (
                                        "-"
                                    )}
                                </Text>
                            </Flex>
                            <Flex
                                fontSize={".9rem"}
                                textTransform={"capitalize"}
                                fontWeight={"medium"}
                                alignItems={"baseline"}
                                justifyContent={"center"}
                                gap={1}
                            >
                                <span>
                                    {Lang?.SIDEBAR?.LABEL?.Delivery || "Delivery"}
                                    {" , "}
                                </span>
                                {ProcessDelivery}
                            </Flex>
                        </Flex>
                    </>
                ) : (
                    IsAllowedToViewAllDetails.Message && (
                        <Text color={Helper.StatusColor[Item?.DataStatus]}>
                            {IsAllowedToViewAllDetails.Message}
                        </Text>
                    )
                )}
            </Flex>
        </Box>
    );
};

export default ContentItem;
