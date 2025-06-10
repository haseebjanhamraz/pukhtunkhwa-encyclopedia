import fs from 'fs';
import path from 'path';
import { pgClient } from '../lib/pg.js';

async function migrateCities() {
  try {
    // Connect to database
    await pgClient.connect();

    // Read and parse the JSON file
    const citiesData = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'public', 'city.json'), 'utf8')
    );

    for (const city of citiesData) {
      // Insert city data
      const cityResult = await pgClient.query(
        `INSERT INTO cities 
         (name, image, latitude, longitude, population, area, description, history, must_visit)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING id`,
        [
          city.name,
          city.image,
          city.coordinates[0],
          city.coordinates[1], 
          city.population,
          city.area,
          city.description,
          city.history,
          city.mustVisit || false
        ]
      );

      const cityId = cityResult.rows[0].id;

      // Insert attractions
      if (city.attractions && Array.isArray(city.attractions)) {
        for (const attraction of city.attractions) {
          await pgClient.query(
            `INSERT INTO city_attractions (city_id, attraction)
             VALUES ($1, $2)`,
            [cityId, attraction]
          );
        }
      }

      // Insert fun facts
      if (city.funFacts && Array.isArray(city.funFacts)) {
        for (const fact of city.funFacts) {
          await pgClient.query(
            `INSERT INTO city_fun_facts (city_id, fact)
             VALUES ($1, $2)`,
            [cityId, fact]
          );
        }
      }
    }

    console.log('Cities data migration completed successfully');
  } catch (error) {
    console.error('Error migrating cities data:', error);
  } finally {
    await pgClient.end();
  }
}

migrateCities();
