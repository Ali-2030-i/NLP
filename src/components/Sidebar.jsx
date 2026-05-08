import React from 'react';
import { Activity, Database, Server, RefreshCw, Layers, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ currentView, setCurrentView }) => {
  return (
    <div className="w-80 h-full flex flex-col p-6 glass-panel border-r border-y-0 border-l-0 rounded-none z-10">
      
      <div className="flex items-center space-x-3 mb-10">
        <div className="w-10 h-10 rounded-lg bg-neon-cyan/20 border border-neon-cyan/50 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Activity className="text-neon-cyan" size={24} strokeWidth={1.5} />
          </motion.div>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-wider text-white">NEXUS AI</h1>
          <p className="text-xs text-neon-cyan uppercase tracking-widest font-semibold">NLP Pipeline</p>
        </div>
      </div>

      <div className="mb-8 p-4 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-cyan"></span>
          </div>
          <span className="text-sm font-medium text-slate-300">System Status</span>
        </div>
        <span className="text-xs font-bold text-neon-cyan uppercase tracking-wider">Live</span>
      </div>

      <div className="flex-1">
        <h2 className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-4">Pipeline Stages</h2>
        
        <div className="space-y-6 relative">
          <div className="absolute left-5 top-6 bottom-6 w-[1px] bg-gradient-to-b from-neon-cyan/50 via-neon-indigo/50 to-transparent"></div>

          <div className="flex items-start space-x-4 relative cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-neon-cyan/30 flex items-center justify-center z-10 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
              <motion.div
                whileHover={{ y: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <Database className="text-neon-cyan" size={18} strokeWidth={1.5} />
              </motion.div>
            </div>
            <div className="pt-2">
              <h3 className="text-sm font-semibold text-slate-200">1. Crawl4AI Ingestion</h3>
              <p className="text-xs text-slate-500 mt-1">Collecting unstructured data</p>
            </div>
          </div>

          <div 
            className="flex items-start space-x-4 relative cursor-pointer group"
            onClick={() => setCurrentView?.('clusters')}
          >
            <div className={`w-10 h-10 rounded-full bg-slate-900 border flex items-center justify-center z-10 transition-all ${currentView === 'clusters' ? 'border-neon-indigo/30 shadow-[0_0_10px_rgba(129,140,248,0.2)]' : 'border-slate-600 group-hover:border-neon-indigo/50'}`}>
              <motion.div
                whileHover={{ rotate: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <Layers className={currentView === 'clusters' ? 'text-neon-indigo' : 'text-slate-400'} size={18} strokeWidth={1.5} />
              </motion.div>
            </div>
            <div className="pt-2">
              <h3 className={`text-sm font-semibold transition-colors ${currentView === 'clusters' ? 'text-slate-200' : 'text-slate-400 group-hover:text-slate-200'}`}>2. HDBSCAN Clustering</h3>
              <p className="text-xs text-slate-500 mt-1">Semantic vector grouping</p>
            </div>
          </div>

          <div 
            className="flex items-start space-x-4 relative cursor-pointer group"
            onClick={() => setCurrentView?.('newsletter')}
          >
            <div className={`w-10 h-10 rounded-full bg-slate-900 border flex items-center justify-center z-10 transition-all ${currentView === 'newsletter' ? 'border-neon-cyan/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]' : 'border-slate-600 group-hover:border-neon-cyan/50'}`}>
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <RefreshCw className={currentView === 'newsletter' ? 'text-neon-cyan' : 'text-slate-400'} size={18} strokeWidth={1.5} />
              </motion.div>
            </div>
            <div className="pt-2">
              <h3 className={`text-sm font-semibold transition-colors ${currentView === 'newsletter' ? 'text-slate-200' : 'text-slate-400 group-hover:text-slate-200'}`}>3. Personalization</h3>
              <p className="text-xs text-slate-500 mt-1">LLM Email Synthesis</p>
            </div>
          </div>

          <div
            className="flex items-start space-x-4 relative cursor-pointer group"
            onClick={() => setCurrentView?.('controls')}
          >
            <div className={`w-10 h-10 rounded-full bg-slate-900 border flex items-center justify-center z-10 transition-all ${currentView === 'controls' ? 'border-neon-cyan/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]' : 'border-slate-600 group-hover:border-neon-cyan/50'}`}>
              <motion.div
                whileHover={{ scale: [1, 1.15, 1], rotate: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
              >
                <Terminal className={currentView === 'controls' ? 'text-neon-cyan' : 'text-slate-400'} size={18} strokeWidth={1.5} />
              </motion.div>
            </div>
            <div className="pt-2">
              <h3 className={`text-sm font-semibold transition-colors ${currentView === 'controls' ? 'text-slate-200' : 'text-slate-400 group-hover:text-slate-200'}`}>4. Pipeline Controls</h3>
              <p className="text-xs text-slate-500 mt-1">Manual trigger overrides</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-white/10">
        <h2 className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-4">Real-time Metrics</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-slate-900/50 border border-white/5">
            <div className="text-2xl font-bold text-white mb-1">1,240</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Articles Crawled</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/50 border border-white/5">
            <div className="text-2xl font-bold text-neon-cyan mb-1">14</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Active Clusters</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
