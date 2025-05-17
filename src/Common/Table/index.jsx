import {
    Table as ChakraTable,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Icon,
    Flex
} from "@chakra-ui/react";
import { TbSwitchVertical } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { SetFilter } from "@/Redux";
import { Spinner } from "..";
import { useLang } from "@/Hooks";
import { useMemo } from "react";
import "./Table.css";
export default function Table({
    THeadData = [],
    BodyData = [],
    IsLoading = false,
    size = "md",
    ...rest
}) {
    const SX = {
        THeadRounded: "xl",
        BodyTr: "xl"
    };
    const Dispatch = useDispatch();
    const Lang = useLang();
    const { Sort, OrderBy } = useSelector((state) => state.Filter);
    const { Rtl } = useSelector((state) => state.Helper);
    const HandleSort = (Item) => {
        if (Item.Sort) {
            const IsLastOrderBy = Item.OrderBy == OrderBy;
            const NewSort = IsLastOrderBy
                ? Sort == "ASC"
                    ? "DESC"
                    : "ASC"
                : Item.Sort == "ASC"
                ? "DESC"
                : "ASC";
            const NewData = {
                OrderBy: Item.OrderBy,
                Sort: NewSort
            };
            Dispatch(SetFilter(NewData));
        }
    };
    let FullSize = useMemo(() => {
        const FullSize = THeadData.reduce((acc, item) => {
            if (item.size) {
                let Fixed = item.size?.replaceAll("rem", "");

                return acc + parseInt(Fixed);
            }
            return acc;
        }, 0);
        return FullSize > 1 ? `${FullSize + 3}rem` : "100%";
    }, [THeadData]);

    return (
        <TableContainer
            className="shadow TableContainer"
            rounded={"lg"}
            mx={1}
            pos={"relative"}
            zIndex={1}
            role="region"
            aria-labelledby="caption"
            tabIndex="0"
            maxH={"70vh"}
            {...rest}
        >
            <ChakraTable
                variant="unstyled"
                rounded={"lg"}
                size={size}
                fontWeight={size == "xs" ? "normal" : ""}
                fontStyle={size == "xs" ? "normal" : ""}
                fontSize={size == "xs" ? "xs" : "sm"}
                dir={Rtl ? "rtl" : "ltr"}
                style={{
                    borderSpacing: "10px"
                }}
            >
                {THeadData.length > 0 && (
                    <Thead
                        top={"0"}
                        // top={"-2.5"}
                        pos={"sticky"}
                        className="shadow Thead"
                        zIndex={2}
                        rounded={SX.THeadRounded}
                    >
                        <Tr>
                            {THeadData &&
                                THeadData?.map((item, index) => {
                                    return (
                                        <Th
                                            key={`THead-Th-${index}`}
                                            cursor={item.Sort ? "pointer" : "default"}
                                            py={1}
                                            px={"0.5"}
                                            onClick={() => HandleSort(item)}
                                            border={"none"}
                                            textTransform={"capitalize"}
                                            p={1}
                                        >
                                            <Flex
                                                justifyContent={
                                                    item.Sort ? "space-between" : "center"
                                                }
                                                alignItems={"center"}
                                                rounded={"lg"}
                                                w={
                                                    item.size
                                                        ? IsLoading
                                                            ? `calc(${item.size} + 1rem)`
                                                            : item.size
                                                        : "auto"
                                                }
                                                px={1}
                                            >
                                                <span>
                                                    {Lang?.TABLES?.[item.OrderBy]
                                                        ? Lang?.TABLES?.[item.OrderBy]
                                                        : item.Label}
                                                </span>
                                                {item.Sort && (
                                                    <Icon
                                                        as={TbSwitchVertical}
                                                        fontSize={"x-large"}
                                                    />
                                                )}
                                            </Flex>
                                        </Th>
                                    );
                                })}
                        </Tr>
                    </Thead>
                )}
                <Tbody>
                    {!IsLoading ? (
                        <>
                            {BodyData?.length > 0 ? (
                                BodyData?.map((RowItem, MainIndex) => {
                                    let startTime = performance.now();
                                    while (performance.now() - startTime < 1) {
                                        // Do nothing for 1 ms per item to emulate extremely slow code
                                    }
                                    const {
                                        IsSelected = false,
                                        Data = [],
                                        OnSelect
                                    } = RowItem || {};
                                    return (
                                        <Tr
                                            key={`TBody-Tr-${MainIndex}`}
                                            className={`Tr-Border ${
                                                IsSelected ? "TBody-Tr-Selected" : "TBody-Tr"
                                            }`}
                                            onClick={OnSelect ? OnSelect : () => {}}
                                            cursor={"pointer"}
                                            pos={"relative"}
                                            mt={1}
                                        >
                                            {Data?.map((ColItem, index) => {
                                                const { Extra, Label } = ColItem || {};
                                                return (
                                                    <Td key={`TBody-Td-${index}`} py={0} px={2}>
                                                        {Extra ? (
                                                            <Flex
                                                                py={"0.5"}
                                                                flexDirection={"column"}
                                                                justifyContent={"center"}
                                                                alignItems={"center"}
                                                                gap={0}
                                                            >
                                                                <div> {Label}</div>
                                                                <div>{Extra}</div>
                                                            </Flex>
                                                        ) : Label ? (
                                                            Label
                                                        ) : (
                                                            "-"
                                                        )}
                                                    </Td>
                                                );
                                            })}
                                        </Tr>
                                    );
                                })
                            ) : (
                                <Tr key={`TBody-Tr-Loading`}>
                                    <Td colSpan={THeadData.length} textAlign={"center"}>
                                        {Lang?.NO_DATA}
                                    </Td>
                                </Tr>
                            )}
                        </>
                    ) : (
                        <Tr key={`TBody-Tr-Loading`} minW={FullSize}>
                            <Td colSpan={THeadData.length + 1} w={FullSize}>
                                <Flex justifyContent={"center"} alignItems={"center"} w={FullSize}>
                                    <Spinner Width={200} />
                                </Flex>
                            </Td>
                        </Tr>
                    )}
                </Tbody>
            </ChakraTable>
        </TableContainer>
    );
}
