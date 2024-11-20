<template>
  <div id="app">
    <h1>Application CRUD avec Vue.js</h1>

    <div>
      <!-- Formulaire d'ajout d'utilisateur -->
      <button @click="showAddForm = !showAddForm">Ajouter un utilisateur</button>
      <div v-if="showAddForm && userToEdit === null">
        <input v-model="newUser.name" placeholder="Nom de l'utilisateur" />
        <input v-model="newUser.email" placeholder="Email de l'utilisateur" />
        <button @click="addUser">Ajouter</button>
      </div>
    </div>

    <div v-if="userToEdit !== null">
      <!-- Formulaire d'édition d'utilisateur -->
      <h3>Modifier l'utilisateur</h3>
      <input v-model="userToEdit.name" placeholder="Nom de l'utilisateur" />
      <input v-model="userToEdit.email" placeholder="Email de l'utilisateur" />
      <button @click="updateUser">Mettre à jour</button>
      <button @click="cancelEdit">Annuler</button>
    </div>

    <div v-if="users !== null">
      <h2>Liste des utilisateurs</h2>
      <ul>
        <li v-for="user in users" :key="user.id">
          <p>{{ user.name }} - {{ user.email }}</p>
          <button @click="editUser(user)">Éditer</button>
          <button @click="deleteUser(user.id)">Supprimer</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      users: [],
      newUser: {
        name: '',
        email: ''
      },
      showAddForm: false,
      userToEdit: null
    };
  },
  methods: {
    // les utilisateurs
    async fetchUsers() {
      try {
        const response = await axios.get('/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    // Ajout un utilisateur
    async addUser() {
      try {
        const response = await axios.post('/users', this.newUser);
        this.users.push(response.data);
        this.newUser.name = '';
        this.newUser.email = '';
        this.showAddForm = false;
      } catch (error) {
        console.error('Error adding user:', error);
      }
    },
    // Suppression d'un utilisateur
    async deleteUser(userId) {
      try {
        await axios.delete(`/users/${userId}`);
        this.users = this.users.filter(user => user.id !== userId);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    // Édition d'un utilisateur
    async editUser(user) {
      this.userToEdit = { ...user };
      this.showAddForm = false; //On masque Add Form si on edit
    },
    // Mis à jour d'un utilisateur
    async updateUser() {
      try {
        const response = await axios.put(`/users/${this.userToEdit.id}`, this.userToEdit);
        const index = this.users.findIndex(user => user.id === this.userToEdit.id);
        this.users[index] = response.data;
        this.userToEdit = null; // Réinitialisation d'un utilisateur à éditer
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
    // Annulation de  l'édition
    cancelEdit() {
      this.userToEdit = null; // Réinitialisation de l'édition
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
}

button {
  margin: 5px;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
}

button:hover {
  background-color: #2980b9;
}

input {
  margin: 5px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
