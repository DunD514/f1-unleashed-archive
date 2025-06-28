
import React from 'react';
import { motion } from 'framer-motion';

const F1Timeline = () => {
  const timelineData = [
    {
      year: '1950',
      title: 'Championship Genesis',
      description: 'First Formula 1 World Championship at Silverstone',
      stats: { races: 7, drivers: 22 }
    },
    {
      year: '1976',
      title: 'Hunt vs Lauda',
      description: 'The legendary rivalry that defined an era',
      stats: { races: 16, drivers: 85 }
    },
    {
      year: '1988',
      title: 'Senna vs Prost',
      description: 'McLaren dominance with the ultimate rivalry',
      stats: { races: 16, drivers: 42 }
    },
    {
      year: '2000',
      title: 'Schumacher Era',
      description: 'Ferrari returns to championship glory',
      stats: { races: 17, drivers: 44 }
    },
    {
      year: '2020',
      title: 'Hamilton Supremacy',
      description: 'Seventh championship equals Schumacher',
      stats: { races: 17, drivers: 40 }
    }
  ];

  return (
    <section className="min-h-screen bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="text-red-400 font-mono text-sm tracking-widest mb-4">HISTORICAL DATA</div>
          <h2 className="text-4xl md:text-6xl font-black mb-6">TIMELINE</h2>
          <div className="text-zinc-400 text-lg">Decades of Formula 1 evolution and legendary moments</div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-red-500 via-zinc-600 to-red-500 transform md:-translate-x-1/2"></div>
          
          {timelineData.map((event, index) => (
            <motion.div
              key={event.year}
              className={`relative mb-16 ${index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-8'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Timeline marker */}
              <div className={`absolute w-4 h-4 bg-red-500 border-4 border-zinc-950 rounded-full ${
                index % 2 === 0 
                  ? 'left-2 md:right-0 md:left-auto md:-mr-2' 
                  : 'left-2 md:left-0 md:-ml-2'
              } top-6 z-10`}></div>
              
              {/* Content card */}
              <div className="ml-12 md:ml-0 bg-zinc-900/30 border border-zinc-800 hover:border-red-500/30 transition-all duration-300 group">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl font-black text-red-400">{event.year}</div>
                    <div className="flex space-x-4 text-xs font-mono text-zinc-500">
                      <span>{event.stats.races} RACES</span>
                      <span>{event.stats.drivers} DRIVERS</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                    {event.title}
                  </h3>
                  
                  <p className="text-zinc-400 leading-relaxed">
                    {event.description}
                  </p>
                </div>
                
                {/* Data stream effect */}
                <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default F1Timeline;
