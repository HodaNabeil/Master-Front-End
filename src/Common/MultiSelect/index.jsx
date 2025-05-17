import { useLang } from "@/Hooks";
import { Box, Flex, FormControl, FormLabel, Icon, useDisclosure } from "@chakra-ui/react";
import { useEffect, useMemo, useRef } from "react";
import { FaAngleDown, FaAngleUp, FaCheck } from "react-icons/fa";

export default function MultiSelect({
    InitialData = [],
    Selected = [],
    Name = "Residential",
    Type = "",
    OnChange = () => {},
    Label = "",
    IsShow = true,
    Rtl = false,
    WithALL = true
}) {
    const Lang = useLang();
    const SelectRef = useRef();
    const ButtonRef = useRef();
    const ProcessId = `${Type}Id`;
    const ProcessName = `${Type}Name`;
    const { isOpen, onToggle } = useDisclosure();
    const StyleElementLi = (IsSelected = false) => ({
        display: "flex",
        justifyContent: "space-between",
        padding: ".4rem .6rem",
        color: "white",
        alignItems: "center",
        fontSize: "15px",
        fontWeight: "normal",
        borderRadius: "3px",
        backgroundColor: IsSelected ? "#1f5072" : "#05062482",
        transition: "all 0.3s ease",
        cursor: "pointer",
        boxShadow: "0 0 1px 1px #083e66"
    });
    const SelectedCount = useMemo(() => Selected.length, [Selected]);
    const IsSelected = (item) => {
        const IsSelcet = Selected.some((i) => i[ProcessId] == item[ProcessId]);
        return IsSelcet;
    };
    const HandleChange = (Type, Item) => {
        const IsExits = Type == "All" ? false : IsSelected(Item);
        let NewSelected =
            Type == "All"
                ? []
                : IsExits
                ? Selected.filter((item) => item[ProcessId] != Item[ProcessId])
                : [...Selected, Item];
        const IsSelectedAll = InitialData.length == Selected.length;
        const FinelData = Type == "All" ? (IsSelectedAll ? [] : InitialData) : NewSelected;
        OnChange({
            target: {
                name: Name,
                value: FinelData
            }
        });
    };
    useEffect(() => {
        function HandleClickOutside(event) {
            if (
                SelectRef.current &&
                !SelectRef.current.contains(event.target) &&
                ButtonRef.current &&
                !ButtonRef.current.contains(event.target)
            ) {
                if (isOpen) {
                    onToggle();
                }
            }
        }
        document.addEventListener("click", HandleClickOutside);
        return () => {
            document.removeEventListener("click", HandleClickOutside);
        };
    }, [SelectRef, ButtonRef, onToggle, isOpen]);
    useEffect(() => {
        const Valid = InitialData.map((Item) => Item[ProcessId]);
        const NotIn = Selected.filter((Item) => !Valid.includes(Item[ProcessId]));
        if (NotIn.length > 0 && Selected.length > 0) {
            const In = Selected.filter((Item) => Valid.includes(Item[ProcessId]));
            OnChange({
                target: {
                    name: Name,
                    value: In
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [InitialData, ProcessId, Selected]);
    useEffect(() => {
        if (!IsShow && isOpen) onToggle();
    }, [IsShow, isOpen, onToggle]);
    if (!IsShow) return null;
    return (
        <FormControl pos={"relative"} ref={SelectRef}>
            {Label && <FormLabel dir={Rtl ? "rtl" : "ltr"} my={0}>{Label}</FormLabel>}
            <Flex
                onClick={onToggle}
                justifyContent="space-between"
                cursor="pointer"
                borderRadius="6px"
                alignItems="center"
                border="1px solid"
                _hover={{ borderColor: "#0e5f86" }}
                transition="0.3s linear"
                p="8px 15px"
                zIndex={1}
                ref={ButtonRef}
            >
                <p>{Lang?.SELECTED?.replace("{{Count}}", SelectedCount)}</p>
                <Icon as={isOpen ? FaAngleUp : FaAngleDown} />
            </Flex>
            {isOpen && (
                <Box
                    as="ul"
                    position="absolute"
                    top="4.5rem"
                    left="0"
                    width="100%"
                    overflowY="auto"
                    zIndex="2"
                    className="Main-Modal Shadow"
                    rounded={"md"}
                    transition={".5s"}
                    maxH={isOpen ? "12rem" : "0rem"}
                    p={1}
                >
                    {InitialData.length > 1 && WithALL && (
                        <li
                            style={{
                                // backgroundColor: "#1f5072",
                                backgroundColor:
                                    SelectedCount == InitialData.length ? "#1f5072" : "#05062482",
                                display: "flex",
                                justifyContent: "center",
                                gap: "10px",
                                padding: ".4rem .6rem",
                                color: "white",
                                alignItems: "center",
                                fontSize: "15px",
                                fontWeight: "normal",
                                borderRadius: "3px",
                                transition: "all 0.3s ease",
                                cursor: "pointer",
                                boxShadow: "0 0 1px 1px #083e66"
                            }}
                            onClick={() => HandleChange("All")}
                        >
                            <p>{Lang?.SELECT_ALL}</p>
                            {SelectedCount == InitialData.length && (
                                <p
                                    style={{
                                        color: "#6fc5ff"
                                    }}
                                >
                                    <FaCheck />
                                </p>
                            )}
                        </li>
                    )}
                    {InitialData.map((item, index) => {
                        const IsSelectedValue = IsSelected(item);
                        return (
                            <li
                                key={index}
                                style={StyleElementLi(IsSelectedValue)}
                                onClick={() => HandleChange("Single", item)}
                            >
                                <p>{item[ProcessName]}</p>
                                {IsSelectedValue && <p style={{ color: "#6fc5ff" }}>{item.Icon}</p>}
                            </li>
                        );
                    })}
                </Box>
            )}
        </FormControl>
    );
}
