import { Col, Row } from "react-bootstrap";
import { Message } from "../components";
import { Link, useRouteError } from "react-router";
import { AppLayout } from "../AppLayout";

export const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <AppLayout>
            <Row>
                <Col className="mx-auto mt-5 text-center" sm={12}>
                    <h1 className="mb-4">Somthing went wrong!</h1>
                    <em className="fs-2">
                        <Message variant="danger">
                            {error.statusText || error.message}
                        </Message>
                    </em>

                    <Link className="btn btn-secondary " to="/">
                        Go Back
                    </Link>
                </Col>
            </Row>
        </AppLayout>
    );
};
