import { Container, Row, Col } from "react-bootstrap";

export const FormWrapper = ({ className = "", children }) => {
    return (
        <Container>
            <Row
                className={!className ? "justify-content-md-center" : className}
            >
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    );
};
