'use strict';
var fs = require('fs');
var request = require('request');
var rp = require('request-promise');

 exports.get = function(event, context) {

   rp(`https://min-api.cryptocompare.com/data/news/?lang=EN`)
     .then(function (response) {
       // var json = JSON.parse(response);
       // console.log(json);
       var articleHTML = ``;
       for (var i = 0; i < 11; i++) {
         articleHTML += `<h3>response[i][title]</h3>`;
       }
       console.log(articleHTML);

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
              <h1>News</h1>
              ${articleHTML}
           </body>
         </html>
       `;
       console.log(html);
       return html;
     })
     .then(function(html) {
       console.log(html);
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
