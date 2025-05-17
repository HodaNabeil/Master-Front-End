import { ToggleSideBar } from "@/Redux";
import { Image, useBreakpoint, useColorMode } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
export default function SidebarToggle({ Version, ...rest }) {
    const { colorMode } = useColorMode();
    const Dispatch = useDispatch();
    const IsOpenSideBar = useSelector(state => state.Helper.ToggleSideBar);
    const BreakPoint = useBreakpoint()
    const IsSmall = ["base", "sm"].includes(BreakPoint);
    return (
        <>
            <Image
                src={`/Img/${colorMode}/Arrow-Reverse-${IsSmall && !IsOpenSideBar ? "sm" : Version}.webp`}
                boxSize={"2.8rem"}
                p={0}
                onClick={() => Dispatch(ToggleSideBar())}
                cursor={"pointer"}
                _hover={{
                    transform: "scale(1.1)"
                }}
                transition={".2s ease-in-out"}
                {...rest}
            />
        </>
    );
}
