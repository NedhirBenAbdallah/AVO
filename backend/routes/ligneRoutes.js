const express = require('express');
const router = express.Router();
const ligneController = require('../controllers/ligneController');

// Create a new ligne
router.post('/', ligneController.createLigne);

// Get all lignes
router.get('/', ligneController.getAllLignes);

// Get a ligne by ID
router.get('/:id', ligneController.getLigneById);

// Update a ligne by ID
router.put('/:id', ligneController.updateLigne);

// Delete a ligne by ID
router.delete('/:id', ligneController.deleteLigne);

module.exports = router;