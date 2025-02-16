import { Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router";
import {
    ProductCard,
    Paginate,
    ProductCarousel,
    LoadingErrorWrapper,
    PageTitle,
} from "../components";
import {
    useGetProductsQuery,
    useGetTopProductsQuery,
} from "../store/productsApiSlice";

export const HomePage = () => {
    const { pageParam, keyword } = useParams();
    const { data, isLoading, error, isFetching } = useGetProductsQuery({
        pageParam,
        keyword,
    });
    const { products, pages, page } = data || {};
    const pathname = !keyword ? "" : `/search/${keyword}`;

    const {
        data: topProducts,
        isLoading: topLoading,
        error: topError,
    } = useGetTopProductsQuery();

    return (
        <>
            {!keyword && !topLoading && (
                <ProductCarousel products={topProducts} />
            )}
            <LoadingErrorWrapper
                isLoading={isLoading || isFetching}
                error={error || topError}
            >
                {!keyword ? (
                    <h1>Latest Products</h1>
                ) : (
                    <>
                        <PageTitle title={`Search for ${keyword}`}/>
                        <Link className="btn btn-light my-3 " to="/">
                            Go Back
                        </Link>
                        <h1>Search results</h1>
                    </>
                )}
                <Row>
                    {products?.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
                <Paginate pages={pages} page={page} pathname={pathname} />
            </LoadingErrorWrapper>
        </>
    );
};
