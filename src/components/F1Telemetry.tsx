
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface F1TelemetryProps {
  speed: number;
}

const F1Telemetry: React.FC<F1TelemetryProps> = ({ speed }) => {
  const [time, setTime] = useState(new Date());
  const [rpm, setRpm] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate RPM based on speed
    setRpm(Math.min(speed * 25, 15000));
  }, [speed]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Top telemetry bar */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-zinc-950/90 to-transparent">
        <div className="flex justify-between items-center px-6 py-4 text-xs font-mono">
          {/* Left cluster */}
          <div className="flex space-x-8">
            <div className="text-green-400">
              <div className="text-zinc-500">ERS</div>
              <div>4.2 MJ</div>
            </div>
            <div className="text-blue-400">
              <div className="text-zinc-500">DRS</div>
              <div>AVAILABLE</div>
            </div>
            <div className="text-yellow-400">
              <div className="text-zinc-500">FUEL</div>
              <div>68.5 KG</div>
            </div>
          </div>

          {/* Center - Session info */}
          <div className="text-center">
            <div className="text-zinc-500">SESSION TIME</div>
            <div className="text-white text-base">{time.toLocaleTimeString()}</div>
          </div>

          {/* Right cluster */}
          <div className="flex space-x-8">
            <div className="text-red-400">
              <div className="text-zinc-500">BRAKE</div>
              <div>850°C</div>
            </div>
            <div className="text-orange-400">
              <div className="text-zinc-500">ENGINE</div>
              <div>102°C</div>
            </div>
          </div>
        </div>
      </div>

      {/* Speed and RPM display */}
      <div className="absolute bottom-6 right-6 bg-zinc-950/80 border border-zinc-800 backdrop-blur-sm">
        <div className="p-4 min-w-[200px]">
          <div className="text-center mb-4">
            <div className="text-zinc-500 text-xs font-mono mb-1">SPEED</div>
            <div className="text-3xl font-black text-red-400">
              {Math.round(speed)}
            </div>
            <div className="text-zinc-500 text-xs">KPH</div>
          </div>
          
          <div className="text-center">
            <div className="text-zinc-500 text-xs font-mono mb-1">RPM</div>
            <div className="text-xl font-black text-white">
              {Math.round(rpm).toLocaleString()}
            </div>
          </div>
          
          {/* RPM bar */}
          <div className="w-full h-1 bg-zinc-800 mt-3 relative overflow-hidden">
            <motion.div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
              animate={{ width: `${Math.min((rpm / 15000) * 100, 100)}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            />
          </div>
        </div>
      </div>

      {/* Corner frame elements */}
      <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-red-500"></div>
      <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-red-500"></div>
      <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-red-500"></div>
      <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-red-500"></div>
    </div>
  );
};

export default F1Telemetry;
