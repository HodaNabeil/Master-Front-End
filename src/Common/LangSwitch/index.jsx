import { SetNewLang } from "@/Redux";
import { Helper } from "@/Utility";
import { Box, Flex, Image } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

export default function LangSwitch({ ...rest }) {
    const Dispatch = useDispatch();
    const { Lang } = useSelector((state) => state.Helper);
    const OnChange = (Lan) => {
        if (Lan.Value == Lang) return;
        Dispatch(SetNewLang(Lan.Value));
        // document.documentElement.lang = Lan.Value?.trim();
    };
    return (
        <Box {...rest}>
            <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
                {Helper.Locals?.map((lan, index) => {
                    const IsSelected = lan.Value == Lang;
                    return (
                        <Image
                            key={index}
                            width={"2.5rem"}
                            height={"2rem"}
                            onClick={() => OnChange(lan)}
                            src={`/Img/Lang/${lan.Value}.svg`}
                            alt={lan.Value}
                            rounded={"xl"}
                            className={`${IsSelected ? "Tab" : "Tab-Border Tab-Selected"}`}
                            p={1}
                            textAlign={"center"}
                            cursor={"pointer"}
                        />
                    );
                })}
            </Flex>
        </Box>
    );
}
