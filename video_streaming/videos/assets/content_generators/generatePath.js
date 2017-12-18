let generate = (id) => {
  let randomVid = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  return randomVid(0, 5000);
};

module.exports = generate;