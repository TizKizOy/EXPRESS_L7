const productService = require('../../services/productService');

exports.getProduct = (req, res, next) => {
    try{
        const product = productService.getAllProduct();
        res.json(product);
    } catch (error){
        next(error);
    }
};

exports.getProductById = (req,res,next) => {
    try{
        const products = productService.getProductById(req.params.id);
        if(products){
            res.json(products)
        } else{
            res.status(404).json({ error: 'Product not found' });
        }
    } catch(error){
        next(error);
    }
}

exports.postProduct = (req,res,next) => {
    try {
        if (req.body) {
            const newProduct = productService.createProduct(req.body);
            res.status(201).json({ message: 'Покупатель создан успешно', product: newProduct });
        } else {
            res.status(400).json({ error: 'Bad Request', message: 'Тело запроса не может быть пустым' });
        }
    } catch (error) {
        if (error.message === 'Клиент с таким id уже существует') {
            res.status(400).json({ error: 'Bad Request', message: error.message });
        } else if(error.message === 'Недостаточно данных для создания клиента'){
            res.status(400).json({ error: 'Bad Request', message: error.message });
        } else {
            next(error);
        }
    }
}

exports.putAndPatchProductById = (req,res,next) => {
    try {
        if (req.body) {
            const updatedProduct = productService.updateProduct(req.params.id, req.body);
            res.status(200).json({ message: 'Покупатель успешно изменён', product: updatedProduct });
        } else {
            res.status(400).json({ error: 'Bad Request', message: 'Тело запроса не может быть пустым' });
        }
    } catch (error) {
        if (error.message === 'Клиент не найден') {
            res.status(404).json({ error: 'Not Found', message: error.message });
        } else {
            next(error);
        }
    }
}

exports.deleteProductById = (req,res,next) => {
    try {
        productService.deleteProduct(req.params.id);
        res.status(204).json({ message: 'Покупатель удалён'});
    } catch (error) {
        if (error.message === 'Клиент не найден') {
            res.status(404).json({ error: 'Not Found', message: error.message });
        } else {
            next(error);
        }
    }
}