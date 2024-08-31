import { Link, useParams } from "react-router-dom";
import { Row, Col, Button, Table } from "react-bootstrap";
import { Spinner, Paginate, LoadingErrorWrapper } from "../../components";
import {
    useGetUsersQuery,
    useDeleteUserMutation,
} from "../../store/usersApiSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

export const UserListPage = () => {
    const { pageParam } = useParams();
    const { data, isLoading, error, refetch, isFetching } =
        useGetUsersQuery(pageParam);
    const { users, pages, page } = data || {};
    const pathname = "/admin/userlist";

    const [deleteUser, { isLoading: deleteUserLoading }] =
        useDeleteUserMutation();

    const onUserDelete = async (userId) => {
        if (window.confirm("confrim deleting user")) {
            try {
                await deleteUser(userId).unwrap();
                refetch();
                toast.success("User deleted successfully");
            } catch (err) {
                toast.error(err?.data?.message || err.status);
            }
        }
    };

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Users</h1>
                </Col>
            </Row>
            {deleteUserLoading && <Spinner />}
            <LoadingErrorWrapper
                isLoading={isLoading || isFetching}
                error={error}
            >
                <Table striped hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>is Admin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? "Yes" : "No"}</td>
                                <td>
                                    <Link
                                        className="btn-sm mx-4"
                                        to={
                                            !deleteUserLoading &&
                                            `/admin/users/${user._id}/edit`
                                        }
                                    >
                                        <FaEdit />
                                    </Link>
                                    <Button
                                        variant="danger"
                                        className="btn-sm"
                                        onClick={() => onUserDelete(user._id)}
                                        disabled={
                                            deleteUserLoading || user.isAdmin
                                        }
                                    >
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate pages={pages} page={page} pathname={pathname} />
            </LoadingErrorWrapper>
        </>
    );
};
