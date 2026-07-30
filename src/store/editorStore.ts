import { create } from 'zustand';
import { GitHubStats, RepositoryStats, LanguageStat, MarkdownComponent } from '../types/github';
import { buildMarkdown } from '../utils/markdownBuilder';

interface EditorState {
  username: string;
  token: string;
  stats: GitHubStats | null;
  repos: RepositoryStats[];
  languages: LanguageStat[];
  components: MarkdownComponent[];
  markdownOutput: string;
  loading: boolean;
  error: string | null;
  
  // App Settings
  language: 'en' | 'es';

  // Actions
  setLanguage: (lang: 'en' | 'es') => void;

  setUsername: (username: string) => void;
  setToken: (token: string) => void;
  setStatsAndRepos: (stats: GitHubStats | null, repos: RepositoryStats[], languages?: LanguageStat[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  addComponent: (component: Omit<MarkdownComponent, 'id'>) => void;
  removeComponent: (index: number) => void;
  updateComponent: (index: number, updated: Partial<MarkdownComponent>) => void;
  reorderComponents: (startIndex: number, endIndex: number) => void;
  setPreset: (presetType: 'default' | 'minimal' | 'full' | 'cards') => void;
  
  generateMarkdown: () => void;
}

const DEFAULT_COMPONENTS: MarkdownComponent[] = [
  { id: '1', type: 'title', content: "Hi there 👋, I'm {name}", align: 'left' },
  { id: '2', type: 'subtitle', content: '🚀 Passionate Developer | Open Source Enthusiast', align: 'left' },
  { id: '3', type: 'badges', badgeStyle: 'for-the-badge', align: 'left' },
  { id: '4', type: 'divider' },
  { id: '5', type: 'stats', theme: 'github_dark', align: 'left' },
  { id: '6', type: 'languages', theme: 'github_dark', align: 'left' },
  { id: '7', type: 'repos' },
  { id: '8', type: 'table' },
];

export const useEditorStore = create<EditorState>((set, get) => ({
  username: '',
  token: '',
  stats: null,
  repos: [],
  languages: [],
  components: DEFAULT_COMPONENTS,
  markdownOutput: '',
  loading: false,
  error: null,
  language: 'en',


  setLanguage: (language) => set({ language }),


  setUsername: (username) => set({ username }),
  setToken: (token) => set({ token }),
  
  setStatsAndRepos: (stats, repos, languages = []) => {
    set({ stats, repos, languages, error: null });
    get().generateMarkdown();
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error, loading: false }),

  addComponent: (comp) => {
    const newComponent: MarkdownComponent = {
      ...comp,
      id: Math.random().toString(36).substring(2, 9),
    };
    set((state) => ({ components: [...state.components, newComponent] }));
    get().generateMarkdown();
  },

  removeComponent: (index) => {
    set((state) => ({
      components: state.components.filter((_, i) => i !== index),
    }));
    get().generateMarkdown();
  },

  updateComponent: (index, updated) => {
    set((state) => {
      const next = [...state.components];
      next[index] = { ...next[index], ...updated };
      return { components: next };
    });
    get().generateMarkdown();
  },

  reorderComponents: (startIndex, endIndex) => {
    set((state) => {
      const result = Array.from(state.components);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { components: result };
    });
    get().generateMarkdown();
  },

  setPreset: (presetType) => {
    let components: MarkdownComponent[] = [];
    if (presetType === 'minimal') {
      components = [
        { id: '1', type: 'title', content: "Hi there 👋", align: 'left' },
        { id: '2', type: 'badges', badgeStyle: 'flat-square' },
        { id: '3', type: 'stats', theme: 'github_dark' },
      ];
    } else if (presetType === 'full') {
      components = [
        { id: '1', type: 'title', content: "Hi there 👋, I'm {name}", align: 'left' },
        { id: '2', type: 'subtitle', content: '🚀 Building awesome software with Rust & TypeScript' },
        { id: '3', type: 'badges', badgeStyle: 'for-the-badge' },
        { id: '4', type: 'divider' },
        { id: '5', type: 'stats', theme: 'github_dark' },
        { id: '6', type: 'languages', theme: 'github_dark' },
        { id: '7', type: 'repos' },
        { id: '8', type: 'table' },
      ];
    } else if (presetType === 'cards') {
      components = [
        { id: '1', type: 'title', content: "⚡ Projects & Activity" },
        { id: '2', type: 'repos' },
        { id: '3', type: 'languages', theme: 'tokyonight' },
        { id: '4', type: 'stats', theme: 'tokyonight' },
      ];
    } else {
      components = DEFAULT_COMPONENTS;
    }
    set({ components });
    get().generateMarkdown();
  },

  generateMarkdown: () => {
    const { components, stats, repos, languages } = get();
    const md = buildMarkdown(components, stats, repos, languages);
    set({ markdownOutput: md });
  },
}));
