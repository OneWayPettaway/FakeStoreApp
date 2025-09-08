import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Button, Spinner, Alert, Modal } from 'react-bootstrap';

export default function ProductDetails() {
    const { id } = useParams();
    const  navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
        .then(res => setProduct(res.data))
        .catch (() => setError("Failed to load product"))
        .finally(() => setLoading(false));
    }, [id]);

    const handleDelete = () => {
        axios.delete(`https://fakestoreapi.com/products/${id}`)
        .then(() => {
            alert ("Product deleted (fake)");
            navigate('/products');
        });
    };

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger"> {error}</Alert>;

    return ( 
        <Container className="mt-4">
            <h2>{product.title}</h2>
            <img src={product.image} alt={product.title} height="200" />
            <p><strong>Category:</strong> {product.category}</p>
            <p>{product.description}</p>
            <Button variant="warning" onClick={() => navigate(`/edit-product/${id}`)}>Edit</Button>
            <Button variant="danger" onClick={() => setShowConfirm(true)}>Delete</Button>

            <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
                <Modal.Header closeButton><Modal.Title>Confirm Deletion</Modal.Title></Modal.Header>
                <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }