// src/components/UserList.js
import React, { useEffect, useState } from "react";
import { getUsers, addUser, updateUser, deleteUser } from "../api";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (newUser) {
      await addUser({ name: newUser });
      setNewUser("");
      const data = await getUsers();
      setUsers(data);
    }
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    const data = await getUsers();
    setUsers(data);
  };

  const handleUpdateUser = async (id) => {
    const newName = prompt("Enter new name:");
    if (newName) {
      await updateUser(id, { name: newName });
      const data = await getUsers();
      setUsers(data);
    }
  };

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}{" "}
            <button onClick={() => handleUpdateUser(user.id)}>Modifier</button>
            <button onClick={() => handleDeleteUser(user.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
        placeholder="Nom de l'utilisateur"
      />
      <button onClick={handleAddUser}>Ajouter un utilisateur</button>
    </div>
  );
};

export default UserList;
