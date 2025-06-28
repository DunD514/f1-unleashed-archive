
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Car, User, Zap, Trophy, ArrowRight, X } from 'lucide-react';

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
    },
    {
      id: '7',
      circuit: 'Nürburgring',
      time: '1:11.526',
      driver: 'Niki Lauda',
      car: 'Ferrari 312T2',
      year: 1976,
      engine: 'Ferrari V12',
      topSpeed: '310 km/h',
      context: 'Heroic qualifying performance just weeks after his near-fatal crash. Lauda\'s courage and determination exemplified the spirit of F1.',
      carDetails: {
        weight: '575 kg',
        power: '480 hp',
        downforce: 'Basic wings',
        technology: ['V12 engine', 'Slick tires', 'Manual gearbox', 'Steel chassis']
      },
      driverBackground: 'Three-time world champion known for his analytical approach and incredible comeback from his 1976 crash. Nicknamed "The Computer".'
    },
    {
      id: '8',
      circuit: 'Adelaide',
      time: '1:16.665',
      driver: 'Nigel Mansell',
      car: 'Williams FW14B',
      year: 1992,
      engine: 'Renault V10',
      topSpeed: '330 km/h',
      context: 'Dominant performance in the championship-winning Williams. The FW14B was one of the most technologically advanced cars of its era.',
      carDetails: {
        weight: '505 kg',
        power: '700 hp',
        downforce: 'Active suspension',
        technology: ['V10 engine', 'Active suspension', 'Traction control', 'Advanced electronics']
      },
      driverBackground: 'British champion known for his aggressive driving style and never-give-up attitude. Won the 1992 championship in dominant fashion.'
    },
    {
      id: '9',
      circuit: 'Imola',
      time: '1:14.548',
      driver: 'Alain Prost',
      car: 'McLaren MP4/2B',
      year: 1985,
      engine: 'TAG Porsche V6',
      topSpeed: '305 km/h',
      context: 'Precise and calculated lap showcasing Prost\'s smooth driving style. His methodical approach earned him the nickname "The Professor".',
      carDetails: {
        weight: '540 kg',
        power: '750 hp',
        downforce: 'Turbo efficiency',
        technology: ['Turbo V6', 'Carbon fiber', 'Ground effect', 'Advanced fuel management']
      },
      driverBackground: 'Four-time world champion known for his smooth, calculated approach and strategic thinking. Master of tire and fuel management.'
    },
    {
      id: '10',
      circuit: 'Hockenheim',
      time: '1:32.238',
      driver: 'Jim Clark',
      car: 'Lotus 49',
      year: 1967,
      engine: 'Ford Cosworth DFV',
      topSpeed: '280 km/h',
      context: 'Legendary performance from one of F1\'s greatest drivers. Clark\'s natural talent and car control were unmatched in his era.',
      carDetails: {
        weight: '500 kg',
        power: '400 hp',
        downforce: 'Minimal wings',
        technology: ['V8 engine', 'Monocoque chassis', 'Basic aerodynamics', 'Manual everything']
      },
      driverBackground: 'Two-time world champion considered by many as the greatest natural driver ever. Known for his smoothness and incredible car control.'
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

      {/* Enhanced Comparison Modal */}
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
                <h2 className="text-2xl font-bold text-white">Comprehensive Lap Comparison</h2>
                <button 
                  onClick={() => setShowComparison(false)}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Comparison Content */}
              <div className="p-8">
                {/* Quick Stats Comparison */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Performance Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedLaps.map((lap) => (
                      <div key={lap.id} className="bg-zinc-800/50 border border-zinc-700 p-4 text-center">
                        <div className="text-2xl font-black text-red-400 mb-2">{lap.time}</div>
                        <div className="text-white font-bold">{lap.circuit}</div>
                        <div className="text-zinc-400 text-sm">{lap.year}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Comparison */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {selectedLaps.map((lap, index) => (
                    <div key={lap.id} className="space-y-6">
                      {/* Lap Header */}
                      <div className="text-center border-b border-zinc-700 pb-4">
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
                        <p className="text-zinc-300 text-sm leading-relaxed">{lap.driverBackground}</p>
                      </div>

                      {/* Car Specifications */}
                      <div className="bg-zinc-800/50 border border-zinc-700 p-4">
                        <h4 className="text-white font-bold mb-3 flex items-center">
                          <Car className="mr-2 text-red-400" size={16} />
                          {lap.car}
                        </h4>
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-zinc-400">Engine:</div>
                            <div className="text-white">{lap.engine}</div>
                            <div className="text-zinc-400">Weight:</div>
                            <div className="text-white">{lap.carDetails.weight}</div>
                            <div className="text-zinc-400">Power:</div>
                            <div className="text-white">{lap.carDetails.power}</div>
                            <div className="text-zinc-400">Top Speed:</div>
                            <div className="text-white">{lap.topSpeed}</div>
                          </div>
                        </div>
                      </div>

                      {/* Technology */}
                      <div className="bg-zinc-800/50 border border-zinc-700 p-4">
                        <h4 className="text-white font-bold mb-3">Key Technology</h4>
                        <div className="space-y-2">
                          {lap.carDetails.technology.map((tech, techIndex) => (
                            <div key={techIndex} className="text-xs text-zinc-300 font-mono bg-zinc-700/50 px-2 py-1 rounded">
                              {tech}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Context */}
                      <div className="bg-zinc-800/50 border border-zinc-700 p-4">
                        <h4 className="text-white font-bold mb-2">Historical Context</h4>
                        <p className="text-zinc-300 text-sm leading-relaxed">{lap.context}</p>
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
