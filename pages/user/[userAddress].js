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

import Loading from "../../components/Other/Loading"
import Metadata from "../../components/Other/Metadata"
import NFTsTab from "../../components/UserPage/NFTsTab"
import ActivityTab from "../../components/UserPage/ActivityTab"

function UserAddress() {
  const router = useRouter()

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
        <Tab.List className='bg-primary-700 mt-5 flex  justify-evenly rounded-lg p-4  text-white  '>
          <Tab
            className={({ selected }) =>
              `${selected ? "bg-secondary-100/30 shadow-glass-large text-white" : ""}
                } flex items-center rounded-lg px-12 py-4 `
            }>
            <MdCollectionsBookmark className='mr-3 text-xl' /> Collected
          </Tab>
          <Tab
            //prettier-ignore
            className={({ selected }) =>`${selected ? "bg-secondary-100/30 text-white shadow-glass-large" : ""} flex items-center px-12 py-3 rounded-lg `}>
            <FiActivity className='mr-3 text-xl' /> Activity
          </Tab>
        </Tab.List>
        <Tab.Panels className='w-full'>
            <NFTsTab query={router.query}/>
            <ActivityTab query={router.query} />
        </Tab.Panels>
        </Tab.Group>
        </div>
      </div>
    </>
  )
}

export default UserAddress
