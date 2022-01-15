import { formatChain, formatIpfs } from "../../../utils/common"
import { useRouter } from "next/router"
import Collapse from "../../../components/tokenId/Collapse"
import useSWR from "swr"
import { useMoralisData } from "../../../components/Providers/MoralisDataProvider"
import Skeleton from "../../../components/tokenId/Skeleton"
import TransactionsTable from "../../../components/tokenId/TransactionsTable"
import TokenImage from "../../../components/tokenId/TokenImage"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

import { chartOptions } from "../../../utils/chartOptions"
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const Token = () => {
  const { chain, Moralis } = useMoralisData()
  const { query } = useRouter()
  const fetcher = (url) => {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify({
        contract: query.contract,
        tokenId: query.tokenId,
        chain:
          { chainString: formatChain(chain?.networkId), chainId: chain?.chainId } ||
          "fantom/mainnet",
      }),
    }).then(async (res) => {
      if (!res.ok) {
        const error = new Error("An error occurred while fetching the data.")
        // Attach extra info to the error object.
        error.info = await res.json()
        error.status = res.status
        throw error
      }
      return await res.json()
    })
  }

  const { data, error, isValidating } = useSWR(chain ? "/api/nft" : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  })

  if (error)
    return (
      <div className='h-[35rem] grid place-items-center'>
        <h1 className='text-white text-3xl'>{error.message}</h1>
      </div>
    )
  if (isValidating) return <Skeleton />

  const labelsArr = data?.transactions?.result
    ?.map((el) => {
      return new Date(el.block_timestamp).toLocaleDateString("uk")
    })
    .reverse()
  const dataArr = data?.transactions?.result
    ?.map((el) => Moralis.Units.FromWei(el.value))
    .reverse()
  const chartData = {
    labels: labelsArr,
    datasets: [
      {
        label: "Price",
        borderColor: "white",
        data: dataArr,
        borderColor: "black",
        backgroundColor: "white",
      },
    ],
  }
  return (
    <div className='container xl:px-24 pb-12 mx-auto  text-white'>
      <div className='flex flex-col lg:flex-row gap-5 px-5 lg:p-0'>
        <div className='max-w-[50rem]'>
          <TokenImage
            format={data?.metadata?.format}
            url={formatIpfs(data?.metadata?.image || data?.metadata?.image_url)}
          />
        </div>
        <div className='bg-primary-900 flex-grow rounded-lg'>
          <Collapse buttonText='Token Information' defaultOpen={true}>
            <div className='bg-white text-black h-full p-4'>
              <h2 className=''>{data?.name || data?.metadata?.name}</h2>
              <p>Owned by: {data?.owner} </p>
              <hr />
              <h2 className='mt-5'>Description</h2>
              <p className='mt-2'>
                {data?.description || "There is no description for this item.  "}
              </p>
              <hr />
              <p className='mt-5'>
                <span className='font-bold'> Address:</span> {query.contract}
              </p>
              <p className='mt-2'>
                <span className='font-bold'> Token ID:</span> {query.tokenId}
              </p>
              <p className='mt-2'>
                <span className='font-bold'> Token Symbol:</span> {data?.symbol}
              </p>
            </div>
          </Collapse>
          <Collapse buttonText='Attributes'>
            <div className='grid grid-cols-3 gap-3 bg-purple-100 p-4'>
              {data?.metadata?.attributes?.map((el) => (
                <div className='col-span-1 border text-black grid place-items-center bg-purple-200 border-purple-300 text-center p-1 rounded-lg'>
                  <small className='font-bold'>{el.trait_type}</small>
                  <small>{el.value}</small>
                </div>
              ))}
            </div>
          </Collapse>
          <Collapse buttonText='Price history'>
            <div className='bg-white text-white h-[300px]'>
              <Line data={chartData} options={chartOptions} />
            </div>
          </Collapse>
          <Collapse buttonText='Transactions'>
            <div className='text-black max-h-[20rem] overflow-y-scroll'>
              <TransactionsTable transactions={data?.transactions} />
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  )
}

export default Token
