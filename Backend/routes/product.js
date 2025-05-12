const express = require('express');
const router = express.Router();
const db = require('../db');
const validateProduct = require('../middlewares/validateProduct');
const dbQueries = require('../dbQueries');

const validateProductId = (req, res, next) => {
    const { id } = req.params;
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }
    next();
};

router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const query = `${dbQueries.getAllProducts} LIMIT ? OFFSET ?`;
        const [results] = await db.query(query, [parseInt(limit), parseInt(offset)]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'No products found' });
        }
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching products:', err.message);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

router.get('/:id', validateProductId, async (req, res) => {
    const { id } = req.params;

    try {
        const [results] = await db.query(dbQueries.getProductById, [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(results[0]);
    } catch (err) {
        console.error('Error fetching product:', err.message);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

router.post('/', validateProduct, async (req, res) => {
    const { name, price, quantity } = req.body;

    try {
        const [results] = await db.query(dbQueries.insertProduct, [name, price, quantity]);
        res.status(201).json({ message: 'Product added successfully', productId: results.insertId });
    } catch (err) {
        console.error('Error inserting product:', err.message);
        res.status(500).json({ error: 'Failed to add product' });
    }
});

router.put('/:id', validateProductId, validateProduct, async (req, res) => {
    const { id } = req.params;
    const { name, price, quantity } = req.body;

    try {
        const [results] = await db.query(dbQueries.updateProduct, [name, price, quantity, id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: `Product with ID: ${id} updated successfully` });
    } catch (err) {
        console.error('Error updating product:', err.message);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

router.delete('/:id', validateProductId, async (req, res) => {
    const { id } = req.params;

    try {
        const [results] = await db.query(dbQueries.deleteProduct, [id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: `Product with ID: ${id} deleted successfully` });
    } catch (err) {
        console.error('Error deleting product:', err.message);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

module.exports = router;