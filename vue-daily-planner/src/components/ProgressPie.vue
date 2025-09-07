<template>
  <div class="pie-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import Chart from "chart.js/auto";

export default {
  name: "ProgressPie",
  props: {
    tasks: Array
  },
  setup(props) {
    const chartCanvas = ref(null);
    let pieChart = null;

    const updateChart = () => {
      if (!pieChart) return;
      const pending = props.tasks.filter(t => !t.completed).length;
      const completed = props.tasks.filter(t => t.completed).length;
      pieChart.data.datasets[0].data = [pending, completed];
      pieChart.update();
    };

    onMounted(() => {
      pieChart = new Chart(chartCanvas.value, {
        type: "pie",
        data: {
          labels: ["Pending", "Completed"],
          datasets: [{
            data: [0, 0],
            backgroundColor: ["#f39c12", "#27ae60"]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "bottom" }
          }
        }
      });
      updateChart();
    });

    watch(() => props.tasks, updateChart, { deep: true });

    return { chartCanvas };
  }
};
</script>

<style scoped>
.pie-container {
  background: #fff;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

canvas {
  width: 100% !important;
  height: 250px !important;
}
</style>
