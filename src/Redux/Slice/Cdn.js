import Store from "../Store";
const Slice = Store.ApiSlice.injectEndpoints({
    endpoints: (build) => ({
        GetCdnList: build.query({
            query: (body) => ({
                url: Store.Api.Cdn,
                method: "POST",
                body: body,
                cache: "no-store"
            }),
            invalidatesTags: ["Cdn"],
            // keepUnusedDataFor: 0
        }),
        File: build.mutation({
            query: (body) => ({
                url: `${Store.Api.Cdn}?T=${Date.now()}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: ["Cdn"]
        }),
        LoadFile: build.query({
            query: (body) => ({
                url: Store.Api.Cdn,
                method: "PATCH",
                body
            }),
            invalidatesTags: ["Cdn"]
        })
    }),
    overrideExisting: false
});

export const {
    // useGetCdnListMutation
    useGetCdnListQuery,
    useFileMutation,
    useLoadFileQuery
} = Slice;
