import Store from "../Store";
const Slice = Store.ApiSlice.injectEndpoints({
    endpoints: (build) => ({
        GetOrCreateSession: build.query({
            query: (params) => ({
                url: Store.Api.Session,
                method: "POST",
                body: params
            }),
            providesTags: ["Session"]
        }),
        DeleteSession: build.mutation({
            query: (params) => ({
                url: Store.Api.Session,
                method: "DELETE",
                body: params
            }),
            invalidatesTags: (result) => {
                if (result) return ["Session"];
            }
        }),
        SendMessage: build.mutation({
            query: ({ body, method }) => ({
                url: Store.Api.Message,
                method,
                body
            }),
            invalidatesTags: ["Message"]
        })
    }),
    overrideExisting: false
});

export const { useGetOrCreateSessionQuery, useDeleteSessionMutation, useSendMessageMutation } =
    Slice;
