
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import F1Telemetry from '../components/F1Telemetry';
import F1Timeline from '../components/F1Timeline';
import F1DriverGrid from '../components/F1DriverGrid';
import F1LoadingSequence from '../components/F1LoadingSequence';

const Index = () => {
  const [speed, setSpeed] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setScrollY(scrollTop);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const speedValue = Math.min((scrollTop / maxScroll) * 350, 350);
      setSpeed(speedValue);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Realistic loading time for F1 systems
    setTimeout(() => setIsLoading(false), 2500);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return <F1LoadingSequence />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden relative">
      {/* Professional grid pattern background */}
      <div className="fixed inset-0 opacity-5" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }}></div>

      {/* F1 Telemetry Overlay */}
      <F1Telemetry speed={speed} />

      {/* Main Interface */}
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        {/* Hero Section - F1 Command Center */}
        <header className="relative h-screen flex items-center justify-center bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
          {/* Data streams background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"></div>
          </div>
          
          <div className="relative z-20 text-center max-w-6xl mx-auto px-6">
            {/* F1 Command Interface */}
            <div className="mb-8 font-mono text-xs text-red-400 tracking-widest">
              FORMULA 1 • TELEMETRY INTERFACE • ARCHIVE
            </div>
            
            <motion.h1 
              className="text-7xl md:text-9xl font-black mb-6 tracking-tighter"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">
                F1
              </span>
              <span className="text-white ml-4">DATA</span>
            </motion.h1>
            
            <div className="text-xl md:text-2xl text-zinc-400 mb-12 font-light tracking-wide">
              Real-time telemetry • Historical data • Performance analytics
            </div>
            
            {/* Command buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { label: 'TELEMETRY', status: 'ACTIVE' },
                { label: 'TIMELINE', status: 'READY' },
                { label: 'DRIVERS', status: 'READY' },
                { label: 'ANALYTICS', status: 'READY' }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="group relative bg-zinc-900/50 border border-zinc-800 hover:border-red-500/50 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  <div className="p-6 text-center">
                    <div className="text-xs text-zinc-500 mb-2 font-mono">{item.status}</div>
                    <div className="text-sm font-semibold tracking-wider">{item.label}</div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </header>

        {/* Timeline Section - Professional F1 Style */}
        <F1Timeline />

        {/* Driver Grid Section */}
        <F1DriverGrid />

        {/* Performance Analytics Section */}
        <section className="min-h-screen bg-zinc-950 border-t border-zinc-800">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <div className="text-red-400 font-mono text-sm tracking-widest mb-4">PERFORMANCE DATA</div>
              <h2 className="text-4xl md:text-6xl font-black mb-6">ANALYTICS</h2>
              <div className="text-zinc-400 text-lg">Real-time performance metrics and historical analysis</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { metric: 'LAP TIME', value: '1:14.260', change: '-0.085' },
                { metric: 'TOP SPEED', value: '324 KPH', change: '+2.1' },
                { metric: 'SECTOR 1', value: '18.542', change: '-0.032' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.metric}
                  className="bg-zinc-900/30 border border-zinc-800 p-8 group hover:border-red-500/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-xs text-zinc-500 font-mono mb-2">{stat.metric}</div>
                  <div className="text-3xl font-black text-white mb-2">{stat.value}</div>
                  <div className="text-green-400 text-sm font-mono">{stat.change}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default Index;
