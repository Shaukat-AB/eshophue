import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FormWrapper, Spinner } from "../components";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../store/usersApiSlice";
import { setCredentials } from "../store/authSlice";
import { toast } from "react-toastify";

export const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPass) {
            toast.error("Passwords do not match");
        } else {
            try {
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate("/");
            } catch (err) {
                toast.error(err?.message || err?.data?.message || err.status);
            }
        }
    };

    useEffect(() => {
        if (userInfo) navigate("/");
    }, [userInfo]);

    return (
        <FormWrapper>
            <h1>Sign Up</h1>
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="name" className="my-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="email" className="my-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="password" className="my-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="configPass" className="my-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button
                    type="submit"
                    variant="primary"
                    className="mt-2"
                    disabled={isLoading}
                >
                    Sign Up
                </Button>
                {isLoading && <Spinner />}
                <Row>
                    <Col>
                        Already registered?
                        <Link to={"/login"}>Login</Link>
                    </Col>
                </Row>
            </Form>
        </FormWrapper>
    );
};
