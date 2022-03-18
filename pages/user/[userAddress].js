//UTILS

import { shortenIfAddress } from "@usedapp/core"
import { useRouter } from "next/router"

import { Suspense } from "react"
//ICONS
import { MdCollectionsBookmark } from "react-icons/md"
import { FiActivity } from "react-icons/fi"

import Jazzicon from "../../components/Other/Jazzicon"
//COMPONENTS
import { Tab } from "@headlessui/react"
import Metadata from "../../components/Other/Metadata"
import NFTsTab from "../../components/UserPage/NFTsTab"
import ActivityTab from "../../components/UserPage/ActivityTab"
import { useMoralisWeb3Api } from "react-moralis"

import { getDefaultProvider } from "ethers"
import { NftProvider, useNft } from "use-nft"

import { atom, selector, useRecoilState, useRecoilValue } from "recoil"
import { uniqBy } from "lodash"
import { findCollectionByAddress } from "../../store/store"

export const nftsState = atom({
  key: "nftsState",
  default: [],
})

const nftOptions = selector({
  key: "options",
  get: ({ get, set }) => {
    const nftsList = get(nftsState)
    const collections = uniqBy(nftsList, (el) => el.token_address)
    const infoList = collections.map((el) => get(findCollectionByAddress(el.token_address)))
    return infoList
  },
})

const filterState = atom({
  key: "filterState",
  default: null,
})

const filteredNftsState = selector({
  key: "filteredNftsState",
  default: nftsState,
  get: ({ get }) => {
    const filterBy = get(filterState)
    const list = get(nftsState)
    console.log(list)
    if (filterBy !== null) {
      return list.filter((el) => el.token_address.toLowerCase() === filterBy.toLowerCase())
    }
    return list
  },
})

const ethersConfig = {
  provider: getDefaultProvider("https://speedy-nodes-nyc.moralis.io/a66bbe066b91269ffbcb96b7/eth/ropsten"),
}

function UserAddress({ nfts, transactions }) {
  const [_nfts, setNfts] = useRecoilState(nftsState)
  const [filter, setFilter] = useRecoilState(filterState)
  const info = useRecoilValue(nftOptions)
  const fnfts = useRecoilValue(filteredNftsState)
  console.log(filter)
  setNfts(nfts?.result)
  const router = useRouter()
  const Web3Api = useMoralisWeb3Api()
  //prettier-ignore
  return (
    <>
      <Metadata title={`NFT Explorer - Address ${router.query.userAddress}`} />
      <div className='container mx-auto min-h-[50rem] overflow-hidden py-24'>
        <div className='mt-12 flex flex-col items-center'>
          <div className='overflow-hidden rounded-full border-4 border-white'>
            <Jazzicon address={router.query.userAddress} size={150} />
          </div>
          <h2 className='-mt-4 cursor-pointer rounded-full bg-white p-2 text-center text-xl text-black'>
            <span className='relative flex items-center justify-center'>
              {shortenIfAddress(router.query.userAddress)}
            </span>
          </h2>
       <Tab.Group defaultChecked={1} as='div' className='container mt-5 flex flex-col items-center'>
        <Tab.List className='bg-secondary-800 mt-5 flex  justify-evenly rounded-lg p-4  text-white  '>
          <Tab
            className={({ selected }) =>
              `${selected ? "bg-secondary-600 border border-secondary-500 text-white" : ""}
                 flex items-center rounded-lg px-12 py-4 `
            }>
            <MdCollectionsBookmark className='mr-3 text-xl' /> Collected
          </Tab>
          <Tab
            //prettier-ignore
            className={({ selected }) =>`${selected ? "bg-secondary-600 border border-secondary-500 text-white" : ""} flex items-center px-12 py-3 rounded-lg `}>
            <FiActivity className='mr-3 text-xl' /> Activity
          </Tab>
        </Tab.List>
        <Tab.Panels className='w-full'>
            <NftProvider fetcher={["ethers", ethersConfig]}> 
              <NFTsTab nfts={fnfts}/>
            </NftProvider>
            <ActivityTab transcations={transactions.result} />
        </Tab.Panels>
        </Tab.Group>
        </div>
      </div>
    </>
  )
}

export default UserAddress

export async function getServerSideProps({ params }) {
  const _nfts = await fetch(`https://deep-index.moralis.io/api/v2/${params.userAddress}/nft?chain=0x3&format=decimal`, {
    headers: {
      "Contenty-Type": "application/json",
      "X-API-Key": process.env.API_KEY,
    },
  }).then((res) => res.json())
  const _transactions = await fetch(`https://deep-index.moralis.io/api/v2/${params.userAddress}?chain=0x3`, {
    headers: {
      "Contenty-Type": "application/json",
      "X-API-Key": process.env.API_KEY,
    },
  }).then((res) => res.json())

  const [nfts, transactions] = await Promise.all([_nfts, _transactions])
  return {
    props: {
      nfts,
      transactions,
    },
  }
}
