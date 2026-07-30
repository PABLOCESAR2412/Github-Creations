import { MarkdownComponent, GitHubStats, RepositoryStats, LanguageStat } from '../types/github';

export const buildMarkdown = (
  components: MarkdownComponent[],
  stats: GitHubStats | null,
  repos: RepositoryStats[],
  languages: LanguageStat[]
): string => {
  const username = stats?.login || 'username';

  return components
    .map((comp) => {
      const alignTag = comp.align && comp.align !== 'left' ? ` align="${comp.align}"` : '';

      switch (comp.type) {
        case 'title': {
          const text = comp.content || `Hi there 👋, I'm ${stats?.name || username}`;
          if (comp.align && comp.align !== 'left') {
            return `<h1${alignTag}>${text}</h1>\n`;
          }
          return `# ${text}\n`;
        }

        case 'subtitle': {
          const text = comp.content || '🚀 Full-Stack Developer & Open Source Contributor';
          if (comp.align && comp.align !== 'left') {
            return `<h3${alignTag}>${text}</h3>\n`;
          }
          return `### ${text}\n`;
        }

        case 'divider':
          return `---\n`;

        case 'spacer': {
          const h = comp.height || 20;
          return `<div style="height: ${h}px;"></div>\n<br/>\n`;
        }

        case 'stats': {
          const theme = comp.theme || 'github_dark';
          const alignStr = comp.align ? ` align="${comp.align}"` : '';
          return `<p${alignStr}>
  <img src="https://github-stats-extended.vercel.app/api?username=${username}&show_icons=true&theme=${theme}&count_private=true" alt="${username}'s GitHub Stats" />
</p>\n`;
        }

        case 'streak': {
          if (comp.customUrl) {
            const alignStr = comp.align ? ` align="${comp.align}"` : '';
            return `<p${alignStr}>
  <a href="https://git.io/streak-stats">
    <img src="${comp.customUrl}" alt="GitHub Streak" />
  </a>
</p>\n`;
          }

          const theme = comp.theme || 'soft-green';
          const alignStr = comp.align ? ` align="${comp.align}"` : '';
          return `<p${alignStr}>
  <a href="https://git.io/streak-stats">
    <img src="https://streak-stats.demolab.com?user=${username}&theme=${theme}" alt="GitHub Streak" />
  </a>
</p>\n`;
        }

        case 'activity_graph': {
          const theme = comp.theme || 'github-compact';
          const alignStr = comp.align ? ` align="${comp.align}"` : '';
          const title = encodeURIComponent(`${stats?.name || username}'s Contribution Graph`);
          return `<p${alignStr}>
  <a href="https://github.com/${username}/github-readme-activity-graph">
    <img src="https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=${theme}&custom_title=${title}&hide_border=true" alt="Activity Graph" />
  </a>
</p>\n`;
        }

        case 'visitors': {
          const alignStr = comp.align ? ` align="${comp.align}"` : '';
          const urlEncoded = encodeURIComponent(`https://github.com/${username}`);
          return `<p${alignStr}>
  <img src="https://komarev.com/ghpvc/?username=${username}&color=0E9C47&style=for-the-badge" alt="Views" />
  <img src="https://api.visitorbadge.io/api/visitors?path=${urlEncoded}&labelColor=%23038875&countColor=%23e9e9e9" alt="Visitors" />
</p>\n`;
        }

        case 'languages': {
          const theme = comp.theme || 'codeSTACKr';
          const alignStr = comp.align ? ` align="${comp.align}"` : '';
          return `<p${alignStr}>
  <a href="https://github-stats-extended.vercel.app/api/top-langs?username=${username}&layout=compact&langs_count=5&theme=${theme}">
    <img src="https://github-stats-extended.vercel.app/api/top-langs?username=${username}&layout=compact&langs_count=5&theme=${theme}" alt="Top Languages" />
  </a>
</p>\n`;
        }

        case 'badges': {
          const style = comp.badgeStyle || 'for-the-badge';
          const alignStr = comp.align ? ` align="${comp.align}"` : '';
          const lColor = (comp.labelColor || '#488207').replace('#', '');
          const vColor = (comp.valueColor || '#55960c').replace('#', '');
          const logoColor = (comp.logoColor || '#ffffff').replace('#', '');

          return `<p${alignStr}>
  <a href="https://github.com/${username}?tab=stars&sort=stargazers">
    <img src="https://img.shields.io/badge/dynamic/json?url=https://api.github-star-counter.workers.dev/user/${username}&query=$.stars&logo=github&logoColor=${logoColor}&color=${vColor}&labelColor=${lColor}&label=Stars&style=${style}" alt="Total stars on GitHub" />
  </a>
  <a href="https://github.com/${username}?tab=followers">
    <img src="https://img.shields.io/github/followers/${username}?color=${vColor}&labelColor=${lColor}&style=${style}&logo=github&logoColor=${logoColor}&label=Followers" alt="Follow me on Github" />
  </a>
</p>\n`;
        }

        case 'socials': {
          const alignStr = comp.align ? ` align="${comp.align}"` : '';
          const twit = stats?.twitter_username;
          const style = comp.badgeStyle || 'for-the-badge';
          
          let res = `<p${alignStr}>\n`;
          if (twit) {
            res += `  <a href="https://twitter.com/${twit}">\n    <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=${style}&logo=twitter&logoColor=white" alt="Twitter" />\n  </a>\n`;
          }
          res += `  <a href="https://linkedin.com/in/${username}">\n    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=${style}&logo=linkedin&logoColor=white" alt="LinkedIn" />\n  </a>\n`;
          res += `  <a href="https://youtube.com/@${username}">\n    <img src="https://img.shields.io/badge/YouTube-FF0000?style=${style}&logo=youtube&logoColor=white" alt="YouTube" />\n  </a>\n`;
          res += `</p>\n`;
          return res;
        }

        case 'custom_badges': {
          const alignStr = comp.align && comp.align !== 'left' ? ` align="${comp.align}"` : '';
          if (comp.content?.includes('| Metric | Count |')) {
            // It's a table layout, block-level alignment like <p align="..."> might break it, but we can wrap it in a div if supported, or just let it render.
            // For markdown tables, standard alignment tags inside them or wrapping them sometimes glitch in GitHub. So just return the raw table.
            return `\n${comp.content}\n`;
          }
          return `<p${alignStr}>\n${comp.content}\n</p>\n`;
        }

        case 'repos': {
          if (!repos || repos.length === 0) return '';
          const displayRepos = comp.selectedRepos && comp.selectedRepos.length > 0
            ? repos.filter(r => comp.selectedRepos?.includes(r.name))
            : repos.slice(0, 4);

          let res = `### 🌟 Featured Repositories\n\n| Repository | Language | Stars | Forks |\n| :--- | :---: | :---: | :---: |\n`;
          displayRepos.forEach((r) => {
            res += `| [**${r.name}**](${r.url}) | \`${r.language || 'Plain Text'}\` | ⭐ ${r.stars} | 🍴 ${r.forks} |\n`;
          });
          return res + '\n';
        }

        case 'table': {
          if (languages.length === 0) return '';
          let tableMd = `### 📊 Language Breakdown\n\n| Language | Projects | Share |\n| :--- | :---: | :--- |\n`;
          languages.forEach((l) => {
            const barLength = Math.round(l.percentage / 5);
            const bar = '█'.repeat(barLength) + '░'.repeat(20 - barLength);
            tableMd += `| **${l.name}** | ${l.count} | \`${bar}\` ${l.percentage}% |\n`;
          });
          return tableMd + '\n';
        }

        case 'dynamic_stats': {
          const layout = comp.layout || 'neon-cluster';
          const badgeStyle = comp.badgeStyle || 'for-the-badge';
          const badgeDirection = comp.badgeDirection || 'row';
          const badgeSpacing = comp.badgeSpacing || 'compact';
          const lColor = (comp.labelColor || '#1e293b').replace('#', '');
          const vColor = (comp.valueColor || '#0ea5e9').replace('#', '');
          const logoColor = (comp.logoColor || '#ffffff').replace('#', '');

          const selectedStats = comp.selectedStats || { followers: true, following: true, repos: true, gists: true, stars: true };

          const availableStats = [
            { id: 'followers', label: 'Followers', icon: 'users', query: '', url: `https://img.shields.io/github/followers/${username}`, isNative: true },
            { id: 'following', label: 'Following', icon: 'user-plus', query: '$.following', url: `https://api.github.com/users/${username}` },
            { id: 'repos', label: 'Public Repos', icon: 'book', query: '$.public_repos', url: `https://api.github.com/users/${username}` },
            { id: 'gists', label: 'Public Gists', icon: 'code', query: '$.public_gists', url: `https://api.github.com/users/${username}` },
            { id: 'stars', label: 'Total Stars', icon: 'star', query: '', url: `https://img.shields.io/github/stars/${username}`, isNative: true },
          ];

          const activeStats = availableStats.filter(s => selectedStats[s.id as keyof typeof selectedStats]);

          if (layout === 'neon-cluster') {
            const separator = badgeDirection === 'row' 
              ? (badgeSpacing === 'spaced' ? ' &nbsp;&nbsp; ' : ' ') 
              : (badgeSpacing === 'spaced' ? '<br/><br/>\n' : '<br/>\n');
              
            const badges = activeStats.map(s => {
              const badgeUrl = s.isNative 
                ? `${s.url}?label=${encodeURIComponent(s.label)}&style=${badgeStyle}&color=${vColor}&labelColor=${lColor}&logo=${s.icon}&logoColor=${logoColor}`
                : `https://img.shields.io/badge/dynamic/json?url=${encodeURIComponent(s.url)}&query=${encodeURIComponent(s.query)}&label=${encodeURIComponent(s.label)}&style=${badgeStyle}&color=${vColor}&labelColor=${lColor}&logo=${s.icon}&logoColor=${logoColor}`;
              return `<a href="https://github.com/${username}"><img src="${badgeUrl}" alt="${s.label}" /></a>`;
            }).join(separator);
            
            const alignStr = comp.align && comp.align !== 'left' ? ` align="${comp.align}"` : '';
            return `<p${alignStr}>\n${badges}\n</p>\n`;
          } else {
            // Data Matrix (Markdown Table)
            let table = `| Metric | Count |\n| :--- | :--- |\n`;
            activeStats.forEach(s => {
              const badgeUrl = s.isNative 
                ? `${s.url}?label=%20&style=${badgeStyle}&color=${vColor}&labelColor=${lColor}&logo=${s.icon}&logoColor=${logoColor}`
                : `https://img.shields.io/badge/dynamic/json?url=${encodeURIComponent(s.url)}&query=${encodeURIComponent(s.query)}&label=%20&style=${badgeStyle}&color=${vColor}&labelColor=${lColor}&logo=${s.icon}&logoColor=${logoColor}`;
              table += `| **${s.label}** | <img src="${badgeUrl}" alt="${s.label}" /> |\n`;
            });
            return `\n${table}\n`;
          }
        }

        default:
          return '';
      }
    })
    .join('\n');
};
