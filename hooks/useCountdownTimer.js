import moment from "moment"
import { useEffect, useState } from "react"

export const useCountdownTimer = ({ startDate, callback }) => {
  const targetTime = moment(new Date(startDate))
  const [currentTime, setCurrentTime] = useState(moment().utc())
  const timeLeft = moment.duration(targetTime.diff(currentTime))
  const countdownFinished =
    timeLeft._data.days <= 0 &&
    timeLeft._data.hours <= 0 &&
    timeLeft._data.minutes <= 0 &&
    timeLeft._data.seconds <= 0

  useEffect(() => {
    if (!countdownFinished) {
      //countdown timer
      const interval = setInterval(() => {
        setCurrentTime(moment().utc())
      }, 1000)
    }
    if (countdownFinished) {
      return callback()
    }
    return () => clearInterval()
  }, [countdownFinished])
  return { timeLeft }
}
