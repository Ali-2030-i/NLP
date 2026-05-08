import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ClusterGrid from './components/ClusterGrid';
import NewsletterPreview from './components/NewsletterPreview';
import PipelineControls from './components/PipelineControls';
import DataStreamBackground from './components/DataStreamBackground';

function App() {
  const [currentView, setCurrentView] = useState('clusters');

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-950 text-slate-200">
      <DataStreamBackground />
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="neural-grid opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-cyan/5 rounded-full blur-[100px] animate-neural-pulse pointer-events-none"></div>
      </div>

      {/* Main Layout */}
      <div className="flex w-full h-full relative z-10">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        {currentView === 'clusters' && <ClusterGrid />}
        {currentView === 'newsletter' && <NewsletterPreview />}
        {currentView === 'controls' && <PipelineControls />}
      </div>
    </div>
  );
}

export default App;
