import { Box, Image, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function SiteLogo({ ...rest }) {
    const { colorMode } = useColorMode();
    const { UserId, UserRole } = useSelector((state) => state.Auth);
    const [ImgUrl, setImgUrl] = useState(`/Img/${colorMode}/Logo-Triangle.webp`);
    const [NofFound, setNofFound] = useState(false);
    useEffect(() => {
        if (UserRole?.RoleId == 4) {
            setImgUrl(`/Img/AppLogo/${UserId}.webp`);
        }
    }, [UserId, UserRole?.RoleId]);
    useEffect(() => {
        if (NofFound && colorMode) {
            setImgUrl(`/Img/AppLogo/Master-${colorMode}.webp`);
        }
    }, [NofFound, colorMode]);
    return (
        <Box
            width={"9rem"}
            // width={"150px"}
            // width={"150px"}
            h={"2.5rem"}
            py={0}
            {...rest}
        >
            <Image
                src={ImgUrl}
                alt="Master V"
                w={"100%"}
                h={"100%"}
                bgPos={"100% 100% !important"}
                rounded={"md"}
                onError={(e) => {
                    e.onError = null;
                    e.target.src = `/Img/AppLogo/Master-${colorMode}.webp`;
                    setNofFound(true);
                }}
            />
        </Box>
    );
}
