import { useEffect, useState } from "react"
import { formatImage } from "../utils/common"
import NFTModal from "./NFTModal"
import {
  useChain,
  useWeb3ExecuteFunction,
} from "react-moralis"
import { MARKET_ABI, NFT_ABI } from "../utils/getMarketItems"
const NFTCard = ({ data, metadata }) => {
  const { account } = useChain()
  const [isShown, setIsShown] = useState(false)
  const [metaData, setMetadata] = useState()
  const contractProcessor = useWeb3ExecuteFunction()
  const MARKET_ADDRESS = "0xe6f1a815c66bac5f1d59f802BB2a73aa77b36621"

  const getListingPriceAndList = async () => {
    contractProcessor.fetch({
      params: {
        contractAddress: MARKET_ADDRESS,
        abi: MARKET_ABI,
        functionName: "getListingPrice",
      },
      onSuccess: (price) => {
        list(price)
      },
      onError: () => {
        alert("Unable to get listing price")
      },
    })
  }

  const list = async (listingPrice) => {
    const options = {
      contractAddress: MARKET_ADDRESS,
      abi: MARKET_ABI,
      functionName: "createMarketItem",
      msgValue: listingPrice,
      params: {
        nftContract: data.token_address,
        tokenId: parseInt(data.token_id),
        price: String(1000000),
      },
    }
    await contractProcessor.fetch({
      params: options,
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (data) => {
        console.log(data)
      },
    })
  }

  const getApprovalAndList = async () => {
    const options = {
      contractAddress: data.token_address,
      abi: NFT_ABI,
      functionName: "setApprovalForAll",
      params: {
        operator: MARKET_ADDRESS,
        approved: true,
      },
    }
    await contractProcessor.fetch({
      params: options,
      onSuccess: (data) => {
        getListingPriceAndList()
      },
      onError: (data) => {
        alert("Something went wrong " + data)
      },
    })
  }
  const checkApproved = async () => {
    const options = {
      contractAddress: data.token_address,
      abi: NFT_ABI,
      functionName: "isApprovedForAll",
      params: {
        owner: account,
        operator: MARKET_ADDRESS,
      },
    }
    await contractProcessor.fetch({
      params: options,
      onSuccess: (isApproved) => {
        if (isApproved) {
          getListingPriceAndList()
        } else {
          getApprovalAndList()
          console.log(isApproved + "else")
        }
      },
      onError: (data) => {
        alert("Couldn't check if contract is approved to transfer.")
      },
    })
  }

  useEffect(() => {
    const getData = async () => {
      if (metadata) {
        setMetadata(metadata)
      } else {
        const tokenIdMetadata = await fetch(data.tokenUri)
        const parsedMetadata = await tokenIdMetadata?.json()
        setMetadata(JSON.parse(parsedMetadata))
      }
    }
    getData()
  }, [])

  return (
    <div className='card'>
      <button
        onClick={(e) => {
          e.preventDefault()
          setIsShown(true)
        }}>
        <img
          src={formatImage(metaData?.image) || formatImage(metaData?.image_url)}
          alt=''
          className='h-72 max-h-72 cursor-pointer'
        />
      </button>
      <div className='flex flex-col h-36 justify-between text-left w-full px-4'>
        <h1 className='text-lg font-bold truncate'>
          {metaData?.name || metaData?.Name || metaData?.title || "Unnamed"}
        </h1>
        <p className='w-full h-12 overflow-hidden'>
          {metaData?.description || "No available description for this NFT."}
        </p>
        <button
          onClick={() => setIsShown(true)}
          role='button'
          className='w-1/2 text-center bg-primary-lightest py-1 rounded-md text-white font-semibold transition duration-1000 hover:bg-pinkish'>
          Learn more
        </button>
        <NFTModal
          tokenInfo={metaData}
          data={data}
          isShown={isShown}
          setIsShown={setIsShown}
        />
        <button
          onClick={async () => {
            checkApproved()
          }}>
          Sell now
        </button>
      </div>
    </div>
  )
}

export default NFTCard
