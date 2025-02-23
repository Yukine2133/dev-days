import { motion } from "framer-motion";

export const PageHeader = () => (
  <div className="text-center space-y-4 mb-8">
    <motion.h1
      className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 bg-clip-text text-transparent"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Dev Days
    </motion.h1>
    <motion.h2
      className="text-lg md:text-xl text-zinc-400 font-medium"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <span className="text-purple-400">Mapping</span> Your Project Journey
    </motion.h2>
  </div>
);
