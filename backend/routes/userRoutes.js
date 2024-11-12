// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const authenticateJWT = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');
const { countUsersByRole } = require('../controllers/userController');

router.get('/count-users', countUsersByRole);

// Other routes
router.post('/add', userController.createUser);
// router.get('/all', authenticateJWT, authorizeRole('admin'), userController.getAllUsers);
// router.get('/profile', authenticateJWT, userController.getUserProfile);
// router.put('/update/:id', authenticateJWT, authorizeRole('admin'), userController.updateUser);
// router.delete('/delete/:id', authenticateJWT, authorizeRole('admin'), userController.deleteUser);

module.exports = router;