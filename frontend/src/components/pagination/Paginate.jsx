import { Link } from "react-router";
import { Pagination } from "react-bootstrap";

export const Paginate = ({ pages, page, pathname }) => {
    return (
        <>
            {pages > 1 && (
                <Pagination className="py-4">
                    {[...Array(pages).keys()].map((p) => (
                        <Pagination.Item
                            as={Link}
                            key={p + 1}
                            active={p + 1 === page}
                            to={`${pathname}?page=${p + 1}`}
                        >
                            {p + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            )}
        </>
    );
};
