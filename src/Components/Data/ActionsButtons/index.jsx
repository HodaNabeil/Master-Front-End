import { MdOutlineContactPhone } from "react-icons/md";
import { BsTextareaT } from "react-icons/bs";
import { FaEllipsisV, FaVideo } from "react-icons/fa";
import {
    Box,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spinner,
    Tooltip,
    useColorMode,
    useDisclosure
} from "@chakra-ui/react";
import { useNotify, useValidateRole, useValidateSection } from "@/Hooks";
import { useGetContactsMutation } from "@/Redux";
import ContactsTable from "../ContactsTable";
import { IconImage } from "@/Common";
import { Helper } from "@/Utility";
const ActionsButtons = ({ OnSetModalData, Modal, Lang, Item }) => {
    const Notify = useNotify();
    const { IsPersonal } = useValidateRole();
    const { SelectedSection, IsCommercial } = useValidateSection();
    const [FindContacts, { isLoading: IsContactLoading }] = useGetContactsMutation();
    const { colorMode } = useColorMode();
    const {
        isOpen: IsMatrialLoading,
        onOpen: OnOpenMatrialLoading,
        onClose: OnCloseMatrialLoading
    } = useDisclosure();
    const {
        isOpen: IsLayoutsLoading,
        onOpen: OnOpenLayoutsLoading,
        onClose: OnCloseLayoutsLoading
    } = useDisclosure();
    const {
        isOpen: IsPriceListLoading,
        onOpen: OnOpenPriceListLoading,
        onClose: OnClosePriceListLoading
    } = useDisclosure();
    const {
        isOpen: isTooltipOpen,
        onOpen: onTooltipOpen,
        onClose: onTooltipClose
    } = useDisclosure();
    const OnOpenOrientation = () => {
        if (!Item.DataUrl || Item.DataUrl == "0") {
            Notify("warn", Lang?.ERRORS?.NO_URL?.replace("{{Compound}}", Item.DataCompound));
            return;
        } else {
            OnSetModalData({
                CompoundId: Item.DataCompoundId,
                Type: "DataUrl",
                Title: Item.DataCompound + " Video",
                Content: Item.DataUrl,
                Size: {
                    minW: {
                        base: "100vw",
                        sm: "60vw"
                    },
                    h: {
                        base: "80vh",
                        sm: "60vh"
                    },
                    top: {
                        base: "10vh",
                        lg: "20vh"
                    },
                    left: {
                        base: "0vw",
                        sm: "20vw"
                    }
                }
            });
        }
    };
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
    const OnSetContacts = async () => {
        const { data } = await FindContacts({
            DeveloperId: Item.DataDeveloperId,
            City: Item?.DataCityId,
            Section: SelectedSection
        });
        const Data = data?.data?.results;
        if (!Data || Data.length === 0) {
            Notify("warn", Lang?.ERRORS?.NO_CONTACTS?.replace("{{Developer}}", Item.DataDeveloper));
            return;
        }
        OnSetModalData({
            CompoundId: Item.DataCompoundId,
            Type: "Contacts",
            Title: Lang?.DATA_PAGE?.ACTIONS?.CONTACTS,
            Content: <ContactsTable Data={Data} IsLoading={IsContactLoading} />
        });
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
    const OnLayouts = async () => {
        OnOpenLayoutsLoading();
        OnSetModalData({
            CompoundId: Item.DataCompoundId,
            Type: "Layout",
            SendType: "Single",
            Title: Item.DataCompound,
            Content: {
                Type: "Layout",
                CompoundId: Item.DataCompoundId,
                CityId: Item.DataCityId
            }
        });
        setTimeout(() => OnCloseLayoutsLoading(), 1500);
    };
    const OnMatrials = async () => {
        OnOpenMatrialLoading();
        OnSetModalData({
            CompoundId: Item.DataCompoundId,
            Type: "Matrial",
            SendType: "List",
            Title: Item.DataCompound,
            Content: {
                Type: "Matrial",
                CompoundId: Item.DataCompoundId,
                CityId: Item.DataCityId
            },
            Extra: Item.DataDescription
        });
        setTimeout(() => OnCloseMatrialLoading(), 1500);
    };
    const IconStyle = {
        color: colorMode == "light" ? "white" : "#002d3e",
        background: colorMode == "light" ? "#002d3e" : "white",
        height: "1.4rem",
        width: "1.4rem",
        padding: ".1rem",
        borderRadius: "10%"
    };
    return (
        <Box
            display={"flex"}
            alignItems={"center"}
            m={{
                base: "",
                md: "0 auto"
            }}
            gap={4}
            w={{
                base: "",
                md: "100%"
            }}
            borderRadius={"2xl"}
            color={{
                base: colorMode === "dark" ? "gray.300" : "gray.600",
                md: ""
            }}
        >
            {/* dropDwon */}
            <Menu closeOnSelect={false} strategy="fixed" placement="auto">
                <MenuButton
                    // p={1}
                    as={IconButton}
                    aria-label="Actions"
                    icon={<FaEllipsisV />}
                    // icon={<IoIosMenu />}
                    size={"sm"}
                    // variant="outline"
                    // border={"none"}
                    // bg={"none"}
                    transition={"0.5s"}
                    rounded={"lg"}
                    _hover={{
                        bg: "#166083",
                        color: "white"
                    }}
                />
                <MenuList className="Main-Modal">
                    <MenuItem
                        icon={<BsTextareaT style={IconStyle} />}
                        onClick={() => OnOpenDataDescription()}
                        bg={"transparent"}
                        _hover={{
                            bg: "blue.500"
                        }}
                        as={Box}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        gap={2}
                    >
                        {Lang?.DATA_PAGE?.ACTIONS?.DESCRIPTION || "Description"}
                    </MenuItem>
                    {IsPersonal && (
                        <MenuItem
                            icon={<MdOutlineContactPhone style={IconStyle} />}
                            onClick={() => (IsContactLoading ? () => {} : OnSetContacts())}
                            _hover={{
                                bg: "blue.500"
                            }}
                            as={Box}
                            bg={"transparent"}
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            gap={2}
                        >
                            {IsContactLoading ? (
                                <Spinner />
                            ) : (
                                Lang?.DATA_PAGE?.ACTIONS?.CONTACTS || "Contacts"
                            )}
                        </MenuItem>
                    )}
                    <MenuItem
                        icon={<FaVideo style={IconStyle} />}
                        onClick={() => OnOpenOrientation()}
                        _hover={{
                            bg: "blue.500"
                        }}
                        bg={"transparent"}
                        as={Box}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        gap={2}
                    >
                        {/* Orientation */}
                        {Lang?.DATA_PAGE?.ACTIONS?.URL || "Orientation"}
                    </MenuItem>
                </MenuList>
            </Menu>
            {/* Matrial */}
            <Tooltip
                label={Lang?.DATA_PAGE?.ACTIONS?.MATRILAS || "Matrial"}
                hasArrow={true}
                closeDelay={100}
            >
                <Box>
                    <IconImage
                        Src={`/Img/${colorMode}/Matrial.webp`}
                        Alt="Matrial"
                        className="Action-Btn"
                        rounded={"10%"}
                        OnClick={() => OnMatrials()}
                        h={"1.8rem"}
                        minW={"1.8rem"}
                        w={"1.8rem"}
                        isLoading={IsMatrialLoading}
                        isDisabled={Modal.Type == "Matrial"}
                    />
                </Box>
            </Tooltip>

            {/* Layouts  */}
            {!IsCommercial && (
            <Tooltip label={Lang?.DATA_PAGE?.ACTIONS?.LAYOUTS} hasArrow closeDelay={100}>
                <div>
                    <IconImage
                        Src={`/Img/${colorMode}/Layouts.webp`}
                        Alt="Matrial"
                        className="Action-Btn"
                        rounded={"10%"}
                        OnClick={() => OnLayouts()}
                        isLoading={IsLayoutsLoading}
                        isDisabled={Modal.Type == "Layout"}
                        h={"1.8rem"}
                        minW={"1.8rem"}
                        w={"1.8rem"}
                    />
                </div>
            </Tooltip>
            )}

            {/* Price list */}
            <Tooltip
                label={Lang?.DATA_PAGE?.ACTIONS?.PRICELIST || "Price List"}
                hasArrow
                closeDelay={100}
                isOpen={Modal.Type == "PriceList" ? false : isTooltipOpen}
                onOpen={onTooltipOpen}
                onClose={onTooltipClose}
            >
                <div>
                    <IconImage
                        Src={`/Img/${colorMode}/PriceList.webp`}
                        Alt="Matrial"
                        className="Action-Btn"
                        rounded={"10%"}
                        OnClick={() => OnPriceList()}
                        h={"1.8rem"}
                        minW={"1.8rem"}
                        w={"1.8rem"}
                        isLoading={IsPriceListLoading}
                        isDisabled={Modal.Type == "PriceList"}
                    />
                </div>
            </Tooltip>
        </Box>
    );
};

export default ActionsButtons;
