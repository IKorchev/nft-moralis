import { motion } from "framer-motion"

const InfoBox = ({ animationVariants, title, subtitle }) => {
  return (
    <motion.li
      variants={animationVariants}
      className='border-secondary-200 bg-secondary-100/20 shadow-glass-large flex w-full flex-col items-center justify-between overflow-hidden rounded-lg border py-2 backdrop-blur-sm backdrop-filter'>
      <span>{title}</span>
      <span>{subtitle}</span>
    </motion.li>
  )
}

export default InfoBox
