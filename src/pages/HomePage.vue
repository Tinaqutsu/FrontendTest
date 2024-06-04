<template>
    <div class="home-container">
      <div class="logo-container">
        <img src="@/assets/SedibaLogo.svg" alt="Logo" class="flipping-logo" />
      </div>
      <h2 class="home-text">Sedibelo Technologies</h2>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
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
    width: 350px; 
    height: 350px; 
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
    font-size: 3rem;
    color: rgba(168, 123, 55, 1);
    margin-top: 20px;
    font-weight: bold;

  }
  </style>
  