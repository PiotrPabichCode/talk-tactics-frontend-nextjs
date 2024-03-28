import { motion } from 'framer-motion';

export function AnimateWhenVisible({ children }) {
  return (
    <motion.div
      initial='offscreen'
      whileInView='onscreen'
      viewport={{ once: true }}
      transition={{ duration: 5, type: 'spring' }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 },
      }}>
      {children}
    </motion.div>
  );
}
