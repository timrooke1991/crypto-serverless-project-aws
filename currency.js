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
              <p>${json['RAW'][ticker]['USD']['FROMSYMBOL']}</p>
              <h2>${json['DISPLAY'][ticker]['USD']['PRICE']}</h2>
            </div>
          </a>
        </li>
        <li class="tile-job">
          <a href="#">
            <div class="tile-primary-content">
              <h2>Market</h2>
              <p>${json['DISPLAY'][ticker]['USD']['MARKET']}</p>
            </div>
            <div class="tile-secondary-content">
              <p><small>SUPPLY</small>${json['DISPLAY'][ticker]['USD']['SUPPLY']}</p>
              <p><small>MCAP</small>${json['DISPLAY'][ticker]['USD']['MKTCAP']}</p>
              <p><small>${json['DISPLAY'][ticker]['USD']['LASTUPDATE']}</small></p>
            </div>
          </a>
        </li>
        <li class="tile-facebook">
          <a href="#">
            <div class="tile-primary-content">
              <h2>24hr Trading</h2>
              <p>${json['DISPLAY'][ticker]['USD']['CHANGE24HOUR']} | ${json['DISPLAY'][ticker]['USD']['CHANGEPCT24HOUR']}</p>
            </div>
            <div class="tile-secondary-content">
              <p><small>OPEN</small>${json['DISPLAY'][ticker]['USD']['OPEN24HOUR']}</p>
              <p><small>HIGH</small>${json['DISPLAY'][ticker]['USD']['HIGH24HOUR']}</p>
              <p><small>LOW</small>${json['DISPLAY'][ticker]['USD']['LOW24HOUR']}</p>
              <p><small>VOLUME</small>${json['DISPLAY'][ticker]['USD']['VOLUME24HOUR']}</p>
            </div>
          </a>
        </li>
        <li class="tile-twitter">
          <a href="https://twitter.com/chrisgrabinski">
            <div class="tile-primary-content">
              <h2>Twitter</h2>
              <p>@chrisgrabinski Lol. What's wrong with your CSS, bro?</p>
            </div>
            <div class="tile-secondary-content">
              <p>Follow us on Twitter</p>
            </div>
          </a>
        </li>
        <li class="tile-person">
          <a href="#">
            <div class="tile-primary-content">
              <img src="https://pbs.twimg.com/profile_images/687989817171288064/Y4PzAmSn.jpg" alt="">
            </div>
            <div class="tile-secondary-content">
              <div class="tile-secondary-container">
                <h2>Chris Grabinski</h2>
                <p>Front-end Development</p>
              </div>
            </div>
          </a>
        </li>
        <li class="tile-client">
          <a href="#">
            <div class="tile-primary-content">
              <img src="https://i.imgur.com/I6YDabc.png" alt="">
            </div>
          </a>
        </li>
            </ul>
      </body>
      </html>
      `;

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
