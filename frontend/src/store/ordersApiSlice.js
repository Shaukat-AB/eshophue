import { apiSlice } from "./apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrderDetails: builder.query({
            query: (orderId) => ({ url: `/orders/${orderId}` }),
            keepUnusedDataFor: 5, // seconds
        }),
        getMyOrder: builder.query({
            query: () => ({ url: "/orders/myorders" }),
            keepUnusedDataFor: 5, // seconds
        }),
        getOrders: builder.query({
            query: () => ({ url: "/orders" }),
            keepUnusedDataFor: 5, // seconds
        }),
        createOrderItem: builder.mutation({
            query: (order) => ({
                url: "/orders",
                method: "POST",
                body: { ...order },
            }),
        }),
        payOrder: builder.mutation({
            query: (details) => ({
                url: `/create-checkout-session`,
                method: "POST",
                body: details,
            }),
        }),
        setPaid: builder.mutation({
            query: (orderId) => ({
                url: `/orders/${orderId}/pay`,
                method: "PUT",
            }),
        }),
        setDelivered: builder.mutation({
            query: (orderId) => ({
                url: `/orders/${orderId}/deliver`,
                method: "PUT",
            }),
        }),
    }),
});

export const {
    useGetOrdersQuery,
    useGetOrderDetailsQuery,
    useGetMyOrderQuery,
    useCreateOrderItemMutation,
    usePayOrderMutation,
    useSetPaidMutation,
    useSetDeliveredMutation,
} = orderApiSlice;
