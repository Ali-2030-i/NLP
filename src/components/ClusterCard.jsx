import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Fingerprint, TrendingUp, Sparkles, FileText } from 'lucide-react';

const icons = {
  BrainCircuit: <BrainCircuit size={20} strokeWidth={1.5} />,
  Fingerprint: <Fingerprint size={20} strokeWidth={1.5} />,
  TrendingUp: <TrendingUp size={20} strokeWidth={1.5} />
};

const ClusterCard = ({ data, onExploreClick }) => {
  // Mock sources count, defaulting to 5 if not in data
  const sourcesCount = data.sources || 5;

  return (
    <motion.div
      whileHover={{ 
        scale: 1.02, 
        y: -8, 
        boxShadow: "0px 10px 30px -10px rgba(34, 211, 238, 0.4)" 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative w-full h-[400px] rounded-2xl glass-panel glass-panel-hover p-6 flex flex-col cursor-pointer group"
    >
      {/* Decorative Corner Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-cyan/50 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-2 -translate-y-2"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-cyan/50 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 translate-y-2"></div>

      {/* Card Header & Confidence */}
      <div className="flex justify-between items-start mb-6 relative">
        <div className="flex items-center space-x-3 max-w-[75%]">
          <div className="w-10 h-10 rounded-full bg-slate-800/80 border border-white/10 flex items-center justify-center text-neon-cyan shrink-0">
            {icons[data.icon]}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-wide leading-tight">{data.title}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.keywords.map((kw, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Confidence Score Ring (Fixed Layout) */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-slate-800" />
              <circle 
                cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="transparent" 
                strokeDasharray={2 * Math.PI * 20} 
                strokeDashoffset={2 * Math.PI * 20 * (1 - data.confidence / 100)}
                className="text-neon-cyan transition-all duration-1000 ease-out" 
              />
            </svg>
            <span className="text-xs font-bold text-white z-10">{data.confidence}%</span>
          </div>
          <span className="text-[9px] text-slate-500 uppercase tracking-widest">Conf</span>
        </div>
      </div>

      {/* BART Summary */}
      <div className="flex-1 mt-2">
        <div className="flex items-center space-x-2 mb-3">
          <Sparkles size={14} className="text-neon-indigo" strokeWidth={1.5} />
          <h4 className="text-xs font-semibold text-neon-indigo uppercase tracking-widest">BART Summary</h4>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
          {data.summary}
        </p>
      </div>

      {/* Footer Actions & Meta */}
      <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className="text-xs text-slate-500">Auto-generated</span>
          <div className="h-3 w-px bg-slate-700"></div>
          <div className="flex items-center space-x-1 text-slate-400">
            <FileText size={12} strokeWidth={1.5} />
            <span className="text-xs">Sources: {sourcesCount}</span>
          </div>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (onExploreClick) onExploreClick();
          }}
          className="text-xs font-semibold text-neon-cyan hover:text-white transition-colors duration-200"
        >
          Explore Cluster &rarr;
        </button>
      </div>
    </motion.div>
  );
};

export default ClusterCard;
