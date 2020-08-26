const faker = require('faker');
const mariadb = require('mariadb');
const { dbConnectionOptions } = require('./login');

const numberOfMockListings = 100;

const seedData = () => {
  const promiseArr = [];
  let connection;
  // Create connection to db
  mariadb.createConnection(dbConnectionOptions)
    .then((conn) => {
      connection = conn;
      for (let i = 0; i < numberOfMockListings; i += 1) {
        // Generate mock data for listings table for one listing
        const rating = (4 * Math.random() + 1);
        const mockListing = {
          ownerName: faker.name.firstName(),
          rating: rating.toFixed(2),
          numRatings: faker.random.number({ min: 5, max: 50 }),
          pricePerNight: faker.random.number({ min: 100, max: 1500 }),
          discountAmount: (faker.random.number({ min: 1, max: 2 }) === 1)
            ? faker.random.number({ min: 1, max: 50 })
            : 0,
        };
        // Craft query string from mock data
        const queryStringListing = `INSERT INTO listings
          (ownerName, rating, numRatings, pricePerNight, discountAmount)
          VALUES (
            '${mockListing.ownerName}',
            '${mockListing.rating}',
            '${mockListing.numRatings}',
            '${mockListing.pricePerNight}',
            '${mockListing.discountAmount}'
          );`;
        // Push query to the promise array
        promiseArr.push(conn.query(queryStringListing));
      }
      return Promise.all(promiseArr);
    })
    .then(() => {
      console.log('Successfully entered data into database');
      return connection.end();
    })
    .catch((err) => {
      console.error(`Error inserting into database: ${err}`);
    });
};

seedData();

module.exports = {
  seedData,
};
