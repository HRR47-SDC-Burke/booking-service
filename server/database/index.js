const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'booking_db'
});

const getListing = (id, callback) => {
  const queryString = 'SELECT * from listings WHERE id=?';
  const queryArgs = [id];
  client.execute(queryString, queryArgs, { prepare: true })
    .then((results) => {
      callback(null, results.rows);
    })
    .catch((err) => {
      callback(err, null);
    });
};

const insertListing = (listing, callback) => {
  const queryString = 'INSERT INTO listings (\
      "id", \
      "ownerName", \
      "rating", \
      "numRatings", \
      "pricePerNight", \
      "discountAmount" \
    ) values (?, ?, ?, ?, ?, ?)';
  const queryArgs = [
    listing.id,
    listing.ownerName,
    listing.rating,
    listing.numRatings,
    listing.pricePerNight,
    listing.discountAmount
  ];
  client.execute(queryString, queryArgs, { prepare: true })
    .then((results) => {
      callback(null, results);
    })
    .catch((err) => {
      callback(err, null);
    });
};

const modifyListing = (listing, callback) => {
  const queryString = 'UPDATE listings SET \
      "ownerName" = ?, \
      "rating" = ?, \
      "numRatings" = ?, \
      "pricePerNight" = ?, \
      "discountAmount" = ? \
      WHERE id = ?';
  const queryArgs = [
    listing.ownerName,
    listing.rating,
    listing.numRatings,
    listing.pricePerNight,
    listing.discountAmount,
    listing.id
  ];
  client.execute(queryString, queryArgs, { prepare: true })
    .then((results) => {
      callback(null, results);
    })
    .catch((err) => {
      callback(err, null);
    });
};

const deleteListing = (id, callback) => {
  const queryString = 'DELETE FROM listings WHERE id = ?';
  const queryArgs = [id];
  client.execute(queryString, queryArgs, { prepare: true })
    .then((results) => {
      callback(null, results);
    })
    .catch((err) => {
      callback(err, null);
    });
};

module.exports = {
  getListing,
  insertListing,
  modifyListing,
  deleteListing,
};
