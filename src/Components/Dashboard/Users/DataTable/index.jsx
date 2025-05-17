import { Table } from "@/Common";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { FaCheck, FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function SubUserDataTable({ Lang, Data, IsLoading, OnChange }) {
    const THeadData = [
        // 16.7px = 1em
        {
            Label: "Username",
            Sort: "",
            OrderBy: "Username",
            size: ""
        },
        {
            Label: "Title",
            Sort: "",
            OrderBy: "Title",
            size: ""
        },
        {
            Label: "WhatsApp",
            Sort: "",
            OrderBy: "WhatsApp",
            size: ""
        },
        {
            Label: "Email Adress",
            Sort: "",
            OrderBy: "EmailAdress",
            size: ""
        },
        {
            Label: "Tools",
            Sort: "",
            OrderBy: "Tools",
            size: ""
        }
    ];
    const DataToRender = useMemo(() => {
        if (Data.length < 1) return null;
        return Data?.map((item) => {
            const {
                UserId,
                UserEmail,
                UserPhoneNumber,
                UserName,
                UserJobTitle,
                UserCities,
                UserSection
            } = item;
            const OldSecs = UserSection?.map((sec) => sec.SectionId);
            let SectionData = Lang?.DATA_PAGE?.TABS?.SECTIONS
                ? Lang?.DATA_PAGE?.TABS?.SECTIONS
                : [];
            SectionData = SectionData?.filter((sec) => OldSecs.includes(sec.value));
            const UpdateData = {
                UserId: UserId,
                UserName: UserName,
                UserPhoneNumber: `+${UserPhoneNumber}`,
                UserEmail: UserEmail,
                UserJobTitle: UserJobTitle,
                UserSections: SectionData?.filter((sec) => OldSecs.includes(sec.value))?.map(
                    (section) => ({
                        SectionName: section.ViewLabel,
                        SectionKey: section.label,
                        SectionId: section.value,
                        Icon: <FaCheck />
                    })
                ),
                UserPassword: "",
                Residential: [],
                Commercial: []
            };
            SectionData.forEach((Sec) => {
                const SecCities = UserCities?.filter((city) => city.CitySection == Sec.label);
                UpdateData[Sec.label] = SecCities?.map((city) => {
                    return {
                        CityId: city.CityId,
                        CityName: city.CityName,
                        CitySectionId: Sec.value,
                        Icon: <FaCheck />
                    };
                });
            });
            return {
                Data: [
                    {
                        Label: <Text textAlign={"center"}>{UserName}</Text>,
                        IsSticky: false,
                        Extra: null
                    },
                    {
                        Label: <Text textAlign={"center"}>{UserJobTitle}</Text>,
                        IsSticky: false,
                        Extra: null
                    },
                    {
                        Label: <Text textAlign={"center"}>{UserPhoneNumber}</Text>,
                        IsSticky: false,
                        Extra: null
                    },
                    {
                        Label: <Text textAlign={"center"}>{UserEmail}</Text>,
                        IsSticky: false,
                        Extra: null
                    },
                    {
                        Label: (
                            <Flex
                                alignItems={"center"}
                                gap="0.8rem"
                                py={1}
                                justifyContent={"center"}
                            >
                                <IconButton
                                    className="Shadow"
                                    rounded={"full"}
                                    size={"sm"}
                                    bg={"blue.500"}
                                    _hover={{ bg: "blue.600" }}
                                    fontSize={"1.5rem"}
                                    icon={<FaUserEdit />}
                                    onClick={() =>
                                        OnChange({
                                            IsOpen: true,
                                            IsEdit: true,
                                            ...UpdateData
                                        })
                                    }
                                ></IconButton>

                                <IconButton
                                    className="Shadow"
                                    rounded={"full"}
                                    size={"sm"}
                                    bg={"red.500"}
                                    _hover={{ bg: "red.600" }}
                                    fontSize={"1.5rem"}
                                    icon={<MdDelete />}
                                    onClick={() =>
                                        OnChange({
                                            IsDelete: true,
                                            UserId: UserId,
                                            UserName: UserName
                                        })
                                    }
                                ></IconButton>
                            </Flex>
                        ),
                        IsSticky: false,
                        Extra: null
                    }
                ]
            };
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Data]);
    return (
        <Table
            THeadData={THeadData}
            BodyData={DataToRender ? DataToRender : []}
            IsLoading={IsLoading}
            size="lg"
            px={0}
            mt={2}
        />
    );
}
