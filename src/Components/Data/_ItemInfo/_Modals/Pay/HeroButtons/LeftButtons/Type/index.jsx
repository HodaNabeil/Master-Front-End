import { Flex, Popover, PopoverBody, PopoverContent, PopoverTrigger, Text } from "@chakra-ui/react";
export default function TypeDrop({ LeftBg, Options = [], OnChange = () => {}, Value, Lang }) {
    return (
        <Popover gutter={0}>
            <PopoverTrigger>
                <Flex
                    rounded={"full"}
                    border={"1px solid"}
                    py={2}
                    px={1}
                    minW={"11rem"}
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
                            fontSize: Value ? "0.8rem" : ""
                        }}
                    >
                        {Value ? Value : Lang?.DATA_PAGE?.LABELS?.Type || "Type"}
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
                                      {item}
                                  </Text>
                              );
                          })
                        : Lang?.NO_OPTIONS || "No Options"}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}
