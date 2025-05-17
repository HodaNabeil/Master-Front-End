import ImageButton from "../ImageButton";
import { Flex, useDisclosure } from "@chakra-ui/react";
import { useValidateSection } from "@/Hooks";
import { RoutingManager } from "@/Utility";

export default function ActionButtons({
    OnSetModalData = () => {},
    Notify = () => {},
    Lang,
    Item,
    Modal = {},
    IsDark = true,
    ...rest
}) {
    const {
        isOpen: IsMatrialLoading,
        onOpen: OnOpenMatrialLoading,
        onClose: OnCloseMatrialLoading
    } = useDisclosure();
    const {
        isOpen: IsLayoutsLoading,
        onOpen: OnOpenLayoutsLoading,
        onClose: OnCloseLayoutsLoading
    } = useDisclosure();
    const { IsCommercial } = useValidateSection();
    const PublicProps = {
        ImgBg: IsDark ? "#497a94" : "#0e2d3f",
        TextBg: IsDark ? "#0e2d3f" : "#b6dded"
    };
    const OnOpenOrientation = () => {
        if (!Item.DataUrl || Item.DataUrl == "0") {
            Notify("warn", Lang?.ERRORS?.NO_URL?.replace("{{Compound}}", Item.DataCompound));
            return;
        } else {
            OnSetModalData({
                CompoundId: Item.DataCompoundId,
                Type: "DataUrl",
                Title: Item.DataCompound + " Video",
                Content: Item.DataUrl,
                Size: {
                    minW: {
                        base: "100vw",
                        sm: "60vw"
                    },
                    h: {
                        base: "80vh",
                        sm: "60vh"
                    },
                    top: {
                        base: "10vh",
                        lg: "20vh"
                    },
                    left: {
                        base: "0vw",
                        sm: "20vw"
                    }
                }
            });
        }
    };
    const OnLayouts = async () => {
        OnOpenLayoutsLoading();
        OnSetModalData({
            CompoundId: Item.DataCompoundId,
            Type: "Layout",
            SendType: "Single",
            Title: Item.DataCompound,
            Content: {
                Type: "Layout",
                CompoundId: Item.DataCompoundId,
                CityId: Item.DataCityId
            }
        });
        setTimeout(() => OnCloseLayoutsLoading(), 1500);
    };
    const OnMatrials = async () => {
        OnOpenMatrialLoading();
        OnSetModalData({
            CompoundId: Item.DataCompoundId,
            Type: "Matrial",
            SendType: "List",
            Title: Item.DataCompound,
            Content: {
                Type: "Matrial",
                CompoundId: Item.DataCompoundId,
                CityId: Item.DataCityId
            },
            Extra: Item.DataDescription
        });
        setTimeout(() => OnCloseMatrialLoading(), 1500);
    };

    const OnLocation = () => {
        OnSetModalData({
            Type: "DataCoordinates",
            SendType: "Coordinates",
            Title: "",
            Content: Item?.DataCoordinates,
            CompoundId: Item?.DataCompoundId,
            Extra: RoutingManager.ProjectLink?.replace("{{Project}}", Item?.DataCompound)?.replace(
                "{{Id}}",
                Item?.DataCompoundId
            )
        });
    };
    return (
        <Flex
            as={"section"}
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={{
                md: 0.5,
                lg: 1
            }}
            {...rest}
        >
            {/* Matrial */}
            <ImageButton
                onClick={() => OnMatrials()}
                src={`/Img/Info/Matrial.png`}
                Label={Lang?.DATA_PAGE?.ACTIONS?.MATRILAS || "Matrial"}
                isLoading={IsMatrialLoading}
                isDisabled={Modal.Type == "Matrial"}
                {...PublicProps}
            />
            {/* Location  - (Coordinates)*/}
            <ImageButton
                onClick={() => OnLocation()}
                src={`/Img/Info/Location.png`}
                Label={Lang?.DATA_PAGE?.ACTIONS?.Location || "Location"}
                isDisabled={Modal.Type == "DataCoordinates"}
                {...PublicProps}
            />
            {/* Video */}
            <ImageButton
                src={`/Img/Info/Video.png`}
                Label={Lang?.DATA_PAGE?.ACTIONS?.URL || "Orientation"}
                onClick={() => OnOpenOrientation()}
                isDisabled={Modal.Type == "DataUrl"}
                {...PublicProps}
            />
            {/* Layout */}
            {!IsCommercial && (
                <ImageButton
                    onClick={() => OnLayouts()}
                    src={`/Img/Info/Layout.png`}
                    Label={Lang?.DATA_PAGE?.ACTIONS?.LAYOUTS || "Layouts"}
                    isLoading={IsLayoutsLoading}
                    isDisabled={Modal.Type == "Layout"}
                    {...PublicProps}
                />
            )}
        </Flex>
    );
}
