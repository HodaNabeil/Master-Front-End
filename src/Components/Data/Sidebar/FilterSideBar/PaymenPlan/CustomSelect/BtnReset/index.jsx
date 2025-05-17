import { Box } from "@chakra-ui/react";
import { CgCloseO } from "react-icons/cg";

const ResetBtn = ({ HangleOnClick, top }) => (
    <Box
        position="absolute"
        right="-7px"
        top={top}
        cursor="pointer"
        zIndex={3}
        onClick={HangleOnClick} // تستدعي دالة إعادة التعيين
        borderRadius="50%"
    >
        <CgCloseO fontSize="18px" />
    </Box>
);


export default ResetBtn;