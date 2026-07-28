export interface GitHubStats {
  login: string;
  name?: string;
  bio?: string;
  avatar_url?: string;
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
  created_at: string;
  twitter_username?: string;
  company?: string;
  location?: string;
}

export interface RepositoryStats {
  name: string;
  description?: string;
  url: string;
  stars: number;
  forks: number;
  language?: string;
  last_update: string;
  watchers: number;
  open_issues: number;
}

export interface LanguageStat {
  name: string;
  count: number;
  percentage: number;
}

export interface MarkdownComponent {
  id: string;
  type: 'title' | 'subtitle' | 'stats' | 'languages' | 'divider' | 'spacer' | 'table' | 'repos' | 'badges' | 'streak' | 'activity_graph' | 'visitors' | 'custom_badges' | 'socials';
  content?: string;
  level?: number;
  height?: number; // for spacer
  theme?: 'default' | 'dark' | 'tokyonight' | 'radical' | 'mer节' | 'dracula' | 'github_dark' | 'gruvbox' | 'codeSTACKr' | 'github-compact' | 'soft-green';
  badgeStyle?: 'flat' | 'flat-square' | 'for-the-badge' | 'plastic';
  customUrl?: string;
  labelColor?: string;
  valueColor?: string;
  logoColor?: string;
  showIcons?: boolean;
  align?: 'left' | 'center' | 'right';
  selectedRepos?: string[];
  customBadges?: Array<{ label: string; message: string; color: string; logo?: string }>;
}
