import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormWrapper, CheckoutSteps } from "../components";
import { Button, Col, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

export const PaymentPage = () => {
    const [method, setMethod] = useState("Stripe");

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const navigate = useNavigate();

    useEffect(() => {
        if (!shippingAddress) navigate("/shipping");
    }, [shippingAddress]);

    const onSubmit = (e) => {
        e.preventDefault();
        navigate("/placeorder");
    };

    return (
        <FormWrapper>
            <CheckoutSteps step={3}/>
            <h1>Payment Method</h1>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            className="my-2"
                            label="Stripe"
                            id="stripe"
                            name="payment"
                            value={method}
                            checked
                            onChange={(e) => setMethod(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Button type="submit" className="btn-primary">
                    Continue
                </Button>
            </Form>
        </FormWrapper>
    );
};