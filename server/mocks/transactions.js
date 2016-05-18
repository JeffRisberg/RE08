module.exports = function (app) {
    var express = require('express');
    var transactionsRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    transactionsRouter.use(bodyParser.json());

    var transactionDB = app.transactionDB;
    var donationDB = app.donationDB;

    transactionsRouter.get('/', function (req, res) {
        delete req.query["_"];
        transactionDB.find(req.query).exec(function (error, transactions) {
            res.send({
                'status': "ok",
                'data': transactions
            })
        })
    });

    transactionsRouter.get('/:id/donations', function (req, res) {
        donationDB.find({transactionId: req.params.id}).exec(function (error, donations) {
            res.send({
                'status': "ok",
                'data': donations
            })
        });
    });

    transactionsRouter.post('/', function (req, res) {
        // Look for the most recently created record
        transactionDB.find({}).sort({id: -1}).limit(1).exec(function (err, transactions) {

            console.log(req.body.transaction);
            if (transactions.length != 0)
                req.body.transaction.id = transactions[0].id + 1;
            else
                req.body.transaction.id = 1;

            // Insert the new record
            transactionDB.insert(req.body.transaction, function (err, newTransaction) {
                res.status(201);
                res.send(JSON.stringify({transaction: newTransaction}));
            })
        });
    });

    transactionsRouter.get('/:id', function (req, res) {
        transactionDB.find({id: req.params.id}).exec(function (error, transactions) {
            if (transactions.length > 0)
                res.send({
                    'data': transactions[0],
                });
            else {
                res.status(404);
                res.send({
                    'data': null
                });
            }
        });
    });

    // No changes from here on down
    transactionsRouter.post('/', function (req, res) {
        res.status(201).end();
    });

    transactionsRouter.put('/:id', function (req, res) {
        res.send({
            'transactions': {
                id: req.params.id
            }
        });
    });

    transactionsRouter.delete('/:id', function (req, res) {
        res.status(204).end();
    });

    app.use('/ws/transactions', transactionsRouter);
};
