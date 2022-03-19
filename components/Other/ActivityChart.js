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
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const ActivityChart = ({ data }) => {
  const { Moralis } = useMoralis()
  const labelsArr = data?.transactions?.result
    ?.map((el) => {
      return new Date(el.block_timestamp).toLocaleDateString("uk")
    })
    .reverse()
  const dataArr = data?.transactions?.result?.map((el) => Moralis.Units.FromWei(el.value)).reverse()
  const chartData = {
    labels: labelsArr,
    datasets: [
      {
        label: "Price",
        borderColor: "white",
        data: dataArr,
        borderColor: "#de0b6a",
        backgroundColor: "white",
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
