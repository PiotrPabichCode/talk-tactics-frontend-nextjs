import { motion } from 'framer-motion';

export default function ScrollAnimationWrapper({
  children,
  className,
  ...props
}: {
  children: any;
  className?: any;
}) {
  return (
    <motion.div
      initial='offscreen'
      whileInView='onscreen'
      viewport={{ once: true, amount: 1 }}
      className={className}
      {...props}>
      {children}
    </motion.div>
  );
}
