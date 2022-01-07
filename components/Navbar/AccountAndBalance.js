import { useMoralis, useChain } from "react-moralis"
import { useEffect, useRef, useState } from "react"
import { shortenAddress, useEtherBalance } from "@usedapp/core"
import { formatEther } from "@ethersproject/units"
import Tooltip from "../Tooltip"
import { createIcon } from "../../utils/common"
import Jazzicon from "../Jazzicon"

const AccountAndBalance = () => {
  const { chainId, account, switchNetwork, chain } = useChain()
  const balance = useEtherBalance(account)
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <>
      {chainId !== "0x3" ? (
        <>
          <div className='bg-pinkish flex-col xl:flex-row shadow-4xl inline-flex items-center justify-center rounded-lg py-0.5 text-light mr-3'>
            <button className='px-2' onClick={() => switchNetwork("0x3")}>
              Switch to Ropsten
            </button>
          </div>
        </>
      ) : (
        <div className='bg-pinkish flex-col xl:flex-row shadow-4xl inline-flex items-center justify-center rounded-lg py-0.5 text-light mr-3'>
          {balance && (
            <span className='px-2 text-black font-bold'>
              {parseFloat(formatEther(balance)).toFixed(5)} {chain.nativeCurrency.symbol}
            </span>
          )}
          <div
            className='relative flex justify-center items-center text-light bg-primary rounded-md cursor-pointer px-2 mx-1 '
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}>
            <Tooltip shown={showTooltip} text={account} className='-mt-3' />
            <span>{account && shortenAddress(account)}</span>
            <Jazzicon address={account} size={18} />
          </div>
        </div>
      )}
    </>
  )
}

export default AccountAndBalance
