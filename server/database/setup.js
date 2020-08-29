const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1'
});

const queries = {
  createKeyspace: 'CREATE KEYSPACE IF NOT EXISTS "booking_db" WITH replication='
  + '{\'class\': \'SimpleStrategy\', \'replication_factor\': \'1\' }',
  useKeyspace: 'USE booking_db',
  createTable: 'CREATE TABLE IF NOT EXISTS booking_db.listings ('
  + 'id int PRIMARY KEY,'
  + '"ownerName" text,'
  + '"rating" decimal,'
  + '"numRatings" int,'
  + '"pricePerNight" int,'
  + '"discountAmount" int'
  + ')'
};

client.execute(queries.createKeyspace)
  .then(res => {
    console.log('Keyspace "booking_db" OK');
    return client.execute(queries.useKeyspace);
  })
  .then(res => {
    return client.execute(queries.createTable);
  })
  .then(res => {
    console.log('Table "booking_db.listings" OK');
    client.shutdown();
  })
  .catch(err => console.log(err));
