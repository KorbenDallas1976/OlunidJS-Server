var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/api/customers', db.getAllCustomers);
router.get('/api/customers/:id', db.getSingleCustomer);
router.get('/api/partners', db.getAllPartners);
router.get('/api/partners/:id', db.getSinglePartner);
router.post('/api/partners', db.createPartner);
router.put('/api/partners/:id', db.updatePartner);
router.delete('/api/partners/:id', db.removePartner);

module.exports = router;
