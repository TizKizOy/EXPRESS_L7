const db = require('../db/db');
const { v4: uuidv4 } = require('uuid');

function validateProductData(data) {
    if (!data.name) {
        throw new Error('Недостаточно данных для создания клиента');
    }
}

function notFoundProduct(productIndex) {
    if (productIndex === -1) {
        throw new Error('Клиент не найден');
    }
}

function getAllProduct(){
    return db.readProduct().products;
}

function getProductById(productId){
    const product = db.readProduct().products;
    return product.find(c => c.id === productId);
}

function createProduct(data) {
    validateProductData(data);
    const productContent = db.readProduct();
    const productExists = productContent.products.some(product => product.id === data.id);
    if (productExists) {
        throw new Error('Клиент с таким id уже существует');
    }
    const newProduct = {
        id: uuidv4(),
        ...data
    }
    productContent.products.push(newProduct);
    db.writeProduct(productContent);
    return newProduct;
}

function updateProduct(id, newData) {
    const productContent = db.readProduct();
    const productIndex = productContent.products.findIndex(c => c.id === id);
    notFoundProduct(productIndex);
    Object.assign(productContent.products[productIndex], newData);
    db.writeProduct(productContent);
    return productContent.products[productIndex];
}

function deleteProduct(id) {
    const productContent = db.readProduct();
    const productIndex = productContent.products.findIndex(c => c.id === id);
    notFoundProduct(productIndex);
    productContent.products.splice(productIndex, 1);
    db.writeProduct(productContent);
}

module.exports = {
    getAllProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};