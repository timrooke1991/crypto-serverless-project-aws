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
      var html = `
      <!DOCTYPE html>
      <html lang="en">

      <head>
          <meta charset="utf-8">
          <title>Crypto app</title>
          <meta name="description" content="" />
          <link href="https://s3-eu-west-2.amazonaws.com/aws-codestar-eu-west-2-190388598975-crypto-serverle-app/public/assets/css/styles.css" rel="stylesheet">
          <link href="https://s3-eu-west-2.amazonaws.com/aws-codestar-eu-west-2-190388598975-crypto-serverle-app/public/assets/css/gradients.css" rel="stylesheet">
      </head>

      <body class="">
      <ul class="masonry-list">
        <li class="tile-case">
          <a href="#">
            <div class="tile-primary-content">
              <h1>${json['DISPLAY'][ticker]['USD']['FROMSYMBOL']}</h1>
              <p>${json['RAW'][ticker]['USD']['FROMSYMBOL']}</p>
            </div>
            <div class="tile-secondary-content">
              <h2>${json['DISPLAY'][ticker]['USD']['PRICE']}</h2>
              <p>${json['RAW'][ticker]['USD']['FROMSYMBOL']}</p>
            </div>
          </a>
        </li>
      </ul>
      </body>
      </html>
      `;

      const errorResponse = {
        statusCode: 400,
        headers: {
          "x-custom-header" : "my custom header value"
        },
        body: JSON.stringify({
          message: 'Bad request Dude',
        }),
      };

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
