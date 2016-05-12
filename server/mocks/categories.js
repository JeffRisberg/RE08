module.exports = function (app) {
    var express = require('express');
    var categoriesRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    categoriesRouter.use(bodyParser.json());

    var categoryDB = app.categoryDB;

    categoriesRouter.get('/', function (req, res) {
        delete req.query["_"];
        categoryDB.find(req.query).exec(function (error, categories) {
            res.send({
                'status': "ok",
                'data': categories
            })
        })
    });

    categoriesRouter.get('/guide', function (req, res) {
        delete req.query["_"];
        categoryDB.find(req.query).exec(function (error, categories) {
            res.send({
                'status': "ok",
                'data': categories
            })
        })
    });

    categoriesRouter.get('/categories/:id', function (req, res) {
        delete req.query["_"];
        categoryDB.find(req.query).exec(function (error, categories) {
            res.send({
                'status': "ok",
                'data': categories
            })
        })
    });

    categoriesRouter.get('/:id', function (req, res) {
        categoryDB.find({id: req.params.id}).exec(function (error, categories) {
            if (categories.length > 0)
                res.send({
                    'status': "ok",
                    'data': categories[0]
                });
            else {
                res.send({
                    'data': null
                });
            }
        });
    });

    // No changes from here on down
    categoriesRouter.post('/', function (req, res) {
        res.status(201).end();
    });

    categoriesRouter.put('/:id', function (req, res) {
        // we never change categories
    });

    categoriesRouter.delete('/:id', function (req, res) {
        res.status(204).end();
    });

    app.use('/ws/categories', categoriesRouter);
};
