import { shortenIfAddress } from "@usedapp/core"
import { ChevronDownIcon } from "@heroicons/react/solid"
import Jazzicon from "../../Other/Jazzicon"

const AccountAndBalance = ({ account, icon = true }) => {
  return (
    <div className='flex w-full'>
      <div className='relative  flex cursor-pointer items-center justify-center rounded-md
       border border-secondary-100 bg-secondary-600 py-1 px-4  text-white'>
        <span className='mr-3'>{shortenIfAddress(account)}</span>
        <Jazzicon address={account} size={18} />
        {icon && <ChevronDownIcon className='ml-2 h-5 w-5' />}
      </div>
    </div>
  )
}

export default AccountAndBalance
