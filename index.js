import bodyParser from 'body-parser';
import express from 'express';
import mongoist from 'mongoist';

const app = express();
const port = 3000;
const db = mongoist('mongodb://localhost:27017/events');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/events', async (req, res) => {
  const events = await db.events.find();
  res.send(events);
});

app.post('/point', async (req, res) => {
  const point = req.body;
  console.log(point);
  // await db.points.insertOne(point);
  res.send();
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}!`);
});
