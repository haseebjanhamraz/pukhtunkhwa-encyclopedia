import fs from 'fs';
import path from 'path';
import { pgClient } from '../lib/pg.js';

async function migrateDivisions() {
  try {
    // Connect to database
    await pgClient.connect();

    // Create divisions table if it doesn't exist
    await pgClient.query(`
      CREATE TABLE IF NOT EXISTS divisions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )
    `);

    // Create division_districts table if it doesn't exist
    await pgClient.query(`
      CREATE TABLE IF NOT EXISTS division_districts (
        id SERIAL PRIMARY KEY,
        division_id INTEGER REFERENCES divisions(id),
        district_name VARCHAR(255) NOT NULL
      )
    `);

    // Read and parse the JSON file
    const divisionsData = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'public', 'divisions.json'), 'utf8')
    );

    for (const division of divisionsData) {
      // Insert division data
      const divisionResult = await pgClient.query(
        `INSERT INTO divisions (name)
         VALUES ($1)
         RETURNING id`,
        [division.name]
      );

      const divisionId = divisionResult.rows[0].id;

      // Insert districts for this division
      for (const district of division.districts) {
        await pgClient.query(
          `INSERT INTO division_districts (division_id, district_name)
           VALUES ($1, $2)`,
          [divisionId, district]
        );
      }
    }

    console.log('Divisions data migration completed successfully');
  } catch (error) {
    console.error('Error migrating divisions data:', error);
  } finally {
    await pgClient.end();
  }
}

migrateDivisions();
