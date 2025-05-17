import { SetHelperData } from "@/Redux";
import { Helper } from "@/Utility";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { useMemo } from "react";
import { BsCheckAll } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

export default function VersionSwitch({ Lang, ...rest }) {
    const Dispatch = useDispatch();
    const { Version } = useSelector((state) => state.Helper);
    const Options = useMemo(() => {
        return Lang?.VERSIONS ? Lang.VERSIONS : [];
    }, [Lang.VERSIONS]);
    return (
        <Box {...rest}>
            <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
                {Options && Options?.map((Option, index) => {
                    const IsSelected = Option.Value == Version;
                    return (
                        <Flex
                            key={index}
                            cursor={"pointer"}
                            p={1}
                            rounded={"md"}
                            alignItems={"center"}
                            gap={1}
                            className={`Shadow  ${IsSelected ? "Tab-Selected" : "Tab"}`}
                            onClick={() => {
                                Dispatch(SetHelperData({ Version: Option.Value }));
                                Helper.SetStorage("Version", Option.Value);
                            }}
                        >
                            {Option.Label}
                            {IsSelected && <Icon as={BsCheckAll} rounded={"full"} bg={"green"} 
                            color={"white"}
                            fontSize={'xl'}
                            />}
                        </Flex>
                    );
                })}
            </Flex>
        </Box>
    );
}
