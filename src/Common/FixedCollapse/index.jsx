import { motion, AnimatePresence } from "framer-motion";
import { Box } from "@chakra-ui/react";

export default function FixedCollapse({ IsOpen = false, children }) {
    return (
        <AnimatePresence>
            {IsOpen && (
                <motion.div
                    style={{
                        position: "fixed",
                        bottom: "10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 1000
                    }}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                    <Box
                        bg="white"
                        boxShadow="lg"
                        borderRadius="lg"
                        p={1}
                        minW="300px"
                        textAlign="center"
                        rounded={"xl"}
                    >
                        {children}
                    </Box>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
