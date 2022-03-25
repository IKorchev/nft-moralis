import { Line } from "react-chartjs-2"
import { useMoralis } from "react-moralis"
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
import { useMemo } from "react"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const ActivityChart = ({ data }) => {
  const { Moralis } = useMoralis()
  const _chartData = useMemo(() => {
    const labels = []
    const prices = []
    const transactions = data?.transactions?.result
    for (const transaction of transactions) {
      const date = new Date(transaction.block_timestamp).toLocaleDateString("uk")
      labels.push(date)
      prices.push(Moralis.Units.FromWei(transaction.value))
    }
    return {
      labels: labels.reverse(),
      prices: prices.reverse(),
    }
  }, [data?.transactions?.result, data])

  const chartData = {
    labels: _chartData.labels,
    datasets: [
      {
        label: "Price",
        borderColor: "white",
        data: _chartData.prices,
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
