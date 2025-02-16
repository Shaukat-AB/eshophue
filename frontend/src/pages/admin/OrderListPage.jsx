import { Link } from "react-router";
import { LoadingErrorWrapper } from "../../components";
import { Table } from "react-bootstrap";
import { useGetOrdersQuery } from "../../store/ordersApiSlice";

export const OrderListPage = () => {
    const { data: orders, isLoading, error } = useGetOrdersQuery();

    return (
        <LoadingErrorWrapper isLoading={isLoading} error={error}>
            <h1>Orders</h1>
            <Table striped hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>User</th>
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
                            <td>{item.user && item.user.name}</td>
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
    );
};
