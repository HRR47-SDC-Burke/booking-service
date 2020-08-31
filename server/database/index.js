const { Pool } = require('pg');
const pool = new Pool({
  user: 'kizilsakal',
  password: 'nopassword',
  database: 'booking_db',
  ssl: { rejectUnauthorized: false }
});

const getListing = (id, callback) => {
  const queryString = 'SELECT * FROM listings WHERE id=$1';
  const queryArgs = [Number(id)];
  pool.connect()
    .then(client => {
      return client.query(queryString, queryArgs)
        .then(result => {
          client.release();
          callback(null, result.rows);
        })
        .catch(error => {
          client.release();
          callback(error, null);
        });
    });
};

const insertListing = (
  {ownerName, rating, numRatings, pricePerNight, discountAmount }, callback
) => {
  const queryString = 'INSERT INTO listings ('
  + '"ownerName", "rating", "numRatings", "pricePerNight", "discountAmount")'
  + ' VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const queryArgs = [ownerName, rating, numRatings, pricePerNight, discountAmount];
  pool.connect()
    .then (client => {
      client.query(queryString, queryArgs)
        .then(results => {
          client.release();
          callback(null, results.rows);
        })
        .catch(error => {
          console.log(error);
          client.release();
          callback(error, null);
        });
    });
};

const modifyListing = (listing, callback) => {
  const options = [
    'ownerName',
    'rating',
    'numRatings',
    'pricePerNight',
    'discountAmount',
  ];
  const queryArgs = [Number(listing.id)];
  const columns = [];
  const params = [];
  options.forEach(option => {
    if (listing[option] !== undefined) {
      columns.push(`"${option}"`);
      params.push('$' + (params.length + 2));
      queryArgs.push(listing[option]);
    }
  });
  const queryString = `UPDATE listings SET (id, ${columns.toString()}) `
  + `= ($1, ${params.toString()}) WHERE id = $1 RETURNING *`;
  console.log(queryString, queryArgs);
  pool.connect()
    .then(client => {
      return client.query(queryString, queryArgs)
        .then(result => {
          client.release();
          callback(null, result.rows);
        })
        .catch(error => {
          client.release();
          callback(error, null);
        });
    });
};

const deleteListing = (id, callback) => {
  const queryString = 'DELETE FROM listings WHERE id=$1 RETURNING *';
  const queryArgs = [Number(id)];
  pool.connect()
    .then(client => {
      return client.query(queryString, queryArgs)
        .then(result => {
          client.release();
          callback(null, result.rows);
        })
        .catch(error => {
          console.log(error);
          client.release();
          callback(error, null);
        });
    });
};

module.exports = {
  getListing,
  insertListing,
  modifyListing,
  deleteListing,
};
