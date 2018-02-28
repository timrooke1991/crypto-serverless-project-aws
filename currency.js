'use strict';
var fs = require('fs');
var request = require('request');
var rp = require('request-promise');


exports.get = function(event, context) {
  // var contents = fs.readFileSync("public/index.html");

  // load pass API data into it

  var ticker = event.pathParameters.currency;

  rp(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ticker}&tsyms=USD`)
    .then(function (response) {
      var html = `<h1>${JSON.stringify(response.DISPLAY.BTC.USD.MARKET)}</h1>`;
      context.succeed({
        statusCode: 200,
        body: html,
        headers: {'Content-Type': 'text/html'}
      });
    })
    .catch(function (err) {
      console.log('error: ', err);
    });

};

// A function to grab key typed by the user
//
