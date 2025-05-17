import ReactDOM from "react-dom";
import { Box, Image } from "@chakra-ui/react";
function Loader() {
    return ReactDOM.createPortal(
        <Box
            h="100%"
            w={"100%"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                background: "rgba(0, 0, 0, 0.3)",
                zIndex: "modal",
                backdropFilter: "blur(5px)"
            }}
        >
            <Image
                src="/Img/Loading.gif"
                boxSize={"100px"}
                title="Master V"
                loading="lazy"
                aria-placeholder="Master V"
            />
        </Box>,
        document.getElementById("modal-root")
    );
}

export default Loader;
