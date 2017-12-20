require('newrelic');
const compression = require('compression')
var express = require('express');  
const elasticsearch = require('../server/elasticsearch.js').elasticsearchClient;
const router = express.Router();
const http = require('http');
let redis = require('./cache.js').client;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const pg = require('../database/postgres/helpers');
const axios = require('axios'); 
const cassandra = require('../database/cassandra/helpers');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const Promise = require('bluebird');

redis = Promise.promisifyAll(redis.RedisClient.prototype);
http.globalAgent.maxSockets = Infinity;

const app = expres();
app.use(jsonParser);
app.use(compression);

  // checks to see if a user is cached. If they are, use the user information to return videos
  // if they are not, query the database by email(which is indexed) and then cache the user, return
  // the result
async function videos(user) {
  try{
      user = JSON.parse(user);
      return cassandra.findVideosById(user.id).then((result) =>{
        redis.set(`${user.email}`, JSON.stringify(result));
        return result;
      }); 
  } catch (error){
    return error
  }
};

app.get('/home', async (req, res) => {
  let reply  = await redis.getAsync(`${req.query.email}`);
    if (reply === null) {
      let result = await pg.grabUserByEmail(req.query.email);
        let vids = await videos(JSON.stringify(result[0]));
          res.status(201);
          res.send(vids);
    } else {
        res.status(201);
        res.send(reply);
    }
  });

  

app.listen(8080, ()=>console.log('now listening on 8080'));  
 


