import React from "react"
import { useMoralis } from "react-moralis"

const ConnectWalletButton = ({ rounded = "full", className }) => {
  const { enableWeb3 } = useMoralis()
  return (
    <button
      className={`rounded-${rounded} bg-orange-500 py-2 px-3 font-semibold text-gray-900 transition duration-300 hover:bg-orange-600 ${className}`}
      onClick={enableWeb3}>
      Connect wallet
    </button>
  )
}

export default ConnectWalletButton
