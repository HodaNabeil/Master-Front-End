import Store from "../Store";
const AuthApiMethods = [
  {
    Name: "Login",
    Link: "/login",
  },
  {
    Name: "Register",
    Link: "/register",
  },
  {
    Name: "Forget",
    Link: "/pass/forget",
  },
  {
    Name: "Check",
    Link: "/pass/check",
  },
  {
    Name: "Reset",
    Link: "/pass/reset",
  },
  {
    Name: "UpdateUser",
    Link: "/update",
  },
];
const HandleLinks = (build) => {
  const DataToReturn = {};
  AuthApiMethods?.map((Route) => {
    DataToReturn[Route.Name] = build.mutation({
      query: (body) => ({
        url: Store.Api.Auth + Route.Link,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Auth"],
    });
  });
  return DataToReturn;
};
const Slice = Store.ApiSlice.injectEndpoints({
  endpoints: (build) => ({
    ...HandleLinks(build),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgetMutation,
  useCheckMutation,
  useResetMutation,
  useUpdateUserMutation,
} = Slice;
