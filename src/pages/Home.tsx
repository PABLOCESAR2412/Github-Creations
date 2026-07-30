import React from 'react';
import { StatsInput } from '../components/StatsInput';
import { ComponentBuilder } from '../components/ComponentBuilder';
import { MarkdownPreview } from '../components/MarkdownPreview';
import { ExportButtons } from '../components/ExportButtons';
import { DynamicStatsConfigurator } from '../components/DynamicStatsConfigurator';
import { VercelApiExporter } from '../components/VercelApiExporter';
import { GithubActionExporter } from '../components/GithubActionExporter';
import { useMarkdownGenerator } from '../hooks/useMarkdownGenerator';
import { useEditorStore } from '../store/editorStore';
import { Globe } from 'lucide-react';

export const Home: React.FC = () => {
  useMarkdownGenerator();
  const { language, setLanguage } = useEditorStore();

  return (
    <main className="flex-1 p-6 grid grid-cols-12 gap-6 max-w-[1700px] mx-auto w-full">
      {/* Top Bar for Settings */}
      <div className="col-span-12 flex justify-end gap-4 mb-2">
        <button
          onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#f5f4ef] dark:bg-black border border-zinc-300 dark:border-zinc-800 text-xs font-bold uppercase hover:text-[#00ffff] dark:hover:text-white hover:border-[#00ffff] dark:hover:border-white transition-colors"
        >
          <Globe className="w-4 h-4" />
          {language === 'en' ? 'ES' : 'EN'}
        </button>
      </div>

      {/* Left Control Column */}
      <div className="col-span-12 lg:col-span-5 space-y-6 flex flex-col">
        <StatsInput />
        <ComponentBuilder />
      </div>

      {/* Right Output Column */}
      <div className="col-span-12 lg:col-span-7 flex flex-col space-y-6">
        <div className="flex-1 min-h-[500px]">
          <MarkdownPreview />
        </div>
        <ExportButtons />
      </div>

      {/* Bottom Full Width Area for Advanced Tools */}
      <div className="col-span-12 space-y-6">
        <DynamicStatsConfigurator />
        <VercelApiExporter />
        <GithubActionExporter />
      </div>
    </main>
  );
};
