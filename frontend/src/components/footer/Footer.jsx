import { Container, Row, Col } from "react-bootstrap";

export const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        <p>EShophue &copy; {year}</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};
