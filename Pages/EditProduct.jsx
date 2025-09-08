import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';


export default function EditProduct() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [form, setForm] = useState(null)
    const [loading,setLoading] = useState(true)
    const [saving,setSaving] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        let mounted = true
        fetchProduct(id).then(data => { if(mounted) setForm({ title: data.title, price: data.price, description: data.description, category: data.category}) }).catch (e => { if(mounted) setError(e.message) }).finally(()=> mounted && setLoading(false))
            return ()=> { mounted = false; };
    },[id])

    function handleChange(e) {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setSaving(true); setError(null); setSuccess(null)
        try {
            const payload = { title: form.title, price: parseFloat(form.price), description: form.description, category: form.category }
            const res = await updateProduct(id, payload)
            setSuccess('Product updated (simulated).')
            setTimeout(() => navigate(`/products/${id}`), 900)
        }catch(e) {
            setError(e.message)
        }finally{ setSaving(false) }
    }
    
    if(loading) return <div className="text-center"><Spinner animation="border" /></div>
    if(error) return <Alert variant="danger">{error}</Alert>
    if(!form) return <Alert variant="warning">No product data</Alert>

    return (
        <div>
            <h2>Edit Product</h2>
            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" value={form.title} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" step="0.01" name="price" value={form.price} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control name="category" value={form.category} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={4} name="description" value={form.description} onChange={handleChange} />
                </Form.Group>
                <div className="d-flex gap-2">
                    <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Update'}</Button>
                    <Button variant="secondary" onClick={() => navigate(`/products/${id}`)}>Cancel</Button>
                </div>
            </Form>
        </div>
    )
}
