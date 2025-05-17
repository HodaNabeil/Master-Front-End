import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useColorModeValue,
    useDisclosure
} from "@chakra-ui/react";
import ButtonImg from "../../PhasesButtons/ButtonImg";
import HeroButtons from "./HeroButtons";
import PayTable from "./Table";
import { useEffect, useState } from "react";
import PayModalHeader from "../Header";
import { useSelector } from "react-redux";
export default function PayModal({
    PhasOptions = {
        Type: [],
        Prices: [],
        Area: null
    },
    State,
    setState,
    BtnImgSize,
    PayPlan,
    Phas = null,
    Item = null,
    Lang,
    PaymentPlansOptions,
    setSelectedPayPlan
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { PayPlanDiscount } = PayPlan || {};
    const [TotalPrice, setTotalPrice] = useState(State.TotalPrice);
    const [Discount, setDiscount] = useState(PayPlanDiscount);
    const onToggle = () => (isOpen ? onClose() : onOpen());
    const ModelBg = useColorModeValue("", "#344f5e");
    const LeftBg = useColorModeValue("#4b7a98", "#0d2c3d");
    const RightBg = useColorModeValue("#0d2c3d", "#4b7a98");
    const { DataCompound } = Item || {};
    useEffect(() => {
        if (State.TotalPrice && State.TotalPrice != 0) {
            setTotalPrice(State.TotalPrice);
        }
    }, [State.TotalPrice]);
    useEffect(() => {
        if (PayPlanDiscount && PayPlanDiscount != 0) {
            setDiscount(PayPlanDiscount);
        }
    }, [PayPlanDiscount]);
    const { Rtl } = useSelector((state) => state.Helper);
    // console.log(PhasOptions)
    return (
        <>
            <ButtonImg
                src="/Img/Info/Pay.png"
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
                        <PayModalHeader
                            setSelectedPayPlan={setSelectedPayPlan}
                            SelectedPayPlan={PayPlan}
                            Options={PaymentPlansOptions}
                            ModelBg={ModelBg}
                            LeftBg={LeftBg}
                            Lang={Lang}
                        />
                        <ModalCloseButton pos={"initial"} rounded={"full"} />
                    </ModalHeader>
                    <ModalBody py={2} w={"50rem"} px={"2rem"}>
                        <HeroButtons
                            PhasOptions={PhasOptions}
                            State={State}
                            setState={setState}
                            TotalPrice={TotalPrice}
                            setTotalPrice={setTotalPrice}
                            Discount={Discount}
                            setDiscount={setDiscount}
                            ProjectName={DataCompound}
                            LeftBg={LeftBg}
                            PayPlan={PayPlan}
                            Lang={Lang}
                            Phas={Phas}
                            my={"2"}
                            fontSize={"0.8rem"}
                        />
                        <PayTable
                            TotalPrice={TotalPrice}
                            ModelBg={ModelBg}
                            LeftBg={LeftBg}
                            RightBg={RightBg}
                            Lang={Lang}
                            PayPlan={PayPlan}
                            Discount={Discount}
                            Type={State.Type}
                            Phas={Phas}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
