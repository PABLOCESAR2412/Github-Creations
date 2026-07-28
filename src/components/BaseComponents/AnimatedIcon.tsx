import React from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, BookOpen, Users, Code, Activity, Sparkles, Flame } from 'lucide-react';

interface AnimatedIconProps {
  type: 'star' | 'fork' | 'repo' | 'user' | 'code' | 'activity' | 'sparkle' | 'flame';
  className?: string;
  size?: number;
  pulse?: boolean;
  glowColor?: string;
}

const iconMap = {
  star: Star,
  fork: GitFork,
  repo: BookOpen,
  user: Users,
  code: Code,
  activity: Activity,
  sparkle: Sparkles,
  flame: Flame,
};

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  type,
  className = '',
  size = 20,
  pulse = true,
  glowColor = 'rgba(56, 189, 248, 0.4)',
}) => {
  const IconComponent = iconMap[type] || Sparkles;

  return (
    <motion.div
      className={`inline-flex items-center justify-center relative ${className}`}
      whileHover={{ scale: 1.25, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {pulse && (
        <motion.span
          className="absolute inset-0 rounded-full blur-sm"
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ backgroundColor: glowColor }}
        />
      )}
      <IconComponent size={size} className="relative z-10" />
    </motion.div>
  );
};
