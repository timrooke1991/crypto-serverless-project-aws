'use strict';
var Promise = require('bluebird');
var rp = require('request-promise');


exports.get = function(event, context) {
  // Grabs ticker from URL
  const ticker = event.pathParameters.currency;
  const requests = [{
    url: `https://min-api.cryptocompare.com/data/histoday?fsym=${ticker}&tsym=USD&limit=30`
  }, {
    url: `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ticker}&tsyms=USD`
  }];

  // Map over request object to gather all data
  Promise.map(requests, function(obj) {
    return rp(obj).then(function(body) {
      return JSON.parse(body);
    });
  }).then(function(results) {
    const json = results;
    const html = `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="utf-8">
        <title>Crypto app</title>
        <meta name="description" content="" />
        <link href="https://s3-eu-west-2.amazonaws.com/aws-codestar-eu-west-2-190388598975-crypto-serverle-app/public/assets/css/styles.css" rel="stylesheet">

    </head>

    <body class="">
    <ul class="masonry-list">
      <li class="tile-case">
        <a href="#">
          <div class="tile-primary-content">
            <h2>PERFORMANCE</h2>
            <p><small class="sub-title-blue">1 DAY</small>${
              (parseFloat(json[0]['Data'][29]['open'] - json[0]['Data'][30]['close']) / json[0]['Data'][30]['close'] * 100 ).toFixed(2)}%
            </p>
            <p><small class="sub-title-blue">3 DAY</small>
              ${parseFloat((json[0]['Data'][26]['open'] - json[0]['Data'][30]['close']) / json[0]['Data'][30]['close'] * 100).toFixed(2) }%
            </p>
            <p><small class="sub-title-blue">7 DAY</small>
              ${parseFloat((json[0]['Data'][22]['open'] - json[0]['Data'][30]['close']) / json[0]['Data'][30]['close'] * 100).toFixed(2) }%
            </p>
            <p><small class="sub-title-blue">30 DAY</small>
              ${parseFloat((json[0]['Data'][1]['open'] - json[0]['Data'][30]['close']) / json[0]['Data'][30]['close'] * 100).toFixed(2) }%
            </p>
          </div>
          <div class="tile-secondary-content">
              <p><small class="sub-title-blue">1 DAY</small>${json[0]['Data'][29]['open']}</p>
              <p><small class="sub-title-blue">3 DAY</small>${json[0]['Data'][26]['open']}</p>
              <p><small class="sub-title-blue">7 DAY</small>${json[0]['Data'][22]['open']}</p>
              <p><small class="sub-title-blue">30 DAY</small>${json[0]['Data'][1]['open']}</p>
          </div>
        </a>
      </li>
      <li class="tile-job">
        <a href="#">
          <div class="tile-primary-content">
            <h2>Market</h2>
            <p>${json[1]['DISPLAY'][ticker]['USD']['MARKET']}</p>
          </div>
          <div class="tile-secondary-content">
            <p></p>
            <small class="sub-title-green">SUPPLY</small>
            <p class="no-margin">${json[1]['DISPLAY'][ticker]['USD']['SUPPLY']}</p>
            <small class="sub-title-green">MCAP</small>
            <p class="no-margin">${json[1]['DISPLAY'][ticker]['USD']['MKTCAP']}</p>
            <small class="sub-title">${json[1]['DISPLAY'][ticker]['USD']['LASTUPDATE']}</small>
          </div>
        </a>
      </li>
      <li class="tile-facebook">
        <a href="#">
          <div class="tile-primary-content">
            <h2>24hr Trading</h2>
            <p><small class="sub-title-blue">CHANGE $</small>${json[1]['DISPLAY'][ticker]['USD']['CHANGE24HOUR']}</p>
            <p><small class="sub-title-blue">CHANGE %</small>${json[1]['DISPLAY'][ticker]['USD']['CHANGEPCT24HOUR']}%</p>
          </div>
          <div class="tile-secondary-content">
            <p><small class="sub-title-blue">OPEN</small>${json[1]['DISPLAY'][ticker]['USD']['OPEN24HOUR']}</p>
            <p><small class="sub-title-blue">HIGH</small>${json[1]['DISPLAY'][ticker]['USD']['HIGH24HOUR']}</p>
            <p><small class="sub-title-blue">LOW</small>${json[1]['DISPLAY'][ticker]['USD']['LOW24HOUR']}</p>
            <p><small class="sub-title-blue">VOLUME</small>${json[1]['DISPLAY'][ticker]['USD']['VOLUME24HOUR']}</p>
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
            <h1 class="ticker-sym">${json[1]['DISPLAY'][ticker]['USD']['FROMSYMBOL']}</h1>
          </div>
        </a>
      </li>
          </ul>
    </body>
    </html>`;

    context.succeed({
      statusCode: 200,
      body: html,
      headers: {'Content-Type': 'text/html'}
    });
  }, function(err) {
    console.log('error: ', err);
  });
};
