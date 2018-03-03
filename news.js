'use strict';
var fs = require('fs');
var request = require('request');
var rp = require('request-promise');

 exports.get = function(event, context) {

   rp(`https://min-api.cryptocompare.com/data/news/?lang=EN`)
     .then(function (response) {
       response = JSON.parse(response);
       // console.log(json);
       var articleHTML = ``;
       for (var i = 0; i < 11; i++) {
         articleHTML +=
         `<div class="column">
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img src="${response[i]['imageurl']}" alt="Placeholder image">
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img src="${response[i]['source_info']['img']}" alt="${response[i]['source_info']['name']}">
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="is-4">${response[i]['source_info']['name']}</p>
                    <p class="subtitle is-6"><a href="${response[i]['published_on']}" target="_blank"></a></p>
                  </div>
                </div>

                <div class="content">
                  <p class="title is-6">${response[i]['title']}</p>
                </div>
              </div>
            </div>
          </div>`;
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

               <link href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css" rel="stylesheet">

           </head>

           <body class="">
              <h1>News</h1>
              <div class="columns">
                  ${articleHTML}
                </div>
              </div>
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
