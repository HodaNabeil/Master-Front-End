import { FormControl, FormLabel, Text, useColorMode } from "@chakra-ui/react";
import { useEffect, useId, useRef, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "./phoneinput.css";
import { useLang } from "@/Hooks";
import { useSelector } from "react-redux";

export default function PhoneInp({
    Value = "",
    Label = "Phone Number",
    Name = "PhoneNumber",
    Id = "",
    OnChange = () => {},
    defaultCountry,
    OnCountryChange = () => {},
    IsAuth = false
}) {
    const Lang = useLang();
    const { colorMode } = useColorMode();
    const OptinalId = useId();
    const InputRef = useRef();
    const { Rtl } = useSelector((state) => state.Helper);
    const [countryCode, setCountryCode] = useState(defaultCountry);
    const HandleChange = (value) => {
        const Replaces = ["+00", "+0"];
        Replaces.forEach((item) => {
            if (value && value.startsWith(item)) {
                value = `+${value.slice(item.length)}`;
            }
        });
        OnChange({
            target: {
                name: Name ?? "PhoneNumber",
                value
            }
        });
    };
    const OnChangeCCode = (value) => {
        if (OnCountryChange) {
            OnCountryChange(value);
        }
        setCountryCode(value);
    };
    useEffect(() => {
        const IsNotDataPage =
            window.location.pathname.includes("/Data") ||
            window.location.pathname.includes("/data");
        if (InputRef.current && !IsNotDataPage) {
            InputRef.current.style["border-radius"] = "4px";
            InputRef.current.style["padding"] = "6px 7px";
            InputRef.current.style["color"] = IsAuth
                ? "white"
                : colorMode == "dark"
                ? "white"
                : "black";
        }
    }, [IsAuth, colorMode]);
    const Color = IsAuth ? "white" : colorMode == "dark" ? "white" : "black";
    return (
        <FormControl>
            {Label && (
                <FormLabel
                    mt={"2px"}
                    mb={0}
                    display={"flex"}
                    alignItems={"baseline"}
                    // justifyContent={"center"}
                    htmlFor={Id ?? OptinalId}
                    fontSize={"sm"}
                    gap={1}
                    dir={Rtl ? "rtl" : "ltr"}
                    color={Color}
                >
                    <span
                        style={{
                            color: Color
                        }}
                    >
                        {Label}
                    </span>
                    {!countryCode ? (
                        <Text color={colorMode == "dark" ? "teal.200" : "teal"}>
                            - {Lang?.VALIDATION?.PHONE_NUMBER_STARTS_WITH}
                        </Text>
                    ) : (
                        <Text color={colorMode == "dark" ? "teal.200" : "teal"}>{Value}</Text>
                    )}
                </FormLabel>
            )}
            <PhoneInput
                defaultCountry={defaultCountry}
                name={Name}
                value={Value}
                id={Id ?? OptinalId}
                ref={InputRef}
                onChange={HandleChange}
                // className="input-auth"
                style={{
                    background: "transparent",
                    flexDirection: Rtl ? "row-reverse" : "row",
                    gap: ".5rem",
                }}
                onCountryChange={OnChangeCCode}
            />
        </FormControl>
    );
}
