'use strict';
var fs = require('fs');
var Promise = require("bluebird");
var request = require('request');
var rp = require('request-promise');


exports.get = function(event, context) {
  // Grabs ticker from URL
  var ticker = event.pathParameters.currency;
  // var output = ``;

  // create request objects
  var requests = [{
    url: `https://min-api.cryptocompare.com/data/histoday?fsym=${ticker}&tsym=USD&limit=30`
  }, {
    url: `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ticker}&tsyms=USD`
  }];

  Promise.map(requests, function(obj) {
    return rp(obj).then(function(body) {
      return JSON.parse(body);
    });
  }).then(function(results) {
    console.log(results);
    context.succeed({
      statusCode: 200,
      body: JSON.stringify(results),
      headers: {'Content-Type': 'text/html'}
    });
  }, function(err) {
    console.log('error: ', err);
  });
};
