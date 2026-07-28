import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedIcon } from './AnimatedIcon';
import { formatNumber } from '../../utils/formatters';

interface StatsBlockProps {
  label: string;
  value: number;
  iconType: 'star' | 'fork' | 'repo' | 'user' | 'code' | 'flame';
  color: string;
  glowColor: string;
}

export const StatsBlock: React.FC<StatsBlockProps> = ({ label, value, iconType, color, glowColor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, translateY: -2 }}
      className="relative overflow-hidden bg-slate-900/90 border border-slate-800/80 p-4 rounded-xl shadow-lg flex items-center gap-4"
    >
      <div
        className="p-3 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `${color}20`, color: color }}
      >
        <AnimatedIcon type={iconType} size={22} glowColor={glowColor} />
      </div>
      <div>
        <span className="text-xs text-slate-400 font-medium tracking-wide uppercase block">{label}</span>
        <motion.span
          className="text-xl font-extrabold text-black dark:text-black dark:text-white tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {formatNumber(value)}
        </motion.span>
      </div>
    </motion.div>
  );
};
