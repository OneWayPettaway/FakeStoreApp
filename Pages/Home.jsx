import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



export default function Home() {
    const navigate = useNavigate();
  return (
        <Container className= "text-center mt-5">
            <h1>Welcome to FakeStore</h1>
            <p>Browse, add, edit, or delete products from our mock store.</p>
            <Button onClick={() => navigate('/products')} variant="primary">
                Go to Products
            </Button>
        </Container>
    );
}
