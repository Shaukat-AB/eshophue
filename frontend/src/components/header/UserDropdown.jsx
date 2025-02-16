import { NavDropdown, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../store/usersApiSlice";
import { logout } from "../../store/authSlice";
import { clearCartItems } from "../../store/cartSlice";
import { toast } from "react-toastify";
import { UserIcon } from "../../lib";

export const UserDropdown = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [logoutApi] = useLogoutMutation();
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

    return userInfo ? (
        <NavDropdown title={userInfo.name} id="username">
            <NavDropdown.Item as={NavLink} to="/profile">
                Profile
            </NavDropdown.Item>
            {userInfo.isAdmin && (
                <>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={NavLink} to="/admin/productlist">
                        Product List
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/admin/userlist">
                        User List
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/admin/orderlist">
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
            <UserIcon /> Sign In
        </Nav.Link>
    );
};
