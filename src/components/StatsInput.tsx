import React, { useState } from 'react';
import { Search, Key, Sparkles, Loader2, User, AlertCircle, RefreshCw } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import { useGitHubStats } from '../hooks/useGitHubStats';
import { motion } from 'framer-motion';

export const StatsInput: React.FC = () => {
  const { username, setUsername, token, setToken, stats, loading, error, language } = useEditorStore();
  const { fetchStats } = useGitHubStats();
  const [showTokenInput, setShowTokenInput] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      fetchStats(username.trim());
    }
  };

  const handleQuickLoad = (user: string) => {
    setUsername(user);
    fetchStats(user);
  };

  return (
    <div className="bg-[#f5f4ef] dark:bg-black brutal-border p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#f5f4ef] dark:bg-black border border-[#00ffff] text-[#00ffff]">
            <User className="w-5 h-5" />
          </div>
          <div className="font-mono uppercase">
            <h2 className="text-base font-bold text-black dark:text-white tracking-widest">
              {language === 'es' ? 'Búsqueda GitHub' : 'GitHub Search'}
            </h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-500 mt-1">
              {language === 'es' ? 'Obtén datos y repositorios' : 'Fetch user repositories & data'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowTokenInput(!showTokenInput)}
          className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 hover:text-[#00ffff] transition-colors bg-[#f5f4ef] dark:bg-black px-3 py-1.5 border border-zinc-300 dark:border-zinc-800 uppercase tracking-widest font-bold"
          title={language === 'es' ? "Agrega un token personal para evitar límites" : "Add personal access token to prevent rate limits"}
        >
          <Key className="w-3.5 h-3.5" />
          <span>{token ? (language === 'es' ? '[ TOKEN AÑADIDO ]' : '[ TOKEN SET ]') : (language === 'es' ? '[ AÑADIR TOKEN ]' : '[ ADD TOKEN ]')}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3 font-mono">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={language === 'es' ? "INGRESA USUARIO DE GITHUB..." : "ENTER GITHUB USERNAME..."}
            className="w-full bg-[#f5f4ef] dark:bg-black border border-zinc-300 dark:border-zinc-700 text-black dark:text-white pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#00ffff] transition-colors placeholder:text-zinc-700 uppercase"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !username.trim()}
          className="flex items-center gap-2 bg-[#00ffff] text-black font-bold text-sm px-6 py-3 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider brutal-shadow"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{language === 'es' ? 'Buscando...' : 'Fetching...'}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>{language === 'es' ? 'Obtener Datos' : 'Get Stats'}</span>
            </>
          )}
        </button>
      </form>

      {showTokenInput && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-2 pt-3 border-t border-zinc-300 dark:border-zinc-800 font-mono"
        >
          <label className="text-xs text-zinc-600 dark:text-zinc-400 flex items-center justify-between uppercase">
            <span>[ PERSONAL_ACCESS_TOKEN ]</span>
            <span className="text-[10px] text-zinc-600">{language === 'es' ? 'OPCIONAL PARA LIMITES' : 'OPTIONAL FOR LIMITS'}</span>
          </label>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder={language === 'es' ? "PEGA EL TOKEN AQUI..." : "PASTE TOKEN HERE..."}
            className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-black dark:text-white px-3 py-2.5 focus:outline-none focus:border-[#00ffff]"
          />
        </motion.div>
      )}

      {error && (
        <div className="flex items-start gap-3 bg-[#f5f4ef] dark:bg-black border border-red-500 text-red-500 p-3 text-xs font-mono uppercase">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>[ERROR] {error}</span>
        </div>
      )}

      {!stats && !loading && (
        <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-500 pt-2 font-mono uppercase">
          <span>&gt; {language === 'es' ? 'CARGA_RAPIDA' : 'QUICK_LOAD'}:</span>
          {['torvalds', 'gaearon', 'sindresorhus', 'shadcn'].map((u) => (
            <button
              key={u}
              onClick={() => handleQuickLoad(u)}
              className="bg-[#f5f4ef] dark:bg-black hover:bg-zinc-200 dark:hover:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 hover:border-zinc-500 text-zinc-600 dark:text-zinc-400 px-2 py-1 transition-colors"
            >
              @{u}
            </button>
          ))}
        </div>
      )}

      {stats && (
        <div className="flex items-center justify-between pt-3 border-t border-zinc-300 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 font-mono uppercase">
          <div className="flex items-center gap-3">
            {stats.avatar_url && (
              <img src={stats.avatar_url} alt={stats.login} className="w-8 h-8 border border-zinc-300 dark:border-zinc-700" />
            )}
            <span className="text-black dark:text-white font-bold">{stats.name || stats.login}</span>
            <span className="text-zinc-600">[{stats.public_repos} REPOS]</span>
          </div>
          <button
            onClick={() => fetchStats(username)}
            className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500 hover:text-[#00ffff] transition-colors"
          >
            <RefreshCw className="w-3 h-3" /> {language === 'es' ? '[ ACTUALIZAR ]' : '[ REFRESH ]'}
          </button>
        </div>
      )}
    </div>
  );
};
