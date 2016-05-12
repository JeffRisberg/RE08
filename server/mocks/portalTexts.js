module.exports = function (app) {
    var express = require('express');
    var portalTextsRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    portalTextsRouter.use(bodyParser.json());

    var portalTextsDB = app.portalTextsDB;

    portalTextsRouter.get('/', function (req, res) {
        delete req.query["_"];
        portalTextsDB.find(req.query).exec(function (error, portalTexts) {
            res.send(
               portalTexts
            )
        })
    });

    portalTextsRouter.post('/', function (req, res) {
        // Look for the most recently created record
        portalTextsDB.find({}).sort({id: -1}).limit(1).exec(function (err, portalTexts) {

            if (portalTexts.length != 0)
                req.body.vendor.id = portalTexts[0].id + 1;
            else
                req.body.vendor.id = 1;

            // Insert the new record
            portalTextsDB.insert(req.body.vendor, function (err, newvendor) {
                res.status(201);
                res.send({'status': 'ok', 'data': [newvendor]});
            })
        });
    });

    portalTextsRouter.get('/:id', function (req, res) {
        portalTextsDB.find({id: req.params.id}).exec(function (error, portalTexts) {
            if (portalTexts.length > 0)
                res.send({
                    portalTexts
                });
            else {
                res.status(404);
            }
        });
    });

    portalTextsRouter.put('/:id', function (req, res) {
        var vendor = req.body.vendor;

        portalTextsDB.update({id: req.params.id}, vendor, {}, function (err, count) {
            res.send({'status': 'ok', 'data': [vendor]});
        });
    });

    portalTextsRouter.delete('/:id', function (req, res) {
        portalTextsDB.remove({id: req.params.id}, {}, function (err, count) {
            res.status(204).end();
        });
    });

    app.use('/ws/portalTexts', portalTextsRouter);
};
