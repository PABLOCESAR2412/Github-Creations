import React from 'react';
import { StatsInput } from '../components/StatsInput';
import { ComponentBuilder } from '../components/ComponentBuilder';
import { MarkdownPreview } from '../components/MarkdownPreview';
import { ExportButtons } from '../components/ExportButtons';
import { DynamicStatsConfigurator } from '../components/DynamicStatsConfigurator';
import { VercelApiExporter } from '../components/VercelApiExporter';
import { GithubActionExporter } from '../components/GithubActionExporter';
import { useMarkdownGenerator } from '../hooks/useMarkdownGenerator';

export const Home: React.FC = () => {
  useMarkdownGenerator();

  return (
    <main className="flex-1 p-6 grid grid-cols-12 gap-6 max-w-[1700px] mx-auto w-full">
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
