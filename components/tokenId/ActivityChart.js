import { Line } from "react-chartjs-2"
import { Moralis } from "moralis"
import { chartOptions } from "../../utils/chartOptions"
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const createLabelsAndPricesArray = (transactions) => {
  const labels = []
  const prices = []
  for (const transaction of transactions) {
    const date = new Date(transaction.block_timestamp).toLocaleDateString("uk")
    labels.push(date)
    prices.push(Moralis.Units.FromWei(transaction.value))
  }
  return {
    labels: labels.reverse(),
    prices: prices.reverse(),
  }
}


const ActivityChart = ({ data }) => {
  const { labels, prices } = createLabelsAndPricesArray(data.transactions.result)
  console.log(labels, prices)
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Price",
        borderColor: "white",
        data: prices,
        borderColor: "#de0b6a",
        backgroundColor: "white",
        tension: 0.3,
      },
    ],
  }

  return (
    <div className='h-[300px] text-white'>
      <Line data={chartData} options={chartOptions} />
    </div>
  )
}

export default ActivityChart
