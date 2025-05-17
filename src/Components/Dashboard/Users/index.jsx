import { FiUserPlus } from "react-icons/fi";
import { Badge, Box, Flex, IconButton, useColorMode } from "@chakra-ui/react";
import { startTransition, useEffect, useMemo, useState } from "react";
import { BodyHelper, Helper, ThemeColors } from "@/Utility";
import UsersFilter from "./Filter";
import {
    useCreateSubUserMutation,
    useDeleteSubUserMutation,
    useGetSubUserQuery,
    useUpdateSubUserMutation
} from "@/Redux";
import { useSelector } from "react-redux";
import SubUserDataTable from "./DataTable";
import CreateOrUpdate from "./CreateOrUpdate";
import DeleteModal from "./DeleteModal";
import { MdRefresh } from "react-icons/md";
const Users = ({ Toast, Lang, Rtl }) => {
    const { UserId, UserAccessToken } = useSelector((state) => state.Auth);
    const [Filter, SetFilter] = useState({
        SearchBy: "UserName",
        Search: ""
    });
    const [State, SetState] = useState({
        IsOpen: false,
        IsDelete: false,
        IsEdit: false,
        UserParentId: UserId,
        UserName: "",
        UserPhoneNumber: "",
        UserEmail: "",
        UserJobTitle: "",
        UserPassword: "",
        UserSections: [],
        Residential: [],
        Commercial: []
    });
    const [
        CreateUser,
        { isError: isCreateError, error: CreateUserError, isLoading: isCreateLoading }
    ] = useCreateSubUserMutation();
    const [
        UpdateUser,
        { isError: isUpdateError, error: UpdateUserError, isLoading: isUpdateLoading }
    ] = useUpdateSubUserMutation();
    const [
        DeleteUser,
        { isError: isDeleteError, error: DeleteUserError, isLoading: isDeleteLoading }
    ] = useDeleteSubUserMutation();
    useEffect(() => {
        if (isCreateError) {
            const Msg = Helper.ValidateErrorMessage(CreateUserError);
            Toast("error", Msg);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCreateError]);
    useEffect(() => {
        if (isUpdateError) {
            const Msg = Helper.ValidateErrorMessage(UpdateUserError);
            Toast("error", Msg);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUpdateError]);
    useEffect(() => {
        if (isDeleteError) {
            const Msg = Helper.ValidateErrorMessage(DeleteUserError);
            Toast("error", Msg);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDeleteError]);

    const {
        data,
        isFetching: IsLoading,
        refetch: RefetchData
    } = useGetSubUserQuery(BodyHelper.SubUsersFilter(Filter, UserId), {
        skip: !UserId || !UserAccessToken
    });

    const { colorMode } = useColorMode();
    const ProcessData = useMemo(() => {
        return data?.data ? data?.data?.results : [];
    }, [data?.data]);
    const OnChange = (Name, Value) => {
        startTransition(() => {
            if (Name instanceof Object) {
                return SetState({
                    ...State,
                    ...Name
                });
            }
            SetState({
                ...State,
                [Name]: Value
            });
        });
    };
    const OnClose = () => {
        startTransition(() => {
            SetState({
                IsOpen: false,
                IsEdit: false,
                UserParentId: UserId,
                UserName: "",
                UserPhoneNumber: "",
                UserEmail: "",
                UserJobTitle: "",
                UserPassword: "",
                UserSections: [],
                Residential: [],
                Commercial: []
            });
        });
    };

    // "Update" : "Create" , "Delete"
    const OnSubmit = async (e, Form, Type) => {
        e.preventDefault();
        const Fncs = {
            Create: CreateUser,
            Update: UpdateUser,
            Delete: DeleteUser
        };
        const SubUserBody = BodyHelper.SubUser(Form, Type);
        const { data } = await Fncs[Type](SubUserBody);
        if (data && !data?.error) {
            Toast("success", data.message);
            OnClose();
        }
    };
    return (
        <>
            <Box
                w={"100%"}
                px={{
                    base: 0,
                    md: "15%"
                }}
            >
                <Flex
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    dir={Rtl ? "rtl" : "ltr"}
                    flexDir={{
                        base: "column-reverse",
                        md: "row"
                    }}
                    gap={1}
                >
                    <Flex
                        alignItems={"center"}
                        color="white"
                        textTransform="uppercase"
                        display={{
                            base: "none",
                            md: "flex"
                        }}
                    >
                        <Badge
                            variant="solid"
                            colorScheme="blue"
                            h={"1.6rem"}
                            display={"flex"}
                            alignItems={"center"}
                        >
                            {Lang?.DASHBOARD_PAGE?.USERS}
                        </Badge>
                        <Badge
                            variant="solid"
                            colorScheme="cyan"
                            px={"5px"}
                            h={"1.6rem"}
                            display={"flex"}
                            alignItems={"center"}
                        >
                            {ProcessData?.length}
                        </Badge>
                    </Flex>
                    <UsersFilter
                        SetFilter={SetFilter}
                        Filter={Filter}
                        colorMode={colorMode}
                        Lang={Lang}
                        Rtl={Rtl}
                    />
                    <Flex gap={1}>
                        <Flex
                            alignItems={"center"}
                            color="white"
                            textTransform="uppercase"
                            display={{
                                base: "flex",
                                md: "none"
                            }}
                        >
                            <Badge variant="solid" colorScheme="blue">
                                {Lang?.DASHBOARD_PAGE?.USERS}
                            </Badge>
                            <Badge variant="solid" colorScheme="cyan" px={"5px"}>
                                {ProcessData?.length}
                            </Badge>
                        </Flex>
                        <IconButton
                            borderRadius={"50%"}
                            className="Shadow"
                            size={"sm"}
                            fontSize={"1.2rem"}
                            p={1}
                            bg={"blue.500"}
                            _hover={{ bg: "blue.600" }}
                            color={`${
                                ThemeColors.SecoendColor[
                                    colorMode === "dark" ? "#fff" : "red  !important"
                                ]
                            }`}
                            icon={<MdRefresh />}
                            onClick={() => RefetchData()}
                        />
                        <IconButton
                            borderRadius={"50%"}
                            className="Shadow"
                            size={"sm"}
                            fontSize={"1.2rem"}
                            p={1}
                            bg={"green.500"}
                            _hover={{ bg: "green.600" }}
                            color={`${
                                ThemeColors.SecoendColor[
                                    colorMode === "dark" ? "#fff" : "red  !important"
                                ]
                            }`}
                            icon={<FiUserPlus />}
                            onClick={() => OnChange("IsOpen", true)}
                        />
                    </Flex>
                </Flex>
                <Box>
                    <SubUserDataTable
                        IsLoading={IsLoading}
                        OnChange={OnChange}
                        Data={IsLoading ? [] : ProcessData}
                        Lang={Lang}
                    />
                </Box>
            </Box>
            <CreateOrUpdate
                OnClose={() => OnClose()}
                OnSubmit={OnSubmit}
                OnChange={OnChange}
                isLoading={State.IsEdit ? isUpdateLoading : isCreateLoading}
                State={State}
                Lang={Lang}
                Rtl={Rtl}
            />
            <DeleteModal
                OnSubmit={(e) => OnSubmit(e, State, "Delete")}
                IsOpen={State.IsDelete}
                OnClose={() => OnClose()}
                IsLoading={isDeleteLoading}
                Label={Lang?.PUBLIC?.DELETE_LABEL?.replaceAll("{{Name}}", State.UserName)}
                Message={Lang?.PUBLIC?.DELETE_MESSAGE?.replaceAll("{{Name}}", State.UserName)}
                Lang={Lang}
            />
        </>
    );
};

export default Users;
