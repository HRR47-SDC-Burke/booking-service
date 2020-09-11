const startTime = new Date();

const fs = require('fs');
const faker = require('faker');

/**
 * Define generationAmount for the entries
 */
const argv = process.argv.slice(2);
// Default generation amount is 10M if no argument is provided
let generationAmount = 10000000;
argv.forEach((arg, idx) => {
  const currentArg = arg.split('=');
  argv[idx] = currentArg;
  if (currentArg[0] === '--amount' || currentArg[0] === '-n') {
    generationAmount = Math.floor(Math.abs(currentArg[1]));
    if (isNaN(generationAmount)) {
      throw new Error('Invalid amount argument. Requires an integer.');
    }
    return;
  }
});

/**
 * Create temp folder if does not exist and append CSV columns to the data file
 */
fs.mkdirSync(__dirname + '/tmp', {recursive: true});
const columns = 'id,ownerName,rating,numRatings,pricePerNight,discountAmount\n';
fs.writeFileSync(__dirname + '/tmp/data.csv', columns, err => {
  if (err) {
    throw err;
  }
});

/**
 * Helper function to create a write stream
 */
const writeStream = fs.createWriteStream(
  __dirname + '/tmp/data.csv', {flags: 'a'}
);

// Create a reverse index starts from the generationAmount
let idx = generationAmount;

/**
 * Helper function to generate one random listing
 */
const generateListing = () => {
  return ''.concat(
    (generationAmount - idx), ',',
    faker.name.firstName(), ',',
    (4 * Math.random() + 1).toFixed(2), ',',
    faker.random.number({ min: 5, max: 50 }), ',',
    faker.random.number({ min: 100, max: 1500 }), ',',
    (faker.random.number({ min: 1, max: 2 }) === 1)
      ? faker.random.number({ min: 1, max: 50 })
      : 0,
    '\n'
  );
};

/**
 * Function to write large amount of listings data into the file
 */
const writeData = () => {
  let canWrite = true;
  do {
    idx--;
    if (idx === 0) {
      canWrite = writeStream.write(generateListing(), err => {
        if (err) {
          throw err;
        }
        console.log(
          `Generated ${generationAmount.toLocaleString()} records in`
          + ` ${(new Date() - startTime).toLocaleString()}ms\n`
          + 'Run the following command on psql to load data:\n'
          + 'COPY listings(id,'
          + '"ownerName","rating","numRatings","pricePerNight","discountAmount"'
          + `) FROM '${__dirname + '/tmp/data.csv'}' DELIMITER ',' CSV HEADER;`
        );
      });
    } else {
      canWrite = writeStream.write(generateListing());
    }
  } while (idx > 0 && canWrite);
  if (idx > 0) {
    writeStream.once('drain', writeData);
  }
};

// Execute the function to start appending the listings to the file
writeData();
