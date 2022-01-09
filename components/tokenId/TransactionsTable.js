import ExternalLinkIcon from "@heroicons/react/solid/ExternalLinkIcon"
import { shortenIfAddress, shortenTransactionHash } from "@usedapp/core"
import Moralis from "moralis"
import Link from "next/link"
import { useChain } from "react-moralis"
import { MARKET_ADDRESS } from "../../utils/ABIS"
const formatAddress = (address) => {
  switch (address) {
    case "0xe6f1a815c66bac5f1d59f802bb2a73aa77b36621":
      return "Market Contract"
    case "0x0000000000000000000000000000000000000000":
      return "Null"
    case MARKET_ADDRESS:
      return "Market Contract"
    default:
      return shortenIfAddress(address)
  }
}
const TransactionsTable = ({ transactions, rowProps, ...props }) => {
  console.log(transactions)
  return (
    <table className='w-full border-separate border mt-3' {...props}>
      <tbody>
        <tr className='border ' {...rowProps}>
          <th>Type</th>
          <th>From</th>
          <th>To</th>
          <th>Price</th>
          <th>Date</th>
          <th>Tx Hash</th>
        </tr>
        {transactions?.result.map((el) => (
          <TableRow
            {...rowProps}
            blockTimestamp={el.block_timestamp}
            transactionHash={el.transaction_hash}
            fromAddress={el.from_address}
            toAddress={el.to_address}
            price={el.value}
          />
        ))}
      </tbody>
    </table>
  )
}

const TableRow = ({
  blockTimestamp,
  transactionHash,
  fromAddress,
  toAddress,
  price,
  ...props
}) => {
  const { chain } = useChain()
  const date = new Date(blockTimestamp).toLocaleDateString("uk")
  return (
    <tr key={transactionHash} className='w-full p-2  my-1 text-center' {...props}>
      <td>
        <p className='text-center'>
          {formatAddress(fromAddress) === "Null"
            ? "Mint"
            : formatAddress(fromAddress) === "Market Contract"
            ? "Purchase"
            : formatAddress(toAddress) === "Market Contract"
            ? "Listing"
            : "Transfer "}
        </p>
      </td>
      <td>
        <Link passHref href={`/user/${fromAddress}`}>
          <span className='flex items-center justify-center cursor-pointer'>
            {formatAddress(fromAddress)}
            <ExternalLinkIcon className='ml-2 h-5 w-5' />
          </span>
        </Link>
      </td>
      <td>
        <Link passHref href={`/user/${toAddress}`}>
          <span className='flex items-center justify-center cursor-pointer'>
            {formatAddress(toAddress)}
            <ExternalLinkIcon className='ml-2 h-5 w-5' />
          </span>
        </Link>
      </td>
      <td className='text-center'>
        {Moralis.Units.FromWei(price)} {chain?.nativeCurrency?.symbol}
      </td>
      <td className='text-center'>{date}</td>
      <td>
        <a
          target='_blank'
          rel='noreferrer'
          href={`${chain.blockExplorerUrl}/tx/${transactionHash}`}>
          <span className='flex items-center justify-center cursor-pointer'>
            {shortenTransactionHash(transactionHash)}
            <ExternalLinkIcon className='ml-2 h-5 w-5' />
          </span>
        </a>
      </td>
    </tr>
  )
}

export default TransactionsTable
