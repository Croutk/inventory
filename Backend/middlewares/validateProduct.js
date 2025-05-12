module.exports = (req, res, next) => {
    const {name, price, quantity} = req.body;
    if(!name || typeof name !== 'string'){
        return res.status(400).send('Invalid Product name');
    }
    if(!price || typeof price !== 'number' || price <= 0){
        return res.status(400).send('Invalid product price');
    }
    if(!quantity || typeof quantity !== 'number' || quantity <= 0){
        return res.status(400).send('Invalid product quantity');
    }
    next();
};