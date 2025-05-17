

import { defineStyleConfig } from "@chakra-ui/react";






export const Button = defineStyleConfig({

    baseStyle: {

    },
    sizes: {
        sm: {
            fontSize: "sm",
            px: 4,
            py: 2,
        },
        md: {
            fontSize: "md",
            px: 6,
            py: 4,
        },
    },

    variants: {
        outline: {
            border: "1px solid  transparent",
        },
        solid: {
        },
    },
    defaultProps: {
        size: "md",
        variant: "outline",
    },
});

