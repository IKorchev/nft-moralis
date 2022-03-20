import { motion } from "framer-motion"

const StaggerChildren = ({
  whileInView = false, //if true animate only when in scroll is in view
  staggerDelay = 0.15, // delay for each child
  duration = 1.5, // total animation duration
  once = false, // if true and whileInView is true it will animate every time the scroll goes out then in view
  children,
  ...props
}) => {
  const animate = {
    opacity: 1,
    transition: {
      duration: duration,
      staggerChildren: staggerDelay,
    },
  }
  const containerVariants = {
    initial: {
      opacity: 0,
    },
    animate: animate,
    whileInView: whileInView ? animate : {},
  }

  return (
    <motion.div
      {...props}
      viewport={{ once: once }}
      variants={containerVariants}
      initial='initial'
      whileInView='whileInView'
      animate='animate'>
      {children}
    </motion.div>
  )
}

// Create object to use for the children
// TODO: Maybe create a function for a fade, and other animations
export const createSlideVariant = ({
  from,
  whileInView,
  initialValues = {
    y: 40,
    x: 150,
  },
  animateValues = {
    opacity: 1,
    x: 0,
    y: 0,
  },
  initialName = "initial",
  animateName = whileInView ? "whileInView" : "animate",
}) => {
  return {
    [initialName]: {
      opacity: 0,
      x: from === "left" ? -initialValues.x : from === "right" ? initialValues.x : 0,
      y: from === "top" ? -initialValues.y : from === "bottom" ? initialValues.y : 0,
    },
    [animateName]: {
      ...animateValues,
    },
  }
}

export default StaggerChildren
