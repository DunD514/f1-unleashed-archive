
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface F1HUDProps {
  speed: number;
}

const F1HUD: React.FC<F1HUDProps> = ({ speed }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Top HUD Bar */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex justify-between items-center h-full px-6 text-white">
          {/* Left Side - Status */}
          <div className="flex items-center space-x-6">
            <div className="text-green-400 font-mono text-sm">
              STATUS: ONLINE
            </div>
            <div className="text-blue-400 font-mono text-sm">
              DRS: AVAILABLE
            </div>
          </div>

          {/* Center - Time */}
          <div className="text-center">
            <div className="text-white font-mono text-lg">
              {time.toLocaleTimeString()}
            </div>
          </div>

          {/* Right Side - Telemetry */}
          <div className="flex items-center space-x-6">
            <div className="text-red-400 font-mono text-sm">
              TEMP: 98°C
            </div>
            <div className="text-yellow-400 font-mono text-sm">
              FUEL: 85%
            </div>
          </div>
        </div>
      </div>

      {/* Side Panels */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-20 bg-gradient-to-r from-black/60 to-transparent">
        <div className="h-full flex flex-col justify-center items-center space-y-4 text-white/60">
          <div className="w-2 h-8 bg-red-500 rounded"></div>
          <div className="w-2 h-8 bg-yellow-500 rounded"></div>
          <div className="w-2 h-8 bg-green-500 rounded"></div>
        </div>
      </div>

      <div className="absolute right-0 top-1/4 bottom-1/4 w-20 bg-gradient-to-l from-black/60 to-transparent">
        <div className="h-full flex flex-col justify-center items-center space-y-4 text-white/60">
          <div className="w-2 h-8 bg-blue-500 rounded"></div>
          <div className="w-2 h-8 bg-purple-500 rounded"></div>
          <div className="w-2 h-8 bg-orange-500 rounded"></div>
        </div>
      </div>

      {/* Corner Indicators */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-red-500"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-red-500"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-red-500"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-red-500"></div>
    </div>
  );
};

export default F1HUD;
