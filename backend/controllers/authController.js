const jwt = require('jsonwebtoken');
const pool = require('../config/db'); 
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM "user" WHERE username = $1', [username]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = password == user.rows[0].password;

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.rows[0].id, role: user.rows[0].role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ token, role: user.rows[0].role });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};