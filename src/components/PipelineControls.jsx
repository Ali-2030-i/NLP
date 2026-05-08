import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Play,
  Database,
  BrainCircuit,
  Mail,
  RefreshCw,
  Zap,
  ChevronRight,
  Code,
  Globe,
  Layers,
  LayoutTemplate,
  Send,
  Eye,
  Loader2,
  CheckCircle2
} from 'lucide-react';

const MOCK_HEADLINES = [
  { id: 1, source: 'Bloomberg', title: 'Tech Stocks Rally Amid AI Optimism', time: '1m ago' },
  { id: 2, source: 'Reuters', title: 'Global Markets Stabilize After Rate Hike', time: '3m ago' },
  { id: 3, source: 'WSJ', title: 'New Regulations Proposed for Crypto Assets', time: '5m ago' },
  { id: 4, source: 'Bloomberg', title: 'Energy Sector Sees Unexpected Growth in Q3', time: '12m ago' },
  { id: 5, source: 'Reuters', title: 'Central Banks Hint at Easing Policy Later This Year', time: '15m ago' },
];

const MOCK_CLUSTERS = [
  { id: 1, name: 'AI & Semiconductors', count: 42, color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30' },
  { id: 2, name: 'Monetary Policy', count: 38, color: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/30' },
  { id: 3, name: 'Energy Markets', count: 25, color: 'text-amber-400 bg-amber-400/10 border-amber-400/30' },
  { id: 4, name: 'Crypto Regulation', count: 19, color: 'text-violet-400 bg-violet-400/10 border-violet-400/30' },
  { id: 5, name: 'Emerging Markets', count: 14, color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30' },
  { id: 6, name: 'Healthcare Biotech', count: 11, color: 'text-rose-400 bg-rose-400/10 border-rose-400/30' },
];

const MOCK_SUMMARY = "Recent analyses indicate a strong upward trend in technology equities, heavily driven by advancements in generative AI and semiconductor manufacturing. Concurrently, global central banks are signaling a potential pause in rate hikes, which has stabilized broader market indices. However, regulatory scrutiny on digital assets is increasing, suggesting a complex landscape for alternative investments in the near term.";

const MOCK_INBOX = [
  { id: 1, subject: 'Your Daily Tech & Markets Brief', preview: 'AI Rally continues, Rate pause expected...' },
  { id: 2, subject: 'Energy Sector Update', preview: 'Unexpected growth in Q3 energy reports...' },
  { id: 3, subject: 'Crypto Regulatory Watch', preview: 'New proposals from SEC regarding digital assets...' },
];

const INITIAL_LOGS = [
  { id: 1,  level: 'INFO',    text: 'NEXUS AI Pipeline v2.4.1 initialised.' },
  { id: 2,  level: 'INFO',    text: 'Scheduler: next full run in 04h 17m.' },
  { id: 3,  level: 'SUCCESS', text: 'Database connection pool established (8/8 workers).' },
  { id: 4,  level: 'INFO',    text: 'Crawl4AI: target sources loaded — Bloomberg, Reuters, WSJ.' },
  { id: 5,  level: 'METRIC',  text: 'Memory usage: 312 MB / 4096 MB  ·  CPU: 4.2 %' },
  { id: 6,  level: 'INFO',    text: 'HDBSCAN model checkpoint v3 ready in GPU VRAM.' },
  { id: 7,  level: 'SUCCESS', text: '145 articles fetched from Bloomberg (last run: 06:30 UTC).' },
  { id: 8,  level: 'METRIC',  text: 'Silhouette Score: 0.42  ·  14 clusters detected.' },
  { id: 9,  level: 'INFO',    text: 'BART summariser loaded — facebook/bart-large-cnn.' },
  { id: 10, level: 'SUCCESS', text: 'Email dispatch queue: 0 pending · 238 delivered today.' },
  { id: 11, level: 'WARN',    text: 'Rate-limit headroom on NewsAPI: 62 % remaining.' },
  { id: 12, level: 'INFO',    text: 'Awaiting manual trigger or next scheduler tick…' },
];

const MODULE_LOGS = {
  crawl: [
    { level: 'INFO',    text: '▶  Manual trigger received — Crawl4AI Ingestion.' },
    { level: 'INFO',    text: 'Crawl4AI: spinning up 6 async workers…' },
    { level: 'INFO',    text: 'Fetching https://bloomberg.com/markets …' },
    { level: 'INFO',    text: 'Fetching https://reuters.com/finance …' },
    { level: 'INFO',    text: 'Fetching https://wsj.com/news/markets …' },
    { level: 'SUCCESS', text: '312 raw articles scraped in 4.2 s.' },
    { level: 'INFO',    text: 'De-duplicating via MinHash LSH…' },
    { level: 'METRIC',  text: 'Unique articles retained: 289  ·  Duplicates dropped: 23.' },
    { level: 'SUCCESS', text: '✔  Ingestion complete. Vector store updated.' },
  ],
  cluster: [
    { level: 'INFO',    text: '▶  Manual trigger received — HDBSCAN Re-cluster.' },
    { level: 'INFO',    text: 'Loading 289 document embeddings from Chroma DB…' },
    { level: 'INFO',    text: 'Computing cosine similarity matrix (289×289)…' },
    { level: 'INFO',    text: 'HDBSCAN: min_cluster_size=8  ·  min_samples=3  ·  metric=cosine.' },
    { level: 'METRIC',  text: 'Clusters found: 17  ·  Noise points: 12.' },
    { level: 'METRIC',  text: 'Silhouette Score: 0.51  ·  Davies–Bouldin Index: 0.87.' },
    { level: 'INFO',    text: 'Persisting cluster labels to PostgreSQL…' },
    { level: 'SUCCESS', text: '✔  Re-clustering complete. Dashboard updated.' },
  ],
  summarise: [
    { level: 'INFO',    text: '▶  Manual trigger received — BART Summarisation.' },
    { level: 'INFO',    text: 'Selecting top-3 articles per cluster (17 clusters)…' },
    { level: 'INFO',    text: 'Batching 51 documents → BART (batch_size=8)…' },
    { level: 'INFO',    text: '[7/7 batches] Generating abstractive summaries…' },
    { level: 'METRIC',  text: 'Avg summary length: 142 tokens  ·  Latency: 1.3 s/doc.' },
    { level: 'INFO',    text: 'ROUGE-L score (sample): 0.38.' },
    { level: 'INFO',    text: 'Writing summaries to Supabase storage…' },
    { level: 'SUCCESS', text: '✔  51 summaries generated and persisted.' },
  ],
  dispatch: [
    { level: 'INFO',    text: '▶  Manual trigger received — Email Dispatch.' },
    { level: 'INFO',    text: 'Personalisation engine: loading 238 subscriber profiles…' },
    { level: 'INFO',    text: 'Matching interest vectors → cluster embeddings…' },
    { level: 'INFO',    text: 'Rendering Jinja2 newsletter templates…' },
    { level: 'INFO',    text: 'SendGrid: authorising API key — OK.' },
    { level: 'INFO',    text: 'Dispatching 238 personalised emails via SMTP relay…' },
    { level: 'METRIC',  text: 'Sent: 238  ·  Bounced: 2  ·  Open-rate target: 34 %.' },
    { level: 'SUCCESS', text: '✔  Email dispatch complete. Queue cleared.' },
  ],
};

const MODULES = [
  {
    id: 'crawl',
    icon: Database,
    title: 'Crawl4AI Ingestion',
    subtitle: 'Module 1',
    desc: 'Scrapes Bloomberg, Reuters & WSJ via async HTTP workers with de-duplication.',
    label: 'Run Global Crawl',
    accent: 'cyan',
  },
  {
    id: 'cluster',
    icon: BrainCircuit,
    title: 'HDBSCAN Clustering',
    subtitle: 'Module 2',
    desc: 'Recomputes cosine-similarity clusters on the latest embedding space.',
    label: 'Force Re-cluster',
    accent: 'indigo',
  },
  {
    id: 'summarise',
    icon: RefreshCw,
    title: 'BART Summarisation',
    subtitle: 'Module 3',
    desc: 'Runs facebook/bart-large-cnn on top articles in every cluster.',
    label: 'Generate Summaries',
    accent: 'violet',
  },
  {
    id: 'dispatch',
    icon: Mail,
    title: 'Personalization Engine',
    subtitle: 'Module 4',
    desc: 'Renders personalised newsletters and dispatches via SendGrid SMTP.',
    label: 'Dispatch Emails',
    accent: 'emerald',
  },
];

const ACCENT = {
  cyan:   { border: 'border-cyan-500/30', activeGlow: 'shadow-[0_0_18px_rgba(34,211,238,0.15)]', hoverGlow: 'hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]', icon: 'text-cyan-400', btn: 'from-cyan-600 to-cyan-500', ring: 'ring-cyan-500/40', badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' },
  indigo: { border: 'border-indigo-500/30', activeGlow: 'shadow-[0_0_18px_rgba(99,102,241,0.15)]', hoverGlow: 'hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]', icon: 'text-indigo-400', btn: 'from-indigo-600 to-indigo-500', ring: 'ring-indigo-500/40', badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' },
  violet: { border: 'border-violet-500/30', activeGlow: 'shadow-[0_0_18px_rgba(139,92,246,0.15)]', hoverGlow: 'hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]', icon: 'text-violet-400', btn: 'from-violet-600 to-violet-500', ring: 'ring-violet-500/40', badge: 'bg-violet-500/10 text-violet-400 border-violet-500/30' },
  emerald:{ border: 'border-emerald-500/30', activeGlow: 'shadow-[0_0_18px_rgba(16,185,129,0.15)]', hoverGlow: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]', icon: 'text-emerald-400', btn: 'from-emerald-600 to-emerald-500', ring: 'ring-emerald-500/40', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
};

const LOG_STYLE = {
  INFO:    'text-slate-400',
  SUCCESS: 'text-emerald-400',
  WARN:    'text-amber-400',
  ERROR:   'text-red-400',
  METRIC:  'text-cyan-400',
};

const LOG_PREFIX = {
  INFO:    '[INFO   ]',
  SUCCESS: '[SUCCESS]',
  WARN:    '[WARN   ]',
  ERROR:   '[ERROR  ]',
  METRIC:  '[METRIC ]',
};

let _uid = 100;
const uid = () => ++_uid;

function timestamp() {
  return new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
}

const TypingEffect = ({ text, speed = 20 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

export default function PipelineControls() {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [running, setRunning] = useState({});
  const [activeModule, setActiveModule] = useState(null);
  const [viewMode, setViewMode] = useState('preview');
  const [showResults, setShowResults] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [progress, setProgress] = useState(0);
  
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs, viewMode]);

  const triggerModule = (moduleId) => {
    if (running[moduleId]) return;
    
    const modData = MODULES.find(m => m.id === moduleId);

    setRunning((r) => ({ ...r, [moduleId]: true }));
    setActiveModule(moduleId);
    setShowResults(false);
    setProgress(0);
    
    if (viewMode === 'terminal') {
      setViewMode('preview');
    }

    const toastId = uid();
    setToasts(prev => [...prev, { id: toastId, type: 'loading', message: `Running ${modData.title}...` }]);

    const entries = MODULE_LOGS[moduleId];
    entries.forEach((entry, i) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, { id: uid(), ...entry, ts: timestamp() }]);
        setProgress(((i + 1) / entries.length) * 100);

        if (i === entries.length - 1) {
          setTimeout(() => {
            setRunning((r) => { const n = { ...r }; delete n[moduleId]; return n; });
            setShowResults(true);
            setProgress(0);
            
            setToasts(prev => prev.map(t => 
              t.id === toastId ? { ...t, type: 'success', message: `${modData.title} completed successfully.` } : t
            ));
            
            setTimeout(() => {
              setToasts(prev => prev.filter(t => t.id !== toastId));
            }, 4000);
          }, 400);
        }
      }, i * 520);
    });
  };

  const renderPreviewContent = () => {
    if (!activeModule) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-500">
          <Eye size={48} className="mb-4 opacity-20" strokeWidth={1} />
          <p>Select a pipeline stage to preview results</p>
        </div>
      );
    }

    const isRunning = running[activeModule];

    if (isRunning && !showResults) {
      return (
        <div className="flex flex-col h-full w-full space-y-5">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 rounded-xl bg-slate-800 animate-pulse border border-slate-700"></div>
            <div className="flex flex-col gap-3">
              <div className="w-48 h-4 bg-slate-800 rounded animate-pulse"></div>
              <div className="w-32 h-3 bg-slate-800/80 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-full h-[60px] bg-slate-900/60 rounded-xl animate-pulse border border-slate-800 flex items-center px-4 gap-4">
                <div className="w-10 h-10 rounded bg-slate-800"></div>
                <div className="flex-1 space-y-2">
                  <div className="w-full h-3 bg-slate-800 rounded"></div>
                  <div className="w-2/3 h-2 bg-slate-800/50 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    switch (activeModule) {
      case 'crawl':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Globe size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">Recently Fetched Headlines</h3>
            </div>
            <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
              {MOCK_HEADLINES.map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={item.id} 
                  className="p-4 rounded-xl bg-slate-900/50 border border-white/5 flex items-start justify-between group hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800/80 w-max px-2 py-0.5 rounded">
                      {item.source}
                    </span>
                    <h4 className="text-sm font-medium text-slate-200 group-hover:text-cyan-100 transition-colors">{item.title}</h4>
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap">{item.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'cluster':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col h-full">
             <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                <Layers size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">New Semantic Clusters</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 auto-rows-max overflow-y-auto pr-2 custom-scrollbar pb-4">
              {MOCK_CLUSTERS.map((cluster, i) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, type: 'spring' }}
                  key={cluster.id}
                  className={`p-5 rounded-2xl border bg-slate-900/40 backdrop-blur-sm flex flex-col items-center justify-center text-center gap-3 shadow-lg hover:scale-105 transition-transform cursor-default ${cluster.color}`}
                >
                  <div className="text-3xl font-black">{cluster.count}</div>
                  <div className="text-xs font-semibold uppercase tracking-wider opacity-90">{cluster.name}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'summarise':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/30 text-violet-400">
                <LayoutTemplate size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">Generated Abstractive Summary</h3>
            </div>
            <div className="flex-1 p-6 rounded-2xl bg-slate-900/50 border border-violet-500/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-violet-500 to-transparent"></div>
              <div className="text-sm text-slate-300 leading-relaxed font-serif">
                {showResults && <TypingEffect text={MOCK_SUMMARY} speed={15} />}
              </div>
              <div className="mt-8 flex gap-3">
                 <span className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-400 font-mono">ROUGE-1: 42.1</span>
                 <span className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-400 font-mono">BART-Large-CNN</span>
              </div>
            </div>
          </motion.div>
        );

      case 'dispatch':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col h-full">
             <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Send size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">Dispatch Queue Status</h3>
            </div>
            <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <div className="flex-1 text-center border-r border-white/5">
                <div className="text-2xl font-bold text-white">238</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500">Sent</div>
              </div>
              <div className="flex-1 text-center border-r border-white/5">
                <div className="text-2xl font-bold text-emerald-400">100%</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500">Delivery Rate</div>
              </div>
              <div className="flex-1 text-center">
                <div className="text-2xl font-bold text-amber-400">34%</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500">Open Target</div>
              </div>
            </div>
            <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
              {MOCK_INBOX.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={msg.id}
                  className="p-4 rounded-xl bg-slate-900/30 border border-white/5 flex gap-4 items-center"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 text-slate-400 font-bold text-xs">
                    {(msg.subject[0]).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white truncate">{msg.subject}</h4>
                    <p className="text-xs text-slate-500 truncate">{msg.preview}</p>
                  </div>
                  <div className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                    Delivered
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="flex-1 overflow-hidden flex flex-col p-6 gap-6 relative">
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0f172a; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #22d3ee; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #06b6d4; box-shadow: 0 0 15px #22d3ee; }
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #22d3ee #0f172a; }
      `}</style>

      <div 
        className="fixed top-0 left-0 h-[2px] bg-cyan-400 z-50 transition-all ease-out duration-500" 
        style={{ 
          width: `${progress}%`, 
          boxShadow: progress > 0 ? '0 0 10px #22d3ee' : 'none' 
        }}
      />

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border backdrop-blur-md shadow-2xl ${
                toast.type === 'loading' 
                  ? 'bg-slate-950/90 border-cyan-500/30 text-cyan-400' 
                  : 'bg-emerald-950/90 border-emerald-500/30 text-emerald-400'
              }`}
            >
              {toast.type === 'loading' ? (
                <Loader2 size={18} className="animate-spin text-cyan-400" />
              ) : (
                <CheckCircle2 size={18} className="text-emerald-400" />
              )}
              <span className="text-sm font-semibold tracking-wide">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <header className="flex items-center justify-between flex-shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap size={14} strokeWidth={1.5} className="text-cyan-400" />
            <span className="text-xs text-cyan-400 uppercase tracking-widest font-semibold">
              Manual Override
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Pipeline Controls
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Trigger individual pipeline stages outside the scheduler window.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/60 border border-white/5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          <span className="text-xs font-medium text-slate-300">System Live</span>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">

        <section className="flex flex-col gap-4 overflow-y-auto pr-1 custom-scrollbar">
          {MODULES.map((mod) => {
            const a = ACCENT[mod.accent];
            const Icon = mod.icon;
            const isRunning = !!running[mod.id];
            const isActive = activeModule === mod.id;

            return (
              <div
                key={mod.id}
                className={`
                  relative rounded-2xl border ${a.border}
                  bg-slate-900/60 backdrop-blur-md p-5
                  transition-all duration-300
                  hover:bg-slate-900/80 hover:scale-[1.01] ${a.hoverGlow}
                  ${isActive ? a.activeGlow : 'shadow-none'}
                  ${isRunning ? `ring-2 ${a.ring}` : ''}
                  ${isActive && !isRunning ? `ring-1 ${a.ring}` : ''}
                `}
                onClick={() => !isRunning && setActiveModule(mod.id)}
              >
                {isRunning && (
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent animate-[shimmer_1.6s_linear_infinite] -translate-x-full" />
                  </div>
                )}

                <div className="flex items-start gap-4 cursor-pointer">
                  <div className={`flex-shrink-0 w-11 h-11 rounded-xl border ${a.border} bg-slate-950/60 flex items-center justify-center transition-colors ${isActive ? a.badge.split(' ').filter(c=>c.startsWith('bg-')).join(' ') : ''}`}>
                    <Icon size={22} strokeWidth={1.5} className={a.icon} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[10px] font-bold uppercase tracking-widest border rounded px-1.5 py-0.5 ${a.badge}`}>
                        {mod.subtitle}
                      </span>
                      {isRunning && (
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-400 animate-pulse">
                          Running…
                        </span>
                      )}
                    </div>
                    <h2 className="text-sm font-bold text-white mb-1">{mod.title}</h2>
                    <p className="text-xs text-slate-500 leading-relaxed">{mod.desc}</p>
                  </div>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); triggerModule(mod.id); }}
                  disabled={isRunning}
                  className={`
                    mt-4 w-full flex items-center justify-center gap-2
                    px-4 py-2.5 rounded-xl text-sm font-semibold text-white
                    bg-gradient-to-r ${a.btn} bg-[length:200%_100%]
                    transition-all duration-300
                    hover:brightness-110 hover:shadow-lg active:scale-95
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100
                  `}
                >
                  {isRunning ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                      </svg>
                      Processing…
                    </>
                  ) : (
                    <>
                      <Play size={14} strokeWidth={1.5} />
                      {mod.label}
                      <ChevronRight size={14} strokeWidth={1.5} className="ml-auto opacity-50" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </section>

        <section className="flex flex-col rounded-2xl overflow-hidden border border-slate-700/50 shadow-[0_0_40px_rgba(0,0,0,0.3)] bg-slate-950/80 backdrop-blur-xl min-h-0 relative">
          
          <div className="flex-1 overflow-hidden relative p-6">
            <AnimatePresence mode="wait">
              {viewMode === 'preview' ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, rotateY: -90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: 90 }}
                  transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
                  className="absolute inset-0 p-6 flex flex-col"
                  style={{ transformOrigin: 'center left' }}
                >
                  {renderPreviewContent()}
                </motion.div>
              ) : (
                <motion.div
                  key="terminal"
                  initial={{ opacity: 0, rotateY: 90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: -90 }}
                  transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
                  className="absolute inset-0 flex flex-col bg-black/50"
                  style={{ transformOrigin: 'center right' }}
                >
                  <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-slate-950/80">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500/70" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                      <Terminal size={12} strokeWidth={1.5} />
                      nexus-ai ·  pipeline.log  —  bash
                    </div>
                    <div className="ml-auto flex items-center gap-1.5 text-[10px] text-cyan-400 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      {logs.length} lines
                    </div>
                  </div>

                  <div
                    ref={terminalRef}
                    className="flex-1 overflow-y-auto p-4 font-mono text-[11px] leading-relaxed space-y-0.5 custom-scrollbar"
                  >
                    {logs.map((log) => (
                      <div key={log.id} className="flex gap-2 group">
                        <span className="flex-shrink-0 text-slate-600 select-none">
                          {log.ts || '2026-05-07 06:30:00 UTC'}
                        </span>
                        <span className={`flex-shrink-0 font-bold ${LOG_STYLE[log.level]}`}>
                          {LOG_PREFIX[log.level]}
                        </span>
                        <span className={`${LOG_STYLE[log.level]} group-hover:text-white transition-colors duration-150`}>
                          {log.text}
                        </span>
                      </div>
                    ))}

                    <div className="flex gap-2 mt-1">
                      <span className="text-slate-600 select-none">{'                    '}</span>
                      <span className="text-cyan-400 animate-pulse font-bold">█</span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 flex items-center justify-between px-4 py-2 border-t border-white/5 bg-slate-950/80">
                    <span className="font-mono text-[10px] text-slate-600">
                      nexus@pipeline:~$
                    </span>
                    <button
                      onClick={() => setLogs(INITIAL_LOGS)}
                      className="text-[10px] font-mono text-slate-600 hover:text-slate-300 transition-colors px-2 py-1 rounded border border-transparent hover:border-white/10"
                    >
                      clear
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex-shrink-0 p-4 border-t border-white/10 bg-slate-900/80 z-10">
            <button
              onClick={() => setViewMode(v => v === 'preview' ? 'terminal' : 'preview')}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-mono text-sm font-semibold transition-all duration-300 text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 hover:bg-cyan-900/60 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
            >
              {viewMode === 'preview' ? (
                <>
                  <Code size={16} />
                  <span>[ &gt;_ View Technical Logs ]</span>
                </>
              ) : (
                <>
                  <Eye size={16} />
                  <span>[ 👀 View Visual Results ]</span>
                </>
              )}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
