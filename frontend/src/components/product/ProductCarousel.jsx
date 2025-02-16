import { Link } from "react-router";
import { Carousel, Image } from "react-bootstrap";
import { DOMAIN } from "../../constants";

export const ProductCarousel = ({ products }) => {
    return (
        <Carousel pause="hover" className="bg-primary mb-5">
            {products?.map((product) => (
                <Carousel.Item key={product._id}>
                    <Link to={`/products/${product._id}`}>
                        <Image
                            className="product-carousel-img"
                            src={`${DOMAIN}/${product.image}`}
                        />
                    </Link>
                    <Carousel.Caption className="bg-dark bg-opacity-50 start-0 w-100">
                        <h4>
                            {product.name} (${product.price})
                        </h4>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};
