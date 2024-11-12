const pool = require('../config/db');

// Create a new ligne
const createLigne = async (req, res) => {
  const { title, h1000, cadence } = req.body; // Adjust these fields to match your table structure

  if (!title || !h1000 || !cadence) { // Validate the request body
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO "ligne" (title, h1000, cadence) VALUES ($1, $2, $3) RETURNING *',
      [title, h1000, cadence]
    );
    return res.status(201).json(result.rows[0]); // Return the created item
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Read all lignes
const getAllLignes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "ligne"');
    
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Read a single ligne by ID
const getLigneById = async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters
  try {
    const ligne = await pool.query('SELECT * FROM "ligne" WHERE id = $1', [id]);
    if (ligne.rows.length === 0) {
      return res.status(404).json({ message: 'Ligne not found' });
    }
    return res.status(200).json({ ligne: ligne.rows[0] });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a ligne
const updateLigne = async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters
  const { title, h1000, cadence } = req.body; // Adjust these fields to match your table structure

  if (!title || !h1000 || !cadence) { // Validate the request body
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const result = await pool.query(
      'UPDATE "ligne" SET title = $1, h1000 = $2, cadence = $3 WHERE id = $4 RETURNING *',
      [title, h1000, cadence, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Ligne not found' });
    }
    return res.status(200).json({ ligne: result.rows[0] });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a ligne
const deleteLigne = async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters
  try {
    const result = await pool.query('DELETE FROM "ligne" WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Ligne not found' });
    }
    return res.status(200).json({ message: 'Ligne deleted successfully', ligne: result.rows[0] });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fetch status options
const getStatusOptions = async (req, res) => {
  try {
    const result = await pool.query('SELECT title FROM "ligne"');
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Export the controller functions
module.exports = {
  createLigne,
  getAllLignes,
  getLigneById,
  updateLigne,
  deleteLigne,
  getStatusOptions
};