import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
    const navigate = useNavigate();
    if (!product) return null;
    return (
        <Card className="mb-4 shadow-sm h-100">
            <Card.Img
             variant="top"
              src={product.image}
              alt={product.title}
               height="200"
                style={{ objectFit: 'contain' }}
                 />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>${Number(product.price).toFixed(2)}</Card.Text>
                <Button
                className="w-100 mt-auto"
                variant="primary"
                onClick={() => navigate(`/products/${product.id}`)}>View Details</Button>
                    </Card.Body>
                </Card>
    );
}