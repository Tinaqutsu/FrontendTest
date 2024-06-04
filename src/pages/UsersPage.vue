<template>
  <div>
    <!-- User table -->
    <div class="container">
      <h2 class="user-text">Users</h2>
      <button @click="toggleForm" class="add-user-button">{{ showForm ? 'X' : 'Add New User' }}</button>
      <form v-if="showForm" @submit.prevent="saveUser" class="user-form">
        <div class="mb-3">
          <label for="name" class="form-label">Name:</label>
          <input type="text" v-model="newUser.name" id="name" class="form-control" required style="width: 400px;" />
        </div>
        <div class="mb-3">
          <label for="surname" class="form-label">Surname:</label>
          <input type="text" v-model="newUser.surname" id="surname" class="form-control" required style="width: 400px;" />
        </div>
        <div class="mb-3">
          <label for="designation" class="form-label">Designation:</label>
          <select v-model="newUser.designation" id="designation" class="form-select" required>
            <option value="">Select Designation</option>
            <option v-for="designation in uniqueDesignations" :key="designation" :value="designation">{{ designation }}</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="department" class="form-label">Department:</label>
          <select v-model="newUser.department" id="department" class="form-select" required>
            <option value="">Select Department</option>
            <option v-for="department in uniqueDepartments" :key="department" :value="department">{{ department }}</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">{{ editingUser ? 'Update User' : 'Add User' }}</button>
      </form>
      <div class="mb-3">
        <label for="search" class="form-label">Search:</label>
        <input type="text" v-model="searchTerm" id="search" class="form-control" @input="handleSearch" />
        <select v-model="selectedDesignation" @change="handleDesignationChange" class="form-select mt-2">
          <option value="">All Designations</option>
          <option v-for="designation in uniqueDesignations" :key="designation" :value="designation">{{ designation }}</option>
        </select>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in paginatedUsers" :key="index">
            <td data-label="Name">{{ user.name }}</td>
      <td data-label="Surname">{{ user.surname }}</td>
      <td data-label="Designation">{{ user.designation }}</td>
      <td data-label="Department">{{ user.department }}</td>
      <td data-label="Action" class="action-column">
        <button @click="editUser(user)" class="btn-sm edit-btn"><span class="icon"><i class="fas fa-edit"></i></span><span class="text">Edit</span></button>
        <button @click="deleteUser(user)" class="btn-del delete-btn"><span class="icon"><i class="fas fa-trash-alt"></i></span><span class="text">Delete</span></button>
      </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button :disabled="currentPage === 1" @click="prevPage" class="btn btn-info">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="nextPage" class="btn btn-info">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showForm: false,
      users: [],
      searchTerm: '',
      selectedDesignation: '',
      currentPage: 1,
      pageSize: 5,
      newUser: {
        name: '',
        surname: '',
        designation: '',
        department: ''
      },
      editingUser: null
    };
  },
  created() {
    // Load users from IndexedDB when the component is created
    this.loadUsersFromIndexedDB();
  },
  computed: {
    filteredUsers() {
      let filtered = this.users;
      if (this.searchTerm) {
        const searchTermLower = this.searchTerm.toLowerCase();
        filtered = filtered.filter(user => user.name.toLowerCase().includes(searchTermLower) || user.surname.toLowerCase().includes(searchTermLower));
      }
      if (this.selectedDesignation) {
        filtered = filtered.filter(user => user.designation === this.selectedDesignation);
      }
      return filtered;
    },
    paginatedUsers() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      return this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
    },
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.pageSize);
    },
    uniqueDesignations() {
      return [...new Set(this.users.map(user => user.designation))];
    },
    uniqueDepartments() {
      return [...new Set(this.users.map(user => user.department))];
    },
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
    },
    handleSearch() {
      this.currentPage = 1;
    },
    handleDesignationChange() {
      this.currentPage = 1;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    async saveUser() {
      if (this.editingUser) {
        const index = this.users.findIndex(user => user.id === this.editingUser.id);
        if (index !== -1) {
          this.users.splice(index, 1, this.newUser);
          await this.saveUserToIndexedDB(this.newUser);
        }
        this.editingUser = null;
      } else {
        this.newUser.id = Date.now(); // Generate unique ID
        this.users.push(this.newUser);
        await this.saveUserToIndexedDB(this.newUser);
      }
      this.resetForm();
    },
    editUser(user) {
      this.newUser = { ...user };
      this.editingUser = user;
      this.showForm = true;
    },
    async deleteUser(user) {
      const index = this.users.indexOf(user);
      if (index !== -1) {
        this.users.splice(index, 1);
        await this.deleteUserFromIndexedDB(user);
      }
    },
    resetForm() {
      this.newUser = {
        name: '',
        surname: '',
        designation: '',
        department: ''
      };
      this.showForm = false;
    },
    async loadUsersFromIndexedDB() {
      try {
        const db = await this.openIndexedDB(); // Open the IndexedDB
        const transaction = db.transaction(['users'], 'readonly'); // Start a readonly transaction
        const objectStore = transaction.objectStore('users'); // Access the object store

        // Open a cursor to iterate through the data
        objectStore.openCursor().onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            this.users.push(cursor.value); // Push the user data to the users array
            cursor.continue(); // Move to the next item in the object store
          }
        };
      } catch (error) {
        console.error('Error loading users from IndexedDB:', error);
      }
    },
    async saveUserToIndexedDB(user) {
      try {
        const db = await this.openIndexedDB(); // Open the IndexedDB
        const transaction = db.transaction(['users'], 'readwrite'); // Start a readwrite transaction
        const objectStore = transaction.objectStore('users'); // Access the object store

        // Add or update the user data in the object store
        const request = objectStore.put(user);

        // Event listener for success
        request.onsuccess = () => {
          console.log('User saved to IndexedDB:', user);
        };

        // Event listener for error
        request.onerror = (event) => {
          console.error('Error saving user to IndexedDB:', event.target.error);
        };
      } catch (error) {
        console.error('Error saving user to IndexedDB:', error);
      }
    },
    async deleteUserFromIndexedDB(user) {
      try {
        const db = await this.openIndexedDB(); // Open the IndexedDB
        const transaction = db.transaction(['users'], 'readwrite'); // Start a readwrite transaction
        const objectStore = transaction.objectStore('users'); // Access the object store

        // Delete the user data from the object store
        const request = objectStore.delete(user.id);

        // Event listener for success
        request.onsuccess = () => {
          console.log('User deleted from IndexedDB:', user);
        };

        // Event listener for error
        request.onerror = (event) => {
          console.error('Error deleting user from IndexedDB:', event.target.error);
        };
      } catch (error) {
        console.error('Error deleting user from IndexedDB:', error);
      }
    },
    async openIndexedDB() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open('userDatabase', 1); // Open the IndexedDB with name and version

        // Event listener for success
        request.onsuccess = () => {
          const db = request.result;
          resolve(db);
        };

        // Event listener for error
        request.onerror = (event) => {
          console.error('Error opening IndexedDB:', event.target.error);
          reject(event.target.error);
        };

        // Event listener for upgrade needed (first time creation)
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          db.createObjectStore('users', { keyPath: 'id', autoIncrement:true }); // Create an object store for users
        };
      });
    },
  }
};
</script>


