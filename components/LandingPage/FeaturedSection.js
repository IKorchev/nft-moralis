import { CollectionCard } from "../Cards/CollectionCard"
import { motion } from "framer-motion"
import SectionTitle from "../SectionTitle"
import StaggerChildren, { createSlideVariant } from "../Other/StaggerChildren"

const FeaturedSection = ({ completed }) => {
  const slideFromBottom = createSlideVariant({ from: "bottom", whileInView: true, initialValues: { y: 40 } })

  return (
    <div className='landing-page__featured-section mt-36'>
      <StaggerChildren whileInView className=' mt-12 w-full bg-cover bg-center bg-no-repeat '>
        <motion.div variants={slideFromBottom} transition={{ duration: 0.7, type: "spring", damping: 12 }}>
          <SectionTitle title='Featured collections' justify='center' />
        </motion.div>
        <StaggerChildren
          whileInView
          className=' container mx-auto mt-24 flex flex-wrap items-center justify-center gap-5 lg:gap-10'>
          {completed?.slice(2, 6).map((el, i) => (
            <motion.div
              variants={slideFromBottom}
              transition={{ duration: 0.7, type: "spring", damping: 12 }}
              key={el.attributes.contractAddress}>
              <CollectionCard
                name={el.attributes.collectionName}
                collectionAddress={el.attributes.contractAddress}
                imageUrl={el.attributes.imageUrl}
              />
            </motion.div>
          ))}
        </StaggerChildren>
      </StaggerChildren>
    </div>
  )
}

export default FeaturedSection
