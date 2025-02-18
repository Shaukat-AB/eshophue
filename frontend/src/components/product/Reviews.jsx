import { ListGroup } from "react-bootstrap";
import { Ratings, Message } from "..";
import { ReviewForm } from "../form/ReviewForm";
import { toast } from "react-toastify";
import { useCreateReviewMutation } from "../../store/productsApiSlice";

export const Reviews = ({ product, refetch = () => null }) => {
    const [createReview, { isLoading }] = useCreateReviewMutation();

    const onCreateReview = async (review) => {
        try {
            const res = await createReview(review).unwrap();
            refetch();
            toast.success("Review added successfully");
        } catch (err) {
            toast.error(err?.data?.message || err?.status);
        }
    };

    return (
        <section className="justify-md-start mt-4">
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
                <ReviewForm
                    isLoading={isLoading}
                    product={product}
                    createReview={onCreateReview}
                />
            </ListGroup>
        </section>
    );
};
