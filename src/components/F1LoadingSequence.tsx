
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const F1LoadingSequence = () => {
  const [progress, setProgress] = useState(0);
  const [currentSystem, setCurrentSystem] = useState('');

  const systems = [
    'Initializing telemetry systems...',
    'Connecting to data stream...',
    'Calibrating sensors...',
    'Loading historical data...',
    'Systems ready'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        
        // Update system message based on progress
        if (newProgress <= 20) setCurrentSystem(systems[0]);
        else if (newProgress <= 40) setCurrentSystem(systems[1]);
        else if (newProgress <= 60) setCurrentSystem(systems[2]);
        else if (newProgress <= 80) setCurrentSystem(systems[3]);
        else setCurrentSystem(systems[4]);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-zinc-950 flex items-center justify-center z-50">
      <div className="text-center max-w-md mx-auto px-6">
        {/* F1 Logo */}
        <motion.div 
          className="mb-8"
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="text-6xl font-black text-white mb-2">F1</div>
          <div className="text-red-500 text-sm font-mono tracking-widest">TELEMETRY</div>
        </motion.div>

        {/* System Status */}
        <div className="mb-8">
          <div className="text-zinc-400 text-sm font-mono mb-4">{currentSystem}</div>
          
          {/* Professional progress bar */}
          <div className="w-full h-1 bg-zinc-800 relative overflow-hidden">
            <motion.div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-500 to-red-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-zinc-500 mt-2 font-mono">
            <span>SYSTEM STATUS</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Data stream simulation */}
        <div className="grid grid-cols-3 gap-2 opacity-30">
          {Array.from({ length: 9 }).map((_, i) => (
            <motion.div
              key={i}
              className="h-1 bg-zinc-700"
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default F1LoadingSequence;
