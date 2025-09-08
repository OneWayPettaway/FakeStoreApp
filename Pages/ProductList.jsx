import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import ProductCard from "./ProductCard";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] =useState("");

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError("Failed to fetch products.");
                setLoading(false);
            });
    }, []);

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Row>
            {products.map(product => (
                <Col key={product.id} sm={12} md={6} lg={4}>
                    <ProductCard product={product} />
                </Col>
            ))}
        </Row>
    );
}