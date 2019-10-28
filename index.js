import express from 'express';
import mongoist from 'mongoist';

const app = express();
const port = 3000;
const db = mongoist('mongodb://localhost:27017/events');

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}!`);
});
