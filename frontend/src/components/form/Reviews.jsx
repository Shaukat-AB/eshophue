import { Link } from "react-router-dom";
import { Form, ListGroup, Button } from "react-bootstrap";
import { Ratings, Spinner, Message, FormWrapper } from "..";
import { useSelector } from "react-redux";
import { useState } from "react";

export const Reviews = ({ product, isLoading, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const { userInfo } = useSelector((state) => state.auth);

    const submitHandler = (e) => {
        e.preventDefault();
        const review = { productId: product._id, rating, comment };
        onSubmit(review);
        setRating(0);
        setComment("");
    };

    return (
        <FormWrapper className="justify-md-start mt-4">
            <h2>Reviews</h2>
            {product.reviews.length === 0 && <Message>No reviews</Message>}
            <ListGroup variant="flush">
                {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                        <strong style={{ marginRight: "0.5em" }}>
                            {review.name}
                        </strong>
                        <Ratings
                            value={review.rating}
                            count={product.reviewsCount}
                        />
                        <p>
                            <small className="text-muted">
                                {review.createdAt?.substring(0, 10)}
                            </small>
                        </p>
                        <p>{review.comment}</p>
                    </ListGroup.Item>
                ))}
                <ListGroup.Item>
                    <h2>Write a review</h2>
                    {isLoading && <Spinner />}
                    {!userInfo ? (
                        <Message>
                            <Link to="/login">Sign in</Link> to write review
                        </Message>
                    ) : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="rating">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={rating}
                                    onChange={(e) =>
                                        setRating(Number(e.target.value))
                                    }
                                >
                                    <option value="">Select...</option>
                                    <option value="1">1 - Bad</option>
                                    <option value="2">2 - Average</option>
                                    <option value="3">3 - Good</option>
                                    <option value="4">4 - Very Good</option>
                                    <option value="5">5 - Excellent</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="comment">
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    row="3"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={isLoading}
                            >
                                Submit
                            </Button>
                        </Form>
                    )}
                </ListGroup.Item>
            </ListGroup>
        </FormWrapper>
    );
};
