<template>
    <div>
      <h1 class="pie-text">Pie Chart</h1>
      <PieChart :data="pieChartData" />
    </div>
  </template>
  
  <script>
  import PieChart from '../components/PieChart.vue'; 
  import pieChartData from '../assets/pieChart.json'; 
  
  export default {
    name: 'PieChartPage',
    components: {
      PieChart,
    },
    data() {
      return {
        pieChartData: pieChartData,
      };
    },
  };
  </script>
  <style>
   
   .pie-text{
    margin-top: 20px;
    margin-left: 30px;
    color: rgba(168, 123, 55, 1);
    font-weight: bold;
   }

</style>