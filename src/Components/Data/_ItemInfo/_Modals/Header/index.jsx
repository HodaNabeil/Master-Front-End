import { Flex } from "@chakra-ui/react";
import PaymentPlanPopver from "./PaymentPlan";
import { WhatsAppSender } from "@/Common";
export default function ModalsHeader({
    SelectedPayPlan = null,
    setSelectedPayPlan = () => {},
    Options = [],
    ModelBg,
    LeftBg,
    Lang,
    ...rest
}) {
    return (
        <Flex w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
            <PaymentPlanPopver
                SelectedPayPlan={SelectedPayPlan}
                setSelectedPayPlan={setSelectedPayPlan}
                Options={Options}
                ModelBg={ModelBg}
                LeftBg={LeftBg}
                Lang={Lang}
                {...rest}
            />
            <WhatsAppSender WithLabel={false} 
            h={"1.5rem"}
            w={"1.5rem"}
             />
        </Flex>
    );
}
