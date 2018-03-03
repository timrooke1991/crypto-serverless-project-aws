'use strict';
var fs = require('fs');

 exports.get = function(event, context) {

   rp(`https://min-api.cryptocompare.com/data/news/?lang=EN`)
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

 // A function to grab key typed by the user
 //
