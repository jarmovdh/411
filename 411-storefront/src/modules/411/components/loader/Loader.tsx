"use client"

import { motion } from "framer-motion"
import LoaderIcon from "../../../../../public/assets/icons/LoaderIcon"

export const Loader = () => {
  return (
    <div className="h-full w-full grid place-items-center p-2.5">
      <motion.div
        className="inline-block"
        animate={{ rotate: 360 }}
        transition={{
          ease: "linear",
          duration: 2,
          repeat: Infinity,
        }}
      >
        <LoaderIcon className="h-8 md:h-10" />
      </motion.div>
    </div>
  )
}

export default Loader
