'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid').v4;
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());
app.use(cookie());

const ads = [
    {inner: "Oбъявление 1"},
    {inner: "Oбъявление 2"},
    {inner: "Oбъявление 3"},
    {inner: "Oбъявление 4"},
];

app.get('/main', (req, res) => {
    res.json(ads.flat());
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});