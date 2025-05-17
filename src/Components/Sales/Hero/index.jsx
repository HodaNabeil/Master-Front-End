import { Button, Flex, Icon } from "@chakra-ui/react";
import { memo } from "react";
import { MdAdd } from "react-icons/md";
import { TbCalculator } from "react-icons/tb";

 function SalesHero({
    OnCommisionCalculate = () => {},
    OnNewCommision = () => {},
    Lang,
    ...rest
}) {
    return (
        <Flex alignItems={"start"} flexDir={"column"} gap={"1"} py={1} h={"3.5rem"} {...rest}>
            <Button
                className="Sales-Page-Btn-Bg Sales-Page-Color"
                type="button"
                onClick={() => OnNewCommision()}
                title={
                    Lang?.SALES_PAGE?.BUTTONS?.COMMISSION_REQUEST || "طلب اصدار عمولة لبيعة جديدة"
                }
                h={"1.5rem"}
                gap={3}
            >
                {Lang?.SALES_PAGE?.BUTTONS?.COMMISSION_REQUEST || "طلب اصدار عمولة لبيعة جديدة"}
                <Icon as={MdAdd} fontSize={"1.5rem"} fontWeight={"bold"} />
            </Button>
            <Button
                h={"1.5rem"}
                className="Sales-Page-Btn-Bg Sales-Page-Color"
                type="button"
                onClick={() => OnCommisionCalculate()}
                title={Lang?.SALES_PAGE?.BUTTONS?.COMMISSION_CALCULATE || "احسب عمولتك"}
                gap={3}
            >
                {Lang?.SALES_PAGE?.BUTTONS?.COMMISSION_CALCULATE || "احسب عمولتك"}
                <Icon as={TbCalculator} fontSize={"1.5rem"} fontWeight={"bold"} />
            </Button>
        </Flex>
    );
}
export default memo(SalesHero);
