import { useNavigate, useSearchParams } from "react-router";
import { Form, Button } from "react-bootstrap";

export const Search = ({ navigateToSearchPage = false }) => {
    const [searchParams, setSearchParams] = useSearchParams({ q: "" });
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        const q = e.target["search-query"].value.trim();
        const invalid = !q || q.includes("/") || q.includes("\\");
        if (!invalid && navigateToSearchPage) {
            navigate(`/search?${q}`);
        } else if (invalid) return;
        setSearchParams({ q: q });
    };

    return (
        <Form onSubmit={onSubmit} className="d-flex">
            <Form.Control
                type="text"
                name="search-query"
                placeholder="Search Products..."
                defaultValue=""
                className="mr-sm-2 ml-sm-5"
            />
            <Button variant="outline-light" className="p-2 mx-2" type="submit">
                Search
            </Button>
        </Form>
    );
};
