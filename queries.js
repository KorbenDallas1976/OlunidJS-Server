var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var cn = {
    host: '10.24.2.3', // server name or IP address;
    port: 5432,
    database: 'olunid',
    user: 'olunid',
    password: 'olunid'
};

var db = pgp(cn);

// add query functions
function getAllCustomers(req, res, next) {
  db.any('select * from public.v_partners_inv_address')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL customers'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleCustomer(req, res, next) {
  var custID = parseInt(req.params.id);
  db.one('select * from public.v_partners_inv_address where id = $1', custID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE customer'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllCustomers: getAllCustomers,
  getSingleCustomer: getSingleCustomer,
  /*createCustomer: createCustomer,
  updateCustomer: updateCustomer,
  removeCustomer: removeCustomer*/
};
