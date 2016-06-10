module.exports = function (app) {
    var express = require('express');
    var portalsRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    portalsRouter.use(bodyParser.json());

    var portalsDB = app.portalsDB;
    var vendorsDB = app.vendorsDB;
    var portalBlocksMap = app.portalBlocksMap;
    var portalPagesMap = app.portalPagesMap;

    portalsRouter.get('/', function (req, res) {
        delete req.query["_"];
        portalsDB.find({url: "justgive"}).exec(function (error, portals) {
            res.send({"status": "ok", "data": portals[0]}
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

        portalsDB.find({id: req.params.id}).exec(function (error, portals) {
            if (portals.length > 0) {
                portals.forEach(function (portal) {
                    const portalId = portal.id;
                    const portalPages = portalPagesMap[""+portalId];
                    const pageMap = {};

                    portalPages.forEach(function (portalPage) {
                        const portalPageName = portalPage.name;
                        const portalPageId = portalPage.id;

                        var portalBlocks = portalBlocksMap["" + portalPageId];
                        portalPage['blocks'] = portalBlocks;

                        pageMap[portalPageName] = portalPage;
                    })

                    portal['pages'] = pageMap;
                    portal['id'] = 1;
                })
                res.send({"status": "ok", "data": portals[0]});
            }
            else {
                res.status(404);
            }
        });
    });

    portalsRouter.get('/:id/vendor', function (req, res) {
        vendorsDB.find({id: req.params.id}).exec(function (error, vendors) {
            res.send({'status': 'ok', 'data': vendors});
        });
    });

    portalsRouter.delete('/:id', function (req, res) {
        portalsDB.remove({id: req.params.id}, {}, function (err, count) {
            res.status(204).end();
        });
    });

    app.use('/ws/portal', portalsRouter);
};
