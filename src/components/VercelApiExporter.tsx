import React, { useState } from 'react';
import { useEditorStore } from '../store/editorStore';
import { Copy, Check, Terminal, Triangle, Layers, LayoutTemplate, Palette } from 'lucide-react';

export const VercelApiExporter: React.FC = () => {
  const { username, stats, language } = useEditorStore();
  const [copiedCode, setCopiedCode] = useState(false);
  
  // Customization State
  const [bgColor, setBgColor] = useState('#000000');
  const [borderColor, setBorderColor] = useState('#333333');
  const [titleColor, setTitleColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#8b949e');
  const [accentColor, setAccentColor] = useState('#ffffff');
  
  const [layout, setLayout] = useState<'brutalist' | 'terminal' | 'minimal' | 'cyberpunk' | 'glassmorphism' | 'retro-dos' | 'neon-glow' | 'pixel-art' | 'material' | 'hacker' | 'dashboard' | '3d-bar-chart' | 'activity-rings'>('3d-bar-chart');
  
  const [dataPoints, setDataPoints] = useState({
    followers: true,
    following: false,
    repos: true,
    gists: false,
    stars: true,
    forks: false,
    commits: true,
    prs: true
  });

  // Mock data for live preview if user hasn't fetched real stats yet
  const mockName = stats?.name || stats?.login || username || 'user';
  const mockFollowers = stats?.followers ?? 250;
  const mockFollowing = stats?.following ?? 12;
  const mockRepos = stats?.public_repos ?? 45;
  const mockGists = stats?.public_gists ?? 3;
  const mockStars = 1240;
  const mockForks = 350;
  const mockCommits = 4520;
  const mockPrs = 89;

  // Function that generates the raw SVG string based on current settings
  const generateSvgContent = (isExport: boolean) => {
    const nameVal = isExport ? '${name}' : mockName;
    const folVal = isExport ? '${followers}' : mockFollowers;
    const flwVal = isExport ? '${following}' : mockFollowing;
    const repVal = isExport ? '${repos}' : mockRepos;
    const gistVal = isExport ? '${gists}' : mockGists;
    const starVal = isExport ? '${stars}' : mockStars;
    const forkVal = isExport ? '${forks}' : mockForks;
    const comVal = isExport ? '${commits}' : mockCommits;
    const prVal = isExport ? '${prs}' : mockPrs;

    const activeStats: {label: string, value: string | number}[] = [];
    if (dataPoints.followers) activeStats.push({ label: 'Followers', value: folVal });
    if (dataPoints.following) activeStats.push({ label: 'Following', value: flwVal });
    if (dataPoints.repos) activeStats.push({ label: 'Repos', value: repVal });
    if (dataPoints.gists) activeStats.push({ label: 'Gists', value: gistVal });
    if (dataPoints.stars) activeStats.push({ label: 'Stars', value: starVal });
    if (dataPoints.forks) activeStats.push({ label: 'Forks', value: forkVal });
    if (dataPoints.commits) activeStats.push({ label: 'Commits', value: comVal });
    if (dataPoints.prs) activeStats.push({ label: 'PRs', value: prVal });

    let svgInner = '';

    if (layout === 'brutalist') {
      svgInner = `
        <rect width="400" height="200" fill="${bgColor}" stroke="${borderColor}" stroke-width="2" rx="0" />
        <rect width="400" height="40" fill="${accentColor}" />
        <text x="20" y="26" font-family="monospace" font-size="16" font-weight="bold" fill="${bgColor}">[ ${nameVal.toUpperCase()} ]</text>
        
        <g transform="translate(20, 60)">
          ${activeStats.map((stat, i) => {
            const row = Math.floor(i / 2);
            const col = i % 2;
            const x = col * 180;
            const y = row * 60;
            return `
              <rect x="${x}" y="${y}" width="160" height="50" fill="transparent" stroke="${borderColor}" stroke-width="1" />
              <text x="${x + 10}" y="${y + 20}" font-family="monospace" font-size="10" fill="${textColor}" text-transform="uppercase">${stat.label}</text>
              <text x="${x + 10}" y="${y + 40}" font-family="monospace" font-size="16" font-weight="bold" fill="${titleColor}">${stat.value}</text>
            `;
          }).join('')}
        </g>
      `;
    } else if (layout === 'terminal') {
      svgInner = `
        <rect width="400" height="200" fill="${bgColor}" rx="10" stroke="${borderColor}" stroke-width="1" />
        <circle cx="20" cy="20" r="6" fill="#ff5f56" />
        <circle cx="40" cy="20" r="6" fill="#ffbd2e" />
        <circle cx="60" cy="20" r="6" fill="#27c93f" />
        <text x="20" y="55" font-family="monospace" font-size="14" fill="${accentColor}">~/${nameVal} $ cat stats.txt</text>
        
        <g transform="translate(20, 85)">
          ${activeStats.map((stat, i) => {
            return `
              <text x="0" y="${i * 25}" font-family="monospace" font-size="13" fill="${textColor}">> ${stat.label.padEnd(10, '.')}: </text>
              <text x="110" y="${i * 25}" font-family="monospace" font-size="13" font-weight="bold" fill="${titleColor}">${stat.value}</text>
            `;
          }).join('')}
        </g>
      `;
    } else if (layout === 'minimal') {
      svgInner = `
        <rect width="400" height="100" fill="${bgColor}" rx="8" stroke="${borderColor}" stroke-width="1" />
        <text x="20" y="35" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="${titleColor}">${nameVal}</text>
        <line x1="20" y1="45" x2="380" y2="45" stroke="${accentColor}" stroke-width="2" />
        
        <g transform="translate(20, 75)">
          ${activeStats.map((stat, i) => {
            const x = i * (360 / activeStats.length);
            return `
              <text x="${x}" y="0" font-family="Arial, sans-serif" font-size="12" fill="${textColor}">${stat.label}</text>
              <text x="${x}" y="-20" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="${titleColor}">${stat.value}</text>
            `;
          }).join('')}
        </g>
      `;
    } else if (layout === 'cyberpunk') {
      svgInner = `
        <path d="M 0,20 L 20,0 L 400,0 L 400,180 L 380,200 L 0,200 Z" fill="${bgColor}" stroke="${accentColor}" stroke-width="2" />
        <path d="M 0,20 L 20,0 L 400,0" fill="none" stroke="${borderColor}" stroke-width="4" />
        <text x="30" y="30" font-family="monospace" font-size="20" font-weight="900" fill="${titleColor}" font-style="italic">${nameVal}</text>
        <g transform="translate(30, 60)">
          ${activeStats.map((stat, i) => {
            const row = Math.floor(i / 2);
            const col = i % 2;
            return `
              <rect x="${col * 170}" y="${row * 60}" width="150" height="40" fill="${accentColor}" fill-opacity="0.2" stroke="${accentColor}" stroke-width="1" />
              <text x="${col * 170 + 10}" y="${row * 60 + 15}" font-family="monospace" font-size="10" fill="${textColor}">${stat.label}</text>
              <text x="${col * 170 + 10}" y="${row * 60 + 32}" font-family="monospace" font-size="16" font-weight="bold" fill="${titleColor}">${stat.value}</text>
            `;
          }).join('')}
        </g>
      `;
    } else if (layout === 'glassmorphism') {
      svgInner = `
        <defs>
          <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${bgColor}" stop-opacity="0.8" />
            <stop offset="100%" stop-color="${bgColor}" stop-opacity="0.3" />
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#glassGrad)" rx="16" stroke="${borderColor}" stroke-width="1" stroke-opacity="0.5" />
        <circle cx="50" cy="50" r="40" fill="${accentColor}" opacity="0.3" filter="blur(10px)" />
        <circle cx="350" cy="150" r="60" fill="${titleColor}" opacity="0.2" filter="blur(15px)" />
        <text x="30" y="40" font-family="sans-serif" font-size="22" font-weight="bold" fill="${titleColor}">${nameVal}</text>
        <g transform="translate(30, 70)">
          ${activeStats.map((stat, i) => {
            const row = Math.floor(i / 2);
            const col = i % 2;
            return `
              <rect x="${col * 170}" y="${row * 55}" width="150" height="45" fill="#ffffff" fill-opacity="0.1" rx="8" stroke="#ffffff" stroke-width="0.5" stroke-opacity="0.2"/>
              <text x="${col * 170 + 15}" y="${row * 55 + 20}" font-family="sans-serif" font-size="11" fill="${textColor}">${stat.label}</text>
              <text x="${col * 170 + 15}" y="${row * 55 + 38}" font-family="sans-serif" font-size="16" font-weight="bold" fill="${titleColor}">${stat.value}</text>
            `;
          }).join('')}
        </g>
      `;
    } else if (layout === 'retro-dos') {
      svgInner = `
        <rect width="400" height="200" fill="${bgColor}" stroke="${borderColor}" stroke-width="4" />
        <rect x="4" y="4" width="392" height="192" fill="none" stroke="${accentColor}" stroke-width="1" stroke-dasharray="2 2" />
        <text x="20" y="30" font-family="monospace" font-size="14" font-weight="bold" fill="${titleColor}">C:\\USERS\${nameVal.toUpperCase()}&gt; STATS.EXE</text>
        <g transform="translate(20, 70)">
          ${activeStats.map((stat, i) => `
            <text x="0" y="${i * 25}" font-family="monospace" font-size="14" fill="${textColor}">[${stat.label.toUpperCase()}]</text>
            <text x="150" y="${i * 25}" font-family="monospace" font-size="14" fill="${accentColor}">${stat.value}</text>
          `).join('')}
        </g>
      `;
    } else if (layout === 'neon-glow') {
      svgInner = `
        <defs>
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="400" height="200" fill="${bgColor}" rx="12" />
        <rect width="396" height="196" x="2" y="2" fill="none" stroke="${accentColor}" stroke-width="2" rx="10" filter="url(#neonGlow)" />
        <text x="200" y="40" font-family="sans-serif" font-size="24" font-weight="bold" fill="${titleColor}" text-anchor="middle" filter="url(#neonGlow)">${nameVal}</text>
        <g transform="translate(40, 80)">
          ${activeStats.map((stat, i) => {
            const row = Math.floor(i / 2);
            const col = i % 2;
            return `
              <text x="${col * 160 + 80}" y="${row * 60}" font-family="sans-serif" font-size="12" fill="${textColor}" text-anchor="middle">${stat.label}</text>
              <text x="${col * 160 + 80}" y="${row * 60 + 25}" font-family="sans-serif" font-size="20" font-weight="bold" fill="${accentColor}" text-anchor="middle" filter="url(#neonGlow)">${stat.value}</text>
            `;
          }).join('')}
        </g>
      `;
    } else if (layout === 'pixel-art') {
      svgInner = `
        <rect width="400" height="200" fill="${bgColor}" />
        <path d="M4 0h392v4H4z M0 4h4v192H0z M396 4h4v192h-4z M4 196h392v4H4z" fill="${borderColor}" />
        <rect x="8" y="8" width="384" height="32" fill="${accentColor}" />
        <text x="20" y="28" font-family="monospace" font-size="16" font-weight="bold" fill="${bgColor}">${nameVal}</text>
        <g transform="translate(20, 70)">
          ${activeStats.map((stat, i) => {
            const row = Math.floor(i / 2);
            const col = i % 2;
            return `
              <rect x="${col * 180}" y="${row * 55}" width="160" height="40" fill="none" stroke="${borderColor}" stroke-width="2" />
              <text x="${col * 180 + 10}" y="${row * 55 + 15}" font-family="monospace" font-size="10" fill="${textColor}">${stat.label}</text>
              <text x="${col * 180 + 10}" y="${row * 55 + 30}" font-family="monospace" font-size="14" font-weight="bold" fill="${titleColor}">${stat.value}</text>
            `;
          }).join('')}
        </g>
      `;
    } else if (layout === 'material') {
      svgInner = `
        <defs>
          <filter id="matShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.15"/>
          </filter>
        </defs>
        <rect width="380" height="180" x="10" y="10" fill="${bgColor}" rx="12" filter="url(#matShadow)" />
        <rect x="10" y="10" width="380" height="60" fill="${accentColor}" rx="12" />
        <rect x="10" y="40" width="380" height="30" fill="${accentColor}" />
        <text x="30" y="45" font-family="sans-serif" font-size="22" font-weight="bold" fill="${bgColor}">${nameVal}</text>
        <g transform="translate(30, 90)">
          ${activeStats.map((stat, i) => {
            const row = Math.floor(i / 2);
            const col = i % 2;
            return `
              <text x="${col * 170}" y="${row * 50}" font-family="sans-serif" font-size="12" fill="${textColor}">${stat.label}</text>
              <text x="${col * 170}" y="${row * 50 + 22}" font-family="sans-serif" font-size="18" font-weight="bold" fill="${titleColor}">${stat.value}</text>
            `;
          }).join('')}
        </g>
      `;
    } else if (layout === 'hacker') {
      svgInner = `
        <rect width="400" height="200" fill="${bgColor}" />
        <text x="10" y="25" font-family="monospace" font-size="12" fill="${accentColor}">root@${nameVal}:~# ./scan_stats.sh</text>
        <g transform="translate(10, 50)">
          ${activeStats.map((stat, i) => `
            <text x="0" y="${i * 25}" font-family="monospace" font-size="12" fill="${textColor}">Extracting ${stat.label}...</text>
            <text x="200" y="${i * 25}" font-family="monospace" font-size="12" font-weight="bold" fill="${titleColor}">[ OK ] ${stat.value}</text>
          `).join('')}
        </g>
        <text x="10" y="${50 + activeStats.length * 25 + 15}" font-family="monospace" font-size="12" fill="${accentColor}" class="blink">root@${nameVal}:~# █</text>
      `;
    } else if (layout === 'dashboard') {
      svgInner = `
        <rect width="400" height="200" fill="${bgColor}" />
        <rect x="10" y="10" width="380" height="40" fill="${borderColor}" rx="6" />
        <text x="20" y="35" font-family="sans-serif" font-size="16" font-weight="bold" fill="${titleColor}">${nameVal} | Overview</text>
        <g transform="translate(10, 60)">
          ${activeStats.map((stat, i) => {
            const width = activeStats.length > 2 ? 185 : 380;
            const row = Math.floor(i / 2);
            const col = activeStats.length > 2 ? i % 2 : 0;
            const x = col * 195;
            const y = activeStats.length > 2 ? row * 65 : i * 65;
            return `
              <rect x="${x}" y="${y}" width="${width}" height="55" fill="${borderColor}" rx="6" />
              <circle cx="${x + 25}" cy="${y + 27}" r="15" fill="${accentColor}" fill-opacity="0.2" />
              <text x="${x + 45}" y="${y + 22}" font-family="sans-serif" font-size="10" fill="${textColor}">${stat.label.toUpperCase()}</text>
              <text x="${x + 45}" y="${y + 42}" font-family="sans-serif" font-size="18" font-weight="bold" fill="${titleColor}">${stat.value}</text>
            `;
          }).join('')}
        </g>
      `;
    } else if (layout === '3d-bar-chart') {
      svgInner = `
        <style>
          @keyframes grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
          .bar-anim { transform-origin: bottom; animation: grow 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        </style>
        <rect width="400" height="200" fill="${bgColor}" rx="12" stroke="${borderColor}" stroke-width="1" />
        <text x="20" y="30" font-family="sans-serif" font-size="16" font-weight="bold" fill="${titleColor}">${nameVal} | Metrics</text>
        <g transform="translate(40, 160)">
          ${activeStats.map((stat, i) => {
            const width = 320 / activeStats.length;
            const barW = width * 0.5;
            const spacing = width * 0.25;
            const x = i * width + spacing;
            const rawVal = Number(stat.value) || 1;
            const maxVal = Math.max(...activeStats.map(s => Number(s.value) || 1), 10);
            const h = Math.max((rawVal / maxVal) * 100, 5);
            return `
              <g transform="translate(${x}, 0)">
                <g class="bar-anim">
                  <!-- Right Side -->
                  <polygon points="${barW},0 ${barW+8},-8 ${barW+8},${-(h+8)} ${barW},${-h}" fill="${accentColor}" opacity="0.4" />
                  <!-- Top Side -->
                  <polygon points="0,${-h} 8,${-(h+8)} ${barW+8},${-(h+8)} ${barW},${-h}" fill="${accentColor}" opacity="0.7" />
                  <!-- Front Face -->
                  <rect x="0" y="${-h}" width="${barW}" height="${h}" fill="${accentColor}" />
                  <text x="${barW/2}" y="${-h - 15}" font-family="sans-serif" font-size="10" fill="${titleColor}" text-anchor="middle" font-weight="bold">${stat.value}</text>
                </g>
                <text x="${barW/2}" y="20" font-family="sans-serif" font-size="9" fill="${textColor}" text-anchor="middle">${stat.label.toUpperCase()}</text>
              </g>
            `;
          }).join('')}
        </g>
      `;
    } else if (layout === 'activity-rings') {
      svgInner = `
        <style>
          @keyframes drawRing { to { stroke-dashoffset: 0; } }
          .ring-anim { animation: drawRing 2s cubic-bezier(0.1, 0.7, 0.1, 1) forwards; }
        </style>
        <rect width="400" height="200" fill="${bgColor}" rx="16" stroke="${borderColor}" stroke-width="1" />
        <text x="20" y="30" font-family="sans-serif" font-size="16" font-weight="bold" fill="${titleColor}">${nameVal} | Activity</text>
        <g transform="translate(200, 110)">
          ${activeStats.map((stat, i) => {
            const radius = 80 - (i * (80 / Math.max(activeStats.length, 1)));
            const rawVal = Number(stat.value) || 1;
            const maxVal = Math.max(...activeStats.map(s => Number(s.value) || 1), 10);
            const percent = Math.min((rawVal / maxVal), 1);
            const circ = 2 * Math.PI * radius;
            const op = 1 - (i * 0.15);
            return `
              <circle cx="0" cy="0" r="${radius}" fill="none" stroke="${borderColor}" stroke-width="6" opacity="0.3" />
              <circle cx="0" cy="0" r="${radius}" fill="none" stroke="${accentColor}" stroke-width="6" opacity="${op}" stroke-linecap="round" stroke-dasharray="${circ * percent} ${circ}" stroke-dashoffset="0" class="ring-anim" transform="rotate(-90)" />
              <g transform="translate(-190, ${-radius + 3})">
                <text x="0" y="0" font-family="sans-serif" font-size="9" fill="${textColor}" text-anchor="start">${stat.label}</text>
              </g>
              <g transform="translate(190, ${-radius + 3})">
                <text x="0" y="0" font-family="sans-serif" font-size="9" font-weight="bold" fill="${titleColor}" text-anchor="end">${stat.value}</text>
              </g>
            `;
          }).join('')}
        </g>
      `;
    }

    return `<svg width="400" height="${layout === 'minimal' ? '100' : '200'}" viewBox="0 0 400 ${layout === 'minimal' ? '100' : '200'}" fill="none" xmlns="http://www.w3.org/2000/svg">${svgInner}</svg>`;
  };
  const generateApiCode = () => {
    const svgTemplate = generateSvgContent(true);

    return `// api/stats.js
export default async function handler(req, res) {
  const { username = '${username || 'torvalds'}' } = req.query;

  try {
    const userRes = await fetch(\`https://api.github.com/users/\${username}\`);
    const userData = await userRes.json();
    
    if (userData.message === 'Not Found') {
      return res.status(404).send('User not found');
    }

    // Fetch repos for stars and forks calculation (without token, max 100 repos)
    const reposRes = await fetch(\`https://api.github.com/users/\${username}/repos?per_page=100\`);
    const reposData = await reposRes.json();
    
    let stars = 0;
    let forks = 0;
    if (Array.isArray(reposData)) {
      stars = reposData.reduce((acc, r) => acc + r.stargazers_count, 0);
      forks = reposData.reduce((acc, r) => acc + r.forks_count, 0);
    }

    // Note: Commits and PRs require GraphQL or Search API which are heavily rate-limited without a token.
    // If you have a process.env.GITHUB_TOKEN in Vercel, you can uncomment advanced fetching here!
    let commits = 0;
    let prs = 0;

    const name = userData.name || userData.login;
    const followers = userData.followers || 0;
    const following = userData.following || 0;
    const repos = userData.public_repos || 0;
    const gists = userData.public_gists || 0;

    const svg = \`
${svgTemplate.trim()}
    \`;

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=7200'); // Cache 2 hours

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
    <div className="bg-[#f5f4ef] dark:bg-black border border-zinc-300 dark:border-zinc-800 p-6 shadow-[8px_8px_0px_0px_rgba(63,63,70,1)] relative overflow-hidden font-mono">
      <div className="flex flex-col gap-8 relative z-10">
        
        {/* Header */}
        <div className="border-b border-zinc-300 dark:border-zinc-800 pb-4">
          <h2 className="text-xl font-black text-black dark:text-white flex items-center gap-3 uppercase tracking-widest">
            <Triangle className="w-6 h-6 text-black dark:text-white fill-current" />
            [ CUSTOM_SVG_BUILDER ]
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-500 mt-2 uppercase">
            {language === 'es' 
              ? 'Diseña tu propia tarjeta SVG dinámica y exporta el código listo para desplegar en Vercel.' 
              : 'Design your own dynamic SVG card and export deploy-ready Vercel code.'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Builder Controls */}
          <div className="flex-1 space-y-6">
            
            {/* Layout Options */}
            <div className="bg-white dark:bg-zinc-950 p-5 border border-zinc-300 dark:border-zinc-800">
              <h3 className="text-sm font-bold text-black dark:text-white mb-4 flex items-center gap-2 uppercase tracking-widest">
                <LayoutTemplate className="w-4 h-4" /> [ LAYOUT_STYLE ]
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {(['brutalist', 'terminal', 'minimal', 'cyberpunk', 'glassmorphism', 'retro-dos', 'neon-glow', 'pixel-art', 'material', 'hacker', 'dashboard', '3d-bar-chart', 'activity-rings'] as const).map(l => (
                  <button 
                    key={l}
                    onClick={() => setLayout(l)}
                    className={`p-2 text-[9px] font-bold uppercase border transition-colors ${layout === l ? 'bg-[#00ffff] dark:bg-white text-black border-black dark:border-white' : 'bg-transparent text-zinc-500 border-zinc-300 dark:border-zinc-700 hover:border-black dark:hover:border-white'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="bg-white dark:bg-zinc-950 p-5 border border-zinc-300 dark:border-zinc-800">
              <h3 className="text-sm font-bold text-black dark:text-white mb-4 flex items-center gap-2 uppercase tracking-widest">
                <Palette className="w-4 h-4" /> [ COLOR_PALETTE ]
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Background', val: bgColor, set: setBgColor },
                  { label: 'Border', val: borderColor, set: setBorderColor },
                  { label: 'Title / Values', val: titleColor, set: setTitleColor },
                  { label: 'Text / Labels', val: textColor, set: setTextColor },
                  { label: 'Accent', val: accentColor, set: setAccentColor }
                ].map((color, idx) => (
                  <div key={idx}>
                    <label className="text-[10px] text-zinc-600 dark:text-zinc-400 mb-1 block uppercase">{color.label}</label>
                    <div className="flex items-center gap-2 bg-[#f5f4ef] dark:bg-black p-2 border border-zinc-300 dark:border-zinc-800">
                      <input type="color" value={color.val} onChange={(e) => color.set(e.target.value)} className="w-5 h-5 cursor-pointer bg-transparent border-0 p-0" />
                      <span className="text-[10px] text-zinc-700 dark:text-zinc-300 font-mono uppercase">{color.val}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Points */}
            <div className="bg-white dark:bg-zinc-950 p-5 border border-zinc-300 dark:border-zinc-800">
              <h3 className="text-sm font-bold text-black dark:text-white mb-4 flex items-center gap-2 uppercase tracking-widest">
                <Layers className="w-4 h-4" /> [ DATA_POINTS ]
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(dataPoints).map(([key, value]) => (
                  <label key={key} className="flex items-center gap-2 p-2 border border-zinc-300 dark:border-zinc-800 cursor-pointer hover:border-zinc-500 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={value} 
                      onChange={(e) => setDataPoints(prev => ({ ...prev, [key]: e.target.checked }))} 
                      className="accent-black dark:accent-white"
                    />
                    <span className="text-xs uppercase font-bold text-black dark:text-white">{key}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Right Side: Live Preview & Code */}
          <div className="flex-1 flex flex-col gap-6">
            
            {/* LIVE PREVIEW BOX */}
            <div className="bg-[#f5f4ef] dark:bg-black border border-zinc-300 dark:border-zinc-800 p-6 flex flex-col items-center justify-center relative brutal-shadow min-h-[250px]">
              <div className="absolute top-3 left-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">&gt; LIVE_SVG_PREVIEW</div>
              <div 
                className="mt-4"
                dangerouslySetInnerHTML={{ __html: generateSvgContent(false) }}
              />
            </div>

            {/* EXPORT CODE BOX */}
            <div className="flex-1 flex flex-col bg-[#f5f4ef] dark:bg-black border border-zinc-300 dark:border-zinc-800 overflow-hidden brutal-shadow">
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                <div className="flex items-center gap-2 uppercase tracking-widest">
                  <Terminal className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                  <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400">&gt; API/STATS.JS</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 bg-[#f5f4ef] dark:bg-black hover:bg-zinc-200 dark:hover:bg-zinc-900 text-black dark:text-white px-3 py-1.5 border border-zinc-300 dark:border-zinc-700 hover:border-black dark:hover:border-white text-[10px] font-bold uppercase transition-colors"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-black dark:text-white" /> : <Copy className="w-3 h-3" />}
                  {copiedCode ? (language === 'es' ? 'COPIADO' : 'COPIED') : (language === 'es' ? 'COPIAR SCRIPT' : 'COPY SCRIPT')}
                </button>
              </div>

              <div className="border-b border-zinc-300 dark:border-zinc-800 bg-[#f5f4ef] dark:bg-black p-3 text-[10px] text-zinc-600 dark:text-zinc-400 uppercase leading-relaxed">
                <p className="font-bold mb-1 text-black dark:text-white">🚀 {language === 'es' ? 'CÓMO DEPLEGAR' : 'HOW TO DEPLOY'}:</p>
                1. {language === 'es' ? 'Crea una carpeta `api` y dentro un archivo `stats.js`' : 'Create an `api` folder and a `stats.js` file inside it'}<br/>
                2. {language === 'es' ? 'Pega este código, instala Vercel CLI y ejecuta `vercel`' : 'Paste this code, install Vercel CLI and run `vercel`'}<br/>
                3. {language === 'es' ? 'Usa tu nueva URL en Markdown' : 'Use your new URL in Markdown'}: `![Stats](https://tu-app.vercel.app/api/stats?username=tu-usuario)`
              </div>
              
              <div className="flex-1 p-4 overflow-auto max-h-[300px]">
                <pre className="text-[11px] font-mono text-zinc-800 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {generateApiCode()}
                </pre>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
