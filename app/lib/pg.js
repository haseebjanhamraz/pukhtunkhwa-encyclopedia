import { Client } from 'pg';

export const pgClient = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'pukhtunkhwa01',
  password: 'haseeb',
  port: 5432,
});
