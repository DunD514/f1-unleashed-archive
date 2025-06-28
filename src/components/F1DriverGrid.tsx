
import React from 'react';
import { motion } from 'framer-motion';

const F1DriverGrid = () => {
  const drivers = [
    {
      name: 'Lewis Hamilton',
      team: 'Mercedes-AMG Petronas',
      number: '44',
      championships: 7,
      wins: 103,
      podiums: 197,
      color: 'from-cyan-400 to-teal-500'
    },
    {
      name: 'Max Verstappen',
      team: 'Red Bull Racing',
      number: '1',
      championships: 3,
      wins: 54,
      podiums: 89,
      color: 'from-blue-500 to-blue-700'
    },
    {
      name: 'Sebastian Vettel',
      team: 'Ferrari (Former)',
      number: '5',
      championships: 4,
      wins: 53,
      podiums: 122,
      color: 'from-red-500 to-red-700'
    },
    {
      name: 'Fernando Alonso',
      team: 'Aston Martin',
      number: '14',
      championships: 2,
      wins: 32,
      podiums: 98,
      color: 'from-green-500 to-green-700'
    },
    {
      name: 'Charles Leclerc',
      team: 'Scuderia Ferrari',
      number: '16',
      championships: 0,
      wins: 5,
      podiums: 26,
      color: 'from-red-400 to-red-600'
    },
    {
      name: 'Lando Norris',
      team: 'McLaren Racing',
      number: '4',
      championships: 0,
      wins: 1,
      podiums: 12,
      color: 'from-orange-400 to-orange-600'
    }
  ];

  return (
    <section className="min-h-screen bg-zinc-900 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="text-red-400 font-mono text-sm tracking-widest mb-4">DRIVER DATABASE</div>
          <h2 className="text-4xl md:text-6xl font-black mb-6">PILOTS</h2>
          <div className="text-zinc-400 text-lg">Elite drivers and their performance metrics</div>
        </div>

        {/* Driver grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {drivers.map((driver, index) => (
            <motion.div
              key={driver.name}
              className="bg-zinc-950/50 border border-zinc-800 hover:border-red-500/30 transition-all duration-300 group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Driver number header */}
              <div className={`h-2 bg-gradient-to-r ${driver.color}`}></div>
              
              <div className="p-8">
                {/* Driver info */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`text-4xl font-black bg-gradient-to-r ${driver.color} bg-clip-text text-transparent`}>
                    #{driver.number}
                  </div>
                  <div className="text-xs font-mono text-zinc-500">
                    {driver.championships} WDC
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                  {driver.name}
                </h3>
                
                <div className="text-zinc-400 text-sm mb-6">
                  {driver.team}
                </div>
                
                {/* Statistics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-black text-white">{driver.wins}</div>
                    <div className="text-xs text-zinc-500 font-mono">WINS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-white">{driver.podiums}</div>
                    <div className="text-xs text-zinc-500 font-mono">PODIUMS</div>
                  </div>
                </div>
                
                {/* Performance indicator */}
                <div className="mt-6 h-1 bg-zinc-800 relative overflow-hidden">
                  <motion.div 
                    className={`absolute left-0 top-0 h-full bg-gradient-to-r ${driver.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.min((driver.wins / 103) * 100, 100)}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default F1DriverGrid;
