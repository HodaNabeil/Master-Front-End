import { createPortal } from "react-dom";
import { Box, useColorMode } from "@chakra-ui/react";
import { memo, useEffect } from "react";
import { useLang, useOnline } from "@/Hooks";
import { useSelector } from "react-redux";
function OfflineMessage() {
    const { colorMode } = useColorMode();
    const Lang = useLang();
    const { ServerStatus } = useSelector((state) => state.Helper);
    const IsOnline = useOnline();
    useEffect(() => {
        const canvas = document.getElementById("noInternetCanvas");
        const ctx = canvas.getContext("2d");
        // High resolution settings
        const scaleFactor = 2;
        const padding = 5 * scaleFactor;
        const displayWidth = 400;
        const displayHeight = 300;
        canvas.width = displayWidth * scaleFactor;
        canvas.height = displayHeight * scaleFactor;
        canvas.style.width = `${displayWidth}px`;
        canvas.style.height = `${displayHeight}px`;
        ctx.scale(scaleFactor, scaleFactor);
        function drawNoInternetImage() {
            // Background
            const Message = !IsOnline
                ? Lang?.NO_INTERNET
                : ServerStatus.Main
                ? " "
                : Lang?.ERRORS?.SERVIES_UNAVILABLE;
            var lineheight = 30;
            var lines = Message ? Message.split("\n") : [];

            ctx.fillStyle = colorMode === "light" ? "#065666" : "#00B5D8";
            ctx.fillRect(0, 0, canvas.width / scaleFactor, canvas.height / scaleFactor);
            // Text
            ctx.fillStyle = colorMode === "light" ? "#fff" : "#000";
            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            for (var i = 0; i < lines.length; i++)
                ctx.fillText(
                    lines[i],
                    displayWidth / 2,
                    displayHeight / 2 + padding + 20 + i * lineheight
                );
            // ctx.fillText(Message, displayWidth / 2, displayHeight / 2 + padding + 20);
            // WiFi Symbol
            const centerX = displayWidth / 2;
            const centerY = displayHeight / 2 - 50 + padding;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 40, Math.PI, 0);
            ctx.moveTo(centerX - 40, centerY);
            ctx.arc(centerX, centerY, 30, Math.PI, 0);
            ctx.moveTo(centerX - 30, centerY);
            ctx.arc(centerX, centerY, 20, Math.PI, 0);
            ctx.moveTo(centerX - 20, centerY);
            ctx.arc(centerX, centerY, 10, Math.PI, 0);
            ctx.strokeStyle = colorMode == "light" ? "#fff" : "#000";
            ctx.stroke();
            // Small Circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
            ctx.fillStyle = colorMode == "light" ? "#fff" : "#000";
            ctx.fill();
        }
        drawNoInternetImage();
    }, [IsOnline, Lang?.ERRORS?.SERVIES_UNAVILABLE, Lang?.NO_INTERNET, ServerStatus.Main, colorMode]);
    return createPortal(
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
                // backdropFilter: 'blur(5px)',
                zIndex: "9999999"
            }}
        >
            <Box as="canvas" id="noInternetCanvas"></Box>
        </Box>,
        document.getElementById("modal-root")
    );
}

export default memo(OfflineMessage);
