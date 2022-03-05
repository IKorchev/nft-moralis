import { useCountdownTimer } from "../../hooks/useCountdownTimer"

const Countdown = ({ startDate, onFinish }) => {
  const { timeLeft } = useCountdownTimer({ startDate, callback: onFinish })

  return (
    <div className='mt-5 space-y-3'>
      <p className=' text-lg'>Mint starts in</p>
      <p className='text-sm text-white'>{`${timeLeft.days()} day(s) ${timeLeft.hours()} hours ${timeLeft.minutes()} minutes ${timeLeft.seconds()} seconds  `}</p>
    </div>
  )
}

export default Countdown
