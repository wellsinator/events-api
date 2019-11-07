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

app.get('/events/:id/children', async (req, res) => {
  const { id } = req.params;
  const events = await db.Event.findAll({ where: { parentId: id } });
  res.send(events);
});

app.post('/events', async (req, res) => {
  const { event, name } = req.body;
  const eventParams = { name };

  if (event) {
    eventParams.parentId = event.id;
  }

  await db.Event.create(eventParams);
  res.send();
});

app.post('/points', async (req, res) => {
  const { event } = req.body;
  await db.Point.create({ eventId: event.id });
  res.send();
});

app.listen(port, async () => {
  console.log(`Listening on port ${port}!`);
});
