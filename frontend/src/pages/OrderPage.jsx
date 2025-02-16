import { useEffect } from "react";
import { useParams } from "react-router";
import {
    Spinner,
    Message,
    LoadingErrorWrapper,
    LineOrderItems,
} from "../components";
import { Button, Col, ListGroup, Row, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useSetDeliveredMutation,
} from "../store/ordersApiSlice";
import { toast } from "react-toastify";

export const OrderPage = () => {
    const { id: orderId } = useParams();
    const {
        data: order,
        isLoading,
        refetch,
        error,
    } = useGetOrderDetailsQuery(orderId);

    const { userInfo } = useSelector((state) => state.auth);

    const [payOrder, { isLoading: payLoading }] = usePayOrderMutation();

    const [setDelivered, { isLoading: deliverLoading }] =
        useSetDeliveredMutation();

    const onDeliver = async () => {
        try {
            await setDelivered(orderId).unwrap();
            refetch();
            toast.success("order delivered");
        } catch (err) {
            toast.error(err?.data?.message || err.status);
        }
    };
    const onPayOrder = async () => {
        try {
            const res = await payOrder({ ...order, orderId }).unwrap();
            window.location.href = res.url;
        } catch (err) {
            toast.error(err?.data?.message || err?.status);
        }
    };

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get("canceled")) {
            toast.info("Order canceled -- checkout when you're ready.");
        }
    }, [orderId]);

    return (
        <LoadingErrorWrapper isLoading={isLoading} error={error}>
            <h1>Order {order?._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong>
                                {order?.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>
                                {order?.user.email}
                            </p>
                            <p>
                                <strong>Address: </strong>{" "}
                                {order?.shippingAddress.address},{" "}
                                {order?.shippingAddress.city},{" "}
                                {order?.shippingAddress.postalCode},{" "}
                                {order?.shippingAddress.country}
                            </p>
                            {order?.isDelivered ? (
                                <Message>
                                    Delivered on {order?.deliveredAt}
                                </Message>
                            ) : (
                                <Message variant="danger">
                                    Not delivered
                                </Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment</h2>
                            <p>
                                <strong>Method: </strong>
                                {order?.paymentMethod}
                            </p>
                            {order?.isPaid ? (
                                <Message>Paid on {order?.paidAt}</Message>
                            ) : (
                                <Message variant="danger">Not paid</Message>
                            )}
                        </ListGroup.Item>
                        <LineOrderItems items={order?.orderItems} />
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
                                    <Col>${order?.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${order?.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${order?.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${order?.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && (
                                    <Message>{error || error?.status}</Message>
                                )}
                            </ListGroup.Item>

                            {!order?.isPaid && !userInfo?.isAdmin && (
                                <ListGroup.Item>
                                    <Button
                                        className="btn-block"
                                        disabled={
                                            order?.orderItems?.length === 0 ||
                                            payLoading ||
                                            setPiadLoading
                                        }
                                        onClick={onPayOrder}
                                    >
                                        Pay Order
                                    </Button>
                                    {(isLoading ||
                                        setPiadLoading ||
                                        payLoading) && <Spinner />}
                                </ListGroup.Item>
                            )}
                            {deliverLoading && <Spinner />}
                            {userInfo &&
                                userInfo.isAdmin &&
                                order?.isPaid &&
                                !order?.isDelivered && (
                                    <ListGroup.Item>
                                        <Button
                                            className="btn btn-block"
                                            onClick={onDeliver}
                                            disabled={deliverLoading}
                                        >
                                            Mark as delivered
                                        </Button>
                                    </ListGroup.Item>
                                )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </LoadingErrorWrapper>
    );
};
