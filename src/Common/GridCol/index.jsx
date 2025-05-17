import { Grid, GridItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function GridCol({
    size = {
        s1: {
            base: 12,
            sm: 3
        },
        s2: {
            base: 12,
            sm: 9
        }
    },
    s1,
    s2,
    isFited = false,
    ...props
}) {
    const { Rtl } = useSelector((state) => state.Helper);
    return (
        <Grid
            templateColumns={`repeat(12, 1fr)`}
            dir={Rtl ? "rtl" : "ltr"}
            rounded={"lg"}
            {...props}
        >
            <GridItem
                colSpan={size.s1}
                display={"flex"}
                alignItems={"center"}
                h={"100%"}
                textAlign={"center"}
                p={"2px"}
                style={{
                    ...(isFited
                        ? {
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                          }
                        : {})
                }}
                whiteSpace={"nowrap"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
            >
                    {s1}
            </GridItem>
            <GridItem
                colSpan={size.s2}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                h={"100%"}
                textAlign={"center"}
                roundedLeft={{
                    base: "unset",
                    sm: Rtl ? "lg" : "none",
                    md: Rtl ? "lg" : "none"
                }}
                roundedRight={{
                    base: "unset",
                    sm: Rtl ? "none" : "lg",
                    md: Rtl ? "none" : "lg"
                }}
                roundedBottom={{
                    base: "lg",
                    sm: "unset"
                }}
                px={1}
                style={{
                    ...(isFited
                        ? {
                              overflowY: "auto",
                              textOverflow: "normal",
                              whiteSpace: "pre-line",
                              maxHeight: "300px"
                          }
                        : {
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap"
                          })
                }}
            >
                {s2 ? s2 : "-"}
            </GridItem>
        </Grid>
    );
}
