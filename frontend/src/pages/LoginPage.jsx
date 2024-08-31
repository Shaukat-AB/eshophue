import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FormWrapper, Spinner } from "../components";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../store/usersApiSlice";
import { setCredentials } from "../store/authSlice";
import { toast } from "react-toastify";

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);
    const redirect = useSearchParams("redirect")[0].get("redirect") || "/";

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.message || err?.data?.message || err.status);
        }
    };

    useEffect(() => {
        if (userInfo) navigate(redirect);
    }, [userInfo]);

    return (
        <FormWrapper>
            <h1>Sign In</h1>
            <Form onSubmit={onSubmit}>
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
                <Button
                    type="submit"
                    variant="primary"
                    className="mt-2"
                    disabled={isLoading}
                >
                    Sign In
                </Button>
                {isLoading && <Spinner />}
                <Row>
                    <Col>
                        Not registered?
                        <Link to={`/register?${redirect}`}>Register</Link>
                    </Col>
                </Row>
            </Form>
        </FormWrapper>
    );
};
