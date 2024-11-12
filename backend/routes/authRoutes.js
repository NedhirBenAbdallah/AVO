const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
// const userController = require('../controllers/userController');




router.post('/login', authController.login);
//router.get('/login', authController.login);
// router.post('/deleteUser', userController.deleteUser);
// router.post('/login', authController.login);
// router.post('/updateUser', userController.updateUser);
// router.post('/addUser', userController.addUser);
module.exports = router;
