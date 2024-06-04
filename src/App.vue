<template>
  <div id="app">
    <header>
      <img src="@/assets/Sedi.png" alt="Logo" class="sedi-pic" />
      <!-- <button class="burger-menu" @click="toggleMenu">
        <i class="fas fa-bars"></i>
      </button> hghjjhjj-->
      <button class="burger-menu" @click="toggleMenu($event)">
    <i class="fas fa-bars"></i>
       </button>
       
      <nav :class="{ show: showMenu }">
        <div class="nav-links">
          <router-link to="/" @click="toggleMenu">
            <i class="fas fa-home"></i> Home
          </router-link>
          <router-link to="/bar-graph" @click="toggleMenu">
            <i class="fas fa-chart-bar"></i> Bar Graph
          </router-link>
          <router-link to="/pie-chart" @click="toggleMenu">
            <i class="fas fa-chart-pie"></i> Pie Chart
          </router-link>
          <router-link to="/users" @click="toggleMenu">
            <i class="fas fa-users"></i> Users
          </router-link>
        </div>
      </nav>
    </header>
    <main id="main-content">
      <router-view />
      <footer>
        <p>© 2024 Thina Qutsu. All rights reserved.</p>
      </footer>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      showMenu: false
    };
  },
  methods: {
    toggleMenu(event) {
  this.showMenu = !this.showMenu;
  console.log("showMenu value:", this.showMenu); // Added for debugging
  const navElement = event.target.closest('nav');
  if (navElement) {
    navElement.classList.add('show'); 
  }
}
  }
};
</script>

<style scoped>
#app {
display: flex;
height: 100vh;
 } 

aside {
width: 200px;
background-color: #e9ecef; 
display: flex;
flex-direction: column;
border-right: 1px solid #ddd;
}
header {
padding: 10px; 
background-color: #f4f4f4;
border-bottom: 1px solid #ddd; 
text-align: center; 
} 

header h1{
margin: 0;
color: #333;
font-size: 1.2em; 
} 

.sedi-pic {
width: 12.4rem;
margin-left: -10px;
height: 5rem; 
}
nav {
flex-grow: 1; 
display: flex; 
flex-direction: column; 
padding: 1em;
background-color: #4BC0C0; 
height: 100%; 
}

nav a {
text-decoration: none; 
color: white; 
padding: 10px 20px;
margin-bottom: 5px;
display: flex;
align-items: center;
} 

nav a i {
margin-right: 30px; 
}

nav a:hover { 
background-color: #1c9e9e;
color: white; 
}

main { 
flex-grow: 1; 
display: flex; 
flex-direction: column;
 } 
 
 footer { 
background-color: #f4f4f4;
padding: 10px; 
text-align: center;
border-top: 1px solid #ddd; 
margin-top: auto; 
}

footer p {
margin: 0;
color: #333; }

.burger-menu {
  display: none;
}

nav.router-link {
  margin: 0 10px;
}

.burger-menu {
  display: none;
}

nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.nav-links {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
}

nav.router-link {
  margin: 10px;
  text-align: center;
}

/* @media (max-width: 768px) {
  .burger-menu {
    display: block;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #333;
    font-size: 1.5rem;
  }

  nav {
    display: none;
  }

  .show nav {
    display:block;
  }
} */
</style>
