let spawn = require('child_process').spawn;

let randomSize = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

for (let i = 2501; i <= 3000; i++) {
  spawn('mkfile', [`${randomSize(1, 4)}M`, `${i}.mp4`]);
}