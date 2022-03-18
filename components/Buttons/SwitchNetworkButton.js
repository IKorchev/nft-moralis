import React from "react"
import { useChain, useMoralis } from "react-moralis"
const SwitchNetworkButton = ({
  network = "0x3",
  className,
  rounded = "full",
  label = "Switch network",
  size = "base",
}) => {
  const { switchNetwork } = useChain()
  const { enableWeb3, isWeb3Enabled } = useMoralis()

  return (
    <button
      className={`card-button w-max bg-secondary-700 px-3 py-1 text-${size} font-medium text-white transition duration-150 active:scale-90 rounded-${rounded} ${className}`}
      onClick={async () => {
        if (!isWeb3Enabled) {
          await enableWeb3()
        } //necessary await
        switchNetwork(network)
      }}>
      {label}
    </button>
  )
}

export default SwitchNetworkButton
