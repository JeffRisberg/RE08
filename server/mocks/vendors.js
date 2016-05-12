module.exports = function (app) {
    var express = require('express');
    var vendorsRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    vendorsRouter.use(bodyParser.json());

    var vendorsDB = app.vendorsDB;

    vendorsRouter.get('/', function (req, res) {
        delete req.query["_"];
        vendorsDB.find(req.query).exec(function (error, vendors) {
            res.send(
               vendors
            )
        })
    });

    vendorsRouter.post('/', function (req, res) {
        // Look for the most recently created record
        vendorsDB.find({}).sort({id: -1}).limit(1).exec(function (err, vendors) {

            if (vendors.length != 0)
                req.body.vendor.id = vendors[0].id + 1;
            else
                req.body.vendor.id = 1;

            // Insert the new record
            vendorsDB.insert(req.body.vendor, function (err, newvendor) {
                res.status(201);
                res.send({'status': 'ok', 'data': [newvendor]});
            })
        });
    });

    vendorsRouter.get('/:id', function (req, res) {
        vendorsDB.find({id: req.params.id}).exec(function (error, vendors) {
            if (vendors.length > 0)
                res.send({
                    vendors
                });
            else {
                res.status(404);
            }
        });
    });

    vendorsRouter.put('/:id', function (req, res) {
        var vendor = req.body.vendor;

        vendorsDB.update({id: req.params.id}, vendor, {}, function (err, count) {
            res.send({'status': 'ok', 'data': [vendor]});
        });
    });

    vendorsRouter.delete('/:id', function (req, res) {
        vendorsDB.remove({id: req.params.id}, {}, function (err, count) {
            res.status(204).end();
        });
    });

    app.use('/ws/vendors', vendorsRouter);
};
