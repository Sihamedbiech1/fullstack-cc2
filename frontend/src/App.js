// src/App.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addUser, updateUser } from './api';
import UserList from './components/UserList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [editingId, setEditingId] = useState(null);
  const [reload, setReload] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateUser(editingId, form);
        toast.success("Utilisateur modifié avec succès");
      } else {
        await addUser(form);
        toast.success("Utilisateur ajouté avec succès");
      }
      setForm({ name: '', email: '' });
      setEditingId(null);
      setReload(!reload);
    } catch (err) {
      toast.error("Erreur lors de l'envoi du formulaire");
    }
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email });
    setEditingId(user.id);
  };

  return (
    <div className="container-sm mt-5">
      <ToastContainer position="top-center" autoClose={3000} />
      <h2 className="text-center mb-4">Gestion des utilisateurs</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            name="name"
            placeholder="Nom"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Modifier' : 'Ajouter'} Utilisateur
          </button>
        </div>
      </form>

      <UserList onEdit={handleEdit} reload={reload} />
    </div>
  );
}

export default App;
