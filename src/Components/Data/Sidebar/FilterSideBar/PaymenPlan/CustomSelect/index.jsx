import { CloseButton, Flex, Select } from "@chakra-ui/react";
const CustomSelect = ({
    OnReset = () => {},
    value,
    OnChange,
    Options,
    Name,
    Lang,
    Rtl = false
}) => {
    const DirProps = Rtl
        ? {
              left: "-4"
          }
        : {
              right: "-4"
          };
    return (
        <Flex alignItems={"center"} rounded={"full"} gap={2} pos={"relative"} w={"100%"}>
            <Select
                w={"100%"}
                size="md"
                //  borderRadius={"15px"}
                className="Main-Modal Shadow"
                value={value}
                onChange={OnChange}
                rounded={"full"}
                zIndex={1}
                dir="ltr"
            >
                <option
                    value=""
                    style={{
                        textAlign: "center"
                    }}
                >
                    {Lang?.CHOOSE}
                </option>
                {Options?.map((el) => {
                    return (
                        <option
                            key={`${Name}_${el.id}`}
                            size="sm"
                            value={el.value}
                            style={{
                                textAlign: "center"
                            }}
                        >
                            {el.label}
                        </option>
                    );
                })}
            </Select>
            {value && (
                <CloseButton
                    size={"sm"}
                    rounded={"full"}
                    className="Main-Modal Shadow"
                    pos={"absolute"}
                    border={"none"}
                    bg={"red"}
                    zIndex={2}
                    onClick={OnReset}
                    {...DirProps}
                />
            )}
        </Flex>
    );
};

export default CustomSelect;
