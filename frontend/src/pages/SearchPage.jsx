import { Row, Col } from "react-bootstrap";
import { Link, useSearchParams } from "react-router";
import { ProductCard, Paginate, LoadingErrorWrapper } from "../components";
import { useGetProductsQuery } from "../store/productsApiSlice";

export const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const pageParam = searchParams.get("page");
    const keyword = searchParams.get("q");
    const { data, isLoading, error, isFetching } = useGetProductsQuery({
        pageParam,
        keyword,
    });
    const { products, pages, page } = data || {};

    return (
        <LoadingErrorWrapper isLoading={isLoading || isFetching} error={error}>
            <Link className="btn btn-light my-3 " to="/">
                Go Back
            </Link>
            <h1>Search results</h1>
            <Row>
                {products?.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
            <Paginate pages={pages} page={page} setParams={setSearchParams} />
        </LoadingErrorWrapper>
    );
};
