import { Button, Pagination } from "react-bootstrap";

export const Paginate = ({
    pages,
    page,
    setParams = (pageNow = 1) => null,
}) => {
    const onNextPage = (pageNow = 1) => {
        setParams({ page: pageNow });
    };

    return (
        <>
            {pages > 1 && (
                <Pagination className="py-4">
                    {[...Array(pages).keys()].map((p) => (
                        <Pagination.Item
                            as={Button}
                            key={p + 1}
                            active={p + 1 === page}
                            onClick={() => onNextPage(p + 1)}
                        >
                            {p + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            )}
        </>
    );
};
