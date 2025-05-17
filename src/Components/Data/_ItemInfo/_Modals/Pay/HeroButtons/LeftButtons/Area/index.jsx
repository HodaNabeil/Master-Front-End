import { Flex, Popover, PopoverBody, PopoverContent, PopoverTrigger, Text } from "@chakra-ui/react";

export default function AreaDrop({ LeftBg, Options = [], OnChange = () => {}, Value, Lang }) {
    return (
        <Popover gutter={0}>
            <PopoverTrigger>
                <Flex
                    rounded={"full"}
                    border={"1px solid"}
                    py={2}
                    px={1}
                    minW={"5rem"}
                    h={"2rem"}
                    lineHeight={"1rem"}
                    cursor={"pointer"}
                    justifyContent={"space-between"}
                    gap={1}
                >
                    <span
                        style={{
                            width: "100%",
                            textAlign: "center",
                            fontSize: Value ? "0.9rem" : ""
                        }}
                    >
                        {Value ? `${Value}  ${Lang?.PUBLIC?.WORDS?.METR || "M"}` : Lang?.DATA_PAGE?.LABELS?.Area || "Area"}
                    </span>
                    <span> ▼</span>
                </Flex>
            </PopoverTrigger>
            <PopoverContent w={"100%"} minW={"7rem"}>
                <PopoverBody bg={LeftBg} w={"100%"} rounded={"xl"}>
                    {Options?.length > 0
                        ? Options.map((item) => {
                              const IsSelected = Value == item;
                              return (
                                  <Text
                                      key={item}
                                      py={2}
                                      px={3}
                                      textAlign={"center"}
                                      color={IsSelected ? "green.500" : ""}
                                      onClick={() => OnChange(item)}
                                      cursor={"pointer"}
                                  >
                                      {item} {Lang?.PUBLIC?.WORDS?.METR || "M"}
                                  </Text>
                              );
                          })
                        : Lang?.NO_OPTIONS || "No Options"}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}
