import process from "process"
import { Sequelize } from 'sequelize-typescript';
import Person from "../models/Person";

const sequelize = new Sequelize({
  database: process.env.POSTGRES_DB,
  dialect: 'postgres',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.DB_HOST,
  models: [Person],
});

export default sequelize;
