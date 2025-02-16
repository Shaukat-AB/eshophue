import { ShoppingCartIcon } from "../../lib";
import { NavLink } from "react-router";
import { Nav, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";

export const ShoppingCartLink = () => {
    const { cartItems } = useSelector((state) => state.cart);

    return (
        <Nav.Link as={NavLink} to="/cart">
            <ShoppingCartIcon /> Cart
            {cartItems.length > 0 && (
                <Badge pill bg="success" className="mx-2">
                    {cartItems.reduce((a, i) => a + i.orderCount, 0)}
                </Badge>
            )}
        </Nav.Link>
    );
};
