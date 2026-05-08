import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Cpu, Send, Loader2, Tag, CheckCircle2, Star, Zap, Sparkles, Users } from 'lucide-react';

const MOCK_PROFILES = [
  {
    id: 1,
    initials: 'SJ',
    name: 'Sarah Jenkins',
    email: 's.jenkins@research.institute',
    role: 'Senior AI Researcher',
    matchScore: 94,
    tags: ["NLP", "Scaling Laws", "Transformers", "Compute-Optimal"],
    toneTitle: "Academic & Highly Technical",
    toneDesc: "Focus on empirical metrics and architecture.",
    emailSubject: "Personalized Insights: Scaling Laws & Compute-Optimal Training",
    emailGreeting: "Hello Sarah,",
    emailIntro: "Based on your recent focus on LLM architecture and Scaling Laws, I've curated today's most critical developments in compute-optimal training.",
    synthesisTitle: "Core Synthesis: The Chinchilla Paradigm Shift",
    synthesisBody: "Recent empirical studies challenge the traditional parameter-heavy approach. The latest data indicates that training smaller models on significantly more high-quality tokens (up to 4x the previous standard) yields equivalent or superior zero-shot performance on MMLU benchmarks, while drastically reducing inference costs.",
    emailOutro: "Given your work as a Senior Researcher, this suggests a potential pivot in your next training run towards rigorous data curation rather than raw parameter scaling. I've attached direct links to the primary datasets below for your review.",
    themeColor: "text-neon-cyan",
    themeBg: "bg-neon-cyan",
    themeBorder: "border-neon-cyan",
    themeFrom: "from-neon-cyan/20",
    themeGlow: "shadow-[0_0_15px_rgba(34,211,238,0.15)]",
    themeShadow: "shadow-[0_0_40px_-10px_rgba(34,211,238,0.25)]"
  },
  {
    id: 2,
    initials: 'AM',
    name: 'Ahmed Mansour',
    email: 'ahmed.m@capital-invest.com',
    role: 'Investment Analyst',
    matchScore: 88,
    tags: ["Fintech", "Emerging Markets", "Fed Rates", "Macro"],
    toneTitle: "Executive Summary",
    toneDesc: "Bottom-line focused, highlighting market impacts and trends.",
    emailSubject: "Market Briefing: Fed Rates Impact on Emerging Fintech",
    emailGreeting: "Good morning Ahmed,",
    emailIntro: "Aligning with your tracking of Emerging Markets and Fed Rates, here is the synthesis of overnight policy shifts and their projected impact on the fintech sector.",
    synthesisTitle: "Macro Shift: Rate Policy Divergence",
    synthesisBody: "Central banks in key emerging markets are pre-emptively decoupling from Fed rate trajectories. Analysis of 12 regional markets indicates a 60% probability of localized easing, which historically accelerates fintech lending margins by 1.2-1.5x within a two-quarter window.",
    emailOutro: "From an investment perspective, this creates a compelling short-term alpha opportunity in Series B/C fintechs operating in these specific regions. Detailed projections are attached.",
    themeColor: "text-amber-400",
    themeBg: "bg-amber-400",
    themeBorder: "border-amber-400",
    themeFrom: "from-amber-400/20",
    themeGlow: "shadow-[0_0_15px_rgba(251,191,36,0.15)]",
    themeShadow: "shadow-[0_0_40px_-10px_rgba(251,191,36,0.25)]"
  },
  {
    id: 3,
    initials: 'JD',
    name: 'John Doe',
    email: 'john.doe@cloud-native.dev',
    role: 'Software Architect',
    matchScore: 91,
    tags: ["Rust", "Distributed Systems", "Cloud Native", "WASM"],
    toneTitle: "Engineering Focused",
    toneDesc: "Code-centric, emphasizing system design and performance.",
    emailSubject: "Tech Radar: Rust in Cloud Native & WASM Runtimes",
    emailGreeting: "Hi John,",
    emailIntro: "Tracking your interest in Rust and Distributed Systems, I've aggregated the latest architectural patterns emerging in cloud-native WebAssembly deployments.",
    synthesisTitle: "Architecture Evolution: WASM on Kubernetes",
    synthesisBody: "New orchestration layers are bypassing traditional containers. Benchmarks from recent production rollouts show Rust-compiled WASM modules achieving 10x faster cold starts and 40% lower memory footprints compared to standard Go microservices in similar distributed environments.",
    emailOutro: "As you architect the next-gen platform, evaluating these WASM runtimes could significantly reduce your compute overhead. Repository links for the mentioned frameworks are below.",
    themeColor: "text-emerald-400",
    themeBg: "bg-emerald-400",
    themeBorder: "border-emerald-400",
    themeFrom: "from-emerald-400/20",
    themeGlow: "shadow-[0_0_15px_rgba(52,211,153,0.15)]",
    themeShadow: "shadow-[0_0_40px_-10px_rgba(52,211,153,0.25)]"
  },
  {
    id: 4,
    initials: 'DL',
    name: 'Dr. Laila',
    email: 'laila@biotech-innovations.org',
    role: 'Biotech Lead',
    matchScore: 96,
    tags: ["Drug Discovery", "AlphaFold", "Genetics", "Proteomics"],
    toneTitle: "Scientific & Data-Driven",
    toneDesc: "Focus on methodologies, clinical relevance, and bioinformatics.",
    emailSubject: "Research Update: AlphaFold 3 & Accelerated Drug Discovery",
    emailGreeting: "Dear Dr. Laila,",
    emailIntro: "Knowing your focus on Genetics and Drug Discovery, I have compiled the most relevant breakthroughs in AI-driven structural biology from the past 48 hours.",
    synthesisTitle: "Methodology Breakthrough: Ligand Binding Prediction",
    synthesisBody: "The latest iterations of protein-folding models are demonstrating unprecedented accuracy in predicting non-protein molecule interactions. This effectively reduces the computational screening phase for novel drug candidates by an estimated 65%, with particularly high confidence scores in kinase inhibitors.",
    emailOutro: "This step-change in predictive accuracy could directly accelerate your team's current target validation pipeline. The supplementary data and docking models are available for download.",
    themeColor: "text-pink-400",
    themeBg: "bg-pink-400",
    themeBorder: "border-pink-400",
    themeFrom: "from-pink-400/20",
    themeGlow: "shadow-[0_0_15px_rgba(244,114,182,0.15)]",
    themeShadow: "shadow-[0_0_40px_-10px_rgba(244,114,182,0.25)]"
  }
];

