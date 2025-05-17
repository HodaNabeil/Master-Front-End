import { Helper } from "@/Utility";
import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import { useSelector } from "react-redux";
export default function ActionModal({
    Data = {
        IsOpen: false,
        Title: "",
        Content: "",
        Type: ""
    }
}) {
    const { colorMode } = useColorMode();
    const IsArabic = Helper.IsArabic(Data.Content);
    const IsDesc = Data.Type == "Description";
    const IsNotes = Data.Type == "Notes";
    const IsNo_PriceList = Data.Type == "No_PriceList";
    const IsContact = Data.Type == "Contacts";
    const { Rtl } = useSelector((state) => state.Helper);
    const ArabicProps = IsArabic
        ? {
              direction: "rtl",
              textAlign: "right",
              padding: "10px",
              whiteSpace: "pre-line",
              overflow: "auto"
          }
        : {};
    const IsDescProps = IsDesc
        ? {
              // bg : colorMode == "dark" ? "#002d3e" :"#fff",
              // color : colorMode == "dark" ? "#fff" :"#000",
          }
        : {
              alignItems: "center",
              justifyContent: "center",
              w: "100%"
          };
    const IsDescMainProps =
        IsDesc || IsNotes || IsNo_PriceList
            ? {
                  className: "Main-Background Shadow",
                  p: 2,
                  direction: IsArabic ? "rtl" : "ltr",
                  roundedBottom: "md",
                  roundedTopRight: Rtl ? "unset" : "md",
                  roundedTopLeft: Rtl ? "md" : "unset",
                  pos: "relative",
                  maxW: "100%",
                  h: "100%",
                  maxH: "100%",
                  _after: {
                      content: '""',
                      position: "absolute",
                      borderWidth: "0px 10px 10px 0",
                      borderStyle: "solid",
                      borderColor: `transparent ${
                          colorMode == "dark" ? "#002d3e" : "#fefefe"
                      } transparent transparent`,
                      top: 0,
                      left: Rtl ? "unset" : "-0.5rem",
                      right: Rtl ? "-0.5rem" : "unset",
                      width: 0,
                      height: 0,
                      transform: Rtl ? "rotate(270deg)" : "rotate(0deg)"
                      // backgroundColor: colorMode == "dark" ? "#002d3e" :"#fff",
                  }
              }
            : {};
    return (
        <Flex
            p={2}
            h={IsDesc ? "" : "80%"}
            maxH={"100%"}
            w={{
                lg: "100%",
                xl: IsDesc ? "100%" : "100%"
            }}
            rounded={"lg"}
            {...IsDescProps}
            {...ArabicProps}
        >
            {IsContact ? (
                <Box w={"100%"}>
                    {Data.Content}
                    <span className="metadata">
                        <span className="time"></span>
                    </span>
                </Box>
            ) : (
                <Box
                    {...IsDescProps}
                    {...IsDescMainProps}
                    fontSize="sm"
                    textAlign={IsArabic ? "right" : "left"}
                    direction={IsArabic ? "rtl" : "ltr"}
                >
                    {Data.Content?.split("~")?.map((item, index) => (
                        <Text key={index}>{item}</Text>
                    ))}
                    <span className="metadata">
                        <span className="time"></span>
                    </span>
                </Box>
            )}
        </Flex>
    );
}
