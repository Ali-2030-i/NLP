import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import ClusterCard from './ClusterCard';
import ClusterDetailDrawer from './ClusterDetailDrawer';

const mockClusters = [
  {
    id: 1,
    title: "LLM Scaling Laws",
    icon: "BrainCircuit",
    keywords: ["Transformer", "Parameter", "Compute"],
    confidence: 94,
    summary: "Recent papers indicate a shift in compute-optimal training frontiers, suggesting smaller models trained on significantly more high-quality tokens can match larger model performance."
  },
  {
    id: 2,
    title: "Generative AI in Healthcare",
    icon: "Fingerprint",
    keywords: ["Clinical", "FDA", "Discovery"],
    confidence: 88,
    summary: "New FDA guidelines are paving the way for generative models in drug discovery pipelines, specifically focusing on protein folding and molecule generation with high validation rates."
  },
  {
    id: 3,
    title: "Fed Rate Strategies",
    icon: "TrendingUp",
    keywords: ["Inflation", "Powell", "Equities"],
    confidence: 91,
    summary: "Market sentiment analysis from recent FOMC minutes shows a 75% probability of a rate pause, driving a rotation into tech equities and adjusting inflation expectations."
  }
];

const ClusterGrid = () => {
  const containerRef = useRef(null);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Global mouse values for the grid container
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleExploreClick = (cluster) => {
    setSelectedCluster(cluster);
    setIsDrawerOpen(true);
  };

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <div 
      className="flex-1 h-full p-10 relative overflow-y-auto overflow-x-hidden"
      onMouseMove={handleMouseMove}
      ref={containerRef}
      style={{ perspective: 1200 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* View Header */}
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-light text-white mb-2 tracking-tight">Active <span className="font-bold text-neon-cyan">Clusters</span></h1>
            <p className="text-slate-400">Real-time semantic groupings from ingested newsletters</p>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 rounded-lg bg-slate-900 border border-white/10 text-sm text-slate-300 hover:text-white hover:border-neon-cyan/50 transition-colors">
              Filter
            </button>
            <button className="px-4 py-2 rounded-lg bg-neon-cyan/10 border border-neon-cyan/50 text-sm text-neon-cyan hover:bg-neon-cyan/20 transition-colors">
              Export View
            </button>
          </div>
        </div>

        {/* 3D Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockClusters.map((cluster, i) => (
            <motion.div
              key={cluster.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <ClusterCard 
                data={cluster} 
                mouseX={mouseX} 
                mouseY={mouseY} 
                onExploreClick={() => handleExploreClick(cluster)}
              />
            </motion.div>
          ))}
        </div>
      </div>
      <ClusterDetailDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        clusterData={selectedCluster} 
      />
    </div>
  );
};

export default ClusterGrid;
