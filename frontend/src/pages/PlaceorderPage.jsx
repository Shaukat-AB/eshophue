import { useEffect } from "react";
import { useNavigate } from "react-router";
import { CheckoutSteps, Spinner, Message, LineOrderItems } from "../components";
import { Button, Col, ListGroup, Row, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useCreateOrderItemMutation } from "../store/ordersApiSlice";
import { clearCartItems } from "../store/cartSlice";
import { toast } from "react-toastify";

export const PlaceorderPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [creatOrderItem, { isLoading, error }] = useCreateOrderItemMutation();
    const cart = useSelector((state) => state.cart);

    const onPlaceOrder = async () => {
        try {
            const res = await creatOrderItem({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/orders/${res._id}`);
        } catch (error) {
            toast.error(error?.data?.message || error?.status);
        }
    };

    useEffect(() => {
        if (!cart?.shippingAddress?.address) navigate("/shipping");
        else if (!cart?.paymentMethod) navigate("/payment");
    }, [cart.paymentMethod, cart.shippingAddress]);

    return (
        <>
            <CheckoutSteps step={4}/>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAddress.address},{" "}
                                {cart.shippingAddress.city},{" "}
                                {cart.shippingAddress.postalCode},{" "}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment method</h2>
                            <strong>{cart.paymentMethod}</strong>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order items</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>Your Cart Empty</Message>
                            ) : (
                                <LineOrderItems items={cart.cartItems} />
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && (
                                    <Message>
                                        {error.message || error?.status}
                                    </Message>
                                )}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    className="btn-block"
                                    disabled={cart?.cartItems?.length === 0}
                                    onClick={onPlaceOrder}
                                >
                                    Place Order
                                </Button>
                                {isLoading && <Spinner />}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
