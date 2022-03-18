import React from "react"
import { useMoralis } from "react-moralis"

const ConnectWalletButton = ({ rounded = "full", className, size = "lg", label = "Connect wallet" }) => {
  const { enableWeb3 } = useMoralis()

  return (
    <button
      className={`rounded-${rounded} bg-orange-600 py-1
       px-3 text-${size} border-2
       border-orange-700 text-gray-800
        transition duration-300 focus:bg-orange-500 active:scale-95 hover:bg-orange-500 ${className}`}
      onClick={enableWeb3}>
      {label}
    </button>
  )
}

export default ConnectWalletButton
