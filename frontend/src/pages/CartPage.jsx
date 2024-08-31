import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { Message, PageTitle, ProductQuantity } from "../components";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";
import { DOMAIN } from "../constants";

export const CartPage = () => {
    const cart = useSelector((state) => state.cart);
    const { cartItems, itemsPrice } = cart;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onAddToCart = async (product, orderCount) => {
        dispatch(addToCart({ ...product, orderCount }));
    };

    const onRemoveFromCart = async (id) => {
        dispatch(removeFromCart(id));
    };

    const onCheckout = () => {
        navigate("/login?redirect=/shipping");
    };

    return (
        <>
            <PageTitle title={"Cart Products"}/>
            <Link className="btn btn-light my-3 " to="/">
                Go Back
            </Link>
            <Row>
                <Col md={8}>
                    <h1 className="mb-4">Shopping Cart</h1>
                    {cartItems?.length > 0 ? (
                        <ListGroup variant="flush">
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item._id}>
                                    <Row className="align-items-center">
                                        <Col md={2}>
                                            <Image
                                                src={`${DOMAIN}/${item.image}`}
                                                alt={item.name}
                                                fluid
                                                rounded
                                            />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/products/${item._id}`}>
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col md={2}>${item.price}</Col>
                                        <Col md={2}>
                                            <ProductQuantity
                                                product={item}
                                                onChange={(orderCount) =>
                                                    onAddToCart(
                                                        item,
                                                        orderCount
                                                    )
                                                }
                                            />
                                        </Col>
                                        <Col md={2}>
                                            <Button
                                                variant="light"
                                                onClick={() =>
                                                    onRemoveFromCart(item._id)
                                                }
                                            >
                                                <FaTrash />
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <Message>
                            Cart is empty
                        </Message>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>
                                    Subtotal (
                                    {cartItems.reduce(
                                        (a, i) => a + i.orderCount,
                                        0
                                    )}
                                    ) items
                                </h3>
                                ${itemsPrice}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    className="btn-block"
                                    disabled={cartItems.length === 0}
                                    onClick={onCheckout}
                                >
                                    Proceed To Checkout
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
