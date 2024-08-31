import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Ratings } from "./Ratings";
import { DOMAIN } from "../constants";

export const ProductCard = ({ product }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Link className="product-img-link" to={`/products/${product._id}`}>
                <Card.Img src={`${DOMAIN}/${product.image}`} variant="top" />
            </Link>
            <Card.Body>
                <Link to={`/products/${product._id}`}>
                    <Card.Title className="product-title" as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <Ratings
                        value={product.rating}
                        count={product.reviewsCount}
                    />
                </Card.Text>
                <Card.Text as="h3">
                    ${String(product.price).split(".")[0]}.
                    <small className="text-muted fs-5">
                        {String(product.price).split(".")[1] || "00"}
                    </small>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};
