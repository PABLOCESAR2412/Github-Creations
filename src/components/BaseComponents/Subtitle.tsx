import React from 'react';
import { Type } from 'lucide-react';

interface SubtitleProps {
  content?: string;
  onChange?: (val: string) => void;
  align?: 'left' | 'center' | 'right';
  onAlignChange?: (align: 'left' | 'center' | 'right') => void;
}

export const Subtitle: React.FC<SubtitleProps> = ({
  content = '🚀 Full-Stack Developer | Open Source Enthusiast',
  onChange,
  align = 'left',
  onAlignChange,
}) => {
  return (
    <div className="space-y-2 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
          <Type className="w-4 h-4 text-purple-400" /> Subtitle (H3)
        </label>
        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded border border-slate-700">
          {(['left', 'center', 'right'] as const).map((a) => (
            <button
              key={a}
              onClick={() => onAlignChange?.(a)}
              className={`px-2 py-0.5 text-xs rounded capitalize transition-all ${
                align === a ? 'bg-purple-500 text-black dark:text-white font-semibold' : 'text-slate-400 hover:text-black dark:text-white'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>
      <input
        type="text"
        value={content}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Enter sub-header description..."
        className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-purple-500 transition-colors"
      />
    </div>
  );
};
