// routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Route GET pour récupérer tous les utilisateurs
router.get('/', userController.getAllUsers);

// Route POST pour ajouter un utilisateur
router.post('/', userController.addUser);

// Route PUT pour mettre à jour un utilisateur
router.put('/:id', userController.updateUser);

// Route DELETE pour supprimer un utilisateur
router.delete('/:id', userController.deleteUser);

module.exports = router;
