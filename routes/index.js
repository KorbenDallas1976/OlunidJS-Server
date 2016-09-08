var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/api/customers', db.getAllCustomers);
router.get('/api/customers/:id', db.getSingleCustomer);
/*router.post('/api/customers', db.createCustomer);
router.put('/api/customers/:id', db.updateCustomer);
router.delete('/api/customers/:id', db.removeCustomer);*/

module.exports = router;
