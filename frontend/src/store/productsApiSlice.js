import { apiSlice } from "./apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ pageParam, keyword }) => ({
                url: "/products",
                params: { pageParam, keyword },
            }),
            providesTags: ["Products"],
            keepUnusedDataFor: 5, // seconds
        }),
        getTopProducts: builder.query({
            query: () => ({
                url: "/products/top",
            }),
            keepUnusedDataFor: 5, // seconds
        }),
        getProductById: builder.query({
            query: (id) => ({
                url: `/products/${id}`,
            }),
            keepUnusedDataFor: 5, // seconds
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: "/products",
                method: "POST",
            }),
            invalidatesTags: ["Product"],
        }),
        updateProduct: builder.mutation({
            query: (product) => ({
                url: `/products/${product._id}`,
                method: "PUT",
                body: product,
            }),
            invalidatesTags: ["Products"],
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: "/upload",
                method: "POST",
                body: data,
            }),
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `/products/${productId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"],
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `/products/${data.productId}/reviews`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Product"],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetTopProductsQuery,
    useGetProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation,
    useCreateReviewMutation,
} = productApiSlice;
