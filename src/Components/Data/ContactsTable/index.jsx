import { Table } from "@/Common";
import { Flex, IconButton } from "@chakra-ui/react";
import { useMemo } from "react";
import { IoLogoWhatsapp } from "react-icons/io5";

const ContactsTable = ({ Data = [], IsLoading, ...rest }) => {
    const THeadData = [
        {
            Label: "Name",
            Sort: "",
            OrderBy: "Name",
            size: ""
        },
        {
            Label: "Number",
            Sort: "",
            OrderBy: "Number",
            size: ""
        },
        {
            Label: "Tools",
            Sort: "",
            OrderBy: "Tools",
            size: ""
        }
    ];
    const BodyData = useMemo(() => {
        return Data
            ? Data?.map((Con) => {
                  return {
                      Data: [
                          {
                              Label: (
                                  <Flex justifyContent={"center"} w={"100%"}>
                                      {Con.ContactName}
                                  </Flex>
                              )
                          },
                          {
                              Label: (
                                  <Flex
                                      as="a"
                                      color={"#efa750"}
                                      href={`tel:${Con?.ContactNumber}`}
                                      w={"100%"}
                                      justifyContent={"center"}
                                  >
                                      {Con?.ContactNumber}
                                  </Flex>
                              )
                          },
                          {
                              Label: (
                                  <Flex justifyContent={"center"} py={1}>
                                      <IconButton
                                          icon={<IoLogoWhatsapp />}
                                          onClick={() => {
                                              const whatsappApp = `https://api.whatsapp.com/send/?phone=${Con.ContactNumber}`;
                                              window.open(whatsappApp, "_blank");
                                          }}
                                          size={"sm"}
                                          fontSize={"1.5rem"}
                                          rounded={"full"}
                                          className="Shadow"
                                      />
                                  </Flex>
                              )
                          }
                      ]
                  };
              })
            : [];
    }, [Data]);

    return <Table THeadData={THeadData} BodyData={BodyData} IsLoading={IsLoading} {...rest} />;
};

export default ContactsTable;
