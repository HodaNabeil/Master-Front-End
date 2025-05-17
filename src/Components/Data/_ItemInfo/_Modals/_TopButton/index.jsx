import { Flex, Text } from "@chakra-ui/react";

export default function TopButton({ LeftBg, Label = "Project Name", ProjectName }) {
    return (
        <Flex
            gap={6}
            alignItems={"center"}
            fontWeight={"bold"}
            w={"100%"}
            h={"2rem"}
            lineHeight={"1rem"}
        >
            <Text bg={LeftBg} rounded={"full"} py={1} px={2}>
                {Label}
            </Text>
            <Text> {ProjectName}</Text>
        </Flex>
    );
}