const NewsletterPreview = () => {
  const [activeUser, setActiveUser] = useState(MOCK_PROFILES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleUserSelect = (user) => {
    if (user.id === activeUser.id) return;
    setActiveUser(user);
    setIsGenerating(false);
    setIsGenerated(false);
  };

  const handleGenerate = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setIsGenerated(false);
    
    // Simulate LLM generation time
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 2500);
  };

  return (
    <div className="flex-1 w-full h-full p-6 lg:p-10 overflow-y-auto">
      
      <div className="mb-8">
        <h1 className="text-4xl font-light text-white mb-2 tracking-tight">Stage 3: <span className={`font-bold transition-colors duration-500 ${activeUser.themeColor}`}>Personalization</span></h1>
        <p className="text-slate-400">LLM-driven email synthesis based on subscriber vector profiles.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 max-w-[1600px] w-full">
        
        {/* LEFT COLUMN: SUBSCRIBER LIST (col-span-3) */}
        <div className="xl:col-span-3 flex flex-col space-y-4">
          <div className="flex items-center space-x-3 mb-2 px-1">
            <Users size={20} className="text-slate-400" strokeWidth={1.5} />
            <h2 className="text-lg font-bold text-white tracking-wide">Subscriber List</h2>
          </div>
          
          <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar pb-4 max-h-[700px]">
            {MOCK_PROFILES.map((user) => {
              const isActive = user.id === activeUser.id;
              return (
                <button
                  key={user.id}
                  onClick={() => handleUserSelect(user)}
                  className={`relative w-full text-left p-4 rounded-xl border transition-all duration-300 group overflow-hidden
                    ${isActive 
                      ? `bg-slate-800/80 ${user.themeBorder} ${user.themeGlow} z-10` 
                      : 'bg-slate-900/40 border-white/5 hover:border-white/20 hover:bg-slate-800/50'
                    }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="active-user-highlight"
                      className={`absolute inset-0 opacity-10 bg-gradient-to-r ${user.themeFrom} to-transparent`}
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="relative flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-300
                      ${isActive ? `bg-gradient-to-br ${user.themeFrom} to-slate-900 ${user.themeBorder}` : 'bg-slate-800 border-white/10 group-hover:border-white/30'}`}
                    >
                      <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-400'}`}>{user.initials}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold truncate transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                        {user.name}
                      </h3>
                      <p className={`text-xs truncate ${isActive ? user.themeColor : 'text-slate-500'}`}>
                        {user.role}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* MIDDLE COLUMN: USER CONTEXT (INPUT) (col-span-4) */}
        <div className="xl:col-span-4 flex flex-col space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeUser.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 pointer-events-none"
              >
                {/* Ambient background glow matching user theme */}
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${activeUser.themeFrom} to-transparent blur-3xl rounded-full opacity-40 transition-all duration-700`}></div>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex items-center space-x-3 mb-6 relative">
              <div className="p-2 bg-slate-800/80 rounded-lg border border-white/5">
                <User size={20} className={activeUser.themeColor} strokeWidth={1.5} />
              </div>
              <h2 className="text-lg font-bold text-white tracking-wide">User Context</h2>
            </div>

            <div className="space-y-6 relative h-[450px]">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeUser.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Profile Info */}
                  <div className="flex items-start space-x-4">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${activeUser.themeFrom} to-slate-900 border border-white/10 flex items-center justify-center shrink-0 ${activeUser.themeGlow}`}>
                      <span className="text-xl font-bold text-white">{activeUser.initials}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{activeUser.name}</h3>
                      <p className={`text-sm font-medium ${activeUser.themeColor}`}>{activeUser.role}</p>
                      <div className="flex items-center space-x-1 mt-1.5 bg-slate-900/50 w-fit px-2 py-0.5 rounded-md border border-white/5">
                        <Star size={12} className="text-yellow-400 fill-yellow-400/20" strokeWidth={1.5} />
                        <span className="text-xs font-semibold text-slate-300">Match Score: {activeUser.matchScore}%</span>
                      </div>
                    </div>
                  </div>

                  <hr className="border-white/5" />

                  {/* Vector Tags */}
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Tag size={14} className="text-slate-400" strokeWidth={1.5} />
                      <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Vector Interest Tags</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeUser.tags.map((tag, i) => (
                        <span key={i} className={`text-xs px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-slate-300 hover:${activeUser.themeBorder} hover:${activeUser.themeColor} transition-colors cursor-default`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* LLM Tone Indicator */}
                  <div className={`bg-slate-900/50 p-4 rounded-xl border ${activeUser.themeBorder.replace('border-', 'border-').concat('/30')} flex items-start space-x-3 shadow-inner`}>
                    <Cpu size={18} className={`${activeUser.themeColor} shrink-0 mt-0.5`} strokeWidth={1.5} />
                    <div>
                      <h4 className={`text-xs font-semibold ${activeUser.themeColor} uppercase tracking-widest mb-1.5`}>
                        {activeUser.toneTitle}
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed">{activeUser.toneDesc}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Action Button */}
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden group
              ${isGenerating 
                ? `bg-slate-800 ${activeUser.themeColor} border ${activeUser.themeBorder.concat('/30')} ${activeUser.themeGlow} cursor-wait` 
                : `${activeUser.themeBg} text-slate-950 hover:opacity-90 hover:${activeUser.themeGlow.replace('0.15', '0.4')}`
              }`}
          >
            {/* Button Glow Effect on Hover */}
            {!isGenerating && (
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            )}
            
            <div className="relative flex items-center space-x-2">
              {isGenerating ? (
                <>
                  <Loader2 size={18} className="animate-spin" strokeWidth={2} />
                  <span>Synthesizing Email...</span>
                </>
              ) : (
                <>
                  <Zap size={18} strokeWidth={2} />
                  <span>Generate Unique Email</span>
                </>
              )}
            </div>
          </button>
        </div>

        {/* RIGHT COLUMN: GENERATED NEWSLETTER PREVIEW (OUTPUT) (col-span-5) */}
        <div className="xl:col-span-5 h-[650px] flex flex-col">
          <div className="flex items-center space-x-3 mb-4 px-2">
            <Mail size={20} className="text-slate-400" strokeWidth={1.5} />
            <h2 className="text-lg font-bold text-white tracking-wide">Output Preview</h2>
          </div>

          <div className={`flex-1 glass-panel rounded-2xl border transition-all duration-700 flex flex-col overflow-hidden relative bg-slate-900/60
            ${isGenerated 
              ? `${activeUser.themeBorder.replace('border-', 'border-').concat('/50')} ${activeUser.themeShadow}` 
              : 'border-white/10'
            }`}
          >
            {/* Webmail Header Mockup */}
            <div className="bg-slate-950/80 border-b border-white/5 p-4 xl:p-5 flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  </div>
                </div>
                <div className="text-xs text-slate-500 font-mono tracking-widest uppercase">Nexus AI Delivery System</div>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeUser.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1.5 bg-slate-900/50 p-3 rounded-lg border border-white/5"
                >
                  <div className="flex items-center text-sm">
                    <span className="w-16 text-slate-500">From:</span>
                    <span className="text-slate-300 font-medium">Nexus AI Daily Briefing &lt;ai@nexus.dev&gt;</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-16 text-slate-500">To:</span>
                    <span className="text-slate-300">{activeUser.name} &lt;{activeUser.email}&gt;</span>
                  </div>
                  <div className="flex items-center text-sm pt-1">
                    <span className="w-16 text-slate-500">Subject:</span>
                    <span className={`${activeUser.themeColor} font-semibold truncate`}>{activeUser.emailSubject}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Email Body */}
            <div className="flex-1 bg-slate-950/40 p-6 xl:p-8 overflow-y-auto relative custom-scrollbar">
              <AnimatePresence mode="wait">
                {!isGenerated && !isGenerating ? (
                  <motion.div 
                    key={`empty-${activeUser.id}`}
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-slate-500"
                  >
                    <Send size={48} className="mb-4 opacity-20" strokeWidth={1} />
                    <p className="font-medium tracking-wide">Awaiting Generation...</p>
                    <p className="text-sm mt-2 opacity-60 text-center max-w-xs">Click "Generate Unique Email" to synthesize content tailored for {activeUser.name}.</p>
                  </motion.div>
                ) : isGenerating ? (
                  <motion.div 
                    key={`generating-${activeUser.id}`}
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center space-y-6"
                  >
                    {/* Simulated LLM typing indicator */}
                    <div className="flex space-x-2">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          className={`w-3 h-3 ${activeUser.themeBg} rounded-full ${activeUser.themeGlow}`}
                        />
                      ))}
                    </div>
                    <div className={`${activeUser.themeColor} font-mono text-sm tracking-widest animate-pulse`}>
                      LLM SYNTHESIZING...
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`generated-${activeUser.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-slate-300 space-y-6 max-w-2xl mx-auto"
                  >
                    <p className="text-lg font-light text-white">{activeUser.emailGreeting}</p>
                    
                    <p className="leading-relaxed text-[15px]">
                      {activeUser.emailIntro}
                    </p>

                    {/* Stylized AI Summary Block */}
                    <div className={`bg-slate-900/80 border border-slate-700/50 rounded-xl p-5 xl:p-6 shadow-inner relative group hover:${activeUser.themeBorder.replace('border-', 'border-').concat('/50')} transition-colors`}>
                      <div className={`absolute -left-px top-6 bottom-6 w-1 ${activeUser.themeBg} opacity-60 rounded-r-md ${activeUser.themeGlow.replace('0.15', '0.5')}`}></div>
                      
                      <h4 className={`${activeUser.themeColor} font-bold mb-3 flex items-center space-x-2`}>
                        <Sparkles size={16} strokeWidth={2} className={activeUser.themeColor} />
                        <span>{activeUser.synthesisTitle}</span>
                      </h4>
                      
                      <p className="text-[15px] leading-relaxed mb-5 text-slate-300">
                        {activeUser.synthesisBody}
                      </p>
                      
                      <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-950/50 py-2 px-3 rounded-lg border border-white/5 w-fit">
                        <CheckCircle2 size={14} className={activeUser.themeColor} />
                        <span>Sources analyzed: 14+ specific to vector match</span>
                      </div>
                    </div>

                    <p className="leading-relaxed text-[15px]">
                      {activeUser.emailOutro}
                    </p>

                    <p className="text-[15px] pt-2">
                      Best regards,<br/>
                      <span className="font-semibold text-white">Nexus AI</span>
                    </p>

                    <div className="pt-8 mt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
                      <p className="text-slate-500 font-mono text-[11px] uppercase tracking-wider">
                        Generated autonomously by Nexus NLP Pipeline
                      </p>
                      <p className={`${activeUser.themeColor} font-mono text-[11px] bg-slate-900 px-2 py-1 rounded border ${activeUser.themeBorder.replace('border-', 'border-').concat('/30')}`}>
                        Vector Match: {activeUser.matchScore}%
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPreview;

