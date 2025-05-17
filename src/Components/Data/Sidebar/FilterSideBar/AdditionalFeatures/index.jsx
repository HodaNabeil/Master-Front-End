import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    useColorMode
} from "@chakra-ui/react";
import "./style.css";

import { startTransition, useEffect, useMemo, useState } from "react";
import { useLang } from "@/Hooks";
import { Theme } from "@/Utility";
import ContentItem from "./ContentItem";
import ReusltCard from "./ReusltCard";
const InitialState = {
    ExtraBenefits: [],
    Engineering: [],
    Executive: [],
    Management: [],
    Architecture: []
};
const AdditionalFeatures = ({
    SetMainState = () => {},
    OnUnSelectItem = () => {},
    MainState,
    Options = InitialState,
    onClose,
    isOpen,
    Rtl
}) => {
    const [State, setState] = useState(InitialState);
    const Lang = useLang();
    const { colorMode } = useColorMode();
    const AdditionalCols = useMemo(() => {
        return Lang?.DATA_PAGE?.OPTIONS?.ADDITIONAL ? Lang?.DATA_PAGE?.OPTIONS?.ADDITIONAL : [];
    }, [Lang?.DATA_PAGE?.OPTIONS?.ADDITIONAL]);
    const [Tabs, SetTabs] = useState([]);
    const OnToggleTab = (Tab) => {
        if (!Tab) {
            SetTabs([]);
            return;
        }
        SetTabs((prev) => {
            const IsSelected = prev?.includes(Tab);
            return IsSelected ? prev?.filter((el) => el != Tab) : [Tab];
        });
    };
    /**
     * @description This function is used to handle the change of the selected item
     * @param {String} Name Name of the selected item
     * @param {String} Value.label  Label of the selected item
     * @param {Number} Value.value  Value of the selected item
     * @param {Number} Value.id  Id of the selected item
     * @param {Boolean} IsSelected Default value is false
     * @example
     *  OnChange("ExtraBenefits",{
     *      label : "",
     *     value : "",
     *     id : ""
     * }, true)
     * @example
     *  OnChange("Engineering",{
     *      label : "",
     *     value : "",
     *     id : ""
     * }, true)
     * @example
     *  OnChange("Executive",{
     *      label : "",
     *     value : "",
     *     id : ""
     * }, true)
     * @example
     *  OnChange("Management",{
     *      label : "",
     *     value : "",
     *     id : ""
     * }, true)
     * @example
     *  OnChange("Architecture",{
     *      label : "",
     *     value : "",
     *     id : ""
     * }, true)
     */
    const OnChange = (Name, Value, IsSelected = false) => {
        startTransition(() => {
            const OldData = State[Name];
            const NewData = IsSelected
                ? OldData?.filter((el) => el.id != Value.id)
                : [...OldData, Value];
            setState((prev) => ({
                ...prev,
                [Name]: NewData
            }));
        });
    };
    const OnSubmit = (Form) => {
        startTransition(() => {
            SetMainState({
                type: "Change",
                payload: {
                    DataExtraBenefits: Form.ExtraBenefits,
                    DataEngineering: Form.Engineering,
                    DataExecutive: Form.Executive,
                    DataManagement: Form.Management,
                    DataArchitecture: Form.Architecture
                }
            });
            onClose();
        });
    };
    const HaveData = useMemo(() => {
        let ExtraBenefits = MainState?.DataExtraBenefits?.length > 0;
        let Engineering = MainState?.DataEngineering?.length > 0;
        let Executive = MainState?.DataExecutive?.length > 0;
        let Management = MainState?.DataManagement?.length > 0;
        let Architecture = MainState?.DataArchitecture?.length > 0;
        return {
            ExtraBenefits,
            Engineering,
            Executive,
            Management,
            Architecture,
            HaveOne: ExtraBenefits || Engineering || Executive || Management || Architecture
        };
    }, [
        MainState?.DataExtraBenefits?.length,
        MainState?.DataEngineering?.length,
        MainState?.DataExecutive?.length,
        MainState?.DataManagement?.length,
        MainState?.DataArchitecture?.length
    ]);
    useEffect(() => {
        if (MainState) {
            startTransition(() => {
                setState((prev) => ({
                    ...prev,
                    ExtraBenefits: MainState.DataExtraBenefits,
                    Engineering: MainState.DataEngineering,
                    Executive: MainState.DataExecutive,
                    Management: MainState.DataManagement,
                    Architecture: MainState.DataArchitecture
                }));
            });
        }
    }, [MainState]);
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
                <ModalOverlay className="Overlay-AdditionalFeatures" />
                <ModalContent className="Modal-Content-AdditionalFeatures Main-Modal Shadow">
                    <ModalBody
                        display={"flex"}
                        flexDir={"column"}
                        justifyContent={"center"}
                        gap={"1"}
                    >
                        {AdditionalCols && AdditionalCols?.map(({ Label, Value }) => {
                            return (
                                <ContentItem
                                    key={Value}
                                    Label={Label}
                                    IsOpen={Value == Tabs}
                                    Name={Value}
                                    State={State[Value] ? State[Value] : []}
                                    Options={Options[Value] ? Options[Value] : []}
                                    OnToggle={OnToggleTab}
                                    OnChange={OnChange}
                                    Rtl={Rtl}
                                    Lang={Lang}
                                />
                            );
                        })}
                    </ModalBody>
                    <ModalFooter justifyContent={"space-between"} alignItems={"center"}>
                        <Button
                            onClick={() => OnSubmit(State)}
                            bg={Theme.Init.colors.ActiveBackgroundColor[colorMode]}
                            _hover={{
                                bg: Theme.Init.colors.ActiveBackgroundColor[colorMode]
                            }}
                            variant={"solid"}
                            color={"#fff"}
                            width={"fit-content"}
                            m="auto"
                            className="flex_center"
                        >
                            {Lang?.OK}
                        </Button>

                        <Button
                            style={{ width: "70px" }}
                            variant={"solid"}
                            color={"#fff"}
                            width={"fit-content"}
                            m="auto"
                            className="flex_center"
                            bg="red.500"
                            onClick={onClose}
                            _hover={{
                                background: "red.500"
                            }}
                        >
                            {Lang?.CLOSE}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {HaveData.HaveOne && (
                <ReusltCard
                    HaveData={HaveData}
                    Lang={Lang}
                    State={MainState}
                    colorMode={colorMode}
                    AdditionalCols={AdditionalCols}
                    OnUnSelectItem={OnUnSelectItem}
                />
            )}
        </>
    );
};

export default AdditionalFeatures;
