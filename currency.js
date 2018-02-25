'use strict';
var fs = require('fs');


 exports.get = function(event, context) {
   var contents = fs.readFileSync("public/index.html");

   // load pass API data into it

   // var html = `<p>Hello ${event.pathParameter.currency}</p>`;
   var json = event;


   context.succeed({
     statusCode: 200,
     // body: contents.toString(),
     body: json,
     headers: {'Content-Type': 'application/json'}
   });
 };

 // A function to grab key typed by the user
 //
