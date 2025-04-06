const customerService = require('../../services/customerService');

exports.getCustomer = async (req, res, next) => {
    try {
        console.log('Fetching all customers');
        const customers = await customerService.getAllCustomer();
        console.log('Customers:', customers);
        res.json(customers);
    } catch (error) {
        next(error);
    }
};

exports.getCustomerById = async (req, res, next) => {
    try {
        const customer = await customerService.getCustomerById(req.params.id);
        if (customer) {
            res.json(customer);
        } else {
            res.status(404).json({ error: 'Customer not found' });
        }
    } catch (error) {
        next(error);
    }
};

exports.postCustomer = async (req,res,next) => {
    try {
        if (req.body) {
            const newCustomer = await customerService.createCustomer(req.body);
            res.status(201).json({ message: 'Покупатель создан успешно', customer: newCustomer });
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

exports.putAndPatchCustomerById = async  (req,res,next) => {
    try {
        if (req.body) {
            const updatedCustomer = customerService.updateCustomer(req.params.id, req.body);
            res.status(200).json({ message: 'Покупатель успешно изменён', customer: updatedCustomer });
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

exports.deleteCustomerById = async  (req,res,next) => {
    try {
        await customerService.deleteCustomer(req.params.id);
        res.status(204).json({ message: 'Покупатель удалён'});
    } catch (error) {
        if (error.message === 'Клиент не найден') {
            res.status(404).json({ error: 'Not Found', message: error.message });
        } else {
            next(error);
        }
    }
}