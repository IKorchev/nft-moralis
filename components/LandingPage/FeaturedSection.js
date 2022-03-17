import { CollectionCard } from "../Cards/CollectionCard"
import { motion } from "framer-motion"
import SectionTitle from "../SectionTitle"
const FeaturedSection = ({ completed }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.15,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div
      style={{
        backgroundImage: "url('/Group_1.png')",
        backgroundSize: "contain",
      }}
      className='mt-12 bg-cover bg-center bg-no-repeat py-24'>
      <SectionTitle title='Featured collections' justify='center' />
      <motion.div
        variants={container}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        className=' container mx-auto  mt-12  flex flex-wrap items-center
   justify-center gap-2 lg:gap-10'>
        {completed?.slice(1, 4).map((el, i) => (
          <motion.div variants={item} viewport={{ once: true }} whileInView='show' key={el.attributes.contractAddress}>
            <CollectionCard
              name={el.attributes.collectionName}
              collectionAddress={el.attributes.contractAddress}
              imageUrl={el.attributes.imageUrl}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default FeaturedSection
