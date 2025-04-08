// src/api.js
import axios from "axios";

// L'URL de ton backend Express
const API_URL = 'http://localhost:5000/api/users';

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return [];
  }
};

export const addUser = async (user) => {
  try {
    const response = await axios.post(API_URL, user);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout d'un utilisateur:", error);
  }
};

export const updateUser = async (id, user) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, user);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
  }
};
