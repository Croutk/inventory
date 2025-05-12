const dbQueries = {
    getAllProducts: 'SELECT * FROM products',
    getProductById: 'SELECT * FROM products WHERE id = ?',
    insertProduct: 'INSERT INTO products (name,price,quantity) VALUES(?, ?, ?)',
    updateProduct: 'UPDATE products SET name =?, price =?, quantity=? WHERE id = ?',
    deleteProduct: 'DELETE FROM products WHERE id = ?',
};

module.exports = dbQueries;