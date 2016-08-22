module.exports = function (app) {
    var express = require('express');
    var fundraisersRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    fundraisersRouter.use(bodyParser.json());

    var fundraisersDB = app.fundraisersDB;

    fundraisersRouter.get('/', function (req, res) {
        delete req.query["_"];
        fundraisersDB.find({}).exec(function (error, fundraisers) {
            res.send({"status": "ok", "data": fundraisers}
            )
        })
    });

    fundraisersRouter.post('/', function (req, res) {
        // Look for the most recently created record
        fundraisersDB.find({}).sort({id: -1}).limit(1).exec(function (err, fundraisers) {

            if (fundraisers.length != 0)
                req.body.fundraiser.id = fundraisers[0].id + 1;
            else
                req.body.fundraiser.id = 1;

            // Insert the new record
            fundraisersDB.insert(req.body.fundraiser, function (err, newvendor) {
                res.status(201);
                res.send({'status': 'ok', 'data': [newvendor]});
            })
        });
    });

    fundraisersRouter.get('/:id', function (req, res) {

        fundraisersDB.find({id: req.params.id}).exec(function (error, fundraisers) {

            res.send({"status": "ok", "data": fundraisers});
        });
    });

    fundraisersRouter.get('/:id/vendor', function (req, res) {
        vendorsDB.find({id: req.params.id}).exec(function (error, vendors) {
            res.send({'status': 'ok', 'data': vendors});
        });
    });

    fundraisersRouter.delete('/:id', function (req, res) {
        fundraisersDB.remove({id: req.params.id}, {}, function (err, count) {
            res.status(204).end();
        });
    });

    app.use('/ws/fundraiser', fundraisersRouter);
};
