import Store from "../Store";
const Slice = Store.ApiSlice.injectEndpoints({
    endpoints: (build) => ({
        GetData: build.query({
            query: (params) => ({
                url: Store.Api.Data,
                method: "PATCH",
                body: params
            }),
            providesTags: ["Data"]
        }),
        GetInfo: build.query({
            query: ({ SectionId, CompoundId }) => ({
                url: `${Store.Api.Data}?SectionId=${SectionId}&CompoundId=${CompoundId}`,
                method: "GET",
            }),
            providesTags: ["Info-Data"]
        }),
        FindData: build.query({
            query: ({ SectionId, CompoundId }) => ({
                url: `${Store.Api.Data}/show?SectionId=${SectionId}&CompoundId=${CompoundId}`,
                method: "GET"
            }),
            providesTags: ["Data"]
        }),
        GetContacts: build.mutation({
            query: ({ DeveloperId, City, Section }) => ({
                url: `${Store.Api.Contact}?SearchBy=ContactDeveloperId&Search=${DeveloperId}&City=${City}&Section=${Section}`,
                method: "GET"
            }),
            providesTags: ["Contacts"]
        })
    }),
    overrideExisting: false
});

export const { 
    useGetDataQuery,
    useGetInfoQuery,
    useFindDataQuery, useGetContactsMutation } = Slice;
