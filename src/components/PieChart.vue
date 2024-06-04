<template>
  <div class="pie-chart-container">
    <canvas ref="pieChartCanvas" class="pie-chart-canvas"></canvas>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default defineComponent({
  name: 'PieChart',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const pieChartCanvas = ref(null);

    onMounted(() => {
      const labels = props.data.map(item => item.year);
      const data = props.data.map(item => item.numInstalls);

      new Chart(pieChartCanvas.value, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Number of Installs',
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
              ],
              data: data,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    });

    return {
      pieChartCanvas,
    };
  },
});
</script>

<style scoped>
.pie-chart-container {
  width: 100%;
  height: 500px; /* Adjust the height as needed */
  display: flex;
  margin-top: 80px;
  justify-content: center;
  align-items: center;
}

.pie-chart-canvas {
  width: 80%; /* Adjust the width as needed */
  height: 100%;
}
</style>
