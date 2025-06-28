
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const F1LoadingBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        {/* F1 Logo Animation */}
        <motion.div 
          className="text-6xl mb-8"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 360, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🏎️
        </motion.div>

        {/* Loading Text */}
        <h1 className="text-4xl font-bold text-white mb-8 bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent">
          INITIALIZING F1 SYSTEMS
        </h1>

        {/* Progress Bar */}
        <div className="w-96 h-4 bg-gray-800 rounded-full overflow-hidden border-2 border-red-500/30">
          <motion.div 
            className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Progress Text */}
        <div className="mt-4 text-white font-mono">
          {progress}% COMPLETE
        </div>

        {/* Loading Messages */}
        <motion.div 
          className="mt-4 text-gray-400 text-sm"
          key={Math.floor(progress / 25)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {progress < 25 && "Loading engine systems..."}
          {progress >= 25 && progress < 50 && "Initializing telemetry..."}
          {progress >= 50 && progress < 75 && "Calibrating sensors..."}
          {progress >= 75 && "Preparing for launch..."}
        </motion.div>
      </div>
    </div>
  );
};

export default F1LoadingBar;
