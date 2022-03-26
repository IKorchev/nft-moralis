//UTILS
import { shortenIfAddress } from "@usedapp/core"
import { useRouter } from "next/router"
import { Suspense } from "react"
//ICONS
import { MdCollectionsBookmark } from "react-icons/md"
import { FiActivity } from "react-icons/fi"
import Jazzicon from "../../components/Other/Jazzicon"
//COMPONENTS
import Metadata from "../../components/Other/Metadata"
import NFTsTab from "../../components/UserPage/NFTsTab"
import ActivityTab from "../../components/UserPage/ActivityTab"
import { Tab } from "@headlessui/react"
import Loading from "../../components/Other/Loading"
import { useRecoilValue } from "recoil"
import { currentUserState } from "../../store/userSlice"

function UserAddress() {
  const router = useRouter()
  const account = useRecoilValue(currentUserState)
  return (
    <>
      <Metadata title={`NFT Explorer - Address ${router.query.userAddress || account}`} />
      <div className=' mx-auto min-h-[50rem]  overflow-hidden py-24'>
        <div className='container mx-auto mt-12 flex flex-col items-center'>
          <div className='overflow-hidden rounded-full border-4 border-white'>
            <Jazzicon address={router?.query?.userAddress !== "me" ? router?.query?.userAddress : account} size={150} />
          </div>
          <h2 className='-mt-4 cursor-pointer rounded-full bg-white p-2 text-center text-xl text-black'>
            <span className='relative flex items-center justify-center'>
              {router.query.userAddress === "me"
                ? shortenIfAddress(account)
                : shortenIfAddress(router.query.userAddress)}
            </span>
          </h2>
          <Tab.Group defaultChecked={1} as='div' className='container mt-5 flex flex-col items-center'>
            <Tab.List className='bg-secondary-800 mt-5 flex  justify-evenly rounded-lg p-4  text-white  '>
              <Tab
                className={({ selected }) =>
                  `${selected ? "bg-secondary-600 border-secondary-500 border text-white" : ""}
                 flex items-center rounded-lg px-12 py-4 `
                }>
                <MdCollectionsBookmark className='mr-3 text-xl' /> Collected
              </Tab>
              <Tab
                className={({ selected }) =>
                  `${
                    selected ? "bg-secondary-600 border-secondary-500 border text-white" : ""
                  } flex items-center rounded-lg px-12 py-3 `
                }>
                <FiActivity className='mr-3 text-xl' /> Activity
              </Tab>
            </Tab.List>
            <Tab.Panels className='w-full'>
              <Suspense fallback={<Loading />}>
                <NFTsTab address={router?.query?.userAddress} />
              </Suspense>
              <Suspense fallback={<Loading />}>
                <ActivityTab address={router?.query?.userAddress} />
              </Suspense>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </>
  )
}

export default UserAddress
