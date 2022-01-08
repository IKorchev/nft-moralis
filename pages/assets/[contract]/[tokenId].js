import { formatChain, formatIpfs } from "../../../utils/common"
import { useRouter } from "next/router"
import Collapse from "../../../components/tokenId/Collapse"
import useSWR from "swr"
import { useMoralisData } from "../../../components/Providers/MoralisDataProvider"
import Skeleton from "../../../components/tokenId/Skeleton"
import TransactionsTable from "../../../components/tokenId/TransactionsTable"
import TokenImage from "../../../components/tokenId/TokenImage"

const Token = () => {
  const { chain } = useMoralisData()
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

  const { data, error, isValidating } = useSWR("/api/nft", fetcher)

  if (error)
    return (
      <div className='h-[35rem] grid place-items-center'>
        <h1 className='text-white text-3xl'>{error.message}</h1>
      </div>
    )
  if (isValidating) return <Skeleton />

  return (
    <div className='container px-24 pb-12 mx-auto  text-white'>
      <div className='items-start gap-1 grid grid-cols-5 mt-5'>
        <div className='col-span-2 '>
          <TokenImage
            format={data?.metadata?.format}
            url={formatIpfs(data?.metadata?.image || data?.metadata?.image_url)}
          />
          <div className='mt-5'>
            <Collapse buttonText='Token Information'>
              <div className='bg-purple-100 text-black h-full p-4'>
                <p>
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
          </div>
        </div>
        <div className='bg-primary-900 col-span-3 text-white px-5 rounded-lg'>
          <h2 className='text-white'>{data?.name || data?.metadata?.name}</h2>
          <p className='mt-5'>Owned by: {data?.owner} </p>
          <hr />
          <h2 className='mt-12 text-white'>Description</h2>
          <p className='mt-4'>
            {data?.description || "There is no description for this item.  "}
          </p>
          <div className='mt-5'>
            <h2 className='text-white'>Transactions</h2>
            <TransactionsTable transactions={data?.transactions} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Token
