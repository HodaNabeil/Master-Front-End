import { Spinner } from "@/Common";
import { Box, Flex, useColorMode } from "@chakra-ui/react";
import ContentItem from "./ContentItem";
import { useLang } from "@/Hooks";
import { useSelector } from "react-redux";

export default function DataContent({
    OnSetModalData,
    IsLoading,
    GridCols,
    Data
}) {
    const Lang = useLang();
    const { Rtl, NavHeight: MainNavHeight } = useSelector((state) => state.Helper);
    const { SelectedItem } = useSelector((state) => state.AppData);
    const Filter = useSelector((state) => state.Filter);
    const { colorMode } = useColorMode();
    return (
        <Box
            overflowY={"auto"}
            sx={{
                "&::-webkit-scrollbar": {
                    width: "5px"
                }
            }}
            overflowX={"hidden"}
            h={{
                base : `calc(100vh - ${MainNavHeight}vh)`,
                md: `calc(100vh - ${MainNavHeight}vh)`
            }}
            pr={Rtl ? "0" : "1"}
            pl={Rtl ? "1" : "0"}
            pb={"1"}
            zIndex={1}
        >
            {IsLoading ? (
                <Flex
                    fontSize={"3xl"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    h={{
                        base: `${90 - GridCols.NavHeight.base}vh`,
                        sm: `${90 - GridCols.NavHeight.sm}vh`,
                        md: `${90 - GridCols.NavHeight.md}vh`,
                        lg: `${90 - GridCols.NavHeight.lg}vh`
                    }}
                >
                    <Spinner Width={200} />
                </Flex>
            ) : (
                <>
                    {Data?.length > 0 && Filter.DataCityId.length > 0 ? (
                        Data?.map((Item) => {
                            return (
                                <ContentItem
                                    OnSetModalData={OnSetModalData}
                                    SelectedItem={SelectedItem}
                                    colorMode={colorMode}
                                    Lang={Lang}
                                    Item={Item}
                                    Rtl={Rtl}
                                    key={Item.DataId}
                                />
                            );
                        })
                    ) : (
                        <Flex
                            fontSize={"3xl"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            h={{
                                base: `${90 - GridCols.NavHeight.base}vh`,
                                sm: `${90 - GridCols.NavHeight.sm}vh`,
                                md: `${90 - GridCols.NavHeight.md}vh`,
                                lg: `${90 - GridCols.NavHeight.lg}vh`
                            }}
                        >
                            {Lang?.NO_DATA || "No Data Founded"}
                        </Flex>
                    )}
                </>
            )}
        </Box>
    );
}
