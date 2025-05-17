import { EllipsisText } from "@/Common";
import { useValidateRole } from "@/Hooks";
import { Helper } from "@/Utility";
import { Flex, Image, Text, useColorMode } from "@chakra-ui/react";
import PhasesButtons from "../PhasesButtons";
import ImageButton from "../ImageButton";

export default function ItemInfoHero({
    setSelectedPayPlan = () => {},
    IsContactLoading = false,
    SelectedPhasData,
    OnSetContacts = () => {},
    OnSelectPhas = () => {},
    PhasOptions = [],
    isLoading = true,
    PayPlan,
    MainH = "5.5rem",
    Item,
    Phas,
    Lang,
}) {
    const { colorMode } = useColorMode();
    const IsDark = colorMode == "dark";
    const { IsGold, IsPersonal } = useValidateRole();
    const { DataDeveloperId, DataAcres_ProjectArea, DataDeveloper } = Item || {};
    const { DataPhas, DataStatus } = Phas || {};
    if (!Item) return null;
    return (
        <Flex as="section" w={"100%"} h={MainH} rounded={"lg"} p={"0.2rem"}>
            <Flex as="section" w={"100%"} h={`clac(${MainH} - 0.2rem)`} rounded={"lg"} gap={2}>
                <Image
                    src={`/Img/Developer/${DataDeveloperId}.${Helper.DeveloperImgExtintion}`}
                    w={"6.5rem"}
                    h={`clac(${MainH} - 0.2rem)`}
                    rounded={"md"}
                />
                <Flex flexDir={"column"} gap={0}>
                    <Text as={"span"} lineHeight={IsPersonal ? "1rem" : `calc(${MainH} / 3)`}>
                        {DataDeveloper}
                    </Text>
                    <Flex lineHeight={IsPersonal ? "1rem" : `calc(${MainH} / 3)`} gap={1}>
                        <Text as={"span"}>{DataPhas}</Text> |
                        <Text as={"span"} color={Helper.StatusColor[parseInt(DataStatus)] || ""}>
                            {DataStatus ? (
                                <EllipsisText
                                    Text={Lang?.DATA_PAGE?.STATUS_DATA?.[DataStatus]}
                                    Length={10}
                                />
                            ) : (
                                "-"
                            )}
                        </Text>
                    </Flex>
                    <Text as={"span"} lineHeight={IsPersonal ? "1rem" : `calc(${MainH} / 3)`}>
                        {DataAcres_ProjectArea}
                    </Text>
                    {IsPersonal && (
                        <ImageButton
                            src={`/Img/${IsGold ? "Gold" : colorMode}/User.webp`}
                            Label={Lang?.DATA_PAGE?.KEY_ACCOUNT || "key account"}
                            ImgBg={IsGold ? "white" : IsDark ? "#0e2d3f" : "#b6dded"}
                            TextBg={IsGold ? "#fab771" : IsDark ? "#0e2d3f" : "#b6dded"}
                            w={"auto"}
                            onClick={() => OnSetContacts()}
                            isDisabled={IsContactLoading}
                            isLoading={IsContactLoading}
                        />
                    )}
                </Flex>
            </Flex>
            <Flex as="section">
                <PhasesButtons
                    SelectedPhasData={SelectedPhasData}
                    OnSelectPhas={OnSelectPhas}
                    Options={PhasOptions}
                    isLoading={isLoading}
                    PayPlan={PayPlan}
                    IsDark={IsDark}
                    Item={Item}
                    Phas={Phas}
                    Lang={Lang}
                    SelectedPayPlan={PayPlan}
                    setSelectedPayPlan={setSelectedPayPlan}
                />
            </Flex>
        </Flex>
    );
}

// function Phases({ Phases }) {}
