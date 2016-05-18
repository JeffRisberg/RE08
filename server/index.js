"use strict";
const path = require('path');
const globSync = require('glob').sync;
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const mocks = globSync('./mocks/**/*.js', {cwd: __dirname}).map(require);

const PATH_STYLES = path.resolve(__dirname, '../app/styles');
const PATH_IMAGES = path.resolve(__dirname, '../app/images');
const PATH_JS = path.resolve(__dirname, '../app/js');

const PATH_DIST = path.resolve(__dirname, '../dist');

app.use('/styles', express.static(PATH_STYLES));
app.use('/images', express.static(PATH_IMAGES));
app.use('/js', express.static(PATH_JS));
app.use(express.static(PATH_DIST));

app.use(bodyParser.urlencoded({extended: false}));

var nedb = require('nedb');

app.portalBlocksMap = require("../portalBlocks.json");

app.vendorsDB = new nedb({filename: 'vendors', autoload: true});
app.portalsDB = new nedb({filename: 'portals', autoload: true});
app.portalPagesDB = new nedb({filename: 'portalPages', autoload: true});

app.authTokenDB = new nedb({filename: 'authTokens', autoload: true});
app.basketItemDB = new nedb({filename: 'basketItems', autoload: true});
app.categoryDB = new nedb({filename: 'categories', autoload: true});
app.charityDB = new nedb({filename: 'charities', autoload: true});
app.donorDB = new nedb({filename: 'donors', autoload: true});
app.donationDB = new nedb({filename: 'donations', autoload: true});
app.topCharityDB = new nedb({filename: 'topCharities', autoload: true});
app.transactionDB = new nedb({filename: 'transactions', autoload: true});

mocks.forEach(function (route) {
    route(app);
});

app.get('/**', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../app/index.html'));
});

const server = app.listen(3000, () => {
    console.log('listening on 3000');
});