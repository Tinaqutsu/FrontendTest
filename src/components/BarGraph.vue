<template>
  <div class="graph-container">
    <canvas ref="barChartCanvas" class="graph-canvas"></canvas>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default defineComponent({
  name: 'BarGraph',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const barChartCanvas = ref(null);

    onMounted(() => {
      const labels = props.data.map(item => item.month);
      const data = props.data.map(item => item.numInstalls);

      new Chart(barChartCanvas.value, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Number of Installs',
              backgroundColor: '#FF6384',
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
      barChartCanvas,
    };
  },
});
</script>

<style scoped>
.graph-container {
  width: 100%;
  height: 500px; /* Adjust the height as needed */
  display: flex;
  justify-content: center;
  align-items: center;
}

.graph-canvas {
  width: 80%; /* Adjust the width as needed */
  height: 100%;
}
</style>
