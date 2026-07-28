import React from 'react';
import { Minus } from 'lucide-react';

export const Divider: React.FC = () => {
  return (
    <div className="flex items-center gap-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
      <Minus className="w-4 h-4 text-slate-400" />
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        Horizontal Divider Rule (---)
      </span>
      <div className="flex-1 h-[1px] bg-gradient-to-r from-slate-700 via-slate-600 to-transparent" />
    </div>
  );
};
