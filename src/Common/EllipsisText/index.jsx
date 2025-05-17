import { Tooltip, useBreakpoint } from "@chakra-ui/react";
import { useMemo } from "react";

export default function EllipsisText({
    Text = "",
    Length = {
        base: 20,
        sm: 20,
        md: 20,
        lg: 20,
        xl: 20,
        "2xl": 20
    }
}) {
    const BreakPoint = useBreakpoint();
    const GetSizeByBreakPoint = useMemo(() => {
        const Lengths = {
            base: Length?.base ? Length.base : 20,
            sm: Length?.sm ? Length.sm : 20,
            md: Length?.md ? Length.md : 20,
            lg: Length?.lg ? Length.lg : 20,
            xl: Length?.xl ? Length.xl : 20,
            "2xl": Length?.["2xl"] ? Length["2xl"] : 20
        };
        if (Length instanceof Number) return Length;
        if (Length instanceof Object) return Lengths[BreakPoint];
        return Lengths[BreakPoint];
    }, [BreakPoint, Length]);
    const ValidateText = useMemo(() => {
        if (Text.length > GetSizeByBreakPoint) {
            return Text.slice(0, GetSizeByBreakPoint) + "...";
        }
        return Text;
    }, [Text, GetSizeByBreakPoint]);
    return (
        <Tooltip label={Text} hasArrow={true}>
            <span className="text-ellipsis">{ValidateText}</span>
        </Tooltip>
    );
}
