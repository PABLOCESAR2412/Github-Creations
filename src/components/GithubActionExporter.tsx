import React, { useState } from 'react';
import { Copy, Check, Terminal, PlaySquare } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';

export const GithubActionExporter: React.FC = () => {
  const { username, language } = useEditorStore();
  const [copiedAction, setCopiedAction] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  const workflowCode = `name: Update GitHub Stats

on:
  schedule:
    - cron: '0 */6 * * *' # Runs every 6 hours
  workflow_dispatch: # Allows manual trigger

jobs:
  update-readme:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install node-fetch@2
          
      - name: Update README Stats
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
        run: node update-stats.js
        
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add README.md
          git commit -m "Update profile stats" || exit 0
          git push
`;

  const scriptCode = `// update-stats.js
const fetch = require('node-fetch');
const fs = require('fs');

async function updateStats() {
  const username = '${username || 'tu-usuario'}';
  const token = process.env.GITHUB_TOKEN;
  
  // 1. Fetch data from GitHub API
  const res = await fetch(\`https://api.github.com/users/\${username}\`, {
    headers: token ? { Authorization: \`token \${token}\` } : {}
  });
  const data = await res.json();
  
  // 2. Format your stats
  const statsString = \`
> **\${data.name}**
> 👥 Followers: \${data.followers} | 📚 Repos: \${data.public_repos}
\`;

  // 3. Read current README
  let readme = fs.readFileSync('README.md', 'utf-8');
  
  // 4. Replace content between markers
  const startMarker = '<!-- STATS_START -->';
  const endMarker = '<!-- STATS_END -->';
  
  const regex = new RegExp(\`\${startMarker}[\\\\s\\\\S]*?\${endMarker}\`);
  readme = readme.replace(regex, \`\${startMarker}\\n\${statsString}\\n\${endMarker}\`);
  
  // 5. Save changes
  fs.writeFileSync('README.md', readme);
  console.log('README updated successfully!');
}

updateStats();
`;

  const copyCode = (code: string, type: 'action' | 'script') => {
    navigator.clipboard.writeText(code);
    if (type === 'action') {
      setCopiedAction(true);
      setTimeout(() => setCopiedAction(false), 2000);
    } else {
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2000);
    }
  };

  return (
    <div className="bg-[#f5f4ef] dark:bg-black border border-zinc-300 dark:border-zinc-800 p-6 shadow-2xl relative overflow-hidden brutal-shadow font-mono mt-6">
      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        
        {/* Left Side: Instructions */}
        <div className="flex-1 space-y-6">
          <div className="border-b border-zinc-300 dark:border-zinc-800 pb-4">
            <h2 className="text-xl font-black text-black dark:text-white flex items-center gap-3 uppercase tracking-widest">
              <PlaySquare className="w-6 h-6 text-[#00ffff]" />
              {language === 'es' ? '[ AUTOMATIZACION_GITHUB_ACTIONS ]' : '[ GITHUB_ACTIONS_AUTOMATION ]'}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-500 mt-2 uppercase">
              {language === 'es' ? 'Actualiza tu readme de github en automático cada día' : 'Automatically update your github readme every day'}
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-950 p-5 border border-zinc-300 dark:border-zinc-800 space-y-4">
            <h3 className="text-sm font-bold text-black dark:text-white mb-2 uppercase tracking-widest">&gt; {language === 'es' ? 'INSTRUCCIONES' : 'INSTRUCTIONS'}</h3>
            <ol className="list-decimal pl-5 text-sm text-zinc-600 dark:text-zinc-400 space-y-3 uppercase leading-relaxed">
              <li>
                {language === 'es' ? 'Agrega estos marcadores a tu' : 'Add these markers to your'} <code className="bg-[#f5f4ef] dark:bg-black border border-zinc-300 dark:border-zinc-700 px-1 text-[#00ffff]">README.md</code>:
                <div className="bg-[#f5f4ef] dark:bg-black p-2 mt-2 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-500">
                  &lt;!-- STATS_START --&gt;<br/>
                  &lt;!-- STATS_END --&gt;
                </div>
              </li>
              <li>
                {language === 'es' ? 'Crea' : 'Create'} <code className="bg-[#f5f4ef] dark:bg-black border border-zinc-300 dark:border-zinc-700 px-1 text-[#00ffff]">update-stats.js</code> {language === 'es' ? 'en la raíz de tu repositorio y pega el código del script.' : 'in your repo root and paste the Script code.'}
              </li>
              <li>
                {language === 'es' ? 'Crea' : 'Create'} <code className="bg-[#f5f4ef] dark:bg-black border border-zinc-300 dark:border-zinc-700 px-1 text-[#00ffff]">.github/workflows/update.yml</code> {language === 'es' ? 'y pega el código de la acción.' : 'and paste the Action code.'}
              </li>
              <li>{language === 'es' ? '¡Haz push a GitHub. ¡Se actualizará automáticamente cada 6 horas!' : 'Push to GitHub. It will automatically update your README every 6 hours!'}</li>
            </ol>
          </div>
        </div>

        {/* Right Side: Code Output */}
        <div className="flex-1 space-y-4">
          
          {/* Action Code */}
          <div className="flex flex-col bg-[#f5f4ef] dark:bg-black border border-zinc-300 dark:border-zinc-800 overflow-hidden brutal-shadow h-[250px]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950">
              <div className="flex items-center gap-2 uppercase tracking-widest">
                <Terminal className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400">&gt; UPDATE.YML</span>
              </div>
              <button
                onClick={() => copyCode(workflowCode, 'action')}
                className="flex items-center gap-1.5 bg-[#00ffff] hover:bg-white text-black px-4 py-1.5 transition-colors text-[10px] font-bold uppercase"
              >
                {copiedAction ? <Check className="w-3 h-3 text-black" /> : <Copy className="w-3 h-3" />}
                {copiedAction ? (language === 'es' ? '[ COPIADO ]' : '[ COPIED ]') : (language === 'es' ? '[ COPIAR ]' : '[ COPY ]')}
              </button>
            </div>
            <div className="flex-1 p-4 overflow-auto">
              <pre className="text-[10px] font-mono text-[#00ffff] whitespace-pre-wrap leading-relaxed">
                {workflowCode}
              </pre>
            </div>
          </div>

          {/* Script Code */}
          <div className="flex flex-col bg-[#f5f4ef] dark:bg-black border border-zinc-300 dark:border-zinc-800 overflow-hidden brutal-shadow h-[250px]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950">
              <div className="flex items-center gap-2 uppercase tracking-widest">
                <Terminal className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400">&gt; UPDATE-STATS.JS</span>
              </div>
              <button
                onClick={() => copyCode(scriptCode, 'script')}
                className="flex items-center gap-1.5 bg-[#00ffff] hover:bg-white text-black px-4 py-1.5 transition-colors text-[10px] font-bold uppercase"
              >
                {copiedScript ? <Check className="w-3 h-3 text-black" /> : <Copy className="w-3 h-3" />}
                {copiedScript ? (language === 'es' ? '[ COPIADO ]' : '[ COPIED ]') : (language === 'es' ? '[ COPIAR ]' : '[ COPY ]')}
              </button>
            </div>
            <div className="flex-1 p-4 overflow-auto">
              <pre className="text-[10px] font-mono text-[#00ffff] whitespace-pre-wrap leading-relaxed">
                {scriptCode}
              </pre>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
