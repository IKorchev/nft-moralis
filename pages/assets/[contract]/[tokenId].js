import { formatIpfs } from "../../../utils/common"
import { shortenAddress } from "@usedapp/core"
import Moralis from "moralis"
import { useChain } from "react-moralis"
import { useRouter } from "next/router"
import Collapse from "../../../components/Collapse"
import useSWR from "swr"
import { Suspense } from "react"
const imagePlaceholder = "https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"

const Token = () => {
  const { chain } = useChain()
  const { query } = useRouter()

  const fetcher = (url) => {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify({
        contract: query.contract,
        tokenId: query.tokenId,
        chain: "ropsten",
      }),
    }).then((res) => res.json())
  }

  const { data, error } = useSWR("/api/nft", fetcher)
  console.log(data)

  return (
    <Suspense>
      <div className='container px-24 pb-12 mx-auto  text-white'>
        <div className='items-start gap-1 grid grid-cols-5 mt-5'>
          <div className='col-span-2 '>
            <div className='grid place-items-center bg-white max-w-full'>
              <img
                src={
                  formatIpfs(data?.nftData.image || data?.nftData.image_url) ||
                  imagePlaceholder
                }
                className='object-contain rounded-lg'
              />
            </div>
            <Collapse >
              <div className='bg-purple-900 h-full p-4'>
                <p>
                  <span className='font-bold'> Address:</span> {query.contract}
                </p>
                <p className='mt-2'>
                  <span className='font-bold'> Token ID:</span> {query.tokenId}
                </p>
              </div>
            </Collapse>
            <Collapse>
              <div className='grid grid-cols-3 gap-3 bg-purple-900 p-4'>
                {data?.nftData?.attributes?.map((el) => (
                  <div className='col-span-1 text-black grid place-items-center bg-purple-200 border-purple-300 text-center p-1 rounded-lg'>
                    <small className='font-bold'>{el.trait_type}</small>
                    <small>{el.value}</small>
                  </div>
                ))}
              </div>
            </Collapse>
          </div>

          <div className='bg-primary-900 col-span-3 text-white px-5 rounded-lg'>
            <h2 className='text-white'>{data?.name || data?.nftData?.name}</h2>
            <p className='mt-5'>Owned by: {data?.owner} </p>
            <hr />
            <h2 className='mt-12 text-white'>Description</h2>
            <p className='mt-4'>
              {data?.description || "There is no description for this item.  "}
            </p>
            <div className='mt-5'>
              <h2 className='text-white'>Transactions</h2>
              <table className='w-full border-separate border border-purple-400 mt-3'>
                <tr className='bg-purple-800 border '>
                  <th>From</th>
                  <th>To</th>
                  <th>Price</th>
                  <th>Date</th>
                </tr>
                {data?.transactions?.result.length &&
                  data?.transactions?.result.map((el) => {
                    const d = new Date(el.block_timestamp)
                    return (
                      <tr className='w-full p-2  my-1 text-center'>
                        <td>{shortenAddress(el.from_address)}</td>
                        <td>{shortenAddress(el.to_address)}</td>
                        <td>
                          {Moralis.Units.FromWei(el.value)} {chain?.nativeCurrency.symbol}
                        </td>
                        <td>{d.toLocaleDateString("uk")}</td>
                      </tr>
                    )
                  })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default Token
