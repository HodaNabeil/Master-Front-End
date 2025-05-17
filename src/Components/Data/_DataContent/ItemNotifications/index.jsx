import { ThemeColors } from "@/Utility";
import {
    Badge,
    Box,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    Text
} from "@chakra-ui/react";
import { useMemo } from "react";
import { MdNotificationsActive } from "react-icons/md";
import { useSelector } from "react-redux";

export default function ItemNotifications({
    OnSetModalData,
    IsSelected,
    colorMode,
    ItemProps,
    Item,
    Lang
}) {
    const { Events } = useSelector((state) => state.Public);
    const { Rtl } = useSelector((state) => state.Helper);
    const OnNoteClick = (Note) => {
        OnSetModalData({
            CompoundId: Item.DataCompoundId,
            Type: "Notes",
            Title: Lang?.DATA_PAGE?.ACTIONS?.NOTES,
            Content: Note
        });
    };
    const OnCityScapeClick = () => {
        OnSetModalData({
            CompoundId: Item.DataCompoundId,
            Type: "CityScape",
            Title: Lang?.DATA_PAGE?.ACTIONS?.CITYSCAPE,
            Content: (
                <Stack direction={"column"} alignItems={"center"} justifyContent={"center"} gap={1}>
                    {Lang?.DATA_PAGE?.MESSAGES?.CITYSCAPE.split("~")?.map((item, index) => (
                        <Text key={index}>{item}</Text>
                    ))}
                </Stack>
            )
        });
    };
    const ShowCityScape = useMemo(() => {
        return Events?.CityScape && Item?.DataIsCityScape;
    }, [Events?.CityScape, Item?.DataIsCityScape]);
    let NotifaictionsCount = useMemo(() => {
        let Count = 0;
        if (ShowCityScape && !Item?.DataNote) {
            Count++;
        }
        if (Item.DataNote) {
            Count++;
        }
        return Count;
    }, [ShowCityScape, Item?.DataNote]);
    return (
        <Menu gutter={0} boundary={"scrollParent"} placement="auto">
            <Box pos={"relative"}>
                <MenuButton
                    as={IconButton}
                    size={"xs"}
                    fontSize={"1.2rem"}
                    outline={"none"}
                    border={"none"}
                    rounded={"full"}
                    bg={ThemeColors.NavIconColor[colorMode]}
                    _hover={{ bg: ThemeColors.NavIconColor[colorMode] }}
                    className="Nav-Icon-Color"
                    icon={<MdNotificationsActive />}
                    isDisabled={!IsSelected}
                ></MenuButton>
                {NotifaictionsCount > 0 && (
                    <Badge
                        position={"absolute"}
                        top={"-1"}
                        right={Rtl ? "-2" : "unset"}
                        left={Rtl ? "unset" : "-2"}
                        zIndex={1}
                        variant="solid"
                        bg="red"
                        size={"xs"}
                        rounded={"full"}
                    >
                        {NotifaictionsCount}
                    </Badge>
                )}
            </Box>
            <MenuList
                p={2}
                w={"fit-content"}
                className="Main-Modal"
                zIndex={"modal"}
                transform={"translateX(-110%) scale(0.1)"}
                transition={".5s ease-in-out"}
            >
                {!ShowCityScape && !Item?.DataNote ? (
                    <h4 style={{ textAlign: "center" }}>{Lang?.ERRORS?.NO_NOTIFICATIONS}</h4>
                ) : null}
                {!Item.DataNote ? null : (
                    <MenuItem onClick={() => OnNoteClick(Item.DataNote)} {...ItemProps}>
                        {Lang?.DATA_PAGE?.ACTIONS?.NOTES || "Notes"}
                    </MenuItem>
                )}
                {ShowCityScape ? (
                    //  && item?.data_type == 1
                    <MenuItem onClick={() => OnCityScapeClick()} {...ItemProps}>
                        {Lang?.DATA_PAGE?.ACTIONS?.CITYSCAPE || "CityScape"}
                    </MenuItem>
                ) : null}
            </MenuList>
        </Menu>
    );
}
