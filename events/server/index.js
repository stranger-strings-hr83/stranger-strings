// Add this to the VERY top of the first file loaded in your app
const apm = require('elastic-apm-node').start({
  // Set required app name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
  appName: 'Netflix Event Service',
  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: '',
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
  const cpuCount = require('os').cpus().length;

  // Create a worker for each CPU
  for (let i = 0; i < cpuCount; i += 1) {
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
    res.send(`Hello World! ${cluster.worker.id}`);
  });

  app.post('/event', (req, res) => {
    console.log(req.body);
    db.addEvent(req.body, (result) => {
      res.status(200).send(`RESULT: ${result}`);
    });
  });

  app.listen(8080, () => {
    console.log('Worker %d running!', cluster.worker.id);
  });
}
