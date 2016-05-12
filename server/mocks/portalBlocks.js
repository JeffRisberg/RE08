module.exports = function (app) {
    var express = require('express');
    var portalBlocksRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    portalBlocksRouter.use(bodyParser.json());

    var portalBlocksDB = app.portalBlocksDB;

    portalBlocksRouter.get('/', function (req, res) {
        delete req.query["_"];
        portalBlocksDB.find(req.query).exec(function (error, portalBlocks) {
            res.send(
               portalBlocks
            )
        })
    });

    portalBlocksRouter.post('/', function (req, res) {
        // Look for the most recently created record
        portalBlocksDB.find({}).sort({id: -1}).limit(1).exec(function (err, portalBlocks) {

            if (portalBlocks.length != 0)
                req.body.vendor.id = portalBlocks[0].id + 1;
            else
                req.body.vendor.id = 1;

            // Insert the new record
            portalBlocksDB.insert(req.body.vendor, function (err, newvendor) {
                res.status(201);
                res.send({'status': 'ok', 'data': [newvendor]});
            })
        });
    });

    portalBlocksRouter.get('/:id', function (req, res) {
        portalBlocksDB.find({id: req.params.id}).exec(function (error, portalBlocks) {
            if (portalBlocks.length > 0)
                res.send({
                    portalBlocks
                });
            else {
                res.status(404);
            }
        });
    });

    portalBlocksRouter.put('/:id', function (req, res) {
        var vendor = req.body.vendor;

        portalBlocksDB.update({id: req.params.id}, vendor, {}, function (err, count) {
            res.send({'status': 'ok', 'data': [vendor]});
        });
    });

    portalBlocksRouter.delete('/:id', function (req, res) {
        portalBlocksDB.remove({id: req.params.id}, {}, function (err, count) {
            res.status(204).end();
        });
    });

    app.use('/ws/portalBlocks', portalBlocksRouter);
};
