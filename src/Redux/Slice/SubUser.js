import Store from "../Store";
const Slice = Store.ApiSlice.injectEndpoints({
    endpoints: (build) => ({
        GetSubUser: build.query({
            query: (params) => {
                const processUrl = new URLSearchParams(params);
                return {
                    url: `${Store.Api.SubUser}?${processUrl.toString()}`,
                    method: "GET"
                };
            },
            providesTags: ["SubUser"]
        }),
        CreateSubUser: build.mutation({
            query: (params) => ({
                url: Store.Api.SubUser,
                method: "POST",
                body: params
            }),
            invalidatesTags: (result) => {
                if (result) return ["SubUser"];
            }
        }),
        UpdateSubUser: build.mutation({
            query: ({ UserId, body }) => ({
                url: `${Store.Api.SubUser}?UserId=${UserId}`,
                method: "PUT",
                body
            }),
            invalidatesTags: (result) => {
                if (result) return ["SubUser"];
            }
        }),
        DeleteSubUser: build.mutation({
            query: ({ UserId }) => ({
                url: `${Store.Api.SubUser}?UserId=${UserId}`,
                method: "DELETE"
            }),
            invalidatesTags: (result) => {
                if (result) return ["SubUser"];
            }
        }),
        UpdateUserCompanies: build.mutation({
            query: (body) => ({
                url: `${Store.Api.SubUser}/settings`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["User"]
        }),
    }),
    overrideExisting: false
});

export const {
    useGetSubUserQuery,
    useCreateSubUserMutation,
    useUpdateSubUserMutation,
    useDeleteSubUserMutation,
    useUpdateUserCompaniesMutation
} = Slice;
