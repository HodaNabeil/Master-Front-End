import { SetFilter } from "@/Redux";
import { Theme } from "@/Utility";
import {
    Box,
    Flex,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useColorMode
} from "@chakra-ui/react";
import { useMemo } from "react";
import { BsSliders } from "react-icons/bs";
import { BsSortAlphaDownAlt } from "react-icons/bs";
import { BsSortAlphaUp } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
const Sorting = ({ Lang }) => {
    const { colorMode } = useColorMode();
    const { Sort, OrderBy } = useSelector((state) => state.Filter);
    const Dispatch = useDispatch();
    const IsAsc = Sort === "ASC";
    const OrderKeys = useMemo(() => {
        return Lang?.DATA_PAGE?.OPTIONS?.ORDER ? Lang?.DATA_PAGE?.OPTIONS?.ORDER : [];
    }, [Lang?.DATA_PAGE?.OPTIONS?.ORDER]);
    const HandleSort = (Item) => {
        const IsLastOrderBy = Item.Value == OrderBy;
        const NewSort = IsLastOrderBy ? (Sort == "ASC" ? "DESC" : "ASC") : "ASC";
        const NewData = {
            OrderBy: Item.Value,
            Sort: NewSort
        };
        Dispatch(SetFilter(NewData));
    };
    const Selected = useMemo(() => {
        let Selected = OrderKeys?.find((item) => item.Value == OrderBy);
        return Selected
            ? Selected.Label
            : Lang?.TABLES?.[OrderBy]
            ? Lang?.TABLES?.[OrderBy]
            : "...";
    }, [Lang?.TABLES, OrderBy, OrderKeys]);
    return (
        <Flex alignItems={"center"} gap="0.3rem">
            <Box
                onClick={() =>
                    Dispatch(
                        SetFilter({
                            Sort: IsAsc ? "DESC" : "ASC"
                        })
                    )
                }
                cursor={"pointer"}
                className=" BoxPriceItem"
                color={"blackAlpha.800"}
            >
                <Text
                    fontSize={{
                        base: ".77rem",
                        md: "small"
                    }}
                    fontWeight={"bold"}
                >
                    {/* By Price */}
                    {Selected}
                </Text>
                <Icon as={IsAsc ? BsSortAlphaUp : BsSortAlphaDownAlt} />
            </Box>

            <Menu>
                <MenuButton dir="rtl">
                    <BsSliders
                        size={"20px"}
                        style={{
                            color:
                                colorMode === "dark"
                                    ? Theme.Init.colors.NavIconColor.dark
                                    : Theme.Init.colors.NavIconColor.light,
                            cursor: "pointer"
                        }}
                    />
                </MenuButton>
                <MenuList
                    sx={{
                        ".Menu-Navbar-MenuItem:hover": {
                            // "================== bg=> SidebarChooseOption ========================== "
                            backgroundColor:
                                colorMode === "dark" ? "#4b7a95  !important" : "#e7ebed !important",
                            transition: "0.3s"
                        }
                    }}
                    className="Menu-Navbar-boxShadow Menu-Navbar-MenuItem-Bg "
                >
                    {OrderKeys &&
                        OrderKeys?.map((item, index) => (
                            <MenuItem
                                key={index}
                                className="Menu-Navbar-MenuItem  Menu-Navbar-MenuItem-Bg"
                                bg={OrderBy == item.Value ? "green.600" : "transparent"}
                                onClick={() => HandleSort(item)}
                            >
                                {item.Label}
                            </MenuItem>
                        ))}
                </MenuList>
            </Menu>
        </Flex>
    );
};

export default Sorting;
