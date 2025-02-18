import { Link, useParams, useSearchParams } from "react-router";
import { Row, Col, Button, Table } from "react-bootstrap";
import { Spinner, Paginate, LoadingErrorWrapper } from "../../components";
import {
    useGetProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
} from "../../store/productsApiSlice";
import { toast } from "react-toastify";
import { EditIcon, TrashIcon } from "../../lib";

export const ProductListPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const pageParam = searchParams.get("page");
    const { data, isLoading, error, refetch, isFetching } = useGetProductsQuery(
        { pageParam }
    );
    const { products, pages, page } = data || {};
    const pathname = "/admin/productlist";

    const [createProduct, { isLoading: createProductLoading }] =
        useCreateProductMutation();

    const [deleteProduct, { isLoading: deleteProductLoading }] =
        useDeleteProductMutation();

    const onProductDelete = async (productId) => {
        if (window.confirm("confrim deleting product")) {
            try {
                await deleteProduct(productId).unwrap();
                toast.success("Product deleted successfully");
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.status);
            }
        }
    };

    const onCreateProduct = async () => {
        if (window.confirm("confrim creating new product")) {
            try {
                await createProduct().unwrap();
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.status);
            }
        }
    };

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-end">
                    <Button
                        className="btn-sm m-3"
                        onClick={onCreateProduct}
                        disabled={createProductLoading}
                    >
                        <EditIcon /> Create Product
                    </Button>
                </Col>
            </Row>
            {(createProductLoading || deleteProductLoading) && <Spinner />}
            <LoadingErrorWrapper
                isLoading={isLoading || isFetching}
                error={error}
            >
                <Table striped hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <Link
                                        className="btn-sm mx-4"
                                        to={`/admin/products/${product._id}/edit`}
                                    >
                                        <EditIcon />
                                    </Link>
                                    <Button
                                        variant="danger"
                                        className="btn-sm"
                                        onClick={() =>
                                            onProductDelete(product._id)
                                        }
                                        disabled={deleteProductLoading}
                                    >
                                        <TrashIcon />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate pages={pages} page={page} pathname={pathname} setParams={setSearchParams} />
            </LoadingErrorWrapper>
        </>
    );
};
