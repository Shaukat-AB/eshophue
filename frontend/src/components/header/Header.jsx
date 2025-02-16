import {
    Navbar,
    Nav,
    Container,
    Badge,
    NavDropdown,
    Button,
} from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../store/usersApiSlice";
import { logout } from "../../store/authSlice";
import { clearCartItems } from "../../store/cartSlice";
import { toast } from "react-toastify";
import { Search } from "./Search";
import Logo from "../../assets/images/eshophue-logo.png";

export const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);
    const [logoutApi] = useLogoutMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onLogout = async () => {
        try {
            await logoutApi().unwrap();
            dispatch(logout());
            dispatch(clearCartItems());
            navigate("/");
        } catch (error) {
            toast.error(error?.message || error.status);
        }
    };

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img className="logo" src={Logo} alt="EShophue" />
                        {" "}EShophue
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className="ms-auto">
                            <Search />
                            <Nav.Link as={NavLink} to="/cart">
                                <FaShoppingCart /> Cart
                                {cartItems.length > 0 && (
                                    <Badge pill bg="success" className="mx-2">
                                        {cartItems.reduce(
                                            (a, i) => a + i.orderCount,
                                            0
                                        )}
                                    </Badge>
                                )}
                            </Nav.Link>
                            {userInfo ? (
                                <NavDropdown
                                    title={userInfo.name}
                                    id="username"
                                >
                                    <NavDropdown.Item
                                        as={NavLink}
                                        to="/profile"
                                    >
                                        Profile
                                    </NavDropdown.Item>
                                    {userInfo.isAdmin && (
                                        <>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item
                                                as={NavLink}
                                                to="/admin/productlist"
                                            >
                                                Product List
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={NavLink}
                                                to="/admin/userlist"
                                            >
                                                User List
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                as={NavLink}
                                                to="/admin/orderlist"
                                            >
                                                Order List
                                            </NavDropdown.Item>
                                        </>
                                    )}
                                    <NavDropdown.Divider />
                                    <Button
                                        as={Button}
                                        variant="light"
                                        className="w-100 rounded-0"
                                        onClick={onLogout}
                                    >
                                        Logout
                                    </Button>
                                </NavDropdown>
                            ) : (
                                <Nav.Link as={NavLink} to="/login">
                                    <FaUser /> Sign In
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};
