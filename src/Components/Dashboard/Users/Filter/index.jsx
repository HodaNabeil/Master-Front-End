import { InputField, SelectField } from "@/Common";
import { Button, Flex, IconButton } from "@chakra-ui/react";
import { startTransition, useState } from "react";
import { IoClose } from "react-icons/io5";

export default function UsersFilter({ Lang, SetFilter, Rtl }) {
    const [Filter, SetFilterData] = useState({
        SearchBy: "UserName",
        Search: ""
    });
      const HandleChange = (Name, Value) => {
        startTransition(() => {
            SetFilterData((old) => ({
                ...old,
                [Name]: Value
            }));
        });
    };
    const OnSearch = () => {
        if (!Filter.SearchBy || !Filter.Search) return;
        startTransition(() => {
            SetFilter(Filter);
        });
    };
    const OnReset = () => {
        startTransition(() => {
            SetFilterData({
                SearchBy: "UserName",
                Search: ""
            });
            SetFilter({
                SearchBy: "UserName",
                Search: ""
            });
        });
    };
    return (
        <Flex
            alignItems={"center"}
            gap={"2"}
            dir={Rtl ? "rtl" : "ltr"}
            px={{ base: 2, md: 0 }}
        >
            <SelectField
                Options={Lang?.DASHBOARD_PAGE?.OPTIONS?.FILTER}
                Value={Filter?.SearchBy}
                OnChange={(e) => HandleChange("SearchBy", e.target.value)}
                Size="sm"
                dir={"ltr"}
            />
            <InputField
                Name="Search"
                Type="text"
                OnChange={(e) => HandleChange("Search", e.target.value)}
                Value={Filter?.Search}
                size="sm"
            />
            <IconButton
                variant={"solid"}
                _hover={{
                    transform: "scale(1.1)"
                }}
                size={"sm"}
                className="Shadow"
                borderRadius={"50%"}
                fontSize={"1.2rem"}
                icon={<IoClose />}
                onClick={() => OnReset()}
            />
            <Button
                variant={"outline"}
                className="Shadow"
                type="button"
                h={8}
                py={3}
                onClick={() => OnSearch()}
            >
                {Lang?.SEARCH}
            </Button>
        </Flex>
    );
}
