import { Link } from "react-router-dom";
import { DOMAIN } from "../../constants";
import { Col, ListGroup, Row, Image } from "react-bootstrap";

export const LineOrderItems = ({ items }) => {
    return (
        <ListGroup variant="flush">
            {items.map((item, index) => (
                <ListGroup.Item key={index}>
                    <Row>
                        <Col md={1}>
                            <Image
                                src={`${DOMAIN}/${item.image}`}
                                alt={item.name}
                                fluid
                                rounded
                            />
                        </Col>
                        <Col>
                            <Link to={`/products/${item._id}`}>
                                {item.name}
                            </Link>
                        </Col>
                        <Col md={4}>
                            {item.orderCount} x ${item.price} = $
                            {(item.price * item.orderCount).toFixed(2)}
                        </Col>
                    </Row>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};
