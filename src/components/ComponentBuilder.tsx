import React from 'react';
import { useEditorStore } from '../store/editorStore';
import { Title } from './BaseComponents/Title';
import { Subtitle } from './BaseComponents/Subtitle';
import { Spacer } from './BaseComponents/Spacer';
import { Divider } from './BaseComponents/Divider';
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Layers,
  BarChart2,
  Code2,
  Shield,
  Table as TableIcon,
  Palette,
  Sparkles,
} from 'lucide-react';
import { MarkdownComponent } from '../types/github';
import { motion, AnimatePresence } from 'framer-motion';

const THEMES = [
  { id: 'github_dark', name: 'GitHub Dark' },
  { id: 'tokyonight', name: 'Tokyo Night' },
  { id: 'dracula', name: 'Dracula' },
  { id: 'radical', name: 'Radical' },
  { id: 'dark', name: 'Dark Standard' },
  { id: 'gruvbox', name: 'Gruvbox' },
];

const BADGE_STYLES = [
  { id: 'for-the-badge', name: 'For The Badge' },
  { id: 'flat-square', name: 'Flat Square' },
  { id: 'flat', name: 'Flat Standard' },
  { id: 'plastic', name: 'Plastic' },
];

export const ComponentBuilder: React.FC = () => {
  const { components, addComponent, removeComponent, updateComponent, reorderComponents, setPreset } =
    useEditorStore();

  const handleAdd = (type: MarkdownComponent['type']) => {
    switch (type) {
      case 'title':
        addComponent({ type: 'title', content: "Hi there 👋, I'm {name}", align: 'left' });
        break;
      case 'subtitle':
        addComponent({ type: 'subtitle', content: '🚀 Full-Stack Developer & Tech Enthusiast', align: 'left' });
        break;
      case 'stats':
        addComponent({ type: 'stats', theme: 'github_dark', align: 'left' });
        break;
      case 'languages':
        addComponent({ type: 'languages', theme: 'github_dark', align: 'left' });
        break;
      case 'socials':
        addComponent({ type: 'socials', badgeStyle: 'for-the-badge', align: 'left' });
        break;
      case 'badges':
        addComponent({ type: 'badges', badgeStyle: 'for-the-badge', align: 'left' });
        break;
      case 'streak':
        addComponent({ type: 'streak', theme: 'soft-green', align: 'left' });
        break;
      case 'activity_graph':
        addComponent({ type: 'activity_graph', theme: 'github-compact', align: 'left' });
        break;
      case 'visitors':
        addComponent({ type: 'visitors', align: 'left' });
        break;
      case 'repos':
        addComponent({ type: 'repos' });
        break;
      case 'table':
        addComponent({ type: 'table' });
        break;
      case 'divider':
        addComponent({ type: 'divider' });
        break;
      case 'spacer':
        addComponent({ type: 'spacer', height: 20 });
        break;
    }
  };

  const componentTypes = [
    { id: 'title', label: 'TITLE', icon: <Plus className="w-4 h-4" /> },
    { id: 'subtitle', label: 'SUBTITLE', icon: <Plus className="w-4 h-4" /> },
    { id: 'stats', label: 'STATS', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'languages', label: 'LANGS', icon: <Code2 className="w-4 h-4" /> },
    { id: 'badges', label: 'BADGES', icon: <Shield className="w-4 h-4" /> },
    { id: 'streak', label: 'STREAK', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'activity_graph', label: 'GRAPH', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'visitors', label: 'VISITORS', icon: <Layout className="w-4 h-4" /> },
    { id: 'repos', label: 'REPOS', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'table', label: 'TABLE', icon: <TableIcon className="w-4 h-4" /> },
    { id: 'divider', label: 'DIVIDER', icon: <Plus className="w-4 h-4" /> },
  ] as const;

  return (
    <div className="bg-black border border-zinc-800 p-5 shadow-[8px_8px_0px_0px_rgba(63,63,70,1)] font-mono">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00ffff] text-black">
            <Layout className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">[ COMPONENT_BUILDER ]</h2>
            <p className="text-[10px] text-zinc-500 uppercase">Construct your profile</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-black p-1 border border-zinc-800 text-[10px]">
          <span className="uppercase font-bold text-zinc-500 px-2">Presets:</span>
          {(['full', 'minimal', 'cards'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPreset(p)}
              className="px-2 py-0.5 uppercase hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all font-bold border border-transparent hover:border-zinc-700"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-5">
        <div>
          <h3 className="text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest">&gt; ADD_COMPONENT</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {componentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleAdd(type.id as MarkdownComponent['type'])}
                className="flex flex-col items-center gap-1.5 p-2 bg-black border border-zinc-800 hover:border-[#00ffff] hover:text-[#00ffff] text-zinc-400 transition-colors uppercase"
              >
                {type.icon}
                <span className="text-[10px] font-bold">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-bold text-zinc-400 mb-2 flex items-center justify-between uppercase tracking-widest">
            <span>&gt; ACTIVE_COMPONENTS</span>
            <span className="bg-zinc-900 text-[#00ffff] px-1.5 py-0.5 font-bold">
              {components.length}
            </span>
          </h3>

          <div className="space-y-2.5">
            <AnimatePresence>
              {components.map((comp, idx) => (
                <motion.div
                  key={comp.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group relative bg-black border border-zinc-800 p-3 space-y-3"
                >
                  <div className="flex items-center justify-between mb-3 border-b border-zinc-800 pb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#00ffff] flex items-center gap-2">
                      <span className="w-4 h-4 bg-zinc-900 border border-[#00ffff] text-[#00ffff] flex items-center justify-center font-mono">
                        {idx + 1}
                      </span>
                      [{comp.type}]
                    </span>
                    align={comp.align}
                    onAlignChange={(align) => updateComponent(idx, { align })}
                  />
                )}

                {comp.type === 'subtitle' && (
                  <Subtitle
                    content={comp.content}
                    onChange={(val) => updateComponent(idx, { content: val })}
                    align={comp.align}
                    onAlignChange={(align) => updateComponent(idx, { align })}
                  />
                )}

                {(comp.type === 'stats' || comp.type === 'languages' || comp.type === 'streak' || comp.type === 'activity_graph') && (
                  <div className="flex items-center gap-4 bg-zinc-950 p-2 border border-zinc-800 text-xs">
                    <div className="flex items-center gap-2">
                      <Palette className="w-4 h-4 text-[#00ffff]" />
                      <span className="text-zinc-400 uppercase tracking-widest text-[10px]">[ CARD_THEME ]</span>
                    </div>
                    <select
                      value={comp.theme || (comp.type === 'streak' ? 'soft-green' : comp.type === 'activity_graph' ? 'github-compact' : comp.type === 'languages' ? 'codeSTACKr' : 'github_dark')}
                      onChange={(e) => updateComponent(idx, { theme: e.target.value as any })}
                      className="bg-black border border-zinc-800 text-white px-2 py-1 focus:outline-none focus:border-[#00ffff] uppercase"
                    >
                      {THEMES.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                      <option value="codeSTACKr">CODESTACKR</option>
                      <option value="github-compact">GITHUB-COMPACT</option>
                      <option value="soft-green">SOFT-GREEN</option>
                    </select>
                  </div>
                )}

                {comp.type === 'visitors' && (
                  <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs text-slate-400">
                    Displays profile visitors counter badges.
                  </div>
                )}

                {comp.type === 'badges' && (
                  <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Badge Style:</span>
                      <select
                        value={comp.badgeStyle || 'for-the-badge'}
                        onChange={(e) => updateComponent(idx, { badgeStyle: e.target.value as any })}
                        className="bg-slate-950 border border-slate-800 text-slate-200 rounded px-2.5 py-1 focus:border-pink-500 w-32"
                      >
                        <option value="flat">Flat</option>
                        <option value="flat-square">Flat Square</option>
                        <option value="for-the-badge">For the Badge</option>
                        <option value="plastic">Plastic</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-col items-center gap-1 flex-1">
                        <span className="text-[10px] text-slate-400">Label</span>
                        <input
                          type="color"
                          value={comp.labelColor || '#488207'}
                          onChange={(e) => updateComponent(idx, { labelColor: e.target.value })}
                          className="w-full h-6 cursor-pointer bg-transparent border-0 p-0"
                        />
                      </div>
                      <div className="flex flex-col items-center gap-1 flex-1">
                        <span className="text-[10px] text-slate-400">Value</span>
                        <input
                          type="color"
                          value={comp.valueColor || '#55960c'}
                          onChange={(e) => updateComponent(idx, { valueColor: e.target.value })}
                          className="w-full h-6 cursor-pointer bg-transparent border-0 p-0"
                        />
                      </div>
                      <div className="flex flex-col items-center gap-1 flex-1">
                        <span className="text-[10px] text-slate-400">Logo</span>
                        <input
                          type="color"
                          value={comp.logoColor || '#ffffff'}
                          onChange={(e) => updateComponent(idx, { logoColor: e.target.value })}
                          className="w-full h-6 cursor-pointer bg-transparent border-0 p-0"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {comp.type === 'spacer' && (
                  <Spacer
                    height={comp.height}
                    onChange={(val) => updateComponent(idx, { height: val })}
                  />
                )}

                {comp.type === 'divider' && <Divider />}

                {comp.type === 'repos' && (
                  <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs text-slate-400">
                    Displays your top repository cards in a styled table layout.
                  </div>
                )}

                {comp.type === 'table' && (
                  <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs text-slate-400">
                    Displays language distribution percentage bars in Markdown table format.
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
