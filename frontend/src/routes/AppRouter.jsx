import { AppLayout } from "../AppLayout";
import {
    ErrorPage,
    AddProductPage,
    CartPage,
    HomePage,
    LoginPage,
    OrderListPage,
    OrderPage,
    PaymentPage,
    PlaceorderPage,
    ProductListPage,
    ProductPage,
    ProfilePage,
    RegisterPage,
    ShippingPage,
    UpdateUserPage,
    UserListPage,
    SearchPage,
} from "../pages";
import { AdminRoute } from "./AdminRoute";
import { PrivateRoute } from "./PrivateRoute";
import {
    createBrowserRouter,
    RouterProvider,
    ScrollRestoration,
} from "react-router";

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomePage index />,
            },
            {
                path: "/page/:pageParam",
                element: <HomePage />,
            },
            {
                path: "/search/:keyword",
                element: <SearchPage />,
            },
            {
                path: "/search/:keyword/page/:pageParam",
                element: <SearchPage />,
            },
            {
                path: "/products/:id",
                element: <ProductPage />,
            },
            {
                path: "/cart",
                element: <CartPage />,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/register",
                element: <RegisterPage />,
            },
            {
                element: <PrivateRoute />,
                children: [
                    {
                        path: "/shipping",
                        element: <ShippingPage />,
                    },
                    {
                        path: "/payment",
                        element: <PaymentPage />,
                    },
                    {
                        path: "/placeorder",
                        element: <PlaceorderPage />,
                    },
                    {
                        path: "/orders/:id",
                        element: <OrderPage />,
                    },
                    {
                        path: "/profile",
                        element: <ProfilePage />,
                    },
                ],
            },
            {
                element: <AdminRoute />,
                children: [
                    {
                        path: "/admin/orderlist",
                        element: <OrderListPage />,
                    },
                    {
                        path: "/admin/userlist",
                        element: <UserListPage />,
                    },
                    {
                        path: "/admin/userlist/page/:pageParam",
                        element: <UserListPage />,
                    },
                    {
                        path: "/admin/productlist",
                        element: <ProductListPage />,
                    },
                    {
                        path: "/admin/productlist/page/:pageParam",
                        element: <ProductListPage />,
                    },
                    {
                        path: "/admin/products/:id/add",
                        element: <AddProductPage />,
                    },
                    {
                        path: "/admin/products/:id/edit",
                        element: <AddProductPage />,
                    },
                    {
                        path: "/admin/users/:id/edit",
                        element: <UpdateUserPage />,
                    },
                ],
            },
        ],
    },
]);

export const AppRouter = () => {
    return (
        <RouterProvider router={router}>
            <ScrollRestoration />
        </RouterProvider>
    );
};
