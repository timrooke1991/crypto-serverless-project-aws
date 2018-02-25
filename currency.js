'use strict';
var fs = require('fs');


 exports.get = function(event, context) {
   // var contents = fs.readFileSync("public/index.html");

   // load pass API data into it

   var html = `<pre>${event}</pre>`;


   context.succeed({
     statusCode: 200,
     // body: contents.toString(),
     body: html,
     headers: {'Content-Type': 'text/html'}
   });
 };

 // A function to grab key typed by the user
 //
