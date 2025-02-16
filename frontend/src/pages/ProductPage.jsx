import { Link, useNavigate, useParams } from "react-router";
import { ListGroup, Row, Col, Image, Card, Button } from "react-bootstrap";
import {
    Ratings,
    ProductQuantity,
    Reviews,
    LoadingErrorWrapper,
    PageTitle,
} from "../components";
import {
    useGetProductByIdQuery,
    useCreateReviewMutation,
} from "../store/productsApiSlice";
import { addToCart } from "../store/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { DOMAIN } from "../constants";

export const ProductPage = () => {
    const { id: productId } = useParams();
    const {
        data: product,
        isLoading,
        error,
        refetch,
    } = useGetProductByIdQuery(productId);

    const [orderCount, setOrderCount] = useState(1);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [createReview, { isLoading: createRevLoading }] =
        useCreateReviewMutation();

    const onAddToCart = () => {
        dispatch(addToCart({ ...product, orderCount }));
        navigate("/cart");
    };

    const onSubmit = async (review) => {
        try {
            const res = await createReview(review).unwrap();
            refetch();
            toast.success("Review added successfully");
        } catch (err) {
            toast.error(err?.data?.message || err?.status);
        }
    };

    return (
        <LoadingErrorWrapper isLoading={isLoading} error={error}>
            <PageTitle title={product?.name} />
            <Link className="btn btn-light my-3 " to="/">
                Go Back
            </Link>
            <Row>
                <Col md={5}>
                    <Image
                        src={`${DOMAIN}/${product?.image}`}
                        alt={product?.name}
                        fluid
                    />
                </Col>
                <Col md={4}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product?.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Ratings
                                value={product?.rating}
                                count={product?.reviewsCount}
                            />
                        </ListGroup.Item>
                        <ListGroup.Item className="text-muted">
                            Description: {product?.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product?.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        <strong>
                                            {product?.inStock > 0
                                                ? "In Stock"
                                                : "Out Of Stock"}
                                        </strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {product?.inStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Order Count</Col>
                                        <Col>
                                            <ProductQuantity
                                                product={{
                                                    ...product,
                                                    orderCount,
                                                }}
                                                onChange={setOrderCount}
                                            />
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Button
                                    className="btn-block"
                                    disabled={product?.inStock === 0}
                                    onClick={onAddToCart}
                                >
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Reviews
                product={product}
                isLoading={createRevLoading}
                onSubmit={onSubmit}
            />
        </LoadingErrorWrapper>
    );
};