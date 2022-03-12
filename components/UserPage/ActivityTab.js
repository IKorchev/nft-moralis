import { Tab } from "@headlessui/react"
import { motion } from "framer-motion"
import React from "react"
import { useChain } from "react-moralis"
import useSWR from "swr"
import { getNFTsForUser, revalidateOptions } from "../../utils/fetcher"
import TransactionsTable from "../tokenId/TransactionsTable"

const ActivityTab = ({ query }) => {
  const { chain } = useChain()
  const options = {
    url: "noNeedForUrl",
    args: { chain: chain?.chainId, address: query.userAddress },
  }
  const { data, error, isValidating } = useSWR(options, getNFTsForUser, revalidateOptions)
  return (
    <Tab.Panel
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='styled-scrollbar container mx-auto my-12 h-[40rem] max-w-[70rem] overflow-y-auto'>
      <TransactionsTable
        rowProps={{
          className: "bg-primary-50 text-lg",
        }}
        transactions={data?.transactions}
      />
    </Tab.Panel>
  )
}

export default ActivityTab
