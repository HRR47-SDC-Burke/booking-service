const express = require('express');
const path = require('path');
const db = require('./database');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/(:id)', express.static(path.join(__dirname, '../public')));

app.get('/api/booking/:id', (req, res) => {
  const { id } = req.params;
  db.getListing(id, (error, listing) => {
    if (error) {
      res.status(500).end('There was an error. Please try again later.');
    } else {
      if (!listing.length) {
        res.status(404).end('Listing was not found.');
        return;
      }
      res.status(200).send({
        listing,
      });
    }
  });
});

app.post('/api/booking', (req, res) => {
  const listing = req.body;
  db.insertListing(listing, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(201).send({listing: [listing]}).end();
    }
  });
});

app.put('/api/booking/:id', (req, res) => {
  const { id } = req.params;
  const modifiedListing = req.body;
  db.getListing(id, (error, results) => {
    const listing = results[0];
    if (error) {
      res.status(500).end('There was an error. Please try again later.');
    }
    if (!listing) {
      res.status(404).end('Listing was not found.');
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
  db.getListing(id, (error, results) => {
    const listing = results[0];
    if (error) {
      res.status(500).end('There was an error. Please try again later.');
    }
    if (!listing) {
      res.status(404).end('Listing was not found.');
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
