import { useEditorStore } from '../store/editorStore';
import { GitHubStats, RepositoryStats, LanguageStat } from '../types/github';

export const useGitHubStats = () => {
  const { setStatsAndRepos, setLoading, setError, loading, error, token } = useEditorStore();

  const fetchStats = async (username: string) => {
    if (!username.trim()) return;
    setLoading(true);
    setError(null);

    try {
      let stats: GitHubStats;
      let repos: RepositoryStats[];

      // Check if window.__TAURI_INTERNALS__ or window.__TAURI__ exists
      const isTauri = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;

      if (isTauri) {
        try {
          const { invoke } = await import('@tauri-apps/api/core');
          stats = await invoke<GitHubStats>('fetch_user_stats', { username, token: token || null });
          repos = await invoke<RepositoryStats[]>('fetch_user_repos', { username, token: token || null });
        } catch (err: any) {
          console.warn('Tauri invoke failed, falling back to direct HTTP fetch:', err);
          ({ stats, repos } = await fetchFromWeb(username, token));
        }
      } else {
        ({ stats, repos } = await fetchFromWeb(username, token));
      }

      // Process languages client-side
      const languages = processLanguagesClient(repos);

      setStatsAndRepos(stats, repos, languages);
      setLoading(false);
      return { stats, repos, languages };
    } catch (err: any) {
      console.error('Error fetching GitHub stats:', err);
      const msg = err?.message || err?.toString() || 'Failed to fetch GitHub data';
      setError(msg);
      setLoading(false);
    }
  };

  return { fetchStats, loading, error };
};

// Fallback direct Web API fetch
async function fetchFromWeb(username: string, token?: string) {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
  };
  if (token && token.trim()) {
    headers['Authorization'] = `Bearer ${token.trim()}`;
  }

  const userRes = await fetch(`https://api.github.com/users/${username}`, { headers });
  if (!userRes.ok) {
    if (userRes.status === 404) throw new Error(`GitHub user "${username}" not found.`);
    if (userRes.status === 403) throw new Error('GitHub API rate limit exceeded. Please add a Personal Access Token.');
    throw new Error(`GitHub API error: ${userRes.statusText}`);
  }
  const rawUser = await userRes.json();

  const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, { headers });
  if (!reposRes.ok) {
    throw new Error(`GitHub API error fetching repos: ${reposRes.statusText}`);
  }
  const rawRepos = await reposRes.json();

  const stats: GitHubStats = {
    login: rawUser.login,
    name: rawUser.name,
    bio: rawUser.bio,
    avatar_url: rawUser.avatar_url,
    public_repos: rawUser.public_repos,
    followers: rawUser.followers,
    following: rawUser.following,
    public_gists: rawUser.public_gists,
    created_at: rawUser.created_at,
    company: rawUser.company,
    location: rawUser.location,
  };

  const repos: RepositoryStats[] = rawRepos.map((r: any) => ({
    name: r.name,
    description: r.description,
    url: r.html_url,
    stars: r.stargazers_count,
    forks: r.forks_count,
    language: r.language,
    last_update: r.updated_at,
    watchers: r.watchers_count,
    open_issues: r.open_issues_count,
  }));

  return { stats, repos };
}

function processLanguagesClient(repos: RepositoryStats[]): LanguageStat[] {
  const counts: Record<string, number> = {};
  let total = 0;

  for (const repo of repos) {
    if (repo.language && repo.language.trim()) {
      counts[repo.language] = (counts[repo.language] || 0) + 1;
      total++;
    }
  }

  const list: LanguageStat[] = Object.entries(counts).map(([name, count]) => ({
    name,
    count,
    percentage: total > 0 ? Number(((count / total) * 100).toFixed(1)) : 0,
  }));

  return list.sort((a, b) => b.count - a.count);
}
