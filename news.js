'use strict';
var rp = require('request-promise');
var moment = require('moment');

exports.get = function(event, context) {

  rp(`https://min-api.cryptocompare.com/data/news/?lang=EN`)
     .then(function (response) {
       response = JSON.parse(response);
       // console.log(json);
       var articleHTML = ``;
       var tagHTML = ``;
       for (var i = 0; i < 11; i++) {
         response[i]['categories'].split('|').forEach((tag) => {
           tagHTML += `<span class="tag">${tag}</span>`;
         });
         articleHTML +=
         `
            <div class="card">
              <div class="card-image">
              <a href="${response[i]['url']}" target="_blank>
                <figure class="image is-4by3">
                  <img src="${response[i]['imageurl']}" alt="Placeholder image">
                </figure>
              </a>
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
                    <p class="subtitle is-6">${moment.unix(response[i]['published_on']).fromNow()}</p>
                  </div>
                </div>

                <div class="content ctrl-height">
                  <a class="title is-6" href="${response[i]['url']}" target="_blank">${response[i]['title']}</a>
                </div>

                <div>
                  ${tagHTML}
                </div>
              </div>
            </div>
          `;
       }

       var html = `
         <!DOCTYPE html>
         <html lang="en">
           <head>
               <meta charset="utf-8">
               <title>Crypto app</title>
               <meta name="description" content="" />
               <link href="https://s3-eu-west-2.amazonaws.com/aws-codestar-eu-west-2-190388598975-crypto-serverle-app/public/assets/css/styles.css" rel="stylesheet">

               <link href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css" rel="stylesheet">

           </head>

           <body class="">
              <h1>News</h1>
              <div class="card-list">
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
