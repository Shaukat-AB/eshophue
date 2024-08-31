import { Header, Footer, PageTitle } from "../components";
import { ErrorPage } from "../pages";
import { Outlet } from "react-router-dom";
import { ScrollRestoration} from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

export const Root = ({ errorPage = false }) => {
    return (
        <>
            <Header />
            <main className="py-3">
                <Container>{!errorPage ? <Outlet /> : <ErrorPage />}</Container>
            </main>
            <Footer />
            <ToastContainer />
            <ScrollRestoration />
            <PageTitle />
        </>
    );
};
