import React, { useState } from 'react';
import { Copy, Download, Check, RefreshCw, FileText } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import { motion } from 'framer-motion';

export const ExportButtons: React.FC = () => {
  const { markdownOutput, username, setPreset } = useEditorStore();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdownOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy markdown:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([markdownOutput], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `README-${username || 'github'}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#f5f4ef] dark:bg-[#f5f4ef] dark:bg-black border border-zinc-300 dark:border-zinc-300 dark:border-zinc-800 p-5 shadow-xl flex items-center justify-between font-mono uppercase tracking-widest">
      <div className="flex items-center gap-4">
        <div className="p-2.5 bg-[#f5f4ef] dark:bg-[#f5f4ef] dark:bg-black border border-[#00ffff] text-[#00ffff]">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-black dark:text-black dark:text-white">Export Markdown</h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-600 dark:text-zinc-500 mt-1">Copy or save generated file</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setPreset('full')}
          className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-600 dark:text-zinc-400 hover:text-black dark:text-black dark:text-white px-4 py-2.5 bg-[#f5f4ef] dark:bg-[#f5f4ef] dark:bg-black border border-zinc-300 dark:border-zinc-300 dark:border-zinc-700 hover:border-[#00ffff] transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>[ RESET_LAYOUT ]</span>
        </button>

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-[#f5f4ef] dark:bg-[#f5f4ef] dark:bg-black hover:bg-zinc-200 dark:bg-zinc-200 dark:bg-zinc-900 text-black dark:text-black dark:text-white font-bold text-xs px-5 py-2.5 border border-zinc-300 dark:border-zinc-300 dark:border-zinc-700 hover:border-[#00ffff] transition-colors"
        >
          <Download className="w-4 h-4 text-[#00ffff]" />
          <span>[ DOWNLOAD.MD ]</span>
        </button>

        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 bg-[#00ffff] hover:bg-white text-black font-bold text-xs px-6 py-2.5 transition-colors brutal-shadow"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-black" />
              <span>COPIED!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-black" />
              <span>COPY MARKDOWN</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};