<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #4BC0C0;
  color: #fff;
  padding: 8px;
} 
form {
  margin-top: 20px;
}
form input {
  margin-right: 10px;
}
.user-text {
  margin-top: 20px;
  margin-left: 20px;
  color: rgba(168, 123, 55, 1);
  font-weight: bold;
}

.user-form {
  width: 450px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.user-form label {
  display: block;
  margin-bottom: 10px;
}
.user-form input, .user-form select {
  width: calc(100% - 20px);
  padding: 8px;
  margin-bottom: 15px;
}
.user-form button {
  width: 100%;
  padding: 10px;
  background-color: #4BC0C0;
  color: #fff;
  border: none;
  cursor: pointer;
}

#search {
  width: 40%;
}

.table .btn {
  margin-right: 5px;
  background-color: #4BC0C0;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.table .btn:hover {
  background-color: #3b9b9b;
}

.btn-del {
  background-color: #4BC0C0;
}

td button {
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-del {
  background-color: #FF6384;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.btn-sm {
  background-color: #4BC0C0;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.add-user-button {
  padding: 10px 20px;
  background-color: #FF6384;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.btn-sm:hover,
.btn-del:hover {
  background-color: #e82a53;
}

.add-user-button:hover {
  background-color: #e82a53;
}

@media (max-width: 600px) {
  table, thead, tbody, th, td, tr {
    display: block;
  }
  thead tr {
    display: none;
  }
  td {
    position: relative;
    padding-left: 50%;
  }
  td::before {
    position: absolute;
    top: 50%;
    left: 10px;
    width: calc(50% - 10px);
    white-space: nowrap;
    transform: translateY(-50%);
    font-weight: bold;
  }
  td[data-label="Name"]::before { content: "Name"; }
  td[data-label="Surname"]::before { content: "Surname"; }
  td[data-label="Designation"]::before { content: "Designation"; }
  td[data-label="Department"]::before { content: "Department"; }
  td[data-label="Action"]::before { content: "Action"; }
}

.action-column .icon {
  display: none;
}

@media (max-width: 600px) {
  .action-column {
    text-align: center;
  }
  .action-column .btn-sm, .action-column .btn-del {
    font-size: 14px; /* Adjust the font size as needed */
    padding: 5px; /* Adjust the padding as needed */
  }
  .action-column .icon {
    display: inline-block;
    margin-right: 5px; /* Adjust the spacing between icon and text */
  }
  .action-column .text {
    display: none; /* Hide the text on small screens */
  }
}
</style>
