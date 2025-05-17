import { Collapse } from "@/Common";
import { useLang, useNotify } from "@/Hooks";
import { SetFilter, SetPublicData } from "@/Redux";
import { Helper } from "@/Utility";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Avatar,
    Badge,
    Box,
    Button,
    Divider,
    Flex,
    Image,
    Menu,
    MenuButton,
    MenuList,
    Text,
    useBreakpoint,
    useColorMode,
    useDisclosure
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const NotificationsCard = ({ Socket, ...rest }) => {
    const Lang = useLang();
    const Dispatch = useDispatch();
    const Notify = useNotify();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const BreakPoint = useBreakpoint();
    const { colorMode } = useColorMode();
    const { DataSectionId } = useSelector((state) => state.Filter);
    const { Rtl } = useSelector((state) => state.Helper);
    const { UserId } = useSelector((state) => state.Auth);
    const {
        Notifications = [],
        SelectedNotification,
        City,
        Section
    } = useSelector((state) => state.Public);

    const InitialData = {
        ReadPage: 1,
        UnReadPage: 1,
        ReadLimit: 10,
        UnReadLimit: 10
    };
    const [State, SetState] = useState(InitialData);
    useEffect(() => {
        if (DataSectionId) {
            SetState(InitialData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [DataSectionId]);
    const NextPage = (type, total) => {
        const NextPageNumber = type === "Read" ? State.ReadPage + 1 : State.UnReadPage + 1;
        const CurrentLimit = type === "Read" ? State.ReadLimit : State.UnReadLimit;
        if (CurrentLimit < total) {
            let NewLimit = NextPageNumber * 10;
            const ProcessNewLimit = NewLimit > total ? total : NewLimit;
            SetState((prevState) => ({
                ...prevState,
                ...(type === "Read"
                    ? {
                          ReadPage: NextPageNumber,
                          ReadLimit: ProcessNewLimit
                      }
                    : {
                          UnReadPage: NextPageNumber,
                          UnReadLimit: ProcessNewLimit
                      })
            }));
        }
    };
    const ProcessUnRead = useMemo(() => {
        if (!Notifications || !Notifications.length)
            return {
                Data: [],
                Total: 0
            };
        const UnRead = Notifications?.filter((item) => !item.NotifyIsRead);
        return {
            Data: UnRead?.slice(0, State.UnReadLimit),
            Total: UnRead.length
        };
    }, [Notifications, State.UnReadLimit]);
    const ProcessRead = useMemo(() => {
        if (!Notifications || !Notifications.length)
            return {
                Data: [],
                Total: 0
            };
        const Read = Notifications?.filter((item) => item.NotifyIsRead);
        return {
            Data: Read?.slice(0, State.ReadLimit),
            Total: Read.length
        };
    }, [Notifications, State.ReadLimit]);
    const OnRead = (item, WithSelect = true) => {
        const NewData = Notifications?.map((Item) => {
            if (Item.NotifyId == item.NotifyId) return { ...Item, NotifyIsRead: true };
            return Item;
        });
        Socket.Emit("Notification", {
            command: "Read",
            body: {
                NotifyId: item.NotifyId,
                UserId: UserId
            }
        });
        const UpdateData = {
            Notifications: NewData
        };
        if (WithSelect) {
            UpdateData.SelectedNotification = item;
        }
        Dispatch(SetPublicData(UpdateData));
        return;
    };
    const OnSelect = (item) => {
        const { IsProject } = item;
        if (SelectedNotification?.NotifyId == item.NotifyId) return;
        if (!IsProject) {
            OnRead(item);
        }
    };
    const SectionsOptions = useMemo(
        () => (Lang?.DATA_PAGE?.TABS?.SECTIONS?.length > 0 ? Lang?.DATA_PAGE?.TABS?.SECTIONS : []),
        [Lang?.DATA_PAGE?.TABS?.SECTIONS]
    );
    const OnFilter = (FilterData, item) => {
        const { NotifySectionId, NotifyCityId } = FilterData;
        const IsInUserSections = Section?.find((S) => S.SectionId == NotifySectionId);
        const Sec = SectionsOptions?.find((S) => S.value == NotifySectionId);
        OnRead(item, false);
        if (IsInUserSections) {
            const IsHaveCities = City?.filter(
                (C) => C.CitySectionId == NotifySectionId && C.CityId == NotifyCityId
            );
            if (IsHaveCities?.length < 1) {
                const GetCityName = Helper.Cities[NotifyCityId?.toString()];
                Notify(
                    "warn",
                    Lang?.ERRORS?.NO_SUBSCRIPTION_FOUND?.replace("{{KEY}}", GetCityName)
                );
                return;
            }
            Dispatch(SetFilter(FilterData));
            onClose();
            return;
        }
        Notify("info", Lang?.ERRORS?.NO_SUBSCRIPTION_FOUND?.replace("{{KEY}}", Sec.ViewLabel));
    };
    return (
        <Menu
            placement={["base", "sm"].includes(BreakPoint) ? "auto" : "end-end"}
            gutter={0}
            // closeOnBlur={false}
            closeOnSelect={false}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
        >
            <MenuButton pos={"relative"}>
                <Image
                    src={`/Img/${colorMode}/Bell.webp`}
                    boxSize={{
                        base: "1.4rem",
                        md: "1.5rem"
                    }}
                    bgSize={"cover"}
                    objectFit={"cover"}
                    {...rest}
                />
                {ProcessUnRead?.Total > 0 && (
                    <Badge
                        position={"absolute"}
                        bottom={"-1"}
                        right={0}
                        zIndex={1}
                        variant="solid"
                        bg="red"
                        rounded={"full"}
                    >
                        {ProcessUnRead?.Total}
                    </Badge>
                )}
            </MenuButton>
            <MenuList
                px={1}
                w={{
                    base: "100%",
                    md: "fit-content"
                }}
                className="Main-Modal"
                transform={"translateX(-110%) scale(0.1)"}
                transition={".5s ease-in-out"}
                maxH={"70vh"}
                overflowY={"auto"}
                overflowX={"hidden"}
            >
                {Notifications?.length > 0 ? (
                    <>
                        <Flex flexDir={"column"} dir={Rtl ? "rtl" : "ltr"} pos={"relative"}>
                            {ProcessUnRead.Total > 0 && (
                                <>
                                    <Text
                                        className="Main-Modal Shadow"
                                        w={"100%"}
                                        rounded={"lg"}
                                        p={1}
                                        pos={"sticky"}
                                        top={"-2%"}
                                        zIndex={1}
                                        textAlign={"center"}
                                    >
                                        {Lang?.DATA_PAGE?.UN_READED} - ({" "}
                                        {ProcessUnRead.Total > State.UnReadLimit
                                            ? State.UnReadLimit
                                            : ProcessUnRead.Total}{" "}
                                        {" / "}
                                        {ProcessUnRead.Total})
                                    </Text>
                                    <Accordion
                                        allowToggle={true}
                                        w={{
                                            base: "90vw",
                                            md: "23rem"
                                        }}
                                        maxW={{
                                            base: "90vw",
                                            md: "23rem"
                                        }}
                                    >
                                        {ProcessUnRead.Data.map((item) => {
                                            return (
                                                <NotificationItem
                                                    OnSelect={OnSelect}
                                                    colorMode={colorMode}
                                                    item={item}
                                                    Rtl={Rtl}
                                                    key={item.NotifyId}
                                                    OnFilter={OnFilter}
                                                />
                                            );
                                        })}
                                    </Accordion>
                                    {ProcessUnRead.Total > State.UnReadLimit && (
                                        <Button
                                            colorScheme="blue"
                                            w={"100%"}
                                            rounded={"full"}
                                            borderInline={"5px solid"}
                                            borderColor={
                                                colorMode === "dark" ? "#00acea" : "#9aafbc"
                                            }
                                            variant={"solid"}
                                            mt={1}
                                            onClick={() => NextPage("UnRead", ProcessUnRead.Total)}
                                        >
                                            {Lang?.DATA_PAGE?.LOAD_MORE || "Load More ..."}
                                        </Button>
                                    )}
                                </>
                            )}
                        </Flex>
                        {ProcessRead.Total > 0 && ProcessUnRead.Total > 0 && <Divider py={1} />}
                        <Flex flexDir={"column"} dir={Rtl ? "rtl" : "ltr"} pos={"relative"}>
                            {ProcessRead.Total > 0 && (
                                <>
                                    <Text
                                        className="Main-Modal Shadow"
                                        w={"100%"}
                                        rounded={"lg"}
                                        p={1}
                                        pos={"sticky"}
                                        top={"-2%"}
                                        zIndex={1}
                                        textAlign={"center"}
                                    >
                                        {Lang?.DATA_PAGE?.READ} - ({" "}
                                        {ProcessRead.Total > State.ReadLimit
                                            ? State.ReadLimit
                                            : ProcessRead.Total}{" "}
                                        {" / "}
                                        {ProcessRead.Total})
                                    </Text>
                                    <Accordion
                                        allowToggle={true}
                                        w={{
                                            base: "90vw",
                                            md: "23rem"
                                        }}
                                        maxW={{
                                            base: "90vw",
                                            md: "23rem"
                                        }}
                                    >
                                        {ProcessRead.Data.map((item) => {
                                            return (
                                                <NotificationItem
                                                    OnSelect={OnSelect}
                                                    colorMode={colorMode}
                                                    item={item}
                                                    Rtl={Rtl}
                                                    key={item.NotifyId}
                                                    OnFilter={OnFilter}
                                                />
                                            );
                                        })}
                                    </Accordion>
                                    {ProcessRead.Total > State.ReadLimit && (
                                        <Button
                                            colorScheme="blue"
                                            w={"100%"}
                                            rounded={"full"}
                                            borderInline={"5px solid"}
                                            borderColor={
                                                colorMode === "dark" ? "#00acea" : "#9aafbc"
                                            }
                                            variant={"solid"}
                                            mt={1}
                                            onClick={() => NextPage("Read", ProcessRead.Total)}
                                        >
                                            {Lang?.DATA_PAGE?.LOAD_MORE || "Load More ..."}
                                        </Button>
                                    )}
                                </>
                            )}
                        </Flex>
                    </>
                ) : (
                    <h4 style={{ textAlign: "center" }}>{Lang?.ERRORS?.NO_NOTIFICATIONS}</h4>
                )}
            </MenuList>
        </Menu>
    );
};

export default NotificationsCard;

function NotificationItem({ colorMode, OnSelect, item, Rtl, OnFilter }) {
    let { NotifyTitle, NotifyMessage, NotifyLink, IsProject, NotifyMimeType } = item;
    IsProject = IsProject || !NotifyMimeType;
    const Rounded = (Dir) => {
        if (!IsProject)
            return {
                rounded: "lg"
            };
        return Dir
            ? {
                  roundedRight: "lg"
              }
            : {
                  roundedLeft: "lg"
              };
    };
    const MainH = "2.5rem";
    const IsArabic = Helper.IsArabic(NotifyMessage);
    const IsTitleArabic = Helper.IsArabic(NotifyTitle);
    const ViewData = useMemo(() => {
        if (!NotifyLink) return null;
        const { City: CityId, Section: SectionId, Compound } = NotifyLink;
        const NewData = {
            NotifyCompoundId: Compound,
            NotifyCityId: CityId,
            NotifySectionId: SectionId
        };
        return NewData;
    }, [NotifyLink]);
    return (
        <AccordionItem mt={1} py={0} w={"100%"} className="testr">
            {({ isExpanded }) => (
                <>
                    <Flex
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        gap={1}
                        w={"100%"}
                        h={MainH}
                    >
                        <Flex
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            w={"100%"}
                            className="Shadow"
                            flexDir={Rtl ? "row-reverse" : "row"}
                            onClick={() =>
                                IsProject
                                    ? ViewData
                                        ? OnFilter(ViewData, item)
                                        : void 0
                                    : OnSelect(item)
                            }
                            cursor={ViewData ? "pointer" : IsProject ? "not-allowed" : "pointer"}
                            _hover={{
                                bg: "#2b4e5c",
                                color: colorMode === "dark" ? "white" : "black"
                            }}
                            transition={"0.5s"}
                            h={MainH}
                            {...Rounded(Rtl, IsProject)}
                        >
                            <Avatar
                                boxSize={MainH}
                                src={`/Img/${colorMode}/Bell.webp`}
                                name={NotifyTitle}
                                bgSize={"100% 100%"}
                                className="Shadow"
                                loading="lazy"
                            />
                            <Flex
                                alignItems={"center"}
                                justifyContent={"center"}
                                px={1}
                                w={"100%"}
                                h={MainH}
                                fontWeight="bold"
                                dir={IsTitleArabic ? "rtl" : "ltr"}
                            >
                                {NotifyTitle}
                            </Flex>
                        </Flex>
                        {IsProject && (
                            <AccordionButton
                                w={"2rem"}
                                outline={"none"}
                                h={MainH}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                className="Shadow"
                                {...Rounded(!Rtl)}
                            >
                                <AccordionIcon />
                            </AccordionButton>
                        )}
                    </Flex>
                    <Collapse IsOpen={isExpanded}>
                        <AccordionPanel
                            pb={4}
                            opacity={isExpanded ? 1 : 0}
                            transition={"5.2s ease-in-out"}
                            maxH={{
                                base: "15rem",
                                md: "15rem"
                            }}
                            overflowY={"auto"}
                            dir={IsArabic ? "rtl" : "ltr"}
                        >
                            <Box
                                fontSize="sm"
                                textAlign={IsArabic ? "right" : "left"}
                                direction={IsArabic ? "rtl" : "ltr"}
                            >
                                {NotifyMessage
                                    ? NotifyMessage?.split("~")?.map((item, index) => (
                                          <Text key={index}>{item}</Text>
                                      ))
                                    : "No Message"}
                            </Box>
                        </AccordionPanel>
                    </Collapse>
                </>
            )}
        </AccordionItem>
    );
}
