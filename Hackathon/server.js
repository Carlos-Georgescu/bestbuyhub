const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const port = process.argv[2] || 3000;



http.createServer(function (req, res) {
  console.log(`${req.method} ${req.url}`);

  // parse URL
  const parsedUrl = url.parse(req.url);
  // extract URL path
  let pathname = `.${parsedUrl.pathname}`;
  // based on the URL path, extract the file extention. e.g. .js, .doc, ...
  var ext = path.parse(pathname).ext;
  if (ext == '') {
    ext = '.html';
  }
  // maps file extention to MIME typere
  const map = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword'
  };

  if (pathname == './localhost/twillio:3000') {
    var accountSid2 = 'ACa412e98100489bd609b7ae372c1722c1';
    var authToken2 = '23697f5534b7c2492884c701fbf495f0';
    var client2 = require('twilio')(accountSid2, authToken2);

    client2.messages
        .create({
           body: 'An order has been placed from your Best Buy Hub.\n\nOrder: Apple MacBook Pro w/ Touch Bar 16 - Space Grey\n\nName: Gus Tahara-Edmonds\nEmail: gtaharaedmonds@gmail.com\nPickup time: 4:00PM',

           from: '+16477245179',
            to: '+16045377337'
         })
        .then(message => console.log("success"))
        .done();

        const accountSid = 'AC8c060f7d9d0c513ae3feff19e94afcd1';
        const authToken = '2d94531a54ead14fb9a8c08fa7126070';
        const client = require('twilio')(accountSid, authToken);


        client.messages
            .create({
               body: 'Thank you for your purchase. \nPresent the following code at your Best Buy Hub pickup location to receive your order:\n0X97H3FG10\n\nPickup location: UBC Sauder\nAddress: 2053 Main Mall, Vancouver\nPickup time: 4:00PM',

               from: '+16046700972',
                to: '+17783184489'
             })
            .then(message => console.log("success"))
            .done();

  } else {
    fs.exists(pathname, function (exist) {
      if(!exist) {
        // if the file is not found, return 404
        res.statusCode = 404;
        res.end(`File ${pathname} not found!`);
        return;
      }

      // if is a directory search for index file matching the extention
      if (fs.statSync(pathname).isDirectory()) pathname += '/index' + ext;

      // read file from file system
      fs.readFile(pathname, function(err, data){
        if(err){
          res.statusCode = 500;
          res.end(`Error getting the file: ${err}.`);
        } else {
          // if the file is found, set Content-type and send data
          res.setHeader('Content-type', map[ext] || 'text/plain' );
          res.end(data);
        }
      });
    });

  }



}).listen(parseInt(port));

console.log(`Server listening on port ${port}`);
