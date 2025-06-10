-- Main table for city information
CREATE TABLE cities (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  population INTEGER,
  area INTEGER,
  description TEXT,
  history TEXT,
  must_visit BOOLEAN DEFAULT FALSE
);

-- Table for storing city attractions (1-to-many)
CREATE TABLE city_attractions (
  id SERIAL PRIMARY KEY,
  city_id INTEGER REFERENCES cities(id) ON DELETE CASCADE,
  attraction TEXT NOT NULL
);

-- Table for storing fun facts (1-to-many)
CREATE TABLE city_fun_facts (
  id SERIAL PRIMARY KEY,
  city_id INTEGER REFERENCES cities(id) ON DELETE CASCADE,
  fact TEXT NOT NULL
);

-- Optional: Indexes for faster searching
CREATE INDEX idx_city_name ON cities(name);
CREATE INDEX idx_city_attractions_city_id ON city_attractions(city_id);
CREATE INDEX idx_city_fun_facts_city_id ON city_fun_facts(city_id);

