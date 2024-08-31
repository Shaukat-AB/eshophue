import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CheckoutSteps, FormWrapper } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { setShippingAddress } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ShippingPage = () => {
    const { shippingAddress: SA } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(SA?.address || "");
    const [city, setCity] = useState(SA?.city || "");
    const [postalCode, setPostalCode] = useState(SA?.postalCode || "");
    const [country, setCountry] = useState(SA?.country || "");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        if (!address || !city || !postalCode || !country) {
            toast.error("All  fields are required");
        } else {
            dispatch(
                setShippingAddress({ address, city, postalCode, country })
            );
            navigate("/payment");
        }
    };

    return (
        <FormWrapper>
            <CheckoutSteps step={2} />
            <h1>Shipping</h1>
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="address" className="my-3">
                    <Form.Label>Shipping Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="city" className="my-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="postalCode" className="my-3">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Postal Code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="country" className="my-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-2">
                    Continue
                </Button>
            </Form>
        </FormWrapper>
    );
};
