const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const redis = require('redis');
const genPath = require('../videos/assets/content_generators/generatePath');

let app = express();
let client = redis.createClient();

app.use(bodyParser.json());

client.on('error', function (err) {
  console.log('Error ' + err);
});

app.get('/video/:Id', (req, res) => {
  let videoID = req.params.Id;
  let bytesSent = 0;
  // retrieve video path from redis cache
  client.get(videoID, (error, result) => {
    if (result) {
      // get file size
      let stats = fs.statSync(`${result}`);
      let fileSizeInBytes = stats.size;

      // send video stream 
      res.writeHead(200, { 'Content-Type': 'video/mp4' });
      // create stream to collect data
      let stream = fs.createReadStream(`${result}`);
      stream.on('data', (chunk) => {
        bytesSent += chunk.length;
        console.log(`Sent: ${chunk.length} bytes, Total: ${bytesSent}/${fileSizeInBytes} bytes`);
      }).pipe(res);
      stream.on('end', () => {
        console.log(`Sent ${fileSizeInBytes}/${fileSizeInBytes} bytes`);
      });
    } else {
      // if video not in cache and id less than 5000 get store video[id]
      if (videoID <= 5000) {
        // add to video cache
        client.set(videoID, `../videos/video_files/${videoID}.mp4`);
        console.log(`Added video ID:${videoID} to cache`);
        
        let stats = fs.statSync(`../videos/video_files/${videoID}.mp4`);
        let fileSizeInBytes = stats.size;

        res.writeHead(200, { 'Content-Type': 'video/mp4' });
        let stream = fs.createReadStream(`../videos/video_files/${videoID}.mp4`);  
        stream.on('data', (chunk) => {
          bytesSent += chunk.length;
          console.log(`Sent: ${chunk.length} bytes, Total: ${bytesSent}/${fileSizeInBytes} bytes`);
        }).pipe(res);
        stream.on('end', () => {
          console.log(`Sent ${fileSizeInBytes}/${fileSizeInBytes} bytes`);
        });
      } else {
        // if not in cache and id > 5000 generate path to video and store 
        let path = genPath(); 

        client.set(videoID, `../videos/video_files/${path}.mp4`);
        console.log(`Added video ID:${videoID} to cache`);
        
        let stats = fs.statSync(`../videos/video_files/${path}.mp4`);
        let fileSizeInBytes = stats.size;

        res.writeHead(200, { 'Content-Type': 'video/mp4' });
        let stream = fs.createReadStream(`../videos/video_files/${path}.mp4`);
        stream.on('data', (chunk) => {
          bytesSent += chunk.length;
          console.log(`Sent: ${chunk.length} bytes, Total: ${bytesSent}/${fileSizeInBytes} bytes`);
        }).pipe(res);
        stream.on('end', () => {
          console.log(`Sent ${fileSizeInBytes}/${fileSizeInBytes} bytes`);
        });
      }
    }
  });
});

// app.post(); //TODO

app.listen(3000, () => {
  console.log('Listening on port 3000');
});