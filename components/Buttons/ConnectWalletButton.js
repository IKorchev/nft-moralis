import React from "react"
import { useMoralis } from "react-moralis"

const ConnectWalletButton = ({
  rounded = "full",
  className,
  size = "lg",
  label = "Connect wallet",
}) => {
  const { enableWeb3 } = useMoralis()
  const padding = {
    x: size === "lg" ? "3" : size === "xs" ? "2" : "2",
    y: size === "lg" ? "2" : size === "xs" ? "0.5" : "1",
  }
  return (
    <button
      className={`rounded-${rounded} bg-orange-500 py-${padding.y} px-${padding.x} font-semibold text-gray-900 transition duration-300 hover:bg-orange-600 active:scale-95 ${className}`}
      onClick={enableWeb3}>
      {label}
    </button>
  )
}

export default ConnectWalletButton
