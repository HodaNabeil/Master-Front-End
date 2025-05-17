import { useLang } from "@/Hooks";
import { Helper } from "@/Utility";
import { Flex, FormLabel, Icon, Input, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
export default function UploadHelper({ OnChange = () => {}, Value = null, Label = "", Max = 2 }) {
    const InitailState = {
        List: [],
        Files: "",
        darg: false
    };
    const Lang = useLang()
    const [State, setState] = useState(InitailState);
    useEffect(() => {
        if (!Value) {
            setState(InitailState);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Value]);
    useEffect(() => {
        if (State.List && State.List.length > 0) {
            OnChange(State.List);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [State.List]);
    const OnFileSelect = (e) => {
        const files = e.target.files;
        setState((prev) => ({
            ...prev,
            Files: files,
            List: Array.from(files)
        }));
    };
    const OnDragOver = (e) => {
        e.preventDefault();
        if (State.drag) return;
        setState((prev) => ({
            ...prev,
            drag: true
        }));
    };
    const OnDragLeave = (e) => {
        e.preventDefault();
        if (!State.drag) return;
        setState((prev) => ({
            ...prev,
            drag: false
        }));
    };
    const OnDrop = (e) => {
        e.preventDefault();
        setState((prev) => ({
            ...prev,
            Files: e.dataTransfer.files[0],
            List: Array.from(e.dataTransfer.files),
            drag: false
        }));
    };
    return (
        <>
            <FormLabel
                htmlFor={"Upload-Files"}
                pos={"relative"}
                bg={"#fff"}
                color={"#1a374a"}
                rounded={"md"}
            >
                <Input
                    display={"none"}
                    id={"Upload-Files"}
                    type={"file"}
                    onChange={OnFileSelect}
                    multiple={true}
                    max={Max}
                />
                <Flex
                    className={`file-choose ${State.drag ? "dragging" : ""}`}
                    onDragOver={OnDragOver}
                    onDragLeave={OnDragLeave}
                    onDrop={OnDrop}
                    textAlign={"center"}
                    h={"10rem"}
                    p={"1rem"}
                    rounded={"md"}
                    cursor={"pointer"}
                    alignItems={"center"}
                    flexDir={"column"}
                    gap={2}
                >
                    <Icon
                        as={IoCloudUploadOutline}
                        h={"3rem"}
                        w={"3rem"}
                        fontWeight={"thin"}
                        fontSize={"0.9rem"}
                    />
                    <Text bg={"#1a374a"} color={"#fff"} minW={"50%"} rounded={"md"}>
                        {Lang?.PUBLIC?.UPLOAD_FILES || "تحميل الملفات"}
                    </Text>
                    {Label && (
                        <Text color={"#1a374a"} minW={"50%"} rounded={"md"} mt={"1rem"}>
                            {Label || "قم بتحميل الملفات المطلوبة"}
                        </Text>
                    )}
                </Flex>
            </FormLabel>
            <FileView Files={State.List} />
        </>
    );
}

function FileView({ Files = [] }) {
    if (Files?.length < 1) return null;
    return (
        <Stack borderRadius={"6px"} w={"100%"} gap={0.5}>
            {Files.map((file, index) => {
                const { name, size } = file;
                return (
                    <Flex
                        key={index}
                        justifyContent={"space-between"}
                        className="Sales-Page-Btn-Bg Sales-Page-Color"
                        rounded={"md"}
                        px={1}
                    >
                        <span>{name}</span>
                        <span>{Helper.FormatBytes(size)}</span>
                    </Flex>
                );
            })}
        </Stack>
    );
}
