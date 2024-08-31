import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export const Search = () => {
    const { keyword } = useParams();
    const [searchQuery, setSearchQuery] = useState(keyword || "");

    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        const q = searchQuery.trim();
        if (q) {
            navigate(`/search/${q.replace(/\//g, "")}`);
        }
        setSearchQuery("");
    };
    return (
        <Form onSubmit={onSubmit} className="d-flex">
            <Form.Control
                type="text"
                name="searchQuery"
                placeholder="Search Products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mr-sm-2 ml-sm-5"
            />
            <Button
                variant="outline-light"
                className="p-2 mx-2"
                type="submit"
            >
                Search
            </Button>
        </Form>
    );
};
