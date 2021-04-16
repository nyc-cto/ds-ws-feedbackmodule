const express = require('express');
const redis =  require('redis');

const app = express();
const client = redis.createClient({
  host: 'redis-server',
  port: 6379
});

client.set('visit', "0");

app.get('/', (req, res) => {
  client.get('visit', (err, visit) => {
    client.set('visit', parseInt(visit) + 1);
    res.send("Number of visits is " + visit);
  });
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});