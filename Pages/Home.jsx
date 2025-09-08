import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    return (
        <Container fluid className="mt-5">
            <Row className="justify-content-center text-center">
                <Col xs={12} md={8} lg={6}>
                    <h1>Welcome to FakeStore</h1>
                    <p>Browse, add, edit, or delete products from our mock store.</p>
                    <Button onClick={() => navigate('/products')} variant="primary">
                        Go to Products
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
