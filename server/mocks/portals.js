module.exports = function (app) {
    var express = require('express');
    var portalsRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    portalsRouter.use(bodyParser.json());

    var portalsDB = app.portalsDB;
    var portalBlocksDB = app.portalBlocksDB;

    portalsRouter.get('/', function (req, res) {
        delete req.query["_"];
        portalsDB.find(req.query).exec(function (error, portals) {
            res.send({"status": "ok", "data": portals}
            )
        })
    });

    portalsRouter.post('/', function (req, res) {
        // Look for the most recently created record
        portalsDB.find({}).sort({id: -1}).limit(1).exec(function (err, portals) {

            if (portals.length != 0)
                req.body.portal.id = portals[0].id + 1;
            else
                req.body.portal.id = 1;

            // Insert the new record
            portalsDB.insert(req.body.portal, function (err, newvendor) {
                res.status(201);
                res.send({'status': 'ok', 'data': [newvendor]});
            })
        });
    });

    portalsRouter.get('/:id', function (req, res) {

        portalBlocksDB.find({}).exec(function (error, portalBlocks) {

            portalsDB.find({id: req.params.id}).exec(function (error, portals) {
                if (portals.length > 0) {
                    portals.forEach(function (portal) {
                        const portalId = portal.id;
                        var x = [];
                        portalBlocks.forEach(function (portalBlock) {
                            if (portalBlock.portalId == portalId)
                            x.push(portalBlock);
                        });
                        portal['blocks'] = x;
                    })
                    res.send({"status": "ok", "data": portals});
                }
                else {
                    res.status(404);
                }
            });
        });
    });

    portalsRouter.put('/:id', function (req, res) {
        var vendor = req.body.vendor;

        portalsDB.update({id: req.params.id}, vendor, {}, function (err, count) {
            res.send({'status': 'ok', 'data': [vendor]});
        });
    });

    portalsRouter.delete('/:id', function (req, res) {
        portalsDB.remove({id: req.params.id}, {}, function (err, count) {
            res.status(204).end();
        });
    });

    app.use('/ws/portals', portalsRouter);
}
;
