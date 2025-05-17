import { motion, AnimatePresence } from "framer-motion";

export default function Collapse({ IsOpen = false, children }) {
     return (
        <AnimatePresence>
            {IsOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ 
                        duration: 0.5,
                        ease: [0.04, 0.62, 0.23, 0.98],
                        
                     }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
