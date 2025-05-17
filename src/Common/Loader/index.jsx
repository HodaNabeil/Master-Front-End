import { Avatar, Center, Image } from "@chakra-ui/react";
export default function Spinner({
    Src = "/Img/Loading.gif",
    Name = 'Master V',
    Width = 40
}) {
    return (
        <Center
            pos={'relative'}
            rounded={'full'}
        >
            <Image
                boxSize={`${Width}px`}
                alt={Name}
                src={Src}
                title={Name}
                color={'white'}
                rounded={'full'}
            />
        </Center>
    )
}