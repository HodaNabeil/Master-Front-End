import { Spinner } from "@/Common";
import { IpAdressReval } from "@/Components";
import { useFindDataQuery } from "@/Redux";
import { Helper } from "@/Utility";
import { AspectRatio, Box, Flex, Heading, Stack } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
export default function DetailPage() {
    const [Filter, setFilter] = useState({
        Compound: "",
        CompoundId: "",
        Error: ""
    });
    const { search } = useLocation();
    useEffect(() => {
        if (search) {
            const Extract = new URLSearchParams(search);
            const Compound = Extract.get("P");
            const CompoundId = Extract.get("Id");
            setFilter((prev) => ({
                ...prev,
                Compound,
                CompoundId: CompoundId ? CompoundId : ""
            }));
        }
    }, [search]);
    const { data, isError, error, isLoading } = useFindDataQuery(
        {
            CompoundId: Filter.CompoundId
        },
        {
            skip: !Filter.CompoundId,
            refetchOnMountOrArgChange: true
        }
    );
    useEffect(() => {
        if (isError) {
            const Msg = Helper.ValidateErrorMessage(error);
            setFilter((prev) => ({
                ...prev,
                Error: Msg
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError]);
    const ProcessData = useMemo(() => {
        return data?.data ? data.data : null;
    }, [data?.data]);
    return (
        <>
            <IpAdressReval />
            <Stack py={1}>
                <Heading
                    h={"2rem"}
                    display="inline-block"
                    as="h2"
                    size="lg"
                    bgGradient="linear(to-r, teal.400, teal.600)"
                    backgroundClip="text"
                    textAlign={"center"}
                >
                    {Filter.Compound
                        ? Filter.Compound
                        : ProcessData
                        ? ProcessData.DataCompound
                        : ""}
                </Heading>
                {Filter?.Error ? (
                    <Flex
                        w={"100%"}
                        h={"calc(100vh - 3.5rem)"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        fontSize={"3xl"}
                        flexWrap={"wrap"}
                        textAlign={"center"}
                    >
                        {Filter.Error}
                    </Flex>
                ) : (
                    <Box
                        w={"100%"}
                        p={{
                            base: 0,
                            md: 1
                        }}
                    >
                        {isLoading ? (
                            <Flex
                                w={"100%"}
                                h={"calc(100vh - 3.5rem)"}
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <Spinner Width={200} />
                            </Flex>
                        ) : (
                            <>
                                {ProcessData ? (
                                    <AspectRatio
                                        h={"calc(100vh - 3.5rem)"}
                                        border={"1px solid"}
                                        borderRadius={"20px"}
                                    >
                                        <iframe
                                            src={ProcessData.DataCoordinates}
                                            title={ProcessData.DataCompound}
                                            height={"100%"}
                                            width={"100%"}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            style={{
                                                objectFit: "cover",
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: "20px"
                                            }}
                                            allowFullScreen
                                        />
                                    </AspectRatio>
                                ) : (
                                    <Flex
                                        w={"100%"}
                                        h={"calc(100vh - 3.5rem)"}
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                        fontSize={"5xl"}
                                    >
                                        Error While Extract Data
                                    </Flex>
                                )}
                            </>
                        )}
                    </Box>
                )}
            </Stack>
        </>
    );
}
