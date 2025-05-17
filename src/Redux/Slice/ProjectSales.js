import Store from "../Store";
const Slice = Store.ApiSlice.injectEndpoints({
    endpoints: (build) => ({
        GetDev: build.query({
            query: () => {
                return {
                    url: `${Store.Api.ProjectSales}/devs`,
                    method: "GET"
                };
            },
            providesTags: ["Sales-Devs"]
        }),
        GetDevDetails: build.query({
            query: ({ DeveloperId }) => {
                return {
                    url: `${Store.Api.ProjectSales}/devs/${DeveloperId}`,
                    method: "GET"
                };
            },
            providesTags: ["Sales-Devs-Details"]
        }),
        GetSales: build.query({
            query: (params) => {
                const processUrl = new URLSearchParams(params);
                return {
                    url: `${Store.Api.ProjectSales}?${processUrl.toString()}&UType=Due`,
                    method: "GET"
                };
            },
            providesTags: ["Sales"]
        }),
        GetCollectedSales: build.query({
            query: (params) => {
                const processUrl = new URLSearchParams(params);
                return {
                    url: `${Store.Api.ProjectSales}?${processUrl.toString()}&UType=Collected`,
                    method: "GET"
                };
            },
            providesTags: ["CollectedSales"]
        }),
        CreateSales: build.mutation({
            query: (body) => ({
                url: Store.Api.ProjectSales,
                method: "POST",
                body
            }),
            invalidatesTags: (result) => {
                if (result) return ["Sales"];
            }
        }),
        UpdateSales: build.mutation({
            query: ({ SalesId, body }) => ({
                url: `${Store.Api.ProjectSales}?SalesId=${SalesId}`,
                method: "PUT",
                body
            }),
            invalidatesTags: (result) => {
                if (result) return ["Sales"];
            }
        }),
        DeleteSales: build.mutation({
            query: ({ SalesId }) => ({
                url: `${Store.Api.ProjectSales}?SalesId=${SalesId}`,
                method: "DELETE"
            }),
            invalidatesTags: (result) => {
                if (result) return ["Sales"];
            }
        })
    }),
    overrideExisting: false
});

export const {
    useGetDevQuery,
    useGetDevDetailsQuery,
    useGetSalesQuery,
    useGetCollectedSalesQuery,
    useCreateSalesMutation,
    useUpdateSalesMutation,
    useDeleteSalesMutation
} = Slice;
