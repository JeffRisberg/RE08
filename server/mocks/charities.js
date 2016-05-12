module.exports = function (app) {
    var express = require('express');
    var charitiesRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    charitiesRouter.use(bodyParser.json());

    var charityDB = app.charityDB;

    charitiesRouter.get('/', function (req, res) {
        delete req.query["_"];
        charityDB.find(req.query).exec(function (error, charities) {
            res.send({
                'status': "ok",
                'data': charities
            })
        })
    });

    charitiesRouter.get('/categories/:id', function (req, res) {
        delete req.query["_"];
        charityDB.find({categoryId: req.params.id}).exec(function (error, charities) {
            res.send({
                'status': "ok",
                'data': charities
            })
        })
    });

    charitiesRouter.get('/byEin/:ein', function (req, res) {
        charityDB.find({ein: req.params.ein}).exec(function (error, charities) {
            if (charities.length > 0)
                res.send({
                    'status': "ok",
                    'data': charities[0]
                });
            else {
                res.send({
                    'status': "ok",
                    'data': null
                });
            }
        });
    });

    charitiesRouter.post('/', function (req, res) {
        // Look for the most recently created record
        charityDB.find({}).sort({id: -1}).limit(1).exec(function (err, charities) {

            if (charities.length != 0)
                req.body.charity.id = charities[0].id + 1;
            else
                req.body.charity.id = 1;

            // Insert the new record
            charityDB.insert(req.body.charity, function (err, newCharity) {
                res.status(201);
                res.send(JSON.stringify({charity: newCharity}));
            })
        });
    });

    charitiesRouter.get('/:id', function (req, res) {
        charityDB.find({id: req.params.id}).exec(function (error, charities) {
            if (charities.length > 0)
                res.send({
                    'data': charities[0]
                });
            else {
                res.send({
                    'data': null
                });
            }
        });
    });

    // No changes from here on down
    charitiesRouter.post('/', function (req, res) {
        res.status(201).end();
    });

    charitiesRouter.put('/:id', function (req, res) {
        res.send({
            'charities': {
                id: req.params.id
            }
        });
    });

    charitiesRouter.delete('/:id', function (req, res) {
        res.status(204).end();
    });

    app.use('/ws/charities', charitiesRouter);
};
