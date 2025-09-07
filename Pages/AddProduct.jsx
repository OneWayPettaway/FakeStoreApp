import {Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function AddProduct() {
    const [form, setForm] = useState({ title:'',  price:'', category:'', description:''});
    const [success,setSuccess] = useState(false);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const payload = {
                ...form,
                price: parseFloat(form.price)
            };
        await axios.post('https://fakestoreapi.com/products', payload);
        setSuccess(true);
        setForm ({ title:'', price:'', category:'', description:''});
        }  catch (err) {
            console.error('Error creating product:', err);
        }
        setSaving(false);
    };

    return (
        <div>
            <h2>Add New Product</h2>
            {success && <Alert variant="success">Product created successfully </Alert>}
           <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control name="title" value={form.title} onChange={handleChange} required />
                 </Form.Group>
                 <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" step="0.01" name="price" value={form.price} onChange={handleChange} required />
                 </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" name="category" value={form.category} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={4} name="description" value={form.description} onChange={handleChange} required />
                </Form.Group>
                <div className="d-flex gap-2">
                    <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
                    <Button variant="secondary" onClick={() => navigate(`/products/`)}>Cancel</Button>
                    </div>
                 </Form>
                </div>
    )
}