<template>
  <div>
    <canvas ref="myChart"></canvas>
  </div>
</template>

<script>
import { Chart } from "chart.js/auto";
export default {
  data() {
    return {
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: [0, 10, 5, 2, 20, 30, 45],
          },
        ],
      },
    };
  },
  mounted() {
    new Chart(
      this.$refs.myChart, {
      type: "line",
      data: this.data,
    });
  },
};
</script>