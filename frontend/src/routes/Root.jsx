import { Header, Footer } from "../components";
import { ErrorPage } from "../pages";
import { Outlet } from "react-router";
import { ScrollRestoration } from "react-router";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { usePageTitle } from "../hooks/usePageTitle";

export const Root = ({ errorPage = false }) => {
    const pageTitle = usePageTitle();

    return (
        <>
            <Header />
            <main className="py-3">
                <Container>{!errorPage ? <Outlet /> : <ErrorPage />}</Container>
            </main>
            <Footer />
            <ToastContainer />
            <ScrollRestoration />
        </>
    );
};
