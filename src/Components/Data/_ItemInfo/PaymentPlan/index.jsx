import PriceList from "../PriceList";
import PaymentPlanContent from "./PaymentPlanContent";

export default function PaymentPlan({
    Item,
    Lang,
    IsDark = true,
    SelectedPhas,
    ProcessData,
    SelectedPayPlan,
    setSelectedPayPlan,
    SelectedPhasData,
    height={},
    ...rest
}) {
    let Options = SelectedPhasData ? SelectedPhasData.DataPayPlans : [];
    return (
        <section>
            <PaymentPlanContent
                OnSelctPayPlan={(PayPlan) => setSelectedPayPlan(PayPlan)}
                SelectedPayPlan={SelectedPayPlan}
                Options={Options}
                IsDark={IsDark}
                Lang={Lang}
                dirction={"row"}
                height={{
                    Card : height.Card,
                    Text : height.Text,
                }}
                {...rest}
            />
            {Options?.length > 0 && (
                <PriceList
                    Lang={Lang}
                    IsDark={IsDark}
                    Item={Item}
                    Data={SelectedPhasData?.DataDetails}
                    Finishing={ProcessData.PriceListData.Finishing}
                    SelectedPhas={SelectedPhas}
                    SelectedPayPlan={SelectedPayPlan}
                />
            )}
        </section>
    );
}
