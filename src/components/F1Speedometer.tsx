
import React from 'react';
import { motion } from 'framer-motion';

interface F1SpeedometerProps {
  speed: number;
}

const F1Speedometer: React.FC<F1SpeedometerProps> = ({ speed }) => {
  const normalizedSpeed = Math.min(speed / 350, 1); // Normalize to 0-1
  const rotation = normalizedSpeed * 270 - 135; // -135 to 135 degrees

  return (
    <div className="relative w-32 h-32">
      {/* Outer Ring */}
      <div className="absolute inset-0 rounded-full border-4 border-red-500/30 bg-black/50 backdrop-blur-sm">
        {/* Speed Marks */}
        {[0, 50, 100, 150, 200, 250, 300, 350].map((mark, index) => {
          const angle = (index * 270) / 7 - 135;
          return (
            <div
              key={mark}
              className="absolute w-1 h-4 bg-white/60 origin-bottom"
              style={{
                top: '10px',
                left: '50%',
                transform: `translateX(-50%) rotate(${angle}deg)`,
                transformOrigin: '50% 54px'
              }}
            />
          );
        })}
      </div>

      {/* Needle */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: rotation }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <div className="w-1 h-12 bg-red-500 origin-bottom rounded-full shadow-lg shadow-red-500/50" />
      </motion.div>

      {/* Center Hub */}
      <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full border-2 border-white shadow-lg" />

      {/* Digital Display */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-xs font-mono text-red-400 border border-red-500/30">
        {Math.round(speed)} KM/H
      </div>
    </div>
  );
};

export default F1Speedometer;
