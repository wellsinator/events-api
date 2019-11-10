import SequelizeHierarchy from 'sequelize-hierarchy';

const Sequelize = SequelizeHierarchy();
const sequelize = new Sequelize('events', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
});

const Event = sequelize.define('event', {
  name: Sequelize.STRING,
}, {
  hierarchy: true,
});

const Point = sequelize.define('point', {
  date: Sequelize.DATE,
});

Event.hasMany(Point);
Point.belongsTo(Event);

const sync = async () => {
  try {
    await sequelize.sync({ force: true });

    const eat = await Event.create({ name: 'eat' });
    const pizza = await Event.create({ name: 'pizza', parentId: eat.id });
    const donut = await Event.create({ name: 'donut', parentId: eat.id });
    await Event.create({ name: 'big', parentId: pizza.id });
    await Event.create({ name: 'small', parentId: pizza.id });
    await Event.create({ name: 'big', parentId: donut.id });
    await Event.create({ name: 'small', parentId: donut.id });

    const sleep = await Event.create({ name: 'sleep' });
    await Event.create({ name: 'couch', parentId: sleep.id });
    await Event.create({ name: 'bed', parentId: sleep.id });

    const poop = await Event.create({ name: 'poop' });
    await Event.create({ name: 'big', parentId: poop.id });
    await Event.create({ name: 'small', parentId: poop.id });
  } catch(err) {
    console.log(err);
  }
};

sync();

module.exports = {
  Event,
  Point,
};
