import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    useDisclosure,
    useColorModeValue,
    ModalHeader,
    Flex
} from "@chakra-ui/react";
import ButtonImg from "../../PhasesButtons/ButtonImg";
import { useEffect, useState } from "react";
import HeroButtons from "./HeroButtons";
import ModalsHeader from "../Header";
import { useSelector } from "react-redux";
import ROITopCards from "./TopCards";
import ROIContent from "./ROIContent";
import TopButton from "../_TopButton";
import { SiteLogo } from "@/Common";
export default function RoiModal({
    PaymentPlansOptions,
    setSelectedPayPlan,
    PhasOptions = {
        Type: [],
        Prices: [],
        Area: null
    },
    BtnImgSize,
    setState,
    PayPlan,
    State,
    Phas = null,
    Item = null,
    Lang
}) {
    const { isOpen, onOpen, onClose } = useDisclosure({
        // defaultIsOpen: true
    });
    const { Rtl } = useSelector((state) => state.Helper);
    const onToggle = () => (isOpen ? onClose() : onOpen());
    const ModelBg = useColorModeValue("", "#344f5e");
    const LeftBg = useColorModeValue("#4b7a98", "#0d2c3d");
    const RightBg = useColorModeValue("#0d2c3d", "#4b7a98");
    const { DataCompound } = Item || {};
    const { PayPlanDiscount } = PayPlan || {};
    const [TotalPrice, setTotalPrice] = useState(State.TotalPrice);
    const [CapRate, setCapRate] = useState(PayPlanDiscount);
    useEffect(() => {
        if (State.TotalPrice && State.TotalPrice != 0) {
            setTotalPrice(State.TotalPrice);
        }
    }, [State.TotalPrice]);
    useEffect(() => {
        if (PayPlanDiscount && PayPlanDiscount != 0) {
            setCapRate(PayPlanDiscount);
        }
    }, [PayPlanDiscount]);
    return (
        <>
            <ButtonImg
                src="/Img/Info/RoiUp.png"
                alt="Pay"
                BtnImgSize={BtnImgSize}
                onToggle={onToggle}
                isOpen={isOpen}
            />
            <Modal
                isOpen={isOpen}
                onClose={onToggle}
                onOpen={onToggle}
                isCentered={true}
                motionPreset="slideInLeft"
            >
                <ModalOverlay />
                <ModalContent
                    transform={"translateX(-110%) scale(0.1)"}
                    transition={".5s ease-in-out"}
                    minW={"max-content"}
                    minH={"max-content"}
                    bg={ModelBg}
                    border={"4px solid"}
                    rounded={"xl"}
                    dir={Rtl ? "rtl" : "ltr"}
                >
                    <ModalHeader
                        py={0}
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <ModalsHeader
                            setSelectedPayPlan={setSelectedPayPlan}
                            Options={PaymentPlansOptions}
                            SelectedPayPlan={PayPlan}
                            ModelBg={ModelBg}
                            LeftBg={LeftBg}
                            Lang={Lang}
                        />
                        <ModalCloseButton pos={"initial"} rounded={"full"} />
                    </ModalHeader>
                    <ModalBody
                        py={2}
                        w={"50rem"}
                        pl={"2rem"}
                        pr={"2rem"}
                        pos={"relative"}
                    >
                        <TopButton
                            LeftBg={LeftBg}
                            Label={Lang?.DATA_PAGE?.LABELS?.ProjectName || "Project Name"}
                            ProjectName={DataCompound}
                        />
                        <Flex
                            justifyContent={"center"}
                            h={"3.5rem"}
                            w={"9rem"}
                            pos={"absolute"}
                            top={"1rem"}
                            right={"1rem"}
                            rounded={"xl"}
                        >
                            <SiteLogo p={1} w={"100%"} rounded={"full"} h={"100%"} />
                        </Flex>
                        <HeroButtons
                            PhasOptions={PhasOptions}
                            State={State}
                            setState={setState}
                            TotalPrice={TotalPrice}
                            setTotalPrice={setTotalPrice}
                            CapRate={CapRate}
                            setCapRate={setCapRate}
                            LeftBg={LeftBg}
                            PayPlan={PayPlan}
                            Lang={Lang}
                            Phas={Phas}
                            my={"2"}
                        />
                        <ROITopCards LeftBg={LeftBg} RightBg={RightBg} Lang={Lang} mt={"1rem"} />
                        <ROIContent
                            LeftBg={LeftBg}
                            RightBg={RightBg}
                            fontSize={"0.9rem"}
                            mt={"1rem"}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
