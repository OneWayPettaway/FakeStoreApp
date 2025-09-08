import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
    const navigate = useNavigate();
    if (!product) return null;
    return (
        <Card className="mb-4">
            <Card.Img
             variant="top"
              src={product.image}
               height="200"
                style={{ objectFit: 'contain' }}
                 />
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>${product.price.toFixed(2)}</Card.Text>
                <Button onClick={() => navigate(`/products/${product.id}`)}>View Details</Button>
                    </Card.Body>
                </Card>
    );
}