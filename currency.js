'use strict';
var fs = require('fs');
var request = require('request');


exports.get = function(event, context) {
  // var contents = fs.readFileSync("public/index.html");

  // load pass API data into it

  var ticker = event.pathParameters.currency;

  request({
    url: `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ticker}&tsyms=USD`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }, function (error, response, body) {

    console.log('error: '+ response.statusCode);
    console.log('response: '+ response);
    console.log(body);
    var html = `<h1>${response['DISPLAY']['BTC']['USD']['MARKET']}</h1>`;

    context.succeed({
      statusCode: 200,
      // body: contents.toString(),
      body: html,
      headers: {'Content-Type': 'text/html'}
    });
  });
};

// A function to grab key typed by the user
//
