const express = require('express');
const path = require('path');
const db = require('../database/helpers');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/(:id)', express.static(path.join(__dirname, '../public')));

app.get('/api/booking/:id', (req, res) => {
  const { id } = req.params;
  db.queryTableDataFromID(id, (listingErr, listing) => {
    if (listingErr) {
      console.error(`Error querying listing in database: ${listingErr}`);
      res.status(500).send(listingErr);
    } else {
      res.status(200).send({
        listing,
      });
    }
  });
});

app.post('/api/booking/:id', (req, res) => {
  const { id } = req.params;
  const listing = req.body;
  db.insertListing(listing, (error, result) => {
    if (error) {
      res.status(500).end('There was an error. Please try again later.');
    } else {
      listing.id = result.insertId;
      res.status(200).send({listing: [listing]}).end();
    }
  });
});

app.put('/api/booking/:id', (req, res) => {
  const { id } = req.params;
  const modifiedListing = req.body;
  db.queryTableDataFromID(id, (error, results) => {
    const listing = results[0];
    if (!listing) {
      res.status(404).end('Listing was not found.');
    }
    if (error) {
      res.status(500).end('There was an error. Please try again later.');
    } else {
      delete modifiedListing.id;
      Object.assign(listing, modifiedListing);
      db.modifyListing(listing, (error, result) => {
        if (error) {
          res.status(500).end('There was an error. Please try again later.');
        } else {
          res.status(200).send({listing: [listing]}).end();
        }
      });
    }
  });
});

app.delete('/api/booking/:id', (req, res) => {
  const { id } = req.params;
  db.queryTableDataFromID(id, (error, results) => {
    const listing = results[0];
    if (!listing) {
      res.status(404).end('Listing was not found.');
    }
    if (error) {
      res.status(500).end('There was an error. Please try again later.');
    } else {
      db.deleteListing(id, (error, result) => {
        if (error) {
          res.status(500).end('There was an error. Please try again later.');
        } else {
          res.status(200).send({listing: [listing]}).end();
        }
      });
    }
  });
});

app.get('/assets/airbnb_rating_star.png', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/assets/airbnb_rating_star.png'));
});

app.listen(port);
console.log('Now listening on port ', port);
