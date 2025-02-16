import {
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
} from "./pages";
import { Root, PrivateRoute, AdminRoute } from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router";

const App = () => {
    const router = createBrowserRouter([
        {
            element: <Root />,
            errorElement: <Root errorPage={true} />,
            children: [
                {
                    path: "/",
                    element: <HomePage index />,
                },
                {
                    path: "/search/:keyword",
                    element: <HomePage />,
                },
                {
                    path: "/search/:keyword/page/:pageParam",
                    element: <HomePage />,
                },
                {
                    path: "/page/:pageParam",
                    element: <HomePage />,
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

    return <RouterProvider router={router} />;
};

export default App;
