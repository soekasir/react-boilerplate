const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
// const data = require('./src/api/json/api.json');


//favicon dan static
app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));


// // Api Json-Server
// app.get('/api/calendar', function (req, res) {
//   res.header("Content-Type",'application/json');
//   res.send((JSON.stringify(data.calender)));
// });


//reactjs
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(port);