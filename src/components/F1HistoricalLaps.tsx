
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Car, User, Zap, Trophy, ArrowRight } from 'lucide-react';

interface LapRecord {
  id: string;
  circuit: string;
  time: string;
  driver: string;
  car: string;
  year: number;
  engine: string;
  topSpeed: string;
  context: string;
  carDetails: {
    weight: string;
    power: string;
    downforce: string;
    technology: string[];
  };
  driverBackground: string;
}

const F1HistoricalLaps = () => {
  const [selectedLaps, setSelectedLaps] = useState<LapRecord[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const historicalLaps: LapRecord[] = [
    {
      id: '1',
      circuit: 'Monaco Grand Prix',
      time: '1:10.166',
      driver: 'Ayrton Senna',
      car: 'McLaren MP4/4',
      year: 1988,
      engine: 'Honda V6 Turbo',
      topSpeed: '290 km/h',
      context: 'Senna\'s legendary qualifying lap in wet conditions, 1.4 seconds faster than anyone else. Considered one of the greatest laps in F1 history.',
      carDetails: {
        weight: '540 kg',
        power: '650+ hp',
        downforce: 'Ground effect',
        technology: ['Turbo boost', 'Carbon fiber', 'Active suspension', 'Semi-automatic gearbox']
      },
      driverBackground: 'Brazilian legend known for his exceptional wet weather driving and qualifying prowess. Three-time world champion with unmatched natural talent.'
    },
    {
      id: '2',
      circuit: 'Spa-Francorchamps',
      time: '1:41.252',
      driver: 'Lewis Hamilton',
      car: 'Mercedes W11',
      year: 2020,
      engine: 'Mercedes V6 Hybrid',
      topSpeed: '342 km/h',
      context: 'Dominant pole position lap during Mercedes\' most successful season. The W11 was considered one of the greatest F1 cars ever built.',
      carDetails: {
        weight: '746 kg',
        power: '1000+ hp',
        downforce: 'Advanced aerodynamics',
        technology: ['Hybrid power unit', 'ERS systems', 'DRS', 'Advanced telemetry']
      },
      driverBackground: 'Seven-time world champion and one of the greatest drivers in F1 history. Known for his racecraft and ability to perform under pressure.'
    },
    {
      id: '3',
      circuit: 'Silverstone',
      time: '1:24.303',
      driver: 'Max Verstappen',
      car: 'Red Bull RB19',
      year: 2023,
      engine: 'Honda RBPT V6',
      topSpeed: '338 km/h',
      context: 'Record-breaking lap during Red Bull\'s dominant 2023 season. The RB19 was virtually unbeatable throughout the year.',
      carDetails: {
        weight: '798 kg',
        power: '1000+ hp',
        downforce: 'Ground effect return',
        technology: ['Hybrid V6', 'Advanced floor', 'DRS', 'Energy recovery']
      },
      driverBackground: 'Current three-time world champion from Netherlands. Known for aggressive racing style and exceptional car control in all conditions.'
    },
    {
      id: '4',
      circuit: 'Monza',
      time: '1:18.887',
      driver: 'Michael Schumacher',
      car: 'Ferrari F2004',
      year: 2004,
      engine: 'Ferrari V10',
      topSpeed: '362 km/h',
      context: 'Peak performance lap during Ferrari\'s dominant era. The F2004 was one of the most successful F1 cars, winning 15 out of 18 races.',
      carDetails: {
        weight: '605 kg',
        power: '900+ hp',
        downforce: 'Advanced wings',
        technology: ['V10 engine', 'Launch control', 'Traction control', 'Carbon brakes']
      },
      driverBackground: 'Seven-time world champion and Ferrari legend. Known for his meticulous approach and ability to extract maximum performance.'
    },
    {
      id: '5',
      circuit: 'Interlagos',
      time: '1:07.281',
      driver: 'Sebastian Vettel',
      car: 'Red Bull RB19',
      year: 2011,
      engine: 'Renault V8',
      topSpeed: '314 km/h',
      context: 'Masterful qualifying lap during Vettel\'s championship-winning season. Red Bull\'s aerodynamic excellence was on full display.',
      carDetails: {
        weight: '640 kg',
        power: '750+ hp',
        downforce: 'Blown diffuser',
        technology: ['V8 engine', 'KERS', 'F-duct', 'Advanced aerodynamics']
      },
      driverBackground: 'Four-time world champion known for his precision and strategic racecraft. Dominated the early 2010s with Red Bull Racing.'
    },
    {
      id: '6',
      circuit: 'Suzuka',
      time: '1:27.319',
      driver: 'Fernando Alonso',
      car: 'Ferrari F138',
      year: 2013,
      engine: 'Ferrari V8',
      topSpeed: '325 km/h',
      context: 'Brilliant lap showcasing Alonso\'s ability to overdrive an inferior car. Despite Ferrari\'s struggles, Alonso consistently extracted maximum performance.',
      carDetails: {
        weight: '642 kg',
        power: '740+ hp',
        downforce: 'Conventional wings',
        technology: ['V8 engine', 'KERS', 'DRS', 'Advanced electronics']
      },
      driverBackground: 'Two-time world champion known for his adaptability and ability to maximize any car\'s potential. Considered one of the most complete drivers ever.'
    }
  ];

  const toggleLapSelection = (lap: LapRecord) => {
    setSelectedLaps(prev => {
      const isSelected = prev.find(l => l.id === lap.id);
      if (isSelected) {
        return prev.filter(l => l.id !== lap.id);
      } else if (prev.length < 3) {
        return [...prev, lap];
      }
      return prev;
    });
  };

  const startComparison = () => {
    if (selectedLaps.length >= 2) {
      setShowComparison(true);
    }
  };

  return (
    <>
      <section className="min-h-screen bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="text-red-400 font-mono text-sm tracking-widest mb-4">PERFORMANCE DATA</div>
            <h2 className="text-4xl md:text-6xl font-black mb-6">HISTORICAL LAPS</h2>
            <div className="text-zinc-400 text-lg">Legendary qualifying laps and their stories</div>
          </div>

          {/* Comparison Controls */}
          <div className="bg-zinc-900/50 border border-zinc-800 p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Compare Laps</h3>
                <div className="text-zinc-400 text-sm">
                  Select 2-3 laps to compare performance, cars, and drivers
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-zinc-400">
                  {selectedLaps.length}/3 selected
                </div>
                <button
                  onClick={startComparison}
                  disabled={selectedLaps.length < 2}
                  className={`px-6 py-2 border font-mono text-sm transition-all ${
                    selectedLaps.length >= 2
                      ? 'border-red-500 text-red-400 hover:bg-red-500/10'
                      : 'border-zinc-700 text-zinc-600 cursor-not-allowed'
                  }`}
                >
                  COMPARE →
                </button>
              </div>
            </div>
          </div>

          {/* Laps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {historicalLaps.map((lap, index) => {
              const isSelected = selectedLaps.find(l => l.id === lap.id);
              return (
                <motion.div
                  key={lap.id}
                  className={`bg-zinc-900/30 border transition-all duration-300 cursor-pointer ${
                    isSelected 
                      ? 'border-red-500 bg-red-500/5' 
                      : 'border-zinc-800 hover:border-red-500/30'
                  } group`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => toggleLapSelection(lap)}
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-black text-red-400">{lap.time}</div>
                      <div className="text-xs font-mono text-zinc-500">{lap.year}</div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-2">{lap.circuit}</h3>
                    
                    {/* Driver & Car */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <User className="mr-2 text-zinc-500" size={16} />
                        <span className="text-zinc-300">{lap.driver}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Car className="mr-2 text-zinc-500" size={16} />
                        <span className="text-zinc-300">{lap.car}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Zap className="mr-2 text-zinc-500" size={16} />
                        <span className="text-zinc-300">{lap.topSpeed}</span>
                      </div>
                    </div>
                    
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                      {lap.context.substring(0, 120)}...
                    </p>

                    <div className="text-xs text-red-400 font-mono">
                      {isSelected ? 'SELECTED ✓' : 'CLICK TO SELECT'}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Modal */}
      <AnimatePresence>
        {showComparison && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowComparison(false)}
          >
            <motion.div
              className="bg-zinc-900 border border-zinc-800 max-w-7xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-zinc-800">
                <h2 className="text-2xl font-bold text-white">Lap Comparison</h2>
                <button 
                  onClick={() => setShowComparison(false)}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Comparison Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {selectedLaps.map((lap, index) => (
                    <div key={lap.id} className="space-y-6">
                      {/* Lap Header */}
                      <div className="text-center">
                        <div className="text-3xl font-black text-red-400 mb-2">{lap.time}</div>
                        <h3 className="text-xl font-bold text-white">{lap.circuit}</h3>
                        <div className="text-zinc-400">{lap.year}</div>
                      </div>

                      {/* Driver Info */}
                      <div className="bg-zinc-800/50 border border-zinc-700 p-4">
                        <h4 className="text-white font-bold mb-2 flex items-center">
                          <User className="mr-2 text-red-400" size={16} />
                          {lap.driver}
                        </h4>
                        <p className="text-zinc-300 text-sm">{lap.driverBackground}</p>
                      </div>

                      {/* Car Details */}
                      <div className="bg-zinc-800/50 border border-zinc-700 p-4">
                        <h4 className="text-white font-bold mb-2 flex items-center">
                          <Car className="mr-2 text-red-400" size={16} />
                          {lap.car}
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-zinc-400">Weight:</span>
                            <span className="text-white">{lap.carDetails.weight}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-400">Power:</span>
                            <span className="text-white">{lap.carDetails.power}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-400">Top Speed:</span>
                            <span className="text-white">{lap.topSpeed}</span>
                          </div>
                        </div>
                      </div>

                      {/* Technology */}
                      <div className="bg-zinc-800/50 border border-zinc-700 p-4">
                        <h4 className="text-white font-bold mb-2">Technology</h4>
                        <div className="space-y-1">
                          {lap.carDetails.technology.map((tech, techIndex) => (
                            <div key={techIndex} className="text-xs text-zinc-300 font-mono">
                              • {tech}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default F1HistoricalLaps;
