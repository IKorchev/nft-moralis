import { Tab } from "@headlessui/react"
import { motion } from "framer-motion"
import React from "react"
import { useRecoilValue } from "recoil"
import { userTransactions } from "../../store/userSlice"
import TransactionsTable from "../tokenId/TransactionsTable"

const ActivityTab = ({ address }) => {
  const transactions = useRecoilValue(userTransactions({ address: address }))
  console.log(transactions)
  return (
    <Tab.Panel
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='styled-scrollbar container mx-auto my-12 overflow-y-auto'>
      <TransactionsTable
        rowProps={{
          className: "bg-primary-50 text-lg",
        }}
        transactions={transactions}
      />
    </Tab.Panel>
  )
}

export default ActivityTab
