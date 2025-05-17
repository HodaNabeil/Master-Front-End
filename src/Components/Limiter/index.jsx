import { SelectField } from "@/Common";
import { memo } from "react";
function Limiter({ Limit = false, OnLimit = () => {}, ...rest }) {
    const Options = [
        // {
        //     Name: "1",
        //     Value: "1"
        // },
        {
            Name: "50",
            Value: "50"
        },
        {
            Name: "100",
            Value: "100"
        },
        {
            Name: "200",
            Value: "200"
        },
        {
            Name: "500",
            Value: "500"
        },
        {
            Name: "1000",
            Value: "1000"
        }
    ];
    const OnChange = (e) => {
        OnLimit(e.target.value);
    };
    return (
        <div dir="ltr">
            <SelectField
                IsAuth={false}
                Options={Options}
                Value={Limit}
                OnChange={(e) => OnChange(e)}
                Id="Limiter"
                Size="md"
                {...rest}
            />
        </div>
    );
}

export default memo(Limiter);
