import { Col, Row } from "react-bootstrap";
import { Message } from "../components";
import { Link, useRouteError } from "react-router";

export const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <Row>
            <Col className="mx-auto mt-5" sm={12}>
                <p>Sorry, an unexpected error has occurred.</p>
                <Message variant="danger">{error.statusText || error.message}</Message>
                <Link className="btn btn-light my-3 " to="/">
                    Go Back
                </Link>
            </Col>
        </Row>
    );
};
