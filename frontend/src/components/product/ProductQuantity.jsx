import { Form } from "react-bootstrap";

export const ProductQuantity = ({ product, onChange }) => {
    return (
        <Form.Control
            as="select"
            value={product.orderCount}
            onChange={(e) => onChange(Number(e.target.value))}
        >
            {[...Array(product.inStock).keys()].map((i) => (
                <option key={i + 1}>{i + 1}</option>
            ))}
        </Form.Control>
    );
};
