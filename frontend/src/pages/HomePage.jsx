import { Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router";
import {
    ProductCard,
    Paginate,
    ProductCarousel,
    LoadingErrorWrapper,
} from "../components";
import {
    useGetProductsQuery,
    useGetTopProductsQuery,
} from "../store/productsApiSlice";

export const HomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const pageParam = searchParams.get("page");
    const { data, isLoading, error, isFetching } = useGetProductsQuery({
        pageParam,
    });
    const { products, pages, page } = data || {};

    const {
        data: topProducts,
        isLoading: topLoading,
        error: topError,
    } = useGetTopProductsQuery();

    return (
        <>
            {!topLoading && <ProductCarousel products={topProducts} />}
            <LoadingErrorWrapper
                isLoading={isLoading || isFetching}
                error={error || topError}
            >
                <h1>Latest Products</h1>
                <Row>
                    {products?.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
                <Paginate
                    pages={pages}
                    page={page}
                    setParams={setSearchParams}
                />
            </LoadingErrorWrapper>
        </>
    );
};
