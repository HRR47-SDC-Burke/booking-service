const mariadb = require('mariadb');
const { dbConnectionOptions } = require('./login');

const queryTableDataFromID = (id, callback) => {
  let conn;
  mariadb.createConnection(dbConnectionOptions)
    .then((connection) => {
      conn = connection;
      const queryString = `SELECT * from listings WHERE (id=${id})`;
      return conn.query(queryString);
    })
    .then((results) => {
      conn.close();
      callback(null, results);
    })
    .catch((err) => {
      conn.close();
      callback(err, null);
    });
};

const insertListing = (listing, callback) => {
  let conn;
  mariadb.createConnection(dbConnectionOptions)
    .then((connection) => {
      conn = connection;
      const queryString = 'INSERT INTO listings (\
          ownerName, \
          rating, \
          numRatings, \
          pricePerNight, \
          discountAmount \
        ) values (?, ?, ?, ?, ?)';
      const queryArgs = [
        listing.ownerName,
        listing.rating,
        listing.numRatings,
        listing.pricePerNight,
        listing.discountAmount
      ];
      return conn.query(queryString, queryArgs);
    })
    .then((results) => {
      conn.close();
      callback(null, results);
    })
    .catch((err) => {
      conn.close();
      callback(err, null);
    });
};

const modifyListing = (listing, callback) => {
  let conn;
  mariadb.createConnection(dbConnectionOptions)
    .then((connection) => {
      conn = connection;
      const queryString = 'UPDATE listings SET \
          ownerName = ?, \
          rating = ?, \
          numRatings = ?, \
          pricePerNight = ?, \
          discountAmount = ? \
          WHERE id = ?';
      const queryArgs = [
        listing.ownerName,
        listing.rating,
        listing.numRatings,
        listing.pricePerNight,
        listing.discountAmount,
        listing.id
      ];
      return conn.query(queryString, queryArgs);
    })
    .then((results) => {
      conn.close();
      callback(null, [listing]);
    })
    .catch((err) => {
      conn.close();
      callback(err, null);
    });
};

module.exports = {
  queryTableDataFromID,
  insertListing,
  modifyListing,
};
