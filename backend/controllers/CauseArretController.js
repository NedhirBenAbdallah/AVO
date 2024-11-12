const pool = require('../config/db');

// Create CauseArret
exports.createCauseArret = async (req, res) => {
  try {
    const { date_cause, cause, statusLigne, service, minutesArret } = req.body; // Ensure date_cause is included

    // Debugging log to check the request body
    console.log('Request Body:', req.body);
    console.log('Date Cause:', req.body.date_cause);



    // Fetch the title based on statusLigne
    const ligneResult = await pool.query(
      `SELECT title FROM "ligne" WHERE id = $1`,
      [statusLigne]
    );

    // Debugging log to check the result of the query
    console.log('Ligne Result:', ligneResult.rows);

    const ligne_Title = ligneResult.rows[0]?.title; // Extract the ligne_Title

    if (!ligne_Title) {
      return res.status(404).json({ message: "Ligne not found for the provided id" });
    }

    // Insert into CauseArret
    const result = await pool.query(
      `INSERT INTO "CauseArret" 
        (date_cause, causearret, service, minutearret, ligne_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [date_cause, cause, service, minutesArret, statusLigne]
    );

    res.status(201).json({ ...result.rows[0], ligne_Title }); // Include ligne_Title in the response
  } catch (error) {
    res.status(500).json({ message: "Error creating Cause d'arret", error });
    console.log('Error:', error);
  }
};

// Get all CauseArret
exports.getAllCauseArret = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM "CauseArret"`);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving CauseArret records", error });
  }
};

// Get a single CauseArret by ID
exports.getCauseArretById = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM "CauseArret" WHERE id = $1`, [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Cause not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Cause", error });
  }
};