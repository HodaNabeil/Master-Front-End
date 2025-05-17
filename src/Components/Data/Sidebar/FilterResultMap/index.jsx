import { useLang } from "@/Hooks";
import { ThemeColors } from "@/Utility";
import {
    CloseButton,
    Flex,
    Icon,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Text,
    useColorMode
} from "@chakra-ui/react";
import { useMemo } from "react";
import { BsCheck2Circle } from "react-icons/bs";
export default function FilterResultMap({
    Result = [],
    SubResult = [],
    Target = "Label",
    SubTarget = "Label"
}) {
    const Lang = useLang();
    const { colorMode } = useColorMode();
    const Founded = useMemo(() => {
        return {
            Result: Result?.length != 0,
            SubResult: SubResult?.length != 0
        };
    }, [Result?.length, SubResult?.length]);
    if (!Founded.Result && !Founded.SubResult) return null;
    return (
        <Flex
            my="6px"
            p="5px 3px"
            border="1px solid #ffffff36 !important"
            bg={ThemeColors.CardResultOptionsBgColor[colorMode]}
            borderRadius="3px"
            flexDir={"column"}
        >
            {Founded.Result && (
                <ViewSelectedResult
                    Data={Result}
                    Target={Target}
                    colorMode={colorMode}
                    fontWeight="extrabold"
                    fontSize={".9rem"}
                    px="2px"
                    placement={"top"}
                    Name={"Result"}
                    Lang={Lang}
                    withTriger={false}
                />
            )}
            {Founded.SubResult && (
                <ViewSelectedResult
                    Data={SubResult}
                    Target={SubTarget}
                    colorMode={colorMode}
                    fontSize={".8rem"}
                    Name={"SubResult"}
                    Lang={Lang}
                    withTriger={true}
                />
            )}
        </Flex>
    );
}

function ViewSelectedResult({
    Data,
    Target,
    colorMode,
    placement = "bottom",
    Name,
    Lang,
    withTriger = true,
    ...rest
}) {
    const maxLength = 25;
    const HandleText = (Arr, TargetKey) => Arr?.map((name) => name[TargetKey])?.join(",");
    const FormatResult = useMemo(() => {
        if (Data?.length == 0) return null;
        const Text = HandleText(Data, Target);
        return Text?.length > maxLength ? (
            <span>
                <span>{Text?.slice(0, maxLength)}</span>
                <span style={{ color: "red" }}> {Lang?.MORE}</span>
            </span>
        ) : (
            <span>{Text}</span>
        );
    }, [Data, Lang?.MORE, Target]);
        return !withTriger ? (
            <Flex alignItems="center" cursor={"pointer"}>
                <Text className="LabelAreaReultUser" fontSize="14px" {...rest}>
                    {FormatResult}
                </Text>
            </Flex>
        ) : (
            <Popover trigger={"hover"} placement={placement} gutter={0}>
                <PopoverTrigger>
                    <Flex alignItems="center" cursor={"pointer"}>
                        <Text className="LabelAreaReultUser" fontSize="14px" {...rest}>
                            {FormatResult}
                        </Text>
                    </Flex>
                </PopoverTrigger>
                <PopoverContent className="Main-Modal" w={"fit-content"} minW={"13rem"}>
                    <PopoverBody maxH={"15rem"} overflow={"auto"}>
                        {Data.map((item) => {
                            const { OnClick = null } = item;
                            return (
                                <Flex
                                    key={`${Name}_${item[Target]}`}
                                    alignItems={"center"}
                                    justifyContent={"space-between"}
                                    gap={2}
                                >
                                    <Flex alignItems={"center"} gap={"4px"}>
                                        <Icon
                                            as={BsCheck2Circle}
                                            color={ThemeColors.ActiveStateColor[colorMode]}
                                            fontSize={{
                                                base: "10px",
                                                sm: "12px",
                                                md: "14px"
                                            }}
                                        />
                                        <Text
                                            className="LabelAreaReultUser"
                                            color={ThemeColors.NavIconColor[colorMode]}
                                        >
                                            {item[Target]}
                                        </Text>
                                    </Flex>
                                    {OnClick && (
                                        <CloseButton
                                            className="Shadow"
                                            rounded={"full"}
                                            size={"sm"}
                                            bg={"red.500"}
                                            color={"#fff"}
                                            onClick={OnClick}
                                            _hover={{
                                                bg: "#fff",
                                                color: "red.700"
                                            }}
                                            transition={"all .3s"}
                                        />
                                    )}
                                </Flex>
                            );
                        })}
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        );
}
