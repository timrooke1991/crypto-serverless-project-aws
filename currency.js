'use strict';
var fs = require('fs');
var request = require('request');
var rp = require('request-promise');


exports.get = function(event, context) {

  // Grabs ticker from URL
  var ticker = event.pathParameters.currency;

  rp(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ticker}&tsyms=USD`)
    .then(function (response) {


      var json = JSON.parse(response);
      var html = `<h1>${json['DISPLAY']['BTC']['USD']['MARKET']}</h1>`;

      console.log('response', response);
      console.log('market', json['DISPLAY']['BTC']['USD']['MARKET']);

      context.succeed({
        statusCode: 200,
        body: html,
        headers: {'Content-Type': 'text/html'}
      });
    })
    .catch(function () {
      console.log('error: ', context.error);
    });

};

// A function to grab key typed by the user
//
