import { Nav } from "react-bootstrap";
import { Link } from "react-router";

export const CheckoutSteps = ({ step }) => {

    return (
        <Nav className="justify-content-center mb-4">
            <Nav.Item>
                <Nav.Link as={Link} to="/login" disabled={step <= 1}>
                    Sign In
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/shipping" disabled={step <= 2}>
                    Shipping
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/payment" disabled={step <= 3}>
                    Payment
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/placeorder" disabled={step <= 4}>
                    Place Order
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
};