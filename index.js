import bodyParser from 'body-parser';
import express from 'express';
import db from './db/index';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/events', async (req, res) => {
  const events = await db.Event.findAll();
  res.send(events);
});

app.post('/point', async (req, res) => {
  const point = req.body;
  await db.Point.create(point);
  res.send();
});

app.listen(port, async () => {
  console.log(`Listening on port ${port}!`);
});
