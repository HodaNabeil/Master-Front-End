import { useLang } from "@/Hooks";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useId } from "react";
import { useSelector } from "react-redux";

const SelectField = ({
    Value = "",
    Id = "",
    Label = "",
    Name = "",
    Options = [],
    Size = "md",
    OnChange = () => {},
    IsAuth = false,
    ...props
}) => {
    const { Rtl } = useSelector((state) => state.Helper);
    const OptinalId = useId();
    const ShadowCalss = IsAuth ? "Shadow-Auth" : "Shadow";
    const Lang = useLang();
    return (
        <FormControl>
            {Label && (
                <FormLabel htmlFor={Id ?? OptinalId} dir={Rtl ? "rtl" : "ltr"}>
                    {Label}
                </FormLabel>
            )}
            <Select
                id={Id ?? OptinalId}
                value={Value}
                name={Name}
                // background={colorMode == 'dark' ? '#212121' : "#212121"}
                size={Size}
                onChange={OnChange}
                className={ShadowCalss}
                {...props}
            >
                {Options?.length > 0 ? (
                    Options?.map((Op, index) => (
                        <option
                            key={`${Name}_${index}`}
                            value={Op.Value}
                            style={{
                                ...(Op.Name == "&#8734;"
                                    ? {
                                          fontSize: "2rem",
                                          fontWeight: "bold",
                                          // background: "#212121",
                                          paddingInline: "0",
                                          marginInline: "0"
                                      }
                                    : {
                                          // background: "#030625"
                                      }),
                                textAlign: "center"
                            }}
                        >
                            {Op.Name == "&#8734;" ? <>&#8734;</> : Op.Name}
                        </option>
                    ))
                ) : (
                    <option value="">{Lang?.NO_OPTIONS}</option>
                )}
            </Select>
        </FormControl>
    );
};
export default SelectField;
