import { apiSlice } from "./apiSlice";

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "/users/login",
                method: "POST",
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/users/logout",
                method: "POST",
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: "/users",
                method: "POST",
                body: data,
            }),
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: "/users/profile",
                method: "PUT",
                body: data,
            }),
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: "DELETE",
            }),
        }),
        getUsers: builder.query({
            query: (pageParam) => ({ url: "/users", params: { pageParam } }),
            providesTags: ["Users"],
            keepUnusedDataFor: 5, // seconds
        }),
        getUserDetails: builder.query({
            query: (userId) => ({ url: `/users/${userId}` }),
            providesTags: ["Users"],
            keepUnusedDataFor: 5, // seconds
        }),
        updateUserDetails: builder.mutation({
            query: (data) => ({
                url: `/users/${data._id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useProfileMutation,
    useDeleteUserMutation,
    useGetUsersQuery,
    useGetUserDetailsQuery,
    useUpdateUserDetailsMutation,
} = usersApiSlice;
