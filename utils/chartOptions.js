export const chartOptions = {
  maintainAspectRatio: false,
  borderColor: "black",
  layout: {
    padding: 5,
  },
  scales: {
    y: {
      min: 0,
      title: {
        display: true,
        text: "Price (ETH)",
        color: "white",
        font: {
          size: 20,
          style: "bold",
        },
      },
      ticks: {
        color: "white",
        callback: function (value, index, ticks) {
          return value
        },
      },
      grid: {
        color: "#ad0853",
        borderColor: "#ad0853",
        tickColor: "#ad0853",
      },
    },
    x: {
      title: {
        display: true,
        text: "Date",
        color: "white",
        font: {
          size: 20,
          style: "bold",
        },
      },
      ticks: {
        color: "white",
      },
      grid: {
        color: "#ad0853",
        borderColor: "#ad0853",
        tickColor: "#ad0853",
      },
    },
  },
  plugins: {
    legend: {
      color: "white",
      labels: {
        color: "white",
        font: {
          size: 20,
        },
      },
    },
  },
}
