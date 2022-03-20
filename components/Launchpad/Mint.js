import ConnectWalletButton from "../Buttons/ConnectWalletButton"
import SwitchNetworkButton from "../Buttons/SwitchNetworkButton"
import MintButton from "../Buttons/MintButton"
import { useRecoilValue } from "recoil"
import { chainState, currentUserState } from "../../store/userSlice"
import { AnimatePresence, motion } from "framer-motion"

const Mint = ({ data, contractAddress }) => {
  const account = useRecoilValue(currentUserState)
  const chain = useRecoilValue(chainState)

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        {!account ? (
          <div className='my-5 mx-auto flex w-full justify-center'>
            <ConnectWalletButton />
          </div>
        ) : chain.chainId !== "0x3" ? (
          <SwitchNetworkButton network='0x3' className='my-5' />
        ) : (
          <div
            className='bg-secondary-900 border-secondary-600 shadow-glass-secondary mt-12 flex w-full 
                      flex-col space-y-8 rounded-lg  border p-4 backdrop-blur-sm backdrop-filter'>
            <h3 className='text-tertiary-200 -mb-5 text-center text-lg'>Minted</h3>
            <div className='bg-secondary-500 relative my-3 flex h-4 w-full  overflow-hidden rounded-full'>
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
            <div className='mx-auto '>
              <MintButton contractAddress={contractAddress} cost={data?.cost} />
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default Mint
