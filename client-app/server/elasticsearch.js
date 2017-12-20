const elasticsearch = require('elasticsearch');

const elasticsearchClient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'info',
});

const indexName = "videos";

const deleteIndex = () => {
  return elasticsearchClient.indices.delete({
    index: indexName
  });
};

const initIndex = () => {
  return elasticsearchClient.indices.create({
    index: indexName
  });
};

const indexExists = () =>{
  return elasticsearchClient.indices.exists({
    index: indexName
  });
};

module.exports = {
  deleteIndex,
  initIndex, 
  indexExists,
  elasticsearchClient
};