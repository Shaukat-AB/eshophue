import { useState } from "react";
import { Link } from "react-router";
import { Spinner, LoadingErrorWrapper, PageTitle } from "../components";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "../store/usersApiSlice";
import { useGetMyOrderQuery } from "../store/ordersApiSlice";
import { setCredentials } from "../store/authSlice";
import { toast } from "react-toastify";

export const ProfilePage = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const [name, setName] = useState(userInfo?.name || "");
    const [email, setEmail] = useState(userInfo?.email || "");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const dispatch = useDispatch();

    const [updateProfile, { isLoading }] = useProfileMutation();
    const {
        data: orders,
        isLoading: ordersIsLoading,
        error,
    } = useGetMyOrderQuery();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPass) {
            toast.error("Passwords do not match");
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password,
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                toast.success("Profile updated successful");
            } catch (err) {
                toast.error(err?.data?.message || err.status);
            }
        }
    };

    return (
        <Row>
            <PageTitle title={"User profile"}/>
            <Col md={3}>
                <h2>User Profile</h2>
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
                        Update profile
                    </Button>
                    {isLoading && <Spinner />}
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                <LoadingErrorWrapper isLoading={ordersIsLoading} error={error}>
                    <Table striped hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.map((item) => (
                                <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>{item.createdAt.substring(0, 10)}</td>
                                    <td>{item.totalPrice}</td>
                                    <td>
                                        {item.isPaid
                                            ? item.paidAt.substring(0, 10)
                                            : "Not paid"}
                                    </td>
                                    <td>
                                        {item.isDelivered
                                            ? item.deliveredAt.substring(0, 10)
                                            : "Not delivered"}
                                    </td>
                                    <td>
                                        <Link
                                            className="btn-block"
                                            to={`/orders/${item._id}`}
                                        >
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </LoadingErrorWrapper>
            </Col>
        </Row>
    );
};
