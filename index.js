import bodyParser from 'body-parser';
import express from 'express';
import db from './db';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/events/root', async (req, res) => {
  const events = await db.Event.findAll({ where: { parentId: null } });
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
