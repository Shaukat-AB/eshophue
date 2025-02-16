import { Header, Footer } from "./components";
import { Outlet } from "react-router";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { usePageTitle } from "./hooks/usePageTitle";

const App = () => {
    const pageTitle = usePageTitle();

    return (
        <>
            <Header />
            <main className="py-3">
                <Container>
                    <Outlet />
                </Container>
            </main>
            <Footer />
            <ToastContainer />
        </>
    );
};

export default App;
