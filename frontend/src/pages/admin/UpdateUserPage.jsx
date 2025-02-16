import { Link, useNavigate, useParams } from "react-router";
import { Button, Form } from "react-bootstrap";
import {
    Spinner,
    FormWrapper,
    LoadingErrorWrapper,
} from "../../components";
import {
    useGetUserDetailsQuery,
    useUpdateUserDetailsMutation,
} from "../../store/usersApiSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const UpdateUserPage = () => {
    const { id: userId } = useParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const {
        data: user,
        isLoading,
        refetch,
        error,
    } = useGetUserDetailsQuery(userId);

    const [updateUser, { isLoading: updateUserLoading }] =
        useUpdateUserDetailsMutation();

    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const changedUser = {
                _id: userId,
                name,
                email,
                isAdmin,
            };
            const res = await updateUser(changedUser).unwrap();
            toast.success("User updated successfully");
            navigate("/admin/userlist");
        } catch (err) {
            toast.error(err?.data?.message || err?.status);
        }
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user]);

    return (
        <>
            <Link to="/admin/userList" className="btn btn-light my-3">
                Go Back
            </Link>
            <FormWrapper>
                <h1>Add user</h1>
                {updateUserLoading && <Spinner />}
                <LoadingErrorWrapper isLoading={isLoading} error={error}>
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
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="isAdmin" className="my-3">
                            <Form.Check
                                type="checkbox"
                                label="Admin Rights"
                                value={isAdmin}
                                onChange={() => setIsAdmin(!isAdmin)}
                                disabled={user?.isAdmin}
                            ></Form.Check>
                        </Form.Group>
                        <Button
                            type="submit"
                            variant="primary"
                            className="mt-2"
                            disabled={isLoading}
                        >
                            Submit
                        </Button>
                    </Form>
                </LoadingErrorWrapper>
            </FormWrapper>
        </>
    );
};
