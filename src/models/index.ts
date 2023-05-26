import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
// import User from './user.ts';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD
} = process.env;

const sequelize: Sequelize = new Sequelize(`postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`, {dialect: "postgres"});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.log(`Unable to connect to the database: ${error}`);
});

// const db = {
//   Sequelize: Sequelize,
//   sequelize: sequelize,
//   users: User(sequelize, DataTypes)
// };

// export default db;

export default sequelize;
