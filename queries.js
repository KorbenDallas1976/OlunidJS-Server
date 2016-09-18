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

// --- PARTNER ---
function getAllPartners(req, res, next) {
  db.any('select * from public.t_partner')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL partners'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSinglePartner(req, res, next) {
  var partner_id = parseInt(req.params.id);
  db.one('select * from public.t_partner where id = $1', partner_id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE partner, id:' + partner_id
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createPartner(req, res, next) {
  //req.body.age = parseInt(req.body.age);
  db.none('insert into public.t_partner(abbreviation, name, remark)' +
      'values(${abbreviation}, ${name}, ${remark})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one Partner'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updatePartner(req, res, next) {
  var partner_id = parseInt(req.params.id);
  db.none('update public.t_partner set abbreviation=$1, name=$2, remark=$3 where id=$4',
      [req.body.abbreviation, req.body.name, req.body.remark,
        partner_id])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Updated partner id:' + partner_id
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removePartner(req, res, next) {
  var partner_id = parseInt(req.params.id);
  db.result('delete from public.t_partner where id = $1', partner_id)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} partner`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
  getAllCustomers: getAllCustomers,
  getSingleCustomer: getSingleCustomer,
  getAllPartners: getAllPartners,
  getSinglePartner: getSinglePartner,
  createPartner: createPartner,
  updatePartner: updatePartner,
  removePartner: removePartner
};
