import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('node-complete', 'root', process.env.DB_PASS, {
  dialect: 'mysql',
  host: 'localhost'
});

export default sequelize;
