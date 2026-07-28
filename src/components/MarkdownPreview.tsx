import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useEditorStore } from '../store/editorStore';
import { StatsBlock } from './BaseComponents/StatsBlock';
import { Eye, Code, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MarkdownPreview: React.FC = () => {
  const { markdownOutput, stats, repos } = useEditorStore();
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
    <div className="bg-black border border-zinc-800 p-5 shadow-2xl brutal-shadow font-mono flex flex-col h-full min-h-[600px] space-y-4">
      {/* Header Tabs */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black border border-white text-white">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">[ LIVE_PREVIEW ]</h2>
            <p className="text-[10px] text-zinc-500 uppercase">Real-time README output</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-black p-1 border border-zinc-800 text-[10px]">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1 font-bold uppercase transition-all ${
                activeTab === 'preview' ? 'bg-[#00ffff] text-black border border-[#00ffff]' : 'text-zinc-500 hover:text-white border border-transparent'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> PREVIEW
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-3 py-1 font-bold uppercase transition-all ${
                activeTab === 'code' ? 'bg-[#00ffff] text-black border border-[#00ffff]' : 'text-zinc-500 hover:text-white border border-transparent'
              }`}
            >
              <Code className="w-3.5 h-3.5" /> RAW_MD
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 bg-black hover:bg-zinc-900 text-white px-3 py-2 border border-zinc-700 hover:border-[#00ffff] text-xs font-bold uppercase transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#00ffff]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '[ COPIED ]' : '[ COPY ]'}</span>
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
      <div className="flex-1 bg-black border border-zinc-800 p-5 overflow-y-auto max-h-[500px] relative">
        <AnimatePresence mode="wait">
          {activeTab === 'preview' ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="markdown-body"
              style={{ backgroundColor: 'transparent', color: '#ffffff' }}
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
                className="w-full h-full min-h-[400px] font-mono text-[11px] text-[#00ffff] bg-black p-4 overflow-x-auto whitespace-pre-wrap leading-relaxed outline-none resize-none border-none focus:ring-1 focus:ring-[#00ffff]"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
