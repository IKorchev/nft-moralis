import ConnectWalletButton from "../Buttons/ConnectWalletButton"
import SwitchNetworkButton from "../Buttons/SwitchNetworkButton"
import MintButton from "../Buttons/MintButton"
import useSWR from "swr"
import { getFetcher } from "../../utils/fetcher"
import { RotateLoader } from "react-spinners"
import { useRecoilValue } from "recoil"
import { chainState, currentUserState } from "../../store/userSlice"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

const Mint = ({ contractAddress }) => {
  const account = useRecoilValue(currentUserState)
  const chain = useRecoilValue(chainState)
  const { data, mutate } = useSWR(contractAddress ? `/api/nft/data?contract=${contractAddress}` : null, getFetcher)
  if (!data) {
    return (
      <div className='flex h-24 w-full items-center justify-center'>
        <RotateLoader color='white' speedMultiplier={0.5} size={10} />
      </div>
    )
  }
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        {!account ? (
          <div className='my-5 mx-auto flex w-full justify-center'>
            <ConnectWalletButton />
          </div>
        ) : chain.chainId !== "0x3" ? (
          <SwitchNetworkButton network='0x3' className='my-5' />
        ) : (
          <div
            className='bg-secondary-900 border-tertiary-600 shadow-glass-secondary mt-12 flex w-full 
                      flex-col space-y-8 rounded-lg  border p-4 backdrop-blur-sm backdrop-filter'>
            <h3 className='text-tertiary-200 -mb-5 text-center text-lg'>Minted</h3>
            <div className='bg-tertiary-900 relative my-3 flex h-4 w-full  overflow-hidden rounded-full'>
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(data?.supply / data?.maxSupply) * 100}%`,
                  transition: {
                    duration: 1,
                  },
                }}
                className='bg-tertiary-200 absolute top-0 left-0 grid h-4 place-items-center rounded-full '></motion.div>
              <span className='w-full text-center text-[12px]'>
                {data?.supply} / {data?.maxSupply} ({((data?.supply / data?.maxSupply) * 100).toFixed(2)}%)
              </span>
            </div>
            <div className='mx-auto flex items-center justify-center space-x-3 rounded-md xl:w-2/3 '>
              <MintButton contractAddress={contractAddress} cost={data?.cost} />
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default Mint
