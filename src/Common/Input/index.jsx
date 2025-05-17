import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Textarea,
    useColorMode
} from "@chakra-ui/react";
import { cloneElement, useId, useState } from "react";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { useSelector } from "react-redux";
function InputField({
    Id,
    Label,
    Placeholder = "",
    Name = "",
    Type = "text",
    Value = "",
    OnChange = () => {},
    IsAuth = false,
    ...props
}) {
    const OptinalId = useId();
    const [show, setShow] = useState(false);
    const handleShowPassowrd = () => setShow(!show);
    const { Rtl } = useSelector((state) => state.Helper);
    const { colorMode } = useColorMode();
    const Color = IsAuth ? "white" : colorMode == "dark" ? "white" : "black";
    const ShadowCalss = IsAuth ? "Shadow-Auth" : "Shadow";
    const Inpts = {
        password: (
            <>
                <FormLabel
                    // bgGradient="linear(to-r, red.400,pink.900)"
                    htmlFor={Id ?? OptinalId}
                    display={"flex"}
                    alignItems={"center"}
                    dir={Rtl ? "rtl" : "ltr"}
                    color={Color}
                >
                    {Label}
                </FormLabel>
                <InputGroup
                    size="md"
                    mt={1}
                    dir={Rtl ? "rtl" : "ltr"}
                    rounded={"md"}
                    className={ShadowCalss}
                    _placeholder={{
                        color: colorMode === "dark" ? "gray.500" : "gray.500"
                    }}
                >
                    {Rtl && (
                        <InputLeftElement width="4.5rem">
                            <Button
                                title={"button"}
                                color={IsAuth ? "white" : colorMode == "dark" ? "white" : "black"}
                                h="1.75rem"
                                size="sm"
                                onClick={handleShowPassowrd}
                            >
                                {show ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
                            </Button>
                        </InputLeftElement>
                    )}
                    <Input
                        id={Id ?? OptinalId}
                        value={Value}
                        onChange={OnChange}
                        size="md"
                        type={show ? "text" : "password"}
                        placeholder={Placeholder}
                        pr="1.5rem"
                        variant="outline"
                        outline={"none"}
                        border={"none"}
                        name={Name}
                        color={Color}
                        _invalid={{ borderColor: "red.300" }}
                        {...props}
                    />
                    {!Rtl && (
                        <InputRightElement width="4.5rem">
                            <Button
                                title={"button"}
                                h="1.75rem"
                                size="sm"
                                color={IsAuth ? "white" : colorMode == "dark" ? "white" : "black"}
                                onClick={handleShowPassowrd}
                            >
                                {show ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
                            </Button>
                        </InputRightElement>
                    )}
                </InputGroup>
            </>
        ),
        textarea: (
            <>
                <FormLabel htmlFor={Id ?? OptinalId} color={Color} dir={Rtl ? "rtl" : "ltr"}>
                    {Label}
                </FormLabel>
                <Textarea
                    id={Id ?? OptinalId}
                    placeholder={Placeholder}
                    value={Value}
                    onChange={OnChange}
                    autoComplete={Name}
                    variant="outline"
                    name={Name}
                    _invalid={{ borderColor: "red.300" }}
                    className={ShadowCalss}
                    _placeholder={{
                        color: colorMode === "dark" ? "gray.500" : "gray.500"
                    }}
                    {...props}
                />
            </>
        )
    };
    return (
        <FormControl>
            {Inpts[Type] ? (
                cloneElement(Inpts[Type])
            ) : (
                <>
                    {Label && (
                        <FormLabel
                            htmlFor={Id ?? OptinalId}
                            color={Color}
                            dir={Rtl ? "rtl" : "ltr"}
                        >
                            {Label}
                        </FormLabel>
                    )}
                    <Input
                        placeholder={Placeholder}
                        id={Id ?? OptinalId}
                        type={Type}
                        value={Value}
                        onChange={OnChange}
                        autoComplete={"on"}
                        variant="outline"
                        outline={"none"}
                        border={"none"}
                        name={Name}
                        appearance={"none"}
                        _invalid={{ borderColor: "red.300" }}
                        className={ShadowCalss}
                        _placeholder={{
                            color: colorMode === "dark" ? "gray.500" : "gray.500"
                        }}
                        {...props}
                    />
                </>
            )}
        </FormControl>
    );
}

export default InputField;
