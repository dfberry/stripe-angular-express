'use strict';

var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');
var config = require('./config.json');
var creditcard = require('./creditcard');

module.exports = function(wagner) {

    var api = express.Router();

    api.use(bodyparser.json());

    /* Stripe Checkout API */
    api.post('/checkout', wagner.invoke(function(Stripe, Transaction) {
        return function(req, res) {
            creditcard.charge(req.body, config.Characters22_StoreName, Stripe, Transaction, function(err, results) {
                if (err) {
                    return res.status(status.INTERNAL_SERVER_ERROR).json({ error: "CreditCard.js - " + err });
                }
                return res.json(results);
            });
        };
    }));
    
    // testing model creation through http
    api.get('/model', wagner.invoke(function(Customer) {
        return function(req, res) {
            Customer.create({name:'api-test' + Date().toString()},function(err, results) {
                if (err) {
                    return res.status(status.INTERNAL_SERVER_ERROR).json({ error: "CreditCard.js - " + err });
                }
                return res.json(results);
            });
        };
    }));

    return api;
};

