const db = require('../db/db');
const { v4: uuidv4 } = require('uuid');

function validateCustomerData(data) {
    if (!data.name) {
        throw new Error('Недостаточно данных для создания клиента');
    }
}

function notFoundCustomer(customerIndex) {
    if (customerIndex === -1) {
        throw new Error('Клиент не найден');
    }
}

function getAllCustomer() {
    return db.readCustomer().customers;
}

function getCustomerById(customerId) {
    const customers = db.readCustomer().customers;
    return customers.find(c => c.customerId === customerId);
}

function createCustomer(data) {
    validateCustomerData(data);
    const customerContent = db.readCustomer();
    const customerExists = customerContent.customers.some(customer => customer.customerId === data.customerId);
    if (customerExists) {
        throw new Error('Клиент с таким id уже существует');
    }
    const newCustomer = {
        customerId: uuidv4(),
        ...data 
    }
    customerContent.customers.push(newCustomer);
    db.writeCustomer(customerContent);
    return newCustomer;
}

function updateCustomer(customerId, newData) {
    const customerContent = db.readCustomer();
    const customerIndex = customerContent.customers.findIndex(c => c.customerId === customerId);
    notFoundCustomer(customerIndex);
    Object.assign(customerContent.customers[customerIndex], newData);
    db.writeCustomer(customerContent);
    return customerContent.customers[customerIndex];
}

function deleteCustomer(customerId) {
    const customerContent = db.readCustomer();
    const customerIndex = customerContent.customers.findIndex(c => c.customerId === customerId);
    notFoundCustomer(customerIndex);
    customerContent.customers.splice(customerIndex, 1);
    db.writeCustomer(customerContent);
}

module.exports = {
    getAllCustomer,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
};