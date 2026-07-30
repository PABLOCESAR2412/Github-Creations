import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useEditorStore } from '../store/editorStore';
import { StatsBlock } from './BaseComponents/StatsBlock';
import { Eye, Code, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MarkdownPreview: React.FC = () => {
  const { markdownOutput, stats, repos, language } = useEditorStore();
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);

  const totalStars = repos.reduce((acc, r) => acc + r.stars, 0);
  const totalForks = repos.reduce((acc, r) => acc + r.forks, 0);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#f5f4ef] dark:bg-black border border-zinc-300 dark:border-zinc-800 p-5 shadow-[8px_8px_0px_0px_rgba(63,63,70,1)] font-mono flex flex-col h-full min-h-[600px] space-y-4">
      {/* Header Tabs */}
      <div className="flex items-center justify-between border-b border-zinc-300 dark:border-zinc-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black border border-white text-white dark:bg-black dark:border-white dark:text-white bg-[#f5f4ef]">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-black dark:text-white uppercase tracking-widest">
              {language === 'es' ? '[ VISTA_PREVIA ]' : '[ LIVE_PREVIEW ]'}
            </h2>
            <p className="text-[10px] text-zinc-600 dark:text-zinc-500 uppercase">
              {language === 'es' ? 'Salida visual en tiempo real' : 'Real-time README output'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-[#f5f4ef] dark:bg-black p-1 border border-zinc-300 dark:border-zinc-800 text-[10px]">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1 font-bold uppercase transition-all ${
                activeTab === 'preview' ? 'bg-[#00ffff] dark:bg-white text-black border border-[#00ffff] dark:border-white' : 'text-zinc-600 dark:text-zinc-500 hover:text-black dark:hover:text-white border border-transparent'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> {language === 'es' ? 'PREVIA' : 'PREVIEW'}
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-3 py-1 font-bold uppercase transition-all ${
                activeTab === 'code' ? 'bg-[#00ffff] dark:bg-white text-black border border-[#00ffff] dark:border-white' : 'text-zinc-600 dark:text-zinc-500 hover:text-black dark:hover:text-white border border-transparent'
              }`}
            >
              <Code className="w-3.5 h-3.5" /> {language === 'es' ? 'CÓDIGO RAW' : 'RAW_MD'}
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 bg-[#f5f4ef] dark:bg-black hover:bg-zinc-200 dark:hover:bg-zinc-900 text-black dark:text-white px-3 py-2 border border-zinc-300 dark:border-zinc-700 hover:border-[#00ffff] dark:hover:border-white text-xs font-bold uppercase transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#00ffff] dark:text-white" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (language === 'es' ? '[ COPIADO ]' : '[ COPIED ]') : (language === 'es' ? '[ COPIAR ]' : '[ COPY ]')}</span>
          </button>
        </div>
      </div>

      {/* Visual Live Stats Dashboard Header */}
      {stats && (
        <div className="grid grid-cols-4 gap-3">
          <StatsBlock
            label="Total Stars"
            value={totalStars}
            iconType="star"
            color="#e3b341"
            glowColor="rgba(227, 179, 65, 0.4)"
          />
          <StatsBlock
            label="Total Forks"
            value={totalForks}
            iconType="fork"
            color="#58a6ff"
            glowColor="rgba(88, 166, 255, 0.4)"
          />
          <StatsBlock
            label="Public Repos"
            value={stats.public_repos}
            iconType="repo"
            color="#3fb950"
            glowColor="rgba(63, 185, 80, 0.4)"
          />
          <StatsBlock
            label="Followers"
            value={stats.followers}
            iconType="user"
            color="#bc8cff"
            glowColor="rgba(188, 140, 255, 0.4)"
          />
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 bg-white dark:bg-black border border-zinc-300 dark:border-zinc-800 p-5 overflow-y-auto relative min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'preview' ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="markdown-body"
            >
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {markdownOutput}
              </ReactMarkdown>
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative h-full"
            >
              <textarea
                readOnly
                value={markdownOutput}
                className="w-full h-full font-mono text-[11px] text-[#00ffff] dark:text-white bg-white dark:bg-black p-4 overflow-x-auto whitespace-pre-wrap leading-relaxed outline-none resize-none border-none focus:ring-1 focus:ring-[#00ffff] dark:focus:ring-white"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
