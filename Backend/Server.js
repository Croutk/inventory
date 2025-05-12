const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/product');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Project backend is runnning');
} );

app.use('/products', productRoutes);

app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, ()=> {
    console.log(`Server is running on port : ${port} `)
});


