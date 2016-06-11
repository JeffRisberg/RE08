module.exports = function (app) {
    var express = require('express');
    var contextRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    contextRouter.use(bodyParser.json());

    var authTokenDB = app.authTokenDB;
    var basketItemDB = app.basketItemDB;
    var charityDB = app.charityDB;
    var contextsDB = app.contextsDB;
    var donationDB = app.donationDB;
    var donorDB = app.donorDB;
    var portalsDB = app.portalsDB;
    var transactionDB = app.transactionDB;

    var currentPortal = null;
    var currentDonor = null;

    function generateUUID() {
        var d = new Date().getTime();

        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    contextRouter.get('/', function (req, res) {
        delete req.query["_"];
        portalsDB.find({url: "justgive"}).exec(function (error, portals) {
            var token = generateUUID();

            const portal = portals[0];

            transactionDB.find({}).sort({id: -1}).limit(1).exec(function (err, transactions) {
                var newTransactionId = 1;

                if (transactions.length != 0) {
                    newTransactionId = parseInt(transactions[0].id) + 1;
                }

                var newTransaction = {id: newTransactionId};
                // Insert the new record
                transactionDB.insert(newTransaction, function (err, result) {

                    var newAuthToken = {
                        token: token,
                        donorId: null,
                        orderId: newTransactionId
                    };

                    authTokenDB.insert(newAuthToken, function (err, authTokenResult) {
                        res.status(201);

                        currentPortal = portal;

                        res.send({
                            status: "ok",
                            data: {
                                token: token,
                                donor: null,
                                order: newTransaction,
                                vendorId: portal.vendorId,
                                portalId: portal.id
                            }
                        })
                    })
                })
            })
        })
    });

    contextRouter.post('/login', function (req, res) {
        var token = req.headers['auth-token'];

        authTokenDB.find({token: token}).exec(function (err, tokens) {
            if (tokens.length > 0) {
                const authToken = tokens[0];

                transactionDB.find({id: authToken.orderId}).exec(function (err, transactions) {
                    if (transactions.length > 0) {
                        const transaction = transactions[0];

                        var login = req.body.login;
                        var password = req.body.password;

                        // FIXME:  should check password as well
                        donorDB.find({login: login}).limit(1).exec(function (err, donors) {

                            if (donors.length != 0) {
                                var donor = donors[0];
                                var donorId = donor.id;

                                var newAuthToken = {
                                    token: token,
                                    donorId: donorId,
                                    orderId: authToken.orderId
                                };

                                authTokenDB.update({token: token}, newAuthToken, {}, function (err, authTokenResult) {
                                    res.status(201);
                                    var context = {
                                        token: token,
                                        donor: donor,
                                        order: transaction,
                                        vendorId: currentPortal.vendorId,
                                        portalId: currentPortal.id
                                    };
                                    res.send({status: "success", data: context});
                                    currentDonor = donor;
                                });
                            } else {
                                res.status(404).end();
                            }
                        });
                    }
                });
            }
        });
    });

    contextRouter.post('/logout', function (req, res) {
        var token = req.headers['auth-token'];

        authTokenDB.find({token: token}).exec(function (err, tokens) {
            if (tokens.length > 0) {
                const authToken = tokens[0];

                transactionDB.find({id: authToken.orderId}).exec(function (err, transactions) {
                    res.status(201);
                    var context = {
                        token: token,
                        donor: null,
                        order: transactions[0]
                    };
                    res.send(JSON.stringify({data: context}));
                    currentDonor = null;
                })
            }
        });
    });

    /** return the giving history */
    contextRouter.get("/:donorId/history", function (req, res) { // year=?
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

    contextRouter.post('/donations/:ein', function (req, res) {
        var token = req.headers['auth-token'];

        authTokenDB.find({token: token}).exec(function (err, tokens) {
            if (tokens.length > 0) {
                const authToken = tokens[0];

                charityDB.find({ein: req.params.ein}).exec(function (error, charities) {
                    if (charities.length > 0)

                    // Look for the most recently created record
                        basketItemDB.find({}).sort({id: -1}).limit(1).exec(function (err, basketItems) {

                            req.body.charity = charities[0];
                            req.body.charityId = charities[0].id;

                            if (basketItems.length != 0)
                                req.body.id = basketItems[0].id + 1;
                            else
                                req.body.id = 1;

                            // Insert the new record
                            basketItemDB.insert(req.body, function (err, newBasketItem) {

                                // fetch the whole basket
                                var order = {};
                                basketItemDB.find({}).exec(function (err, basketItems) {

                                    basketItems.forEach(function (item) {
                                        //order.push(item);
                                    })

                                    order["activeItem"] = newBasketItem;

                                    res.status(201);
                                    res.send({status: "ok", data: {order: order, token: token, donor: currentDonor}});
                                });
                            })
                        });
                });
            }
        });
    });

    contextRouter.put('/checkout', function (req, res) {
        var token = req.headers['auth-token'];

        authTokenDB.find({token: token}).exec(function (err, tokens) {
            if (token.length > 0) {
                const authToken = tokens[0];

                // Take the basket items and create donations
                basketItemDB.find({}).exec(function (err, basketItems) {
                    basketItems.forEach(function (item) {

                        // Insert the new record
                        const newDonation = {
                            transactionId: authToken.orderId,
                            charityId: item.charityId,
                            amount: item.amount,
                            flatCharge: 0.35
                        };
                        donationDB.insert(newDonation, function (err, newDonationResult) {
                        });
                    });

                    // Clear the basket
                    basketItemDB.remove({}, {multi: true}, function (err, count) {
                    });
                });
            }
        });

        res.send(JSON.stringify({status: "good", data: []}));
    });

    contextRouter.put('/clear', function (req, res) {
        basketItemDB.remove({}, {multi: true}, function (err, count) {
            res.status(201);
            res.send(JSON.stringify({donations: []}));
        });
    });

    app.use('/ws/context', contextRouter);
};
