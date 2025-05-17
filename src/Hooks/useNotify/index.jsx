import { useToast } from "@chakra-ui/react"
import { useSelector } from "react-redux"

/**
 * Displays a toast notification with the given type, title, and message.
 *
 * @param {string} type - The type of the toast notification.
 * @param {string} message - The message of the toast notification.
 * @returns {function} A function that displays the toast notification.
 * @example Notify("info","Message");
 * @example Notify("error", "Message");
 * @example Notify("warn", "Message");
 * @example Notify("success", "Message");
 * 
 */
export default function useNotify() {
    const toast = useToast()
    const Rtl= useSelector(stste => stste.Helper.Rtl)
    /**
     * Displays a toast notification with the given type, title, and message.
     *
     * @param {string} type - The type of the toast notification.
     * @param {string} message - The message of the toast notification.
     * @returns {function} A function that displays the toast notification.
     * @example Notify("info","Message");
     * @example Notify("error", "Message");
     * @example Notify("warn", "Message");
     * @example Notify("success", "Message");
     * 
     */
    return (type, message) => {
        toast({
            // title: title,
            position: Rtl ? 'top-right' : 'top-left',
            description: message,
            status: type == 'warn' ? 'warning' : type,
            duration: 2000,
            isClosable: true
        })
    }
}
