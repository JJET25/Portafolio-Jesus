import { motion } from 'framer-motion';

const VARIANTS = {
  up: { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 } },
  down: { initial: { opacity: 0, y: -24 }, whileInView: { opacity: 1, y: 0 } },
  left: { initial: { opacity: 0, x: -32 }, whileInView: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: 32 }, whileInView: { opacity: 1, x: 0 } },
  scale: { initial: { opacity: 0, scale: 0.94 }, whileInView: { opacity: 1, scale: 1 } },
  fade: { initial: { opacity: 0 }, whileInView: { opacity: 1 } },
};

export default function Reveal({
  children,
  delay = 0,
  duration = 0.55,
  className = '',
  as = 'div',
  variant = 'up',
}) {
  const MotionTag = motion[as] || motion.div;
  const v = VARIANTS[variant] || VARIANTS.up;
  return (
    <MotionTag
      initial={v.initial}
      whileInView={v.whileInView}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
