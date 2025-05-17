import { Flex } from "@chakra-ui/react";
import RightCard from "./RightCard";
import LeftCard from "./LeftCard";

export default function ROITopCards({ LeftBg, RightBg, Lang, ...rest }) {
    const PublicProps = {
        py: 1,
        px: 3,
        h: "max-content"
    };
    return (
        <Flex justifyContent={"space-between"} fontSize={"0.9rem"} lineHeight={"1.8rem"} {...rest}>
            <LeftCard LeftBg={LeftBg} RightBg={RightBg} Lang={Lang} PublicProps={PublicProps} />
            <RightCard LeftBg={LeftBg} RightBg={RightBg} Lang={Lang} PublicProps={PublicProps} />
        </Flex>
    );
}
