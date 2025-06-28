
import React from 'react';
import { motion } from 'framer-motion';

const F1Navigation = () => {
  const buttons = [
    { label: 'TIMELINE', icon: '⏱️', color: 'from-red-500 to-red-700' },
    { label: 'DRIVERS', icon: '🏎️', color: 'from-blue-500 to-blue-700' },
    { label: 'CARS', icon: '🔧', color: 'from-green-500 to-green-700' },
    { label: 'TRACKS', icon: '🏁', color: 'from-yellow-500 to-yellow-700' },
    { label: 'TECH', icon: '⚙️', color: 'from-purple-500 to-purple-700' },
    { label: 'ABOUT', icon: '📊', color: 'from-orange-500 to-orange-700' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
      {buttons.map((button, index) => (
        <motion.button
          key={button.label}
          className={`relative group bg-gradient-to-br ${button.color} p-4 rounded-lg border-2 border-white/20 hover:border-white/60 transition-all duration-300 overflow-hidden`}
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,255,255,0.3)' }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {/* Button Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          
          <div className="relative z-10 text-center">
            <div className="text-2xl mb-2">{button.icon}</div>
            <div className="text-sm font-bold tracking-wider">{button.label}</div>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default F1Navigation;
