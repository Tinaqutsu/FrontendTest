<template>
    <div class="home-container">
      <div class="logo-container">
        <img src="@/assets/logo.png" alt="Logo" class="flipping-logo" />
      </div>
      <h2 class="home-text">Welcome to My Application</h2>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home',
  };
  </script>
  
  <style scoped>
  .home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }
  
  .logo-container {
    perspective: 1000px;
  }
  
  .flipping-logo {
    width: 150px;
    height: 150px;
    animation: flip 3s infinite;
  }
  
  @keyframes flip {
    0% {
      transform: rotateY(0);
    }
    50% {
      transform: rotateY(180deg);
    }
    100% {
      transform: rotateY(360deg);
    }
  }
  
  .home-text {
    font-family: 'Roboto', sans-serif;
    font-size: 2em;
    color: #333;
    margin-top: 20px;
  }
  </style>
  