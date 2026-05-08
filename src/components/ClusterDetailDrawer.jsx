import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Clock, Newspaper, Sparkles, BrainCircuit, Fingerprint, TrendingUp, Terminal } from 'lucide-react';

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

const mockCleanedText = `The study of scaling laws in neural language models has revealed that model performance depends strongly on scale, which consists of three factors: the number of model parameters (N), the size of the dataset (D), and the amount of compute used for training (C). These dependencies hold over a wide range of values and can be accurately described by power laws. As we scale up models, we consistently observe predictable improvements in cross-entropy loss and various downstream task evaluations.

Recent observations indicate that optimal compute allocation between model size and data size is critical. Rather than arbitrarily increasing parameter count, balanced scaling where both parameters and data grow proportionally yields significantly better empirical results. This shift in paradigm necessitates a reevaluation of current hardware utilization strategies and distributed training architectures to maximize floating-point operations per second (FLOPS) utilization during pre-training phases.`;

const mockJsonData = {
  "cluster_id": "c_948275",
  "keywords": ["scaling laws", "LLM", "compute-optimal", "neural networks"],
  "silhouette_score": 0.842,
  "centroid_vector": [
    0.145, -0.092, 0.884, 0.312, -0.551, 0.024, 0.771, -0.199,
    0.412, -0.033, 0.655, 0.118, -0.892, 0.441, -0.228, 0.509
  ],
  "article_ids": ["art_102", "art_559", "art_891", "art_334"],
  "timestamp": "2026-05-08T21:15:00Z",
  "confidence_interval": [0.89, 0.96],
  "topic_drift_metric": 0.042
};

const ClusterDetailDrawer = ({ isOpen, onClose, clusterData }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);

  if (!clusterData) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-slate-900/80 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
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

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
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

                <section>
                  <div className="flex items-center space-x-2 mb-4">
                    <Newspaper size={16} className="text-slate-400" strokeWidth={1.5} />
                    <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-widest">Constituent Articles</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {mockArticles.map((article) => (
                      <div 
                        key={article.id}
                        onClick={() => setSelectedArticle(article)}
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
              
              <div className="p-6 border-t border-white/10">
                <button 
                  onClick={() => setIsJsonModalOpen(true)}
                  className="w-full py-3 rounded-lg bg-neon-indigo/10 border border-neon-indigo/50 text-neon-indigo hover:bg-neon-indigo/20 font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <span>View Full Source Data</span>
                  <ExternalLink size={16} strokeWidth={1.5} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <div 
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => setSelectedArticle(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-neon-cyan/30 rounded-2xl shadow-[0_0_40px_rgba(34,211,238,0.15)] flex flex-col max-h-[85vh] overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex items-start justify-between bg-slate-900/50">
                <div className="pr-8">
                  <h2 className="text-xl font-bold text-white mb-2 leading-tight">
                    {selectedArticle.title}
                  </h2>
                  <div className="flex items-center text-xs text-slate-400 space-x-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-semibold text-slate-300">
                      {selectedArticle.source}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{selectedArticle.time}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors shrink-0"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                <div className="flex items-center space-x-2 mb-4">
                  <Terminal size={14} className="text-neon-cyan" />
                  <span className="text-xs font-mono text-neon-cyan uppercase tracking-widest">Cleaned Extracted Text</span>
                </div>
                <p className="text-sm text-slate-300 leading-loose font-serif whitespace-pre-wrap">
                  {mockCleanedText}
                </p>
              </div>
              
              <div className="p-6 border-t border-white/5 bg-slate-900/50">
                <button className="w-full py-3 rounded-xl bg-neon-cyan text-slate-950 font-bold transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2">
                  <span>Open Original Article</span>
                  <ExternalLink size={16} strokeWidth={2} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isJsonModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <div 
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => setIsJsonModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-black border border-neon-indigo/50 rounded-2xl shadow-[0_0_40px_rgba(129,140,248,0.15)] flex flex-col max-h-[85vh] overflow-hidden"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-950">
                <div className="flex items-center space-x-2 text-neon-indigo">
                  <Terminal size={16} strokeWidth={2} />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest">Raw Payload Data</span>
                </div>
                <button 
                  onClick={() => setIsJsonModalOpen(false)}
                  className="p-1.5 rounded-md hover:bg-white/10 text-slate-500 hover:text-white transition-colors"
                >
                  <X size={18} strokeWidth={2} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 custom-scrollbar bg-black">
                <pre className="text-[13px] leading-relaxed font-mono text-emerald-400 whitespace-pre-wrap break-all">
                  {JSON.stringify(mockJsonData, null, 2)}
                </pre>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ClusterDetailDrawer;
