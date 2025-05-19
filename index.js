// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});
app.get("/api/whoami", function(req,res) {
  //IP
  let forward = req.headers["x-forwarded-for"];
  let ip = forward;

  if (forward) {
    let grab = forward.split(",");
    ip = grab[0].trim();
  }
  else {
    let check;
    if (req.ip) {
      check = req.ip;
    }
    else {
      check = req.socket.remoteAddress;
    }
    ip = check.replace(/^::ffff:/, "");
    if (ip === "::1") {
      ip = "127.0.0.1";
    }
  }
  //Lang
  let language = "";
  if (req.headers["accept-language"]) {
    language = req.headers["accept-language"].split(",")[0];
  }
  //Software
  let soft = req.headers["user-agent"] || "";
  res.json({ipaddress: ip, language : language, software: soft});
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('App listening on port ' + listener.address().port);
});
