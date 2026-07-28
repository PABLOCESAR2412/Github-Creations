import React from 'react';
import { Space as SpacingIcon } from 'lucide-react';

interface SpacerProps {
  height?: number;
  onChange?: (val: number) => void;
}

export const Spacer: React.FC<SpacerProps> = ({ height = 20, onChange }) => {
  return (
    <div className="space-y-2 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <SpacingIcon className="w-4 h-4 text-slate-400" /> Vertical Spacer
        </label>
        <span className="text-xs text-cyan-400 font-mono">{height}px</span>
      </div>
      <input
        type="range"
        min={10}
        max={100}
        step={5}
        value={height}
        onChange={(e) => onChange?.(Number(e.target.value))}
        className="w-full accent-cyan-500 cursor-pointer"
      />
    </div>
  );
};
