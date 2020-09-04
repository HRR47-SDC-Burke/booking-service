require('dotenv').config();
require('newrelic');
const express = require('express');
const path = require('path');
const db = require('./../database');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3002;

/**
 * Serve the bundled JS file from cloud
 */
const CLOUD_BUNDLE_URL = process.env.CLOUD_BUNDLE_URL;
if (CLOUD_BUNDLE_URL) {
  app.get('*/bundle.js', (req, res) => {
    res.redirect(CLOUD_BUNDLE_URL);
  });
}

/**
 * Middleware and Static File Routing
 */
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/(:id)', express.static(path.join(__dirname, '../public')));

/**
 * GET API
 */
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

/**
 * POST API
 */
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

/**
 * PUT API
 */
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

/**
 * DELETE API
 */
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

module.exports = { app, port };
