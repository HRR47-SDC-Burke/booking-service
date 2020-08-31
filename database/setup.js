const { Client } = require('pg');
const client = new Client({
  user: 'kizilsakal',
  password: 'nopassword',
  database: 'booking_db',
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
      'Table "listings" OK. \n'
      + 'Pkey sequence is not set. Please run this script again after loading data.\n'
      + 'Run the following command on psql to load data:\n'
      + 'COPY listings('
      + 'id,"ownerName", "rating","numRatings","pricePerNight","discountAmount")'
      + ` FROM '${__dirname + '/tmp/data.csv'}' DELIMITER ',' CSV HEADER;`
    );
  })
  .then(() => client.end())
  .catch(err => console.log(err));
