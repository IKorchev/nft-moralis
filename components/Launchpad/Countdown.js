import moment from "moment"
const Countdown = ({ timeLeft }) => {
  return (
    <div className='mt-5 space-y-3'>
      <p className=' text-lg'>Mint starts in</p>
      <p>{}</p>
      <p className='text-sm text-white'>{`${timeLeft.days()} day(s) ${timeLeft.hours()} hours ${timeLeft.minutes()} minutes ${timeLeft.seconds()} seconds  `}</p>
    </div>
  )
}

export default Countdown
