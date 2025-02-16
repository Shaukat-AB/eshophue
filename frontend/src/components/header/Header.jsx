import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router";
import { Search } from "./Search";
import Logo from "../../assets/images/eshophue-logo.png";
import { UserDropdown } from "./UserDropdown";
import { ShoppingCartLink } from "./ShoppingCartLink";

export const Header = () => {
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img className="logo" src={Logo} alt="EShophue" />{" "}
                        EShophue
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className="ms-auto">
                            <Search />
                            <ShoppingCartLink />
                            <UserDropdown />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};
