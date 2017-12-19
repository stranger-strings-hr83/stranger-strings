// Add this to the VERY top of the first file loaded in your app
var apm = require('elastic-apm-node').start({
  // Set required app name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
  appName: 'Netflix Event Service',
  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: ''
});
const cluster = require('cluster');
// const http = require('http');
const express = require('express');
const cassandra = require('cassandra-driver');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(apm.middleware.express());

if (cluster.isMaster) {
  // Count the machine's CPUs
  var cpuCount = require('os').cpus().length;

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    // Replace the dead worker
    console.log('Worker %d died :(', worker.id);
    cluster.fork();
  });
// Code to run if we're in a worker process
} else {

  app.get('/', (req, res) => {
    res.send('Hello World!' + cluster.worker.id);
  });

  app.post('/event', (req, res) => {
    console.log(req.body);
    db.addEvent(req.body, (result) => {
      res.status(200).send(`RESULT: ${result}`);
    });
  });

  app.get('/test', function(booya) {
    console.log('hi');
  });
  app.listen(8080, function () {
    console.log('Worker %d running!', cluster.worker.id);
  });
}

// function serve(ip, port) {
//   http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end("There's no place like " + ip + ":" + port + "\n");
//   }).listen(port, ip);
//   console.log('Server running at http://' + ip + ':' + port + '/');
// }

// serve('127.0.0.1', 8080);
// serve('127.0.0.1', 8081);
// serve('127.0.0.1', 8080);


// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.post('/event', (req, res) => {
//   console.log(req.body);
//   db.addEvent(req.body, (result) => {
//     res.status(200).send(`RESULT: ${result}`);
//   });
// });

// const server = app.listen(8080, function () {
//   var port = server.address().port;
//   console.log('Listening on port %s', port);
// });