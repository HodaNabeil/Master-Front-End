import { useLoadFileQuery } from "@/Redux";
import { Image } from "@chakra-ui/react";
import { useMemo } from "react";

export default function ChakraImage({ 
    src = null,
    onClick=()=>{},
    
    ...rest }) {
    const { data } = useLoadFileQuery({ FileUrl: src }, { skip: !src });
    const ImageData = useMemo(() => {
        if (!data || data.error)
            return {
                IsImage: true,
                IsPdf: false,
                FileUrl: "/Img/Not_Found.webp"
            };
        return {
            IsImage: data.data?.FileMimeType?.startsWith("image/"),
            IsPdf: data.data?.FileMimeType?.includes("/pdf"),
            ...data.data
        };
    }, [data]);
    return (
        <Image
            onClick={onClick}
            cursor={"pointer"}
            src={ImageData.FileUrl}
            onError={(e) => {
                e.onError = null;
                e.target.src = "/Img/Not_Found.webp";
            }}
            {...rest}
        />
    );
}
