import { Market } from "../features/Market"

export const useMarketInstance = () => {
  const market = new Market()
  return { market }
}
