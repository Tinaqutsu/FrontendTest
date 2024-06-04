<template>
    <div class="bar-graph-container">
      <h1 class="text_bar">Bar Graph</h1>
      <BarGraph :data="barGraphData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import BarGraph from '../components/BarGraph.vue'; 
  import barGraphData from '../assets/barGraph.json'; 
  
  export default {
    name: 'BarGraphPage',
    components: {
      BarGraph,
    },
    data() {
      return {
        barGraphData: barGraphData,
        chartOptions: {
          scales: {
            y: {
              ticks: {
                stepSize: 5 // Set the step size for the y-axis
              }
            }
          }
        }
      };
    },
  };
  </script>
  
  <style scoped>
  .bar-graph-container {
    
    width: 90%; 
    height: 100vh; 
    margin-left: 30px;
  }

  .text_bar {
    margin-bottom: 80px;
    margin-top: 20px;
    margin-left: 20px;
    color: rgba(168, 123, 55, 1);
    font-weight: bold;
  }

  </style>
  