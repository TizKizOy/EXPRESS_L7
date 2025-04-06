const express = require('express');
const router = express.Router();
const customerController = require('../../controllers/v1/customerController');

router.get('/customers', customerController.getCustomer);
router.get('/customer/:id', customerController.getCustomerById);
router.post('/customer', customerController.postCustomer);
router.put('/customer/:id', customerController.putAndPatchCustomerById);
router.patch('/customer/:id', customerController.putAndPatchCustomerById);
router.delete('/customer/:id', customerController.deleteCustomerById);

module.exports = router;