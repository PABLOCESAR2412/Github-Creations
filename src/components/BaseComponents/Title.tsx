import React from 'react';
import { Heading } from 'lucide-react';

interface TitleProps {
  content?: string;
  onChange?: (val: string) => void;
  align?: 'left' | 'center' | 'right';
  onAlignChange?: (align: 'left' | 'center' | 'right') => void;
}

export const Title: React.FC<TitleProps> = ({
  content = "Hi there 👋, I'm {name}",
  onChange,
  align = 'left',
  onAlignChange,
}) => {
  return (
    <div className="space-y-2 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
          <Heading className="w-4 h-4 text-cyan-400" /> Title (H1)
        </label>
        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded border border-slate-700">
          {(['left', 'center', 'right'] as const).map((a) => (
            <button
              key={a}
              onClick={() => onAlignChange?.(a)}
              className={`px-2 py-0.5 text-xs rounded capitalize transition-all ${
                align === a ? 'bg-cyan-500 text-black font-semibold' : 'text-slate-400 hover:text-black dark:text-white'
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
        placeholder="Enter main header text..."
        className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
      />
    </div>
  );
};
