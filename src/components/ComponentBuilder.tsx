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
  Layout,
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



export const ComponentBuilder: React.FC = () => {
  const { components, addComponent, removeComponent, updateComponent, reorderComponents, setPreset, language } =
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
      case 'dynamic_stats':
        addComponent({ 
          type: 'dynamic_stats', 
          layout: 'neon-cluster',
          badgeStyle: 'for-the-badge',
          badgeDirection: 'row',
          badgeSpacing: 'compact',
          labelColor: '#1e293b',
          valueColor: '#0ea5e9',
          logoColor: '#ffffff',
          selectedStats: { followers: true, following: true, repos: true, gists: true, stars: true }
        });
        break;
    }
  };

  const componentTypes = [
    { id: 'title', label: language === 'es' ? 'TÍTULO' : 'TITLE', icon: <Plus className="w-4 h-4" /> },
    { id: 'subtitle', label: language === 'es' ? 'SUBTÍTULO' : 'SUBTITLE', icon: <Plus className="w-4 h-4" /> },
    { id: 'stats', label: language === 'es' ? 'ESTADÍSTICAS' : 'STATS', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'languages', label: language === 'es' ? 'LENGUAJES' : 'LANGS', icon: <Code2 className="w-4 h-4" /> },
    { id: 'badges', label: language === 'es' ? 'INSIGNIAS' : 'BADGES', icon: <Shield className="w-4 h-4" /> },
    { id: 'streak', label: language === 'es' ? 'RACHA' : 'STREAK', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'activity_graph', label: language === 'es' ? 'GRÁFICA' : 'GRAPH', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'visitors', label: language === 'es' ? 'VISITAS' : 'VISITORS', icon: <Layout className="w-4 h-4" /> },
    { id: 'repos', label: 'REPOS', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'table', label: language === 'es' ? 'TABLA' : 'TABLE', icon: <TableIcon className="w-4 h-4" /> },
    { id: 'divider', label: language === 'es' ? 'SEPARADOR' : 'DIVIDER', icon: <Plus className="w-4 h-4" /> },
    { id: 'dynamic_stats', label: language === 'es' ? 'STATS CUSTOM' : 'CUSTOM STATS', icon: <Shield className="w-4 h-4" /> },
  ] as const;

  return (
    <div className="bg-[#f5f4ef] dark:bg-black border border-zinc-300 dark:border-zinc-800 p-5 shadow-[8px_8px_0px_0px_rgba(63,63,70,1)] font-mono">
      <div className="flex items-center justify-between border-b border-zinc-300 dark:border-zinc-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00ffff] dark:bg-white text-black">
            <Layout className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-black dark:text-white uppercase tracking-widest">
              {language === 'es' ? '[ CONSTRUCTOR_COMPONENTES ]' : '[ COMPONENT_BUILDER ]'}
            </h2>
            <p className="text-[10px] text-zinc-600 dark:text-zinc-500 uppercase">
              {language === 'es' ? 'Construye tu perfil' : 'Construct your profile'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-[#f5f4ef] dark:bg-black p-1 border border-zinc-300 dark:border-zinc-800 text-[10px]">
          <span className="uppercase font-bold text-zinc-600 dark:text-zinc-500 px-2">{language === 'es' ? 'Plantillas:' : 'Presets:'}</span>
          {(['full', 'minimal', 'cards'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPreset(p)}
              className="px-2 py-0.5 uppercase hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-all font-bold border border-transparent hover:border-zinc-300 dark:hover:border-zinc-700"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-5">
        <div>
          <h3 className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 mb-2 uppercase tracking-widest">
            &gt; {language === 'es' ? 'AÑADIR_COMPONENTE' : 'ADD_COMPONENT'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {componentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleAdd(type.id as MarkdownComponent['type'])}
                className="flex flex-col items-center gap-1.5 p-2 bg-[#f5f4ef] dark:bg-black border border-zinc-300 dark:border-zinc-800 hover:border-[#00ffff] dark:hover:border-white hover:text-[#00ffff] dark:hover:text-white text-zinc-600 dark:text-zinc-400 transition-colors uppercase"
              >
                {type.icon}
                <span className="text-[10px] font-bold">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 mb-2 flex items-center justify-between uppercase tracking-widest">
            <span>&gt; {language === 'es' ? 'COMPONENTES_ACTIVOS' : 'ACTIVE_COMPONENTS'}</span>
            <span className="bg-zinc-200 dark:bg-zinc-900 text-[#00ffff] dark:text-white px-1.5 py-0.5 font-bold">
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
                  className="group relative bg-[#f5f4ef] dark:bg-black border border-zinc-300 dark:border-zinc-800 p-3 space-y-3"
                >
                  <div className="flex items-center justify-between mb-3 border-b border-zinc-300 dark:border-zinc-800 pb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#00ffff] dark:text-white flex items-center gap-2">
                      <span className="w-4 h-4 bg-zinc-200 dark:bg-zinc-900 border border-[#00ffff] dark:border-white text-[#00ffff] dark:text-white flex items-center justify-center font-mono">
                        {idx + 1}
                      </span>
                      [{comp.type}]
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => idx > 0 && reorderComponents(idx, idx - 1)}
                        disabled={idx === 0}
                        className="p-1 text-zinc-600 hover:text-[#00ffff] dark:hover:text-white disabled:opacity-30 transition-colors bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800"
                        title={language === 'es' ? "Mover Arriba" : "Move Up"}
                      >
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => idx < components.length - 1 && reorderComponents(idx, idx + 1)}
                        disabled={idx === components.length - 1}
                        className="p-1 text-zinc-600 hover:text-[#00ffff] dark:hover:text-white disabled:opacity-30 transition-colors bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800"
                        title={language === 'es' ? "Mover Abajo" : "Move Down"}
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeComponent(idx)}
                        className="p-1 text-zinc-600 hover:text-red-500 transition-colors bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800"
                        title={language === 'es' ? "Eliminar" : "Delete"}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {comp.type === 'title' && (
                    <Title
                      content={comp.content}
                      onChange={(val) => updateComponent(idx, { content: val })}
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
                  <div className="flex items-center gap-4 bg-white dark:bg-zinc-950 p-2 border border-zinc-300 dark:border-zinc-800 text-xs">
                    <div className="flex items-center gap-2">
                      <Palette className="w-4 h-4 text-[#00ffff] dark:text-white" />
                      <span className="text-zinc-600 dark:text-zinc-400 uppercase tracking-widest text-[10px]">{language === 'es' ? '[ TEMA_DE_TARJETA ]' : '[ CARD_THEME ]'}</span>
                    </div>
                    <select
                      value={comp.theme || (comp.type === 'streak' ? 'soft-green' : comp.type === 'activity_graph' ? 'github-compact' : comp.type === 'languages' ? 'codeSTACKr' : 'github_dark')}
                      onChange={(e) => updateComponent(idx, { theme: e.target.value as any })}
                      className="bg-[#f5f4ef] dark:bg-black border border-zinc-300 dark:border-zinc-800 text-black dark:text-white px-2 py-1 focus:outline-none focus:border-[#00ffff] dark:focus:border-white uppercase"
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
                  <div className="bg-[#f5f4ef] dark:bg-slate-900/60 p-3 rounded-lg border border-zinc-300 dark:border-slate-800 text-xs text-zinc-600 dark:text-slate-400">
                    {language === 'es' ? 'Muestra un contador de visitas a tu perfil.' : 'Displays profile visitors counter badges.'}
                  </div>
                )}

                {comp.type === 'badges' && (
                  <div className="bg-[#f5f4ef] dark:bg-slate-900/60 p-3 rounded-lg border border-zinc-300 dark:border-slate-800 text-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-600 dark:text-slate-400">{language === 'es' ? 'Estilo:' : 'Badge Style:'}</span>
                      <select
                        value={comp.badgeStyle || 'for-the-badge'}
                        onChange={(e) => updateComponent(idx, { badgeStyle: e.target.value as any })}
                        className="bg-white dark:bg-slate-950 border border-zinc-300 dark:border-slate-800 text-black dark:text-slate-200 rounded px-2.5 py-1 focus:border-[#00ffff] dark:focus:border-white w-32"
                      >
                        <option value="flat">Flat</option>
                        <option value="flat-square">Flat Square</option>
                        <option value="for-the-badge">For the Badge</option>
                        <option value="plastic">Plastic</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-col items-center gap-1 flex-1">
                        <span className="text-[10px] text-zinc-600 dark:text-slate-400">{language === 'es' ? 'Etiqueta' : 'Label'}</span>
                        <input
                          type="color"
                          value={comp.labelColor || '#488207'}
                          onChange={(e) => updateComponent(idx, { labelColor: e.target.value })}
                          className="w-full h-6 cursor-pointer bg-transparent border-0 p-0"
                        />
                      </div>
                      <div className="flex flex-col items-center gap-1 flex-1">
                        <span className="text-[10px] text-zinc-600 dark:text-slate-400">{language === 'es' ? 'Valor' : 'Value'}</span>
                        <input
                          type="color"
                          value={comp.valueColor || '#55960c'}
                          onChange={(e) => updateComponent(idx, { valueColor: e.target.value })}
                          className="w-full h-6 cursor-pointer bg-transparent border-0 p-0"
                        />
                      </div>
                      <div className="flex flex-col items-center gap-1 flex-1">
                        <span className="text-[10px] text-zinc-600 dark:text-slate-400">Logo</span>
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
                  <div className="bg-[#f5f4ef] dark:bg-slate-900/60 p-3 rounded-lg border border-zinc-300 dark:border-slate-800 text-xs text-zinc-600 dark:text-slate-400">
                    {language === 'es' ? 'Muestra tus repositorios principales en tarjetas.' : 'Displays your top repository cards in a styled table layout.'}
                  </div>
                )}

                {comp.type === 'table' && (
                  <div className="bg-[#f5f4ef] dark:bg-slate-900/60 p-3 rounded-lg border border-zinc-300 dark:border-slate-800 text-xs text-zinc-600 dark:text-slate-400">
                    {language === 'es' ? 'Muestra las barras de porcentaje de los lenguajes.' : 'Displays language distribution percentage bars in Markdown table format.'}
                  </div>
                )}

                {comp.type === 'dynamic_stats' && (
                  <div className="bg-[#f5f4ef] dark:bg-slate-900/60 p-3 rounded-lg border border-zinc-300 dark:border-slate-800 text-xs space-y-4">
                    <div className="grid grid-cols-2 gap-4 mb-2">
                      <div>
                        <span className="text-[10px] text-zinc-600 dark:text-slate-400 uppercase block mb-1">Layout</span>
                        <select
                          value={comp.layout || 'neon-cluster'}
                          onChange={(e) => updateComponent(idx, { layout: e.target.value as any })}
                          className="bg-white dark:bg-slate-950 border border-zinc-300 dark:border-slate-800 text-black dark:text-slate-200 rounded px-2.5 py-1 focus:border-[#00ffff] dark:focus:border-white w-full uppercase text-[10px]"
                        >
                          <option value="neon-cluster">Neon Cluster</option>
                          <option value="data-matrix">Data Matrix</option>
                        </select>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-600 dark:text-slate-400 uppercase block mb-1">Badge Style</span>
                        <select
                          value={comp.badgeStyle || 'for-the-badge'}
                          onChange={(e) => updateComponent(idx, { badgeStyle: e.target.value as any })}
                          className="bg-white dark:bg-slate-950 border border-zinc-300 dark:border-slate-800 text-black dark:text-slate-200 rounded px-2.5 py-1 focus:border-[#00ffff] dark:focus:border-white w-full uppercase text-[10px]"
                        >
                          <option value="flat">Flat</option>
                          <option value="flat-square">Flat Square</option>
                          <option value="for-the-badge">For the Badge</option>
                          <option value="plastic">Plastic</option>
                        </select>
                      </div>
                    </div>

                    {comp.layout === 'neon-cluster' && (
                      <div className="grid grid-cols-2 gap-4 mb-2">
                        <div>
                          <span className="text-[10px] text-zinc-600 dark:text-slate-400 uppercase block mb-1">Direction</span>
                          <select
                            value={comp.badgeDirection || 'row'}
                            onChange={(e) => updateComponent(idx, { badgeDirection: e.target.value as any })}
                            className="bg-white dark:bg-slate-950 border border-zinc-300 dark:border-slate-800 text-black dark:text-slate-200 rounded px-2.5 py-1 focus:border-[#00ffff] dark:focus:border-white w-full uppercase text-[10px]"
                          >
                            <option value="row">ROW (LINEAL)</option>
                            <option value="column">COLUMN (APILADO)</option>
                          </select>
                        </div>
                        <div>
                          <span className="text-[10px] text-zinc-600 dark:text-slate-400 uppercase block mb-1">Spacing</span>
                          <select
                            value={comp.badgeSpacing || 'compact'}
                            onChange={(e) => updateComponent(idx, { badgeSpacing: e.target.value as any })}
                            className="bg-white dark:bg-slate-950 border border-zinc-300 dark:border-slate-800 text-black dark:text-slate-200 rounded px-2.5 py-1 focus:border-[#00ffff] dark:focus:border-white w-full uppercase text-[10px]"
                          >
                            <option value="compact">COMPACTO</option>
                            <option value="spaced">ESPACIADO</option>
                          </select>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-4 border-t border-zinc-300 dark:border-zinc-800 pt-3">
                      <div className="flex flex-col items-center gap-1 flex-1">
                        <span className="text-[10px] text-zinc-600 dark:text-slate-400 uppercase">{language === 'es' ? 'Fondo/Valor' : 'Value Bg'}</span>
                        <input
                          type="color"
                          value={comp.valueColor || '#0ea5e9'}
                          onChange={(e) => updateComponent(idx, { valueColor: e.target.value })}
                          className="w-full h-6 cursor-pointer bg-transparent border-0 p-0"
                        />
                      </div>
                      <div className="flex flex-col items-center gap-1 flex-1">
                        <span className="text-[10px] text-zinc-600 dark:text-slate-400 uppercase">{language === 'es' ? 'Etiqueta' : 'Label'}</span>
                        <input
                          type="color"
                          value={comp.labelColor || '#1e293b'}
                          onChange={(e) => updateComponent(idx, { labelColor: e.target.value })}
                          className="w-full h-6 cursor-pointer bg-transparent border-0 p-0"
                        />
                      </div>
                      <div className="flex flex-col items-center gap-1 flex-1">
                        <span className="text-[10px] text-zinc-600 dark:text-slate-400 uppercase">Logo</span>
                        <input
                          type="color"
                          value={comp.logoColor || '#ffffff'}
                          onChange={(e) => updateComponent(idx, { logoColor: e.target.value })}
                          className="w-full h-6 cursor-pointer bg-transparent border-0 p-0"
                        />
                      </div>
                    </div>

                    <div className="border-t border-zinc-300 dark:border-zinc-800 pt-3">
                      <span className="text-[10px] text-zinc-600 dark:text-slate-400 uppercase block mb-2">Data Points</span>
                      <div className="flex flex-wrap gap-2">
                        {['followers', 'following', 'repos', 'gists', 'stars'].map(statKey => (
                          <label key={statKey} className="flex items-center gap-1">
                            <input 
                              type="checkbox" 
                              checked={comp.selectedStats ? comp.selectedStats[statKey as keyof typeof comp.selectedStats] : true}
                              onChange={(e) => updateComponent(idx, { 
                                selectedStats: { 
                                  ...(comp.selectedStats || { followers:true, following:true, repos:true, gists:true, stars:true }),
                                  [statKey]: e.target.checked
                                } 
                              })}
                              className="accent-black dark:accent-white"
                            />
                            <span className="text-[10px] uppercase">{statKey}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
