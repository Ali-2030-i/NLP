import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Clock, Newspaper, Sparkles, BrainCircuit, Fingerprint, TrendingUp } from 'lucide-react';

const icons = {
  BrainCircuit: <BrainCircuit size={20} strokeWidth={1.5} />,
  Fingerprint: <Fingerprint size={20} strokeWidth={1.5} />,
  TrendingUp: <TrendingUp size={20} strokeWidth={1.5} />
};

const mockArticles = [
  { id: 1, title: "Scaling Laws for Neural Language Models", source: "arXiv", time: "2 hours ago" },
  { id: 2, title: "Compute-Optimal Training: The Chinchilla Approach", source: "DeepMind Blog", time: "4 hours ago" },
  { id: 3, title: "Why Parameter Count is No Longer the Gold Standard", source: "TechCrunch", time: "5 hours ago" },
  { id: 4, title: "Hardware Implications of New LLM Scaling Discoveries", source: "Bloomberg", time: "12 hours ago" },
];

const ClusterDetailDrawer = ({ isOpen, onClose, clusterData }) => {
  // If no data provided, render nothing or use fallback
  if (!clusterData) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-slate-900/80 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 relative">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} strokeWidth={1.5} />
              </button>

              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-800/80 border border-white/10 flex items-center justify-center text-neon-cyan shrink-0">
                  {icons[clusterData.icon] || <BrainCircuit size={20} strokeWidth={1.5} />}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-wide">{clusterData.title}</h2>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex flex-wrap gap-2">
                  {clusterData.keywords?.map((kw, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                      {kw}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-2 bg-slate-800/50 border border-white/5 px-3 py-1 rounded-lg">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest">Conf</span>
                  <span className="text-sm font-bold text-neon-cyan">{clusterData.confidence}%</span>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* Summary Section */}
              <section>
                <div className="flex items-center space-x-2 mb-3">
                  <Sparkles size={16} className="text-neon-indigo" strokeWidth={1.5} />
                  <h3 className="text-sm font-semibold text-neon-indigo uppercase tracking-widest">BART Abstractive Summary</h3>
                </div>
                <div className="relative p-5 rounded-xl bg-slate-950/50 border border-neon-indigo/30 shadow-[0_0_15px_rgba(129,140,248,0.1)] group">
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-neon-indigo/50 rounded-tl-sm"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-neon-indigo/50 rounded-br-sm"></div>
                  <p className="text-sm text-slate-300 leading-relaxed font-mono">
                    {clusterData.summary}
                  </p>
                </div>
              </section>

              {/* Constituent Articles Section */}
              <section>
                <div className="flex items-center space-x-2 mb-4">
                  <Newspaper size={16} className="text-slate-400" strokeWidth={1.5} />
                  <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-widest">Constituent Articles</h3>
                </div>
                
                <div className="space-y-3">
                  {mockArticles.map((article) => (
                    <div 
                      key={article.id}
                      className="p-4 rounded-lg bg-slate-800/40 border border-white/5 hover:bg-slate-800/60 hover:border-neon-cyan/30 transition-all group cursor-pointer"
                    >
                      <h4 className="text-sm font-medium text-slate-200 mb-2 group-hover:text-neon-cyan transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-semibold">{article.source}</span>
                        <div className="flex items-center space-x-1">
                          <Clock size={12} strokeWidth={1.5} />
                          <span>{article.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>
            
            {/* Footer Action */}
            <div className="p-6 border-t border-white/10">
              <button className="w-full py-3 rounded-lg bg-neon-indigo/10 border border-neon-indigo/50 text-neon-indigo hover:bg-neon-indigo/20 font-medium transition-colors flex items-center justify-center space-x-2">
                <span>View Full Source Data</span>
                <ExternalLink size={16} strokeWidth={1.5} />
              </button>
            </div>
            
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ClusterDetailDrawer;
