module.exports = function (app) {
    var express = require('express');
    var donorsRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    donorsRouter.use(bodyParser.json());

    var authTokenDB = app.authTokenDB;
    var donorDB = app.donorDB;
    var transactionDB = app.transactionDB;
    var donationDB = app.donationDB;
    var charityDB = app.charityDB;

    function generateUUID() {
        var d = new Date().getTime();

        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    donorsRouter.get('/', function (req, res) {
        delete req.query["_"];
        donorDB.find(req.query).exec(function (error, donors) {
            res.send({
                'status': "ok",
                'data': donors
            })
        })
    });

    /** return a specific order for this donor (used for confirmation screen) */
    donorsRouter.get("/:donorId/history/:orderId", function (req, res) {
        const donorId = req.params.donorId;
        const orderId = req.params.orderId;

        charityDB.find({}, function (error, charities) {

            transactionDB.find({id: orderId}).limit(1).exec(function (err, orders) {

                const transactionIds = orders.map(function (tran) {
                    return tran.id
                });

                donationDB.find({transactionId: {$in: transactionIds}}).exec(function (err, donations) {

                    donations.map(function (don) {
                        var charityId = don["charityId"];
                        var charity = null;

                        charities.forEach((c) => {
                            if (c.id == charityId) charity = c;
                        });

                        don['charity'] = charity;
                    });

                    res.send({data: donations});
                });
            });
        })
    });

    /** return the giving history */
    donorsRouter.get("/:donorId/history", function (req, res) { // year=?
        const donorId = req.params.donorId;

        charityDB.find({}, function (error, charities) {

            donorDB.find({id: donorId}).limit(1).exec(function (err, donors) {

                if (donors.length > 0) {
                    const donor = donors[0];

                    transactionDB.find({donorId: donor.id}).exec(function (err, transactions) {
                        const transactionIds = transactions.map(function (tran) {
                            return tran.id
                        });

                        donationDB.find({transactionId: {$in: transactionIds}}).exec(function (err, donations) {

                            const transactionDate = transactions[0].transactionDate;

                            // Substitute the charity record for the id field
                            donations.map(function (don) {
                                var charityId = don["charityId"];
                                var charity = null;

                                charities.forEach((c) => {
                                    if (c.id == charityId) charity = c;
                                });
                                don['donationId'] = don['id'];
                                don['charityName'] = charity.name;
                                don['transactionDate'] = 'Jan 8, 2016 10:55:20 PM';
                                don['transactionDateTime'] = parseInt(transactionDate);
                                don['amount'] = parseInt(don['amount']);
                            });

                            res.send({data: donations});
                        });
                    });
                }
                else {
                    res.status(404);
                    res.send(JSON.stringify({data: null}));
                }
            });
        })
    });

    donorsRouter.post('/', function (req, res) {
        // Look for the most recently created record
        donorDB.find({}).sort({id: -1}).limit(1).exec(function (err, donors) {

            console.log(req.body.donor);
            if (donors.length != 0)
                req.body.donor.id = donors[0].id + 1;
            else
                req.body.donor.id = 1;

            // Insert the new record
            donorDB.insert(req.body.donor, function (err, newDonation) {
                res.status(201);
                res.send(JSON.stringify({donor: newDonation}));
            })
        });
    });

    donorsRouter.post('/login', function (req, res) {
        var login = req.body.login;
        var password = req.body.password;

        // FIXME:  should check password as well
        donorDB.find({login: login}).limit(1).exec(function (err, donors) {
            var token = generateUUID();

            if (donors.length != 0) {
                var donor = donors[0];
                var donorId = donor.id;

                transactionDB.find({}).sort({id: -1}).limit(1).exec(function (err, transactions) {
                    var newTransactionId = 1;

                    if (transactions.length != 0) {
                        newTransactionId = parseInt(transactions[0].id) + 1;
                    }

                    var newTransaction = {id: newTransactionId, donorId: donorId};
                    // Insert the new record
                    transactionDB.insert(newTransaction, function (err, newTransaction) {

                        var newAuthToken = {
                            token: token,
                            donorId: donorId,
                            firstName: donor.firstName,
                            lastName: donor.lastName,
                            orderId: newTransactionId
                        };

                        authTokenDB.insert(newAuthToken, function (err, result) {
                            res.status(201);
                            res.send(JSON.stringify({data: newAuthToken}));
                        });
                    });
                });
            } else {
                res.status(404);
                res.send(JSON.stringify({data: null}));
            }
        })
    });

    donorsRouter.post('/logout', function (req, res) {
        res.status(201);
        res.send(JSON.stringify({data: null}));
    });

    donorsRouter.get('/:id', function (req, res) {
        donorDB.find({id: req.params.id}).exec(function (error, donors) {
            if (donors.length > 0)
                res.send({
                    'data': donors[0]
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
    donorsRouter.post('/', function (req, res) {
        res.status(201).end();
    });

    donorsRouter.put('/:id', function (req, res) {
        res.send({
            'data': {
                id: req.params.id
            }
        });
    });

    donorsRouter.delete('/:id', function (req, res) {
        res.status(204).end();
    });

    app.use('/ws/donors', donorsRouter);
};
