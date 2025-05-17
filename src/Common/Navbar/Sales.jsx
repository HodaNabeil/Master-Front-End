import { Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import CogsModal from "@/Components/Data/Modals/Cogs";
import { useValidateRole } from "@/Hooks";
export default function SalesNavbar({
    Socket,
    NavHeight = "2.5rem"
    // ...rest
}) {
    const { Rtl } = useSelector((state) => state.Helper);
    const { IsGold } = useValidateRole()
    return (
        <Flex
            as="header"
            dir={Rtl ? "rtl" : "ltr"}
            w={"100%"}
            h={NavHeight}
            pos={"sticky"}
            top={0}
            left={0}
            className="Sales-Page-Nav-Bg"
            zIndex={"14"}
            id="Navbar-Sales"
            rowGap={1}
            py={1}
        >
            <CogsModal Socket={Socket} src={`/Img/${IsGold ? "Gold" : "light"}/User.webp`} />
        </Flex>
    );
}
