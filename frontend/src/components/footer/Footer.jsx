import { Container, Row, Col } from "react-bootstrap";

const currentYear = new Date().getFullYear();

export const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        <p>EShophue &copy; {currentYear}</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};
