const express = require('express');
const router = express.Router();
const trackController = require('../controllers/trackController');

// Create a new track
router.post('/', trackController.createTrack);

// Get all tracks
router.get('/', trackController.getAllTrack);

// Get a track by ID
router.get('/:id', trackController.getTrackById);

// Update a track by ID
router.put('/:id', trackController.updateTrack);

// Delete a track by ID
router.delete('/:id', trackController.deleteTrack);

module.exports = router;