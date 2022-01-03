import { AnimatePresence } from "framer-motion"
import { useRouter } from "next/router"
import { useState } from "react"
import NFTItem from "../../../components/NFTItem"
import { formatImage } from "../../../utils/common"
const Asset = ({ contractMetadata, nfts }) => {
  const amountOfItems = 8
  const router = useRouter()
  const [limit, setLimit] = useState(amountOfItems)
  const loadMore = () => {
    if (total >= limit) {
      setLimit((e) => e + amountOfItems)
    }
  }

  return (
    <AnimatePresence initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className='container px-24 mx-auto text-white'>
        <h1 className='text-center text-4xl'>Collection</h1>
        <div className='border-2 border-purple-900 p-12'>
          <div className='flex-col'>
            <span className='p-3 bg-purple-900 rounded-lg'>
              Contract name: {contractMetadata?.name}
            </span>
            <span className='p-3 bg-purple-900 rounded-lg'>
              Contract name: {contractMetadata?.symbol}
            </span>
          </div>
        </div>
        <div className='grid grid-cols-4 items-center justify-center'>
          {nfts?.map((el, i) => (
            <NFTItem
              tokenId={el.token_id}
              key={el.token_uri}
              tokenUri={formatImage(el.token_uri)}
              metadata={el.metadata}
            />
          ))}
        </div>
        <div className='grid py-6 place-items-center'>
          <button
            className='p-4 px-6 text-xl rounded-lg text-white bg-gradient-to-r from-purple-700 to-blue-600'
            onClick={(e) => {
              e.stopPropagation()
              loadMore()
            }}>
            Load more
          </button>
        </div>
      </div>
    </AnimatePresence>
  )
}

export default Asset

export const getServerSideProps = async (context) => {
  const { contract } = context.params
  const API_KEY = process.env.API_KEY

  // Contract/collection information
  const contractMetadata = await fetch(
    `https://deep-index.moralis.io/api/v2/nft/${contract}/metadata?chain=ropsten`,
    {
      headers: {
        "x-api-key": API_KEY,
      },
    }
  ).then((res) => res.json())

  // Array of NFT objects
  const nfts = await fetch(
    `https://deep-index.moralis.io/api/v2/nft/${contract}?chain=ropsten&format=decimal
  `,
    {
      headers: {
        "x-api-key": API_KEY,
      },
    }
  ).then((res) => res.json())

  return {
    props: {
      contractMetadata,
      nfts: nfts.result,
    },
  }
}
