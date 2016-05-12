module.exports = function (app) {
    var express = require('express');
    var contextsRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    contextsRouter.use(bodyParser.json());

    var vendorsDB = app.vendorsDB;
    var portalsDB = app.portalsDB;

    contextsRouter.get('/:pathname', function (req, res) {
        delete req.query["_"];
        vendorsDB.find({url: req.params.pathname}).exec(function (error, vendors) {

            const vendor = vendors[0];

            portalsDB.find({vendorId: vendor.id}).exec(function (error, portals) {

                const portal = portals[0];

                res.send({
                    status: "ok",
                    data: {vendorId: vendor.id, portalId: portal.id}
                }
                );
            })
        })
    });

    app.use('/ws/contexts', contextsRouter);
};
