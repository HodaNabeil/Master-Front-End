import FilterSideBar from "./FilterSideBar";
import { Box, Flex } from "@chakra-ui/react";
import SidebarNavigationButton from "./SidebarNavigationBtns";
import SidebarToggle from "./SidebarToggle";

export default function VersionOneSidebar({ Socket, SideBarApiData, NavHeight, Rtl }) {
    const DirProps = Rtl
        ? {
              pr: 6
          }
        : {
              pl: 6
          };
    return (
        <>
            <Flex
                transition={`all 0.4s ease`}
                justifyContent={{
                    base: "space-between",
                    md: "space-between"
                }}
                pl={Rtl ? 5 : 0}
                pr={Rtl ? 0 : 5}
                gap={1}
                h={`${NavHeight}vh`}
                flexDir={Rtl ? "row-reverse" : "row"}
                dir={Rtl ? "rtl" : "ltr"}
                display={{ base: "none", md: "flex" }}
            >
                {Rtl && (
                    <Flex justify={"flex-end"} w={"25%"}>
                        <SidebarToggle boxSize={"2.8rem"} Version={1} />
                    </Flex>
                )}
                <Box w={"75%"}>
                    <SidebarNavigationButton
                        w={{
                            base: "",
                            md: "100%"
                        }}
                        justifyContent={Rtl ? "start" : "start"}
                        IconSize={{
                            boxSize: "2.5rem"
                        }}
                        Socket={Socket}
                        {...DirProps}
                    />
                </Box>
                {!Rtl && (
                    <Flex justify={"flex-end"} w={"25%"}>
                        <SidebarToggle boxSize={"2.8rem"} Version={1} />
                    </Flex>
                )}
            </Flex>
            <FilterSideBar
                SideBarApiData={SideBarApiData}
                NavHeight={{
                    base: NavHeight,
                    sm: NavHeight,
                    md: NavHeight,
                    lg: NavHeight,
                    xl: NavHeight,
                    "2xl": NavHeight
                }}
                MidProps = {{
                    className:"Main-Background"
                }}
                Rtl={Rtl}
            />
        </>
    );
}
