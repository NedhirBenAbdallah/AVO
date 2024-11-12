const express = require('express');
const router = express.Router();
const CauseArretController = require('../controllers/CauseArretController');


  

// Create a new track
router.post('/', CauseArretController.createCauseArret);

// Get all tracks
router.get('/', CauseArretController.getAllCauseArret);

// Get a ligne by ID
router.get('/:id', CauseArretController.getCauseArretById);

module.exports = router;
