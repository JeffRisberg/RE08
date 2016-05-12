module.exports = function (app) {
    var express = require('express');
    var portalPagesRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    portalPagesRouter.use(bodyParser.json());

    var portalPagesDB = app.portalPagesDB;

    portalPagesRouter.get('/', function (req, res) {
        delete req.query["_"];
        portalPagesDB.find(req.query).exec(function (error, portalPages) {
            res.send(
               portalPages
            )
        })
    });

    portalPagesRouter.post('/', function (req, res) {
        // Look for the most recently created record
        portalPagesDB.find({}).sort({id: -1}).limit(1).exec(function (err, portalPages) {

            if (portalPages.length != 0)
                req.body.vendor.id = portalPages[0].id + 1;
            else
                req.body.vendor.id = 1;

            // Insert the new record
            portalPagesDB.insert(req.body.vendor, function (err, newvendor) {
                res.status(201);
                res.send({'status': 'ok', 'data': [newvendor]});
            })
        });
    });

    portalPagesRouter.get('/:id', function (req, res) {
        portalPagesDB.find({id: req.params.id}).exec(function (error, portalPages) {
            if (portalPages.length > 0)
                res.send({
                    portalPages
                });
            else {
                res.status(404);
            }
        });
    });

    portalPagesRouter.put('/:id', function (req, res) {
        var vendor = req.body.vendor;

        portalPagesDB.update({id: req.params.id}, vendor, {}, function (err, count) {
            res.send({'status': 'ok', 'data': [vendor]});
        });
    });

    portalPagesRouter.delete('/:id', function (req, res) {
        portalPagesDB.remove({id: req.params.id}, {}, function (err, count) {
            res.status(204).end();
        });
    });

    app.use('/ws/portalPages', portalPagesRouter);
};
