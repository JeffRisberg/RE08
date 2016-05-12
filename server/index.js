"use strict";
const path = require('path');
const globSync = require('glob').sync;
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const mocks = globSync('./mocks/**/*.js', {cwd: __dirname}).map(require);

const PATH_STYLES = path.resolve(__dirname, '../app/styles');
const PATH_DIST = path.resolve(__dirname, '../dist');

app.use(bodyParser.urlencoded({extended: false}));

app.use('/styles', express.static(PATH_STYLES));
app.use(express.static(PATH_DIST));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../app/index.html'));
});

// Run server to listen on port 3000.
const server = app.listen(3000, () => {
    console.log('listening on *:3000');
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('static'));

var nedb = require('nedb');

app.vendorsDB = new nedb({filename: 'vendors', autoload: true});
app.portalsDB = new nedb({filename: 'portals', autoload: true});
app.portalPagesDB = new nedb({filename: 'portalPages', autoload: true});
app.portalTextsDB = new nedb({filename: 'portalTexts', autoload: true});

app.categoryDB = new nedb({filename: 'categories', autoload: true});
app.charityDB = new nedb({filename: 'charities', autoload: true});
app.topCharityDB = new nedb({filename: 'topCharities', autoload: true});

mocks.forEach(function (route) {
    route(app);
});
