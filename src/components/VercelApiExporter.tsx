import React, { useState } from 'react';
import { useEditorStore } from '../store/editorStore';
import { Copy, Check, Terminal, Triangle } from 'lucide-react';

export const VercelApiExporter: React.FC = () => {
  const { username, language } = useEditorStore();
  const [copiedCode, setCopiedCode] = useState(false);
  const [bgColor, setBgColor] = useState('#0d1117');
  const [textColor, setTextColor] = useState('#c9d1d9');
  const [accentColor, setAccentColor] = useState('#58a6ff');
  const [borderRadius, setBorderRadius] = useState(12);

  const generateApiCode = () => {
    return `// api/stats.js
export default async function handler(req, res) {
  const { username = '${username || 'torvalds'}' } = req.query;

  try {
    // 1. Fetch live data from GitHub API
    const userRes = await fetch(\`https://api.github.com/users/\${username}\`);
    const userData = await userRes.json();
    
    // Fallbacks if user not found
    if (userData.message === 'Not Found') {
      return res.status(404).send('User not found');
    }

    const name = userData.name || userData.login;
    const followers = userData.followers || 0;
    const repos = userData.public_repos || 0;

    // 2. Generate the 100% Custom SVG
    // You can modify any CSS, font, shadow, or shape here!
    const svg = \`
      <svg width="400" height="150" viewBox="0 0 400 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>
          .bg { fill: ${bgColor}; }
          .title { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${accentColor}; }
          .text { font: 400 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; }
          .stat-value { font: 700 16px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; }
          .card { stroke: rgba(255,255,255,0.1); stroke-width: 1px; }
        </style>
        
        <!-- Background -->
        <rect width="400" height="150" rx="${borderRadius}" class="bg card" />
        
        <!-- Profile Header -->
        <text x="25" y="40" class="title">\${name}'s Stats</text>
        
        <!-- Followers Stat -->
        <text x="25" y="80" class="text">👥 Followers:</text>
        <text x="120" y="80" class="stat-value">\${followers}</text>
        
        <!-- Repositories Stat -->
        <text x="25" y="110" class="text">📚 Public Repos:</text>
        <text x="135" y="110" class="stat-value">\${repos}</text>
        
        <!-- Custom Brand Line -->
        <rect x="25" y="130" width="350" height="4" rx="2" fill="${accentColor}" opacity="0.8" />
      </svg>
    \`;

    // 3. Set headers for SVG image and Cache
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=7200'); // Cache for 2 hours

    // 4. Return the image
    res.status(200).send(svg);
  } catch (error) {
    res.status(500).send('Error generating stats');
  }
}
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateApiCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="bg-[#f5f4ef] dark:bg-black border border-zinc-300 dark:border-zinc-800 p-6 shadow-2xl relative overflow-hidden brutal-shadow font-mono">
      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        
        {/* Left Side: Instructions and Config */}
        <div className="flex-1 space-y-6">
          <div className="border-b border-zinc-300 dark:border-zinc-800 pb-4">
            <h2 className="text-xl font-black text-black dark:text-white flex items-center gap-3 uppercase tracking-widest">
              <Triangle className="w-6 h-6 text-[#00ffff] fill-current" />
              [ VERCEL_API_EXPORT ]
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-500 mt-2 uppercase">
              Host your own 100% custom SVG endpoint for free on Vercel.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-950 p-5 border border-zinc-300 dark:border-zinc-800 space-y-4">
            <h3 className="text-sm font-bold text-black dark:text-white mb-2 uppercase tracking-widest">&gt; 1. CUSTOMIZE_TEMPLATE</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-600 dark:text-zinc-400 mb-1 block uppercase">BACKGROUND_COLOR</label>
                <div className="flex items-center gap-2 bg-[#f5f4ef] dark:bg-black p-2 border border-zinc-300 dark:border-zinc-800">
                  <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-6 h-6 cursor-pointer bg-transparent border-0 p-0" />
                  <span className="text-xs text-zinc-700 dark:text-zinc-700 dark:text-zinc-300 font-mono uppercase">{bgColor}</span>
                </div>
              </div>
              <div>
                <label className="text-xs text-zinc-600 dark:text-zinc-400 mb-1 block uppercase">ACCENT_COLOR</label>
                <div className="flex items-center gap-2 bg-[#f5f4ef] dark:bg-black p-2 border border-zinc-300 dark:border-zinc-800">
                  <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="w-6 h-6 cursor-pointer bg-transparent border-0 p-0" />
                  <span className="text-xs text-zinc-700 dark:text-zinc-700 dark:text-zinc-300 font-mono uppercase">{accentColor}</span>
                </div>
              </div>
              <div>
                <label className="text-xs text-zinc-600 dark:text-zinc-400 mb-1 block uppercase">TEXT_COLOR</label>
                <div className="flex items-center gap-2 bg-[#f5f4ef] dark:bg-black p-2 border border-zinc-300 dark:border-zinc-800">
                  <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-6 h-6 cursor-pointer bg-transparent border-0 p-0" />
                  <span className="text-xs text-zinc-700 dark:text-zinc-700 dark:text-zinc-300 font-mono uppercase">{textColor}</span>
                </div>
              </div>
              <div>
                <label className="text-xs text-zinc-600 dark:text-zinc-400 mb-1 block uppercase">BORDER_RADIUS</label>
                <div className="flex items-center gap-2 bg-[#f5f4ef] dark:bg-black p-2 border border-zinc-300 dark:border-zinc-800 h-[42px] px-3">
                  <input type="range" min={0} max={50} value={borderRadius} onChange={(e) => setBorderRadius(Number(e.target.value))} className="w-full accent-[#00ffff]" />
                  <span className="text-xs text-zinc-700 dark:text-zinc-700 dark:text-zinc-300 font-mono uppercase">{borderRadius}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-bold text-black dark:text-white uppercase tracking-widest">
              {language === 'es' ? '[ EXPORTAR_API_VERCEL ]' : '[ VERCEL_API_EXPORT ]'}
            </h2>
            <p className="text-[10px] text-zinc-600 dark:text-zinc-500 uppercase">
              {language === 'es' ? 'Despliega tus endpoints dinámicos para SVGs estadísticos' : 'Deploy your dynamic endpoints for stat SVGs'}
            </p>
            <ol className="list-decimal pl-5 text-sm text-zinc-600 dark:text-zinc-400 space-y-2 uppercase">
              <li>Create a new folder on your computer.</li>
              <li>Inside it, create a folder called <code className="bg-zinc-200 dark:bg-zinc-900 px-1 text-[#00ffff]">api</code>.</li>
              <li>Inside the <code className="bg-zinc-200 dark:bg-zinc-900 px-1 text-[#00ffff]">api</code> folder, create a file named <code className="bg-zinc-200 dark:bg-zinc-900 px-1 text-[#00ffff]">stats.js</code> and paste the code from the right.</li>
              <li>Install the <a href="https://vercel.com/cli" target="_blank" className="text-[#00ffff] hover:underline">Vercel CLI</a> and run <code className="bg-zinc-200 dark:bg-zinc-900 px-1 text-[#00ffff]">vercel</code> in the root folder.</li>
              <li>Use your new URL in your Markdown: <br/><code className="bg-zinc-200 dark:bg-zinc-900 p-1.5 text-[#00ffff] block mt-2 text-xs">![My Stats](https://tu-proyecto.vercel.app/api/stats?username={username || 'tu-usuario'})</code></li>
            </ol>
          </div>
        </div>

        {/* Right Side: Code Output */}
        <div className="flex-1 flex flex-col bg-[#f5f4ef] dark:bg-black border border-zinc-300 dark:border-zinc-800 overflow-hidden brutal-shadow">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <div className="flex items-center gap-2 uppercase tracking-widest">
              <Terminal className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
              <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400">&gt; API/STATS.JS</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 bg-[#f5f4ef] dark:bg-black hover:bg-zinc-200 dark:hover:bg-zinc-900 text-black dark:text-white px-3 py-1.5 border border-zinc-300 dark:border-zinc-700 hover:border-[#00ffff] text-[10px] font-bold uppercase transition-colors"
            >
              {copiedCode ? <Check className="w-3 h-3 text-[#00ffff]" /> : <Copy className="w-3 h-3" />}
              {copiedCode ? (language === 'es' ? 'COPIADO' : 'COPIED') : (language === 'es' ? 'COPIAR SCRIPT' : 'COPY SCRIPT')}
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-auto">
            <pre className="text-[11px] font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
              <code dangerouslySetInnerHTML={{ 
                __html: generateApiCode()
                  .replace(/async function handler/g, '<span class="text-purple-400">async function handler</span>')
                  .replace(/const /g, '<span class="text-blue-400">const </span>')
                  .replace(/return /g, '<span class="text-purple-400">return </span>')
                  .replace(/res\.setHeader/g, '<span class="text-yellow-200">res.setHeader</span>')
                  .replace(/await fetch/g, '<span class="text-yellow-200">await fetch</span>')
              }} />
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
};
