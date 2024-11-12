const pool = require('../config/db');

// Helper function to get the week number
const getWeekNumber = (date) => {
  const startDate = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
  return Math.ceil((date.getDay() + 1 + days) / 7);
};

// Create a new track record
exports.createTrack = async (req, res) => {
  try {
    const { date_start, ligne_id, qt, h_paye, capacity } = req.body;
    const date = new Date(date_start);
    const week_number = getWeekNumber(date);
    const day_name = date.toLocaleDateString('en-US', { weekday: 'long' });

    const result = await pool.query(
      `INSERT INTO "track" (date_start, week_number, day_name, ligne_id, qt, h_paye, capacity) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [date_start, week_number, day_name, ligne_id, qt, h_paye, capacity]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error creating new track", error });
  }
};

// Get all tracks
exports.getAllTrack = async (req, res) => {
  try {
    const result = await pool.query(`SELECT *,"ligne".title as title FROM "track" left join "ligne" on "ligne".id = "track".ligne_id`);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving track records", error });
  }
};

// Get a single track by ID
exports.getTrackById = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM "track" WHERE id = $1`, [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Track not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving track", error });
  }
};

// Update a track by ID
exports.updateTrack = async (req, res) => {
  try {
    const { date_start, ligne_id, qt, h_paye, capacity } = req.body;
    const date = new Date(date_start);
    const week_number = getWeekNumber(date);
    const day_name = date.toLocaleDateString('en-US', { weekday: 'long' });

    const result = await pool.query(
      `UPDATE "track" SET date_start = $1, week_number = $2, day_name = $3, ligne_id = $4, qt = $5, h_paye = $6, capacity = $7 WHERE id = $8 RETURNING *`,
      [date_start, week_number, day_name, ligne_id, qt, h_paye, capacity, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Track not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error updating track", error });
  }
};

// Delete a track by ID
exports.deleteTrack = async (req, res) => {
  try {
    const result = await pool.query(`DELETE FROM "track" WHERE id = $1 RETURNING *`, [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Track not found" });
    }
    res.status(200).json({ message: "Track deleted successfully", track: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Error deleting track", error });
  }
};