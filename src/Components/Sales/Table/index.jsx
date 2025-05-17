import {
    Table as ChakraTable,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Icon,
    Flex,
    IconButton,
    useDisclosure,
    AlertDialog,
    AlertDialogCloseButton,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogBody
} from "@chakra-ui/react";
import { TbFiles, TbPointFilled, TbSwitchVertical } from "react-icons/tb";
import { useMemo } from "react";
import { Helper } from "@/Utility";
import "./Table.css";
import { MdDelete, MdEdit, MdOutlineMessage } from "react-icons/md";
export default function Table({
    CalculateCommisionRate = () => {},
    OnEditOrDelete = () => {},
    OnChange = () => {},
    Lang = {},
    Rtl,
    BodyData = [],
    IsLoading = false,
    size = "md",
    Sort,
    OrderBy,
    ...rest
}) {
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
            OnChange(NewData);
        }
    };
    const THeadData = useMemo(() => {
        return [
            {
                Label: "Total Commission",
                Sort: "",
                OrderBy: "TotalCommission",
                size: ""
            },
            {
                Label: "Unit Price",
                Sort: "ASC",
                OrderBy: "SalesUnitPrice",
                size: ""
            },
            {
                Label: "Unit Type",
                Sort: "ASC",
                OrderBy: "SalesUnitType",
                size: ""
            },
            {
                Label: "Project",
                Sort: "ASC",
                OrderBy: "SalesProject",
                size: ""
            },
            {
                Label: "Developer",
                Sort: "ASC",
                OrderBy: "SalesDeveloper",
                size: ""
            },
            {
                Label: "Request Date",
                Sort: "ASC",
                OrderBy: "SalesCreatedAt",
                size: ""
            },
            {
                Label: "Note",
                Sort: "",
                OrderBy: "SalesNote",
                size: ""
            },
            {
                Label: "Tools",
                Sort: "",
                OrderBy: "Tools",
                size: ""
            }
        ];
    }, []);
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
    const TypesIcons = {
        Progress: "#FFA500", // Orange (Indicates ongoing action)
        Received: "#3498DB", // Blue (Represents new arrival)
        Completed: "#2ECC71", // Green (Indicates success/done)
        Verified: "#8E44AD" // Purple (Represents validation)
    };

    return (
        <TableContainer
            className="shadow SalesTableContainer"
            rounded={"lg"}
            mx={1}
            role="region"
            aria-labelledby="caption"
            tabIndex="0"
            pos={"relative"}
            zIndex={1}
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
                        pos={"sticky"}
                        className="Sales-Page-Table-THead Sales-Page-Color"
                        zIndex={2}
                    >
                        <Tr>
                            {THeadData &&
                                THeadData?.map((item, index) => {
                                    return (
                                        <Th
                                            key={`THead-Th-${index}`}
                                            cursor={item.Sort ? "pointer" : "default"}
                                            py={0}
                                            px={"0.5"}
                                            onClick={() => HandleSort(item)}
                                            border={"none"}
                                            textTransform={"capitalize"}
                                            className="Sales-Page-Table-TH"
                                            role="Sales"
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
                <Tbody className="Sales-Page-Table">
                    {!IsLoading ? (
                        <>
                            {BodyData?.length > 0 ? (
                                BodyData?.map((ColItem) => {
                                    const {
                                        SalesId,
                                        SalesUnitPrice,
                                        SalesUnitType,
                                        SalesUnitTypeId,
                                        SalesProject,
                                        SalesDeveloper,
                                        SalesDate,
                                        SalesCustomer,
                                        SalesExecutive,
                                        SalesCreatedAt,
                                        SalesStatus,
                                        SalesContract,
                                        SalesNote,
                                        SalesCommission
                                    } = ColItem;
                                    const ParsedSalesCreatedAt = SalesCreatedAt
                                        ? SalesCreatedAt?.Format?.Date
                                        : "";
                                    const ParsedSalesDate = SalesDate ? SalesDate?.Date : "";
                                    const AllowToEdit = ["Progress"].includes(SalesStatus);
                                    const { YourProfits } = CalculateCommisionRate(SalesUnitPrice, SalesCommission);
                                    return (
                                        <Tr key={`Sales-Table-Body-${SalesId}`}>
                                            <Td py={1} textAlign={"center"}>
                                                {Helper.NumberWithCommas(YourProfits)}
                                            </Td>
                                            <Td py={1} textAlign={"center"}>
                                                {Helper.NumberWithCommas(SalesUnitPrice) || "-"}
                                            </Td>
                                            <Td py={1}>{SalesUnitType || "-"}</Td>
                                            <Td py={1}>{SalesProject || "-"}</Td>
                                            <Td py={1}>{SalesDeveloper || "-"}</Td>
                                            <Td py={1}>
                                                <Flex flexDir={"column"} alignItems={"center"}>
                                                    <Flex
                                                        alignItems={"center"}
                                                        justifyContent={"center"}
                                                        gap={1}
                                                    >
                                                        <span>{ParsedSalesCreatedAt || "-"}</span>
                                                        <Icon
                                                            as={TbPointFilled}
                                                            color={TypesIcons[SalesStatus]}
                                                            fontSize={"1.5rem"}
                                                        />
                                                    </Flex>
                                                    <span>
                                                        {Lang?.SALES_PAGE?.STATUS?.[SalesStatus] ||
                                                            "-"}
                                                    </span>
                                                </Flex>
                                            </Td>
                                            <Td py={1} textAlign={"center"}>
                                                {SalesNote ? (
                                                    <NoteViewr Lang={Lang} SalesNote={SalesNote} />
                                                ) : (
                                                    "-"
                                                )}
                                            </Td>
                                            <Td py={1} w={"5rem"}>
                                                <Flex
                                                    alignItems={"center"}
                                                    justifyContent={"center"}
                                                    gap={2}
                                                >
                                                    {SalesContract && SalesContract?.length > 0 && (
                                                        <IconButton
                                                            icon={<TbFiles />}
                                                            bg={"cyan.500"}
                                                            color={"white"}
                                                            _hover={{
                                                                bg: "cyan.700"
                                                            }}
                                                            size={"sm"}
                                                            fontSize={"lg"}
                                                            rounded={"full"}
                                                            onClick={() => {
                                                                OnEditOrDelete({
                                                                    Tab: "Views",
                                                                    IsOpen: true,
                                                                    Files: SalesContract
                                                                        ? SalesContract
                                                                        : []
                                                                });
                                                            }}
                                                        />
                                                    )}
                                                    {AllowToEdit && (
                                                        <>
                                                            <IconButton
                                                                icon={<MdEdit />}
                                                                bg={"blue.500"}
                                                                color={"white"}
                                                                _hover={{
                                                                    bg: "blue.700"
                                                                }}
                                                                size={"sm"}
                                                                fontSize={"lg"}
                                                                rounded={"full"}
                                                                onClick={() => {
                                                                    // SalesUnitType,
                                                                    // SalesUnitTypeId,
                                                                    OnEditOrDelete({
                                                                        Tab: "Edit",
                                                                        IsOpen: true,
                                                                        SalesId,
                                                                        SalesCustomer,
                                                                        SalesExecutive,
                                                                        SalesDate: ParsedSalesDate,
                                                                        SalesUnitPrice,
                                                                        SalesUnitType: {
                                                                            label : SalesUnitType,
                                                                            value: SalesUnitTypeId,
                                                                            id: SalesUnitTypeId,
                                                                        },
                                                                        SalesNote
                                                                    });
                                                                }}
                                                            />
                                                            <IconButton
                                                                icon={<MdDelete />}
                                                                bg={"red.500"}
                                                                color={"white"}
                                                                _hover={{
                                                                    bg: "red.700"
                                                                }}
                                                                size={"sm"}
                                                                fontSize={"lg"}
                                                                rounded={"full"}
                                                                onClick={() => {
                                                                    OnEditOrDelete({
                                                                        Tab: "Delete",
                                                                        IsOpen: true,
                                                                        SalesId: SalesId
                                                                    });
                                                                }}
                                                            />
                                                        </>
                                                    )}
                                                </Flex>
                                            </Td>
                                        </Tr>
                                    );
                                })
                            ) : (
                                <Tr cursor={"pointer"} pos={"relative"} mt={1} minW={FullSize}>
                                    <Td
                                        colSpan={THeadData.length + 1}
                                        w={FullSize}
                                        textAlign={"center"}
                                    >
                                        {Lang?.NO_DATA || "No Data Founded"}
                                    </Td>
                                </Tr>
                            )}
                        </>
                    ) : (
                        <Tr key={`TBody-Tr-Loading`} minW={FullSize}>
                            <Td colSpan={THeadData.length + 1} w={FullSize} textAlign={"center"}>
                                {Lang?.LOADING || "Loading..."}
                            </Td>
                        </Tr>
                    )}
                </Tbody>
            </ChakraTable>
        </TableContainer>
    );
}

function NoteViewr({ SalesNote = "" }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const IsArabic = Helper.IsArabic(SalesNote);

    return (
        <>
            <IconButton
                size={"sm"}
                icon={<MdOutlineMessage />}
                rounded={"full"}
                variant={"solid"}
                onClick={onOpen}
                bg={"cyan.500"}
                color={"white"}
                fontSize={"1.5rem"}
                _hover={{
                    bg: "cyan.600"
                }}
            />
            <AlertDialog motionPreset="slideInBottom" onClose={onClose} isOpen={isOpen} isCentered>
                <AlertDialogOverlay />
                <AlertDialogContent
                    w={{
                        base: "100%",
                        md: "fit-content"
                    }}
                    maxW={{
                        base: "100%",
                        md: "max-content"
                    }}
                    className="Main-Modal"
                >
                    <AlertDialogHeader />
                    <AlertDialogCloseButton rounded={"full"} top={0} right={0} />
                    <AlertDialogBody
                        display={"flex"}
                        flexDirection={"column"}
                        gap={1}
                        maxH={{
                            base: "25rem",
                            md: "35rem"
                        }}
                        overflowY={"auto"}
                        w={{
                            base: "100%",
                            md: "35rem"
                        }}
                        whiteSpace={"pre-wrap"}
                        textAlign={IsArabic ? "right" : "left"}
                        direction={IsArabic ? "rtl" : "ltr"}
                    >
                        {SalesNote?.split("\n").map((item, index) => {
                            return <span key={index}>{item}</span>;
                        })}
                    </AlertDialogBody>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
