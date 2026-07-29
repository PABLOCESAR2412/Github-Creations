import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { GitHubAdmin } from './pages/GitHubAdmin';
import { Code2, Zap, FolderGit2, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEditorStore } from './store/editorStore';

const Navigation = () => {
  const location = useLocation();
  const { language } = useEditorStore();
  
  return (
    <header className="border-b border-zinc-300 dark:border-zinc-800 bg-[#f5f4ef] dark:bg-black sticky top-0 z-50 px-6 py-4 flex items-center justify-between font-mono uppercase tracking-widest text-sm">
      <div className="flex items-center gap-4">
        <Link to="/">
          <motion.div
            className="w-12 h-12 bg-[#f5f4ef] dark:bg-black border-2 border-black dark:border-white flex items-center justify-center brutal-shadow transition-transform"
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            <FolderGit2 className="w-6 h-6 text-[#00ffff]" />
          </motion.div>
        </Link>

        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-black dark:text-white tracking-tighter">
              [ GITHUB_STATS ]
            </h1>
            <span className="bg-[#00ffff] text-black px-2 py-0.5 font-bold text-xs">
              V1.0
            </span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-500 mt-1 lowercase">
            &gt; root@desktop:~/create-readme
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6 text-xs font-bold text-zinc-600 dark:text-zinc-400">
        <nav className="flex items-center gap-4">
          <Link 
            to="/" 
            className={`transition-colors hover:text-[#00ffff] outline-none ${location.pathname === '/' ? 'text-[#00ffff] border-b-2 border-[#00ffff]' : ''}`}
          >
            {language === 'es' ? '[ CONSTRUCTOR ]' : '[ BUILDER ]'}
          </Link>
          <Link 
            to="/githubadmin" 
            className={`flex items-center gap-2 transition-colors hover:text-[#00ffff] outline-none ${location.pathname === '/githubadmin' ? 'text-[#00ffff] border-b-2 border-[#00ffff]' : ''}`}
          >
            <ShieldAlert className="w-4 h-4" /> {language === 'es' ? '[ LIMITES_API ]' : '[ API_LIMITS ]'}
          </Link>
        </nav>
        
        <div className="flex items-center gap-2 border border-zinc-300 dark:border-zinc-800 px-3 py-1.5 bg-white dark:bg-zinc-950">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-zinc-700 dark:text-zinc-300">TAURI2</span>
        </div>
      </div>
    </header>
  );
};

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#f5f4ef] dark:bg-black text-black dark:text-white flex flex-col font-mono selection:bg-[#00ffff] selection:text-black overflow-x-hidden">
        <Navigation />

        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/githubadmin" element={<GitHubAdmin />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="border-t border-zinc-300 dark:border-zinc-900 px-6 py-4 text-center text-xs text-zinc-600 flex items-center justify-between mt-auto bg-[#f5f4ef] dark:bg-black uppercase tracking-wider">
          <span>GITHUB_CREATIONS // 2026</span>
          <span className="flex items-center gap-2">
            SYS <Code2 className="w-4 h-4 text-[#00ffff] inline" /> RUST
          </span>
        </footer>
      </div>
    </Router>
  );
}

export default App;
