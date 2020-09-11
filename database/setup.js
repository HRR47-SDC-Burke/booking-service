const { Client } = require('pg');
const client = new Client({
  user: process.env.POSTGRES_USER || 'kizilsakal',
  password: process.env.POSTGRES_PASSWORD || 'nopassword',
  database: process.env.POSTGRES_DB || 'booking_db',
  host: process.env.POSTGRES_URL || 'localhost',
  port: process.env.POSTGRES_PORT || 5432,
  ssl: { rejectUnauthorized: false }
});

client.connect()
  .then(() => {
    const queryText = 'CREATE TABLE IF NOT EXISTS listings ('
      + 'id SERIAL PRIMARY KEY,'
      + '"ownerName" VARCHAR(50) NOT NULL,'
      + '"rating" NUMERIC DEFAULT 0,'
      + '"numRatings" INT DEFAULT 0,'
      + '"pricePerNight" NUMERIC NOT NULL,'
      + '"discountAmount" INT DEFAULT 0)';
    return client.query(queryText);
  })
  .then(() => client.query(
    'SELECT setval(\'listings_id_seq\', (SELECT MAX(id) from "listings"))'
  ))
  .then(res => {
    const setval = res.rows[0].setval;
    if (setval) {
      console.log(`Table "listings" OK. Pkey setval is at ${setval}.`);
      return;
    }
    console.log(
      'Table "listings" OK. \nPkey sequence is not set.'
      + ' Please run this script again after loading data.\n'
    );
  })
  .then(() => client.end())
  .catch(err => console.log(err));
