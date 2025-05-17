import { useNotify } from "@/Hooks";
import { Helper, ThemeColors } from "@/Utility";
import {
    Box,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spinner,
    useDisclosure
} from "@chakra-ui/react";
import { FaEllipsisH } from "react-icons/fa";
import { BsTextareaT } from "react-icons/bs";
import { IconImage } from "@/Common";
import { useMemo } from "react";
export default function ItemActionButtons({
    OnSetModalData,
    IsSelected,
    colorMode,
    ItemProps,
    Item,
    Lang
}) {
    const Notify = useNotify();
    const {
        isOpen: IsPriceListLoading,
        onOpen: OnOpenPriceListLoading,
        onClose: OnClosePriceListLoading
    } = useDisclosure();
    const OnOpenDataDescription = () => {
        if (!Item.DataDescription || Item.DataDescription == "0") {
            Notify(
                "warn",
                Lang?.ERRORS?.NO_DESCRIPTION?.replace("{{Compound}}", Item.DataCompound)
            );
            return;
        } else {
            OnSetModalData({
                CompoundId: Item.DataCompoundId,
                Type: "Description",
                SendType: "Message",
                Title: `Description ${Item.DataCompound}`,
                Content: Item.DataDescription
            });
        }
    };
    const OnPriceList = async () => {
        const IsAllowedToViewAllDetails = Helper.ValidateStatus(Lang, Item.DataStatus);
        if (!IsAllowedToViewAllDetails.IsAllowed) {
            OnSetModalData({
                CompoundId: Item.DataCompoundId,
                Type: "No_PriceList",
                SendType: "Single",
                Title: Item.DataCompound,
                Content: Lang?.DATA_PAGE?.STATUS_MESSAGES?.[Item.DataStatus]
            });
            return;
        }
        // const Data = await OnCdnFetch("PriceList");
        OnOpenPriceListLoading();
        OnSetModalData({
            CompoundId: Item.DataCompoundId,
            Type: "PriceList",
            SendType: "Single",
            Title: Item.DataCompound,
            Content: {
                Type: "PriceList",
                CompoundId: Item.DataCompoundId,
                CityId: Item.DataCityId
            }
        });
        setTimeout(() => OnClosePriceListLoading(), 1500);
    };
    const IconStyle = {
        color: colorMode == "light" ? "white" : "#002d3e",
        background: colorMode == "light" ? "#002d3e" : "white",
        height: "1.4rem",
        width: "1.4rem",
        padding: ".1rem",
        borderRadius: "10%"
    };
    const IsLoadingAny = useMemo(() => {
        return IsPriceListLoading; // IsLayoutsLoading;
    }, [IsPriceListLoading]);
    return (
        <Menu
            gutter={0}
            boundary={"scrollParent"}
            placement="auto"
            // closeOnSelect={false}
            {...(IsLoadingAny ? { isOpen: true } : {})}
        >
            <MenuButton
                as={IconButton}
                className="Nav-Icon-Color"
                size={"xs"}
                rounded={"full"}
                bg={ThemeColors.NavIconColor[colorMode]}
                _hover={{ bg: ThemeColors.NavIconColor[colorMode] }}
                icon={<FaEllipsisH />}
                isDisabled={!IsSelected}
            />
            {IsSelected && (
                <MenuList
                    p={2}
                    w={"fit-content"}
                    className="Main-Modal"
                    zIndex={"modal"}
                    transform={"translateX(-110%) scale(0.1)"}
                    transition={".5s ease-in-out"}
                >
                    <MenuItem
                        as={Box}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        gap={2}
                        className="Shadow"
                        onClick={() => OnPriceList()}
                        {...ItemProps}
                    >
                        {IsPriceListLoading ? (
                            <Spinner />
                        ) : (
                            <IconImage
                                Src={`/Img/${colorMode}/PriceList.webp`}
                                Alt="PriceList"
                                className="Action-Btn"
                                rounded={"10%"}
                                h={"1.5rem"}
                                minW={"1.5rem"}
                                w={"1.5rem"}
                            />
                        )}
                        <Box w={"100%"}>{Lang?.DATA_PAGE?.ACTIONS?.PRICELIST || "Price List"}</Box>
                    </MenuItem>
                    {/* <MenuItem
                        as={Box}
                        onClick={() => OnMatrials()}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        gap={2}
                        className="Shadow"
                        {...ItemProps}
                    >
                        {IsMatrialLoading ? (
                            <Spinner />
                        ) : (
                            <IconImage
                                Src={`/Img/${colorMode}/Matrial.webp`}
                                Alt="Matrial"
                                className="Action-Btn"
                                rounded={"10%"}
                                h={"1.5rem"}
                                minW={"1.5rem"}
                                w={"1.5rem"}
                            />
                        )}
                        <Box w={"100%"}>{Lang?.DATA_PAGE?.ACTIONS?.MATRILAS || "Matrials"}</Box>
                    </MenuItem>
                    {!IsCommercial && (
                        <MenuItem
                            as={Box}
                            onClick={() => OnLayouts()}
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            gap={2}
                            px={2}
                            className="Shadow"
                            {...ItemProps}
                        >
                            {IsLayoutsLoading ? (
                                <Spinner />
                            ) : (
                                <IconImage
                                    Src={`/Img/${colorMode}/Layouts.webp`}
                                    Alt="Layouts"
                                    className="Action-Btn"
                                    rounded={"10%"}
                                    h={"1.5rem"}
                                    minW={"1.5rem"}
                                    w={"1.5rem"}
                                    isLoading={IsLayoutsLoading}
                                />
                            )}
                            <Box w={"100%"}>{Lang?.DATA_PAGE?.ACTIONS?.LAYOUTS}</Box>
                        </MenuItem>
                    )} */}
                    <MenuItem
                        as={Box}
                        icon={<BsTextareaT style={IconStyle} />}
                        onClick={() => OnOpenDataDescription()}
                        {...ItemProps}
                    >
                        {Lang?.DATA_PAGE?.ACTIONS?.DESCRIPTION || "Description"}
                    </MenuItem>
                    {/* {IsPersonal && (
                        <MenuItem
                            as={Box}
                            icon={<MdOutlineContactPhone style={IconStyle} />}
                            onClick={() => (IsContactLoading ? () => {} : OnSetContacts())}
                            {...ItemProps}
                        >
                            {IsContactLoading ? (
                                <Spinner />
                            ) : (
                                Lang?.DATA_PAGE?.ACTIONS?.CONTACTS || "Contacts"
                            )}
                        </MenuItem>
                    )}
                    <MenuItem
                        as={Box}
                        icon={<FaVideo style={IconStyle} />}
                        onClick={() => OnOpenOrientation()}
                        {...ItemProps}
                    >
                        {Lang?.DATA_PAGE?.ACTIONS?.URL || "Orientation"}
                    </MenuItem> */}
                </MenuList>
            )}
        </Menu>
    );
}
