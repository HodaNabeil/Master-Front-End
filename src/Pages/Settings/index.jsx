import { Box, Button, Flex } from "@chakra-ui/react";
import { lazy, Suspense, useMemo, useState } from "react";
import { useLang, useNotify } from "@/Hooks";
import { Navbar, Spinner } from "@/Common";
import { useSelector } from "react-redux";

const SettingsPage = () => {
    const Lang = useLang();
    const [ActiveTab, setActiveTab] = useState(1);
    const { Rtl } = useSelector((state) => state.Helper);
    const Toast = useNotify();
    const ProcessTab = useMemo(() => {
        const Tabs = {
            1: "ProfileComp",
            2: "QrCode"
        };
        const Componet = lazy(() => import(`../../Components/Settings/${Tabs[ActiveTab]}/index.jsx`));
        return Componet;
    }, [ActiveTab]);
    const MainProps = {
        Toast,
        Lang,
        Rtl
    };
    return (
        <Box h={"100vh"}>
            <Navbar />
            <Flex gap="2" justifyContent={"center"} my={2} dir={Rtl ? "rtl" : "ltr"}>
                {Lang?.SETTINGS_PAGE?.TABS?.map((Tab) => {
                    return (
                        <Button
                            key={`Tab_${Tab.Value}`}
                            variant={"solid"}
                            // w="70px"
                            h={"2rem"}
                            py={".1rem"}
                            className={`Btn-Setting Shadow ${
                                ActiveTab == Tab.Value ? "Active-btn-Setting" : ""
                            }`}
                            onClick={() => setActiveTab(Tab.Value)}
                        >
                            {Tab.Label}
                        </Button>
                    );
                })}
            </Flex>
            <Box className="flex_center" flexDir={"column"}>
                <Suspense
                    fallback={
                        <Flex
                            fontSize={"3xl"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            h={"50vh"}
                        >
                            <Spinner Width={200} />
                        </Flex>
                    }
                >
                    <ProcessTab {...MainProps} />
                </Suspense>
            </Box>
        </Box>
    );
};

export default SettingsPage;
