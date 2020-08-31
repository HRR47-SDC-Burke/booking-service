const express = require('express');
const path = require('path');
const db = require('./../database');
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
      return;
    }
    if (!listing.length) {
      res.status(404).end('Listing was not found.');
      return;
    }
    res.status(200).send({ listing }).end();
  });
});

app.post('/api/booking', (req, res) => {
  const newListing = req.body;
  db.insertListing(newListing, (error, listing) => {
    if (error) {
      res.status(500).send('There was an error. Please try again later.');
      return;
    } else {
      res.status(201).send({ listing }).end();
    }
  });
});

app.put('/api/booking/:id', (req, res) => {
  const { id } = req.params;
  const modifiedListing = req.body;
  modifiedListing.id = id;
  db.modifyListing(modifiedListing, (error, listing) => {
    if (error) {
      res.status(500).end('There was an error. Please try again later.');
      return;
    }
    if (!listing.length) {
      res.status(404).end('Listing was not found.');
      return;
    }
    res.status(200).send({ listing }).end();
  });
});

app.delete('/api/booking/:id', (req, res) => {
  const { id } = req.params;
  db.deleteListing(id, (error, listing) => {
    if (error) {
      res.status(500).end('There was an error. Please try again later.');
      return;
    }
    if (!listing.length) {
      res.status(404).end('Listing was not found.');
      return;
    }
    res.status(200).send({ listing }).end();
  });
});

app.get('/assets/airbnb_rating_star.png', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/assets/airbnb_rating_star.png'));
});

module.exports = { app, port };
