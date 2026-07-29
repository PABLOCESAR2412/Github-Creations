import React, { useEffect, useState } from 'react';
import { useEditorStore } from '../store/editorStore';
import { ShieldAlert, Server, Activity, Clock, RefreshCw, Key } from 'lucide-react';
import { formatNumber } from '../utils/formatters';

interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
  used: number;
}

interface RateLimitResponse {
  resources: {
    core: RateLimitInfo;
    graphql: RateLimitInfo;
    search: RateLimitInfo;
  };
}

export const GitHubAdmin: React.FC = () => {
  const { token, language } = useEditorStore();
  const [rateLimit, setRateLimit] = useState<RateLimitResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRateLimit = async () => {
    setLoading(true);
    setError(null);
    try {
      const headers: Record<string, string> = {
        'Accept': 'application/vnd.github.v3+json',
      };
      if (token && token.trim()) {
        headers['Authorization'] = `Bearer ${token.trim()}`;
      }

      const res = await fetch('https://api.github.com/rate_limit', { headers });
      if (!res.ok) {
        throw new Error(`GitHub API error: ${res.statusText}`);
      }
      const data: RateLimitResponse = await res.json();
      setRateLimit(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch rate limit data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRateLimit();
  }, [token]);

  const formatResetTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffMins = Math.max(0, Math.round((date.getTime() - now.getTime()) / 60000));
    
    return {
      absolute: date.toLocaleTimeString(),
      relative: language === 'es' ? `en ${diffMins} min` : `in ${diffMins} mins`
    };
  };

  const renderLimitCard = (title: string, info: RateLimitInfo, icon: React.ReactNode, colorClass: string) => {
    const percentage = (info.remaining / info.limit) * 100;
    const isLow = percentage < 20;
    const resetTime = formatResetTime(info.reset);

    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-1 ${colorClass} opacity-80`} />
        
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${colorClass.replace('bg-', 'bg-').replace('500', '500/20')} ${colorClass.replace('bg-', 'text-')}`}>
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 capitalize">{title} API</h3>
              <p className="text-xs text-slate-400">Endpoint usage limits</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-black tracking-tight text-black dark:text-white">
              {formatNumber(info.remaining)} <span className="text-sm font-medium text-slate-500">/ {formatNumber(info.limit)}</span>
            </div>
            <p className={`text-xs font-semibold ${isLow ? 'text-red-400' : 'text-emerald-400'}`}>
              {percentage.toFixed(1)}% {language === 'es' ? 'Disponible' : 'Available'}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden mb-4 border border-slate-800">
          <div 
            className={`h-full rounded-full ${isLow ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : colorClass}`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Details Footer */}
        <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-950/50 p-3 rounded-lg">
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" /> {language === 'es' ? 'Usado' : 'Used'}: <span className="text-slate-200 font-semibold">{info.used}</span>
          </div>
          <div className="flex items-center gap-1.5" title={`Resets at ${resetTime.absolute}`}>
            <Clock className="w-3.5 h-3.5" /> {language === 'es' ? 'Reinicio' : 'Resets'}: <span className="text-slate-200 font-semibold">{resetTime.relative}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[1200px] mx-auto w-full p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-black dark:text-white flex items-center gap-3">
            <Server className="w-7 h-7 text-cyan-400" />
            {language === 'es' ? 'Límites de API GitHub' : 'GitHub API Rate Limits'}
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {language === 'es' ? 'Monitorea tus cuotas de peticiones a la API.' : 'Monitor your API request quotas and usage across different GitHub resources.'}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold ${token ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'}`}>
            <Key className="w-4 h-4" />
            {token 
              ? (language === 'es' ? 'Autenticado' : 'Authenticated') 
              : (language === 'es' ? 'No Autenticado' : 'Unauthenticated')}
          </div>
          <button 
            onClick={fetchRateLimit}
            disabled={loading}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl transition-all disabled:opacity-50 text-sm font-semibold border border-slate-700"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {language === 'es' ? 'Actualizar' : 'Refresh Data'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Cards Grid */}
      {rateLimit && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderLimitCard('Core API', rateLimit.resources.core, <Activity className="w-5 h-5" />, 'bg-blue-500')}
          {renderLimitCard('Search API', rateLimit.resources.search, <Server className="w-5 h-5" />, 'bg-purple-500')}
          {renderLimitCard('GraphQL API', rateLimit.resources.graphql, <Activity className="w-5 h-5" />, 'bg-pink-500')}
        </div>
      )}

      {/* Info Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-sm text-slate-300">
        <h3 className="font-bold text-black dark:text-white mb-2 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          {language === 'es' ? '¿Por qué importa esto?' : 'Why does this matter?'}
        </h3>
        <p className="mb-4 text-slate-400">
          GitHub limits the number of requests you can make to their API to prevent abuse. 
          Unauthenticated requests (without a token) are limited to 60 per hour per IP address.
          Authenticated requests (with a personal access token) are limited to 5,000 per hour.
        </p>
        <p className="text-slate-400">
          If your <strong className="text-cyan-400">Core API</strong> limits drop to 0, the GitHub Stats Generator will not be able to fetch your stats until the reset time. 
          To fix this, you can generate a Personal Access Token in your GitHub Developer Settings and add it to the app.
        </p>
      </div>

    </div>
  );
};
