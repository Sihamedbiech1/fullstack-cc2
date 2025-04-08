const db = require('../models/db');

// Récupérer tous les utilisateurs
exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json(results);
  });
};

// Ajouter un nouvel utilisateur
exports.addUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Nom et email requis' });
  }

  const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.query(query, [name, email], (err, result) => {
    if (err) {
      console.error('Erreur SQL lors de l\'ajout de l\'utilisateur :', err);
      return res.status(500).json({ error: 'Erreur SQL' });
    }
    res.status(201).json({ message: 'Utilisateur ajouté avec succès', id: result.insertId });
  });
};

// Mettre à jour un utilisateur
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  db.query(query, [name, email, id], (err, result) => {
    if (err) {
      console.error('Erreur SQL lors de la mise à jour :', err);
      return res.status(500).json({ error: 'Erreur SQL' });
    }
    res.json({ message: 'Utilisateur modifié avec succès' });
  });
};

// Supprimer un utilisateur
exports.deleteUser = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Erreur SQL lors de la suppression :', err);
      return res.status(500).json({ error: 'Erreur SQL' });
    }
    res.json({ message: 'Utilisateur supprimé avec succès' });
  });
};
