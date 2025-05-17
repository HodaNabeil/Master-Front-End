import { Flex, Icon, Text } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";

export default function CompaniesView({ OnSelect = () => {}, Data = [], Selected = {}, ...rest }) {
    const Gap = 1;
    return (
        <Flex flexWrap={"wrap"} justifyContent={"center"} {...rest} gap={Gap}>
            {Data?.length > 0 ? (
                Data?.map((item, index) => {
                    const IsSelected = Selected.includes(item.Value);
                    return (
                        <Flex
                            key={index}
                            w={{
                                base: `calc(100% / 2 - var(--chakra-space-${Gap}))`,
                                sm: `calc(100% / 3 - var(--chakra-space-${Gap}))`,
                                md: `calc(100% / 4 - var(--chakra-space-${Gap}))`,
                                lg: `calc(100% / 5 - var(--chakra-space-${Gap}))`,
                                xl: `calc(100% / 6 - var(--chakra-space-${Gap}))`
                            }}
                            p={".4rem .5rem"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            gap={2}
                            className="Shadow"
                            rounded={"md"}
                            cursor={"pointer"}
                            onClick={() => OnSelect(item, IsSelected)}
                        >
                            <Text
                                fontWeight={"bold"}
                                fontSize={"clamp(.8rem, 1.5vw, 1rem)"}
                                color={IsSelected ? "green.500" : ""}
                            >
                                {item.Label}
                            </Text>
                            {IsSelected && (
                                <Icon
                                    as={FaCheck}
                                    boxSize={"1.3rem"}
                                    rounded={"full"}
                                    color={"green.500"}
                                    p={"0.1rem"}
                                />
                            )}
                        </Flex>
                    );
                })
            ) : (
                <div>No Data </div>
            )}
        </Flex>
    );
}
