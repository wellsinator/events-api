const Sequelize = require('sequelize');
const sequelize = new Sequelize('events', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
});

const Event = sequelize.define('event', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Point = sequelize.define('point');

Event.hasMany(Event, { as: 'Children' });
Event.hasMany(Point);
Point.belongsTo(Event);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = {
  sequelize,
  Sequelize,
  Event,
  Point,
};
