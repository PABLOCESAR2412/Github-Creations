import React, { useState } from 'react';
import { useEditorStore } from '../store/editorStore';
import { Settings2, Plus, Sparkles, LayoutGrid, List } from 'lucide-react';
import { MarkdownComponent } from '../types/github';

interface StatToggle {
  id: string;
  label: string;
  icon: string;
  query: string;
  url: string;
  isNative?: boolean;
}

export const DynamicStatsConfigurator: React.FC = () => {
  const { stats, username, addComponent, language } = useEditorStore();
  
  const [layout, setLayout] = useState<'neon-cluster' | 'data-matrix'>('neon-cluster');
  const [badgeStyle, setBadgeStyle] = useState('for-the-badge');
  const [labelColor, setLabelColor] = useState('#1e293b'); // background of the text
  const [valueColor, setValueColor] = useState('#0ea5e9'); // background of the value
  const [logoColor, setLogoColor] = useState('#ffffff');
  
  const [selectedStats, setSelectedStats] = useState<Record<string, boolean>>({
    followers: true,
    repos: true,
    stars: true,
    gists: false,
    following: false
  });

  const availableStats: StatToggle[] = [
    { id: 'followers', label: 'Followers', icon: 'users', query: '', url: `https://img.shields.io/github/followers/${username}`, isNative: true },
    { id: 'following', label: 'Following', icon: 'user-plus', query: '$.following', url: `https://api.github.com/users/${username}` },
    { id: 'repos', label: 'Public Repos', icon: 'book', query: '$.public_repos', url: `https://api.github.com/users/${username}` },
    { id: 'gists', label: 'Public Gists', icon: 'code', query: '$.public_gists', url: `https://api.github.com/users/${username}` },
    { id: 'stars', label: 'Total Stars', icon: 'star', query: '', url: `https://img.shields.io/github/stars/${username}`, isNative: true },
  ];

  const generateMarkdown = () => {
    if (!username) return '';
    
    const activeStats = availableStats.filter(s => selectedStats[s.id]);
    const cleanLabelColor = labelColor.replace('#', '');
    const cleanValueColor = valueColor.replace('#', '');
    const cleanLogoColor = logoColor.replace('#', '');

    if (layout === 'neon-cluster') {
      return activeStats.map(s => {
        const badgeUrl = s.isNative 
          ? `${s.url}?label=${encodeURIComponent(s.label)}&style=${badgeStyle}&color=${cleanValueColor}&labelColor=${cleanLabelColor}&logo=${s.icon}&logoColor=${cleanLogoColor}`
          : `https://img.shields.io/badge/dynamic/json?url=${encodeURIComponent(s.url)}&query=${encodeURIComponent(s.query)}&label=${encodeURIComponent(s.label)}&style=${badgeStyle}&color=${cleanValueColor}&labelColor=${cleanLabelColor}&logo=${s.icon}&logoColor=${cleanLogoColor}`;
        return `<a href="https://github.com/${username}"><img src="${badgeUrl}" alt="${s.label}" /></a>`;
      }).join(' ');
    } else {
      // Data Matrix (Markdown Table)
      let table = `| Metric | Count |\n| :--- | :--- |\n`;
      activeStats.forEach(s => {
        const badgeUrl = s.isNative 
          ? `${s.url}?label=%20&style=${badgeStyle}&color=${cleanValueColor}&labelColor=${cleanLabelColor}&logo=${s.icon}&logoColor=${cleanLogoColor}`
          : `https://img.shields.io/badge/dynamic/json?url=${encodeURIComponent(s.url)}&query=${encodeURIComponent(s.query)}&label=%20&style=${badgeStyle}&color=${cleanValueColor}&labelColor=${cleanLabelColor}&logo=${s.icon}&logoColor=${cleanLogoColor}`;
        table += `| **${s.label}** | <img src="${badgeUrl}" alt="${s.label}" /> |\n`;
      });
      return table;
    }
  };

  const handleAddToMarkdown = () => {
    const markdown = generateMarkdown();
    const comp: Omit<MarkdownComponent, 'id'> = {
      type: 'custom_badges',
      content: markdown,
      align: layout === 'neon-cluster' ? 'center' : 'left'
    };
    addComponent(comp);
  };

  const renderContent = () => {
    if (!stats) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-zinc-600 dark:text-zinc-500 border border-dashed border-zinc-300 dark:border-zinc-800">
          <Settings2 className="w-8 h-8 mb-2 opacity-20" />
          <p className="text-xs uppercase tracking-widest font-bold">
            {language === 'es' ? 'NINGUN COMPONENTE SELECCIONADO' : 'NO COMPONENT SELECTED'}
          </p>
          <p className="text-[10px] mt-1">
            {language === 'es' ? 'Selecciona un componente para editar sus propiedades avanzadas' : 'Select a component to edit its advanced properties'}
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="col-span-1 space-y-6 bg-[#f5f4ef] dark:bg-black p-5 border border-zinc-300 dark:border-zinc-800 brutal-shadow font-mono">
          
          <div>
            <h3 className="text-sm font-bold text-black dark:text-white mb-3 flex items-center gap-2 uppercase tracking-widest">
              <LayoutGrid className="w-4 h-4 text-[#00ffff] dark:text-white" /> [ LAYOUT_DESIGN ]
            </h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button 
                onClick={() => setLayout('neon-cluster')}
                className={`p-2 border text-xs font-bold uppercase transition-all ${layout === 'neon-cluster' ? 'bg-[#00ffff] dark:bg-white border-[#00ffff] dark:border-white text-black' : 'bg-[#f5f4ef] dark:bg-black border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-500'}`}
              >
                NEON CLUSTER
              </button>
              <button 
                onClick={() => setLayout('data-matrix')}
                className={`p-2 border text-xs font-bold uppercase transition-all ${layout === 'data-matrix' ? 'bg-[#00ffff] dark:bg-white border-[#00ffff] dark:border-white text-black' : 'bg-[#f5f4ef] dark:bg-black border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-500'}`}
              >
                DATA MATRIX
              </button>
            </div>

            <h3 className="text-sm font-bold text-black dark:text-white mb-3 mt-5 uppercase tracking-widest">[ BADGE_STYLE ]</h3>
            <select 
              value={badgeStyle} 
              onChange={(e) => setBadgeStyle(e.target.value)}
              className="w-full bg-[#f5f4ef] dark:bg-black border border-zinc-300 dark:border-zinc-700 text-black dark:text-white px-3 py-2 text-sm focus:border-[#00ffff] dark:focus:border-white outline-none uppercase"
            >
              <option value="for-the-badge">FOR THE BADGE</option>
              <option value="flat-square">FLAT SQUARE</option>
              <option value="flat">FLAT (ROUNDED)</option>
              <option value="plastic">PLASTIC</option>
              <option value="social">SOCIAL</option>
            </select>
          </div>

          <div>
            <h3 className="text-sm font-bold text-black dark:text-white mb-3 uppercase tracking-widest">[ CUSTOM_COLORS ]</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center gap-1">
                <input 
                  type="color" 
                  value={labelColor} 
                  onChange={(e) => setLabelColor(e.target.value)}
                  className="w-10 h-10 cursor-pointer bg-[#f5f4ef] dark:bg-black border border-zinc-300 dark:border-zinc-700 p-1"
                />
                <span className="text-[10px] text-zinc-600 dark:text-zinc-400 uppercase">LABEL BG</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <input 
                  type="color" 
                  value={valueColor} 
                  onChange={(e) => setValueColor(e.target.value)}
                  className="w-10 h-10 cursor-pointer bg-[#f5f4ef] dark:bg-black border border-zinc-300 dark:border-zinc-700 p-1"
                />
                <span className="text-[10px] text-zinc-600 dark:text-zinc-400 uppercase">VALUE BG</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <input 
                  type="color" 
                  value={logoColor} 
                  onChange={(e) => setLogoColor(e.target.value)}
                  className="w-10 h-10 cursor-pointer bg-[#f5f4ef] dark:bg-black border border-zinc-300 dark:border-zinc-700 p-1"
                />
                <span className="text-[10px] text-zinc-600 dark:text-zinc-400 uppercase">ICON COLOR</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-black dark:text-white mb-3 flex items-center gap-2 uppercase tracking-widest">
              <List className="w-4 h-4 text-[#00ffff] dark:text-white" /> [ DATA_POINTS ]
            </h3>
            <div className="space-y-2">
              {availableStats.map(s => (
                <label key={s.id} className="flex items-center justify-between p-2 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 cursor-pointer hover:border-zinc-300 dark:border-zinc-700 transition-colors uppercase">
                  <span className="text-xs font-bold text-black dark:text-white">{s.label}</span>
                  <input 
                    type="checkbox" 
                    checked={selectedStats[s.id]}
                    onChange={(e) => setSelectedStats(prev => ({ ...prev, [s.id]: e.target.checked }))}
                    className="w-4 h-4 accent-[#00ffff] dark:accent-white"
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-300 dark:border-zinc-800">
            <button
              onClick={handleAddToMarkdown}
              className="flex items-center justify-center gap-2 w-full bg-[#00ffff] dark:bg-white hover:bg-white text-black font-bold text-sm px-4 py-3 transition-colors uppercase tracking-widest brutal-shadow"
            >
              <Plus className="w-5 h-5" /> [ INSERT_TO_MD ]
            </button>
          </div>
        </div>

        {/* Live Preview Area */}
        <div className="col-span-1 lg:col-span-2 bg-[#f5f4ef] dark:bg-black border border-zinc-300 dark:border-zinc-800 flex flex-col p-6 overflow-hidden relative brutal-shadow">
          <div className="absolute top-4 left-4 text-[10px] font-mono text-[#00ffff] dark:text-white bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 px-2 py-1 uppercase tracking-widest font-bold">
            [ LIVE_INTERACTIVE_PREVIEW ]
          </div>
          
          <div className="flex-1 flex items-center justify-center w-full mt-8">
             <div 
                className="markdown-body w-full flex justify-center"
                style={{ backgroundColor: 'transparent', color: '#ffffff' }}
             >
               {layout === 'neon-cluster' ? (
                 <div dangerouslySetInnerHTML={{ __html: generateMarkdown() }} />
               ) : (
                 <table className="border-collapse border-spacing-0 w-full max-w-sm text-sm">
                   <thead>
                     <tr>
                       <th className="border-b border-zinc-300 dark:border-zinc-700 p-3 text-left font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest text-[10px]">Metric</th>
                       <th className="border-b border-zinc-300 dark:border-zinc-700 p-3 text-left font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest text-[10px]">Count</th>
                     </tr>
                   </thead>
                   <tbody>
                     {availableStats.filter(s => selectedStats[s.id]).map(s => {
                       const cleanLabelColor = labelColor.replace('#', '');
                       const cleanValueColor = valueColor.replace('#', '');
                       const cleanLogoColor = logoColor.replace('#', '');
                       const badgeUrl = s.isNative 
                         ? `${s.url}?label=%20&style=${badgeStyle}&color=${cleanValueColor}&labelColor=${cleanLabelColor}&logo=${s.icon}&logoColor=${cleanLogoColor}`
                         : `https://img.shields.io/badge/dynamic/json?url=${encodeURIComponent(s.url)}&query=${encodeURIComponent(s.query)}&label=%20&style=${badgeStyle}&color=${cleanValueColor}&labelColor=${cleanLabelColor}&logo=${s.icon}&logoColor=${cleanLogoColor}`;
                       
                       return (
                         <tr key={s.id}>
                           <td className="border-b border-zinc-300 dark:border-zinc-800 p-3 font-bold text-zinc-800 dark:text-zinc-200">{s.label}</td>
                           <td className="border-b border-zinc-300 dark:border-zinc-800 p-3">
                             <img src={badgeUrl} alt={s.label} />
                           </td>
                         </tr>
                       );
                     })}
                   </tbody>
                 </table>
               )}
             </div>
          </div>
          
          <div className="mt-6 w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 p-4 overflow-auto">
            <div className="text-[10px] text-zinc-600 dark:text-zinc-500 uppercase tracking-widest font-bold mb-2">&gt; RAW_MARKDOWN_HTML</div>
            <pre className="text-[11px] text-[#00ffff] dark:text-white font-mono whitespace-pre-wrap leading-relaxed">
              {generateMarkdown()}
            </pre>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#f5f4ef] dark:bg-black border border-zinc-300 dark:border-zinc-800 p-6 shadow-[8px_8px_0px_0px_rgba(63,63,70,1)] space-y-6 font-mono">
      <div className="flex items-center justify-between border-b border-zinc-300 dark:border-zinc-800 pb-4">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-[#00ffff] dark:bg-white text-black border border-black dark:border-white">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="font-mono">
            <h2 className="text-sm font-bold text-black dark:text-white uppercase tracking-widest">
              {language === 'es' ? '[ PROPIEDADES_DEL_COMPONENTE ]' : '[ COMPONENT_PROPERTIES ]'}
            </h2>
            <p className="text-[10px] text-zinc-600 dark:text-zinc-500 uppercase">
              {language === 'es' ? 'Configura las propiedades del componente activo' : 'Configure active component properties'}
            </p>
          </div>
        </div>
      </div>
      
      {renderContent()}
    </div>
  );
};
