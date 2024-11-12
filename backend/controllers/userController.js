const bcrypt = require('bcrypt');
const pool = require('../config/db'); 

// Admin can create a user
exports.createUser = async (req, res) => {
  const { username, password, role } = req.body;


  // Check if the requester is an admin

  try {
    // Hash the password before storing it
    const hashedPassword =password;// await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO "user" (username, password, role) VALUES ($1, $2, $3) RETURNING *',
      [username, hashedPassword, role]
    );
  

    console.log(result)

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, role } = req.body;

  try {
    const hashedPassword = password;//await bcrypt.hash(password, 10);

    const result = await pool.query(
      'UPDATE "user" SET username = $1, password = $2, role = $3 RETURNING *',
      [username, hashedPassword, role]
    );

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

//user count
// Get user counts by role
exports.countUsersByRole = async (req, res) => {
  try {
    const result = await pool.query(`SELECT role, COUNT(*) as count FROM "user" GROUP BY role`);
    
    // Extract counts into a simple object
    const counts = {};
    result.rows.forEach(row => {
      counts[row.role] = row.count; // e.g., { user: 10, admin: 5 }
    });

    // Return only the counts
    res.status(200).json(counts); // Respond with just the counts object
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user counts by role", error });
  }
};
