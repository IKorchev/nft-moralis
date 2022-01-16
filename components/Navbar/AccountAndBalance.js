import { useChain } from "react-moralis"
import { useState } from "react"
import { shortenAddress, useEtherBalance } from "@usedapp/core"
import { formatEther } from "@ethersproject/units"

import Jazzicon from "../Jazzicon"
import { ChevronDownIcon } from "@heroicons/react/solid"

const AccountAndBalance = ({ icon = true }) => {
  const { account, chain } = useChain()
  const balance = useEtherBalance(account)

  return (
    <div className='mx-auto w-full flex'>
      <div className='bg-pinkish flex-col xl:flex-row shadow-4xl inline-flex items-center justify-center rounded-lg py-0.5 text-light '>
        {balance && (
          <span className='px-2 text-black font-bold'>
            {parseFloat(formatEther(balance)).toFixed(5)} {chain.nativeCurrency.symbol}
          </span>
        )}
        <div
          className='relative flex justify-center items-center text-light bg-primary rounded-md cursor-pointer px-2 mx-1 '>
          <span>{account && shortenAddress(account)}</span>
          <Jazzicon address={account} size={18} />
          {icon && <ChevronDownIcon className='h-5 w-5' />}
        </div>
      </div>
    </div>
  )
}

export default AccountAndBalance
