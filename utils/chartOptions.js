export const chartOptions = {
  maintainAspectRatio: false,
  borderColor: "black",
  layout: {
    padding: 5,
  },
  scales: {
    y: {
      title: {
        display: true,
        text: "ETH",
        color: "black",
        font: {
          size: 20,
          style: "bold",
        },
      },
      ticks: {
        color: "black",
        callback: function (value, index, ticks) {
          return value
        },
      },
      grid: {
        color: "black",
        borderColor: "black",
        tickColor: "black",
      },
    },
    x: {
      title: {
        display: true,
        text: "Date",
        color: "black",
        font: {
          size: 20,
          style: "bold",
        },
      },
      ticks: {
        color: "black",
      },
      grid: {
        color: "black",
        borderColor: "black",
        tickColor: "black",
      },
    },
  },
  plugins: {
    legend: {
      color: "black",
      labels: {
        color: "black",
        font: {
          size: 20,
        },
      },
    },
  },
}
