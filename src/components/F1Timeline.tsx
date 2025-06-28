import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Car, Cpu, Image, Video, Loader2 } from 'lucide-react';
import { fetchAdditionalInfo } from '../services/geminiService';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  stats: { races: number; drivers: number };
  details: {
    cars: string[];
    keyPeople: string[];
    technology: string[];
    context: string;
  };
}

const F1Timeline = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [mediaContent, setMediaContent] = useState<{
    images: string[];
    videos: string[];
  }>({ images: [], videos: [] });

  const timelineData: TimelineEvent[] = [
    {
      year: '1950',
      title: 'Championship Genesis',
      description: 'First Formula 1 World Championship at Silverstone',
      stats: { races: 7, drivers: 22 },
      details: {
        cars: ['Alfa Romeo 158', 'Ferrari 125', 'Maserati 4CLT/48', 'ERA E-type'],
        keyPeople: ['Giuseppe Farina (Champion)', 'Juan Manuel Fangio', 'Enzo Ferrari', 'Alfredo Ascari'],
        technology: ['Front-mounted engines', 'Supercharged 1.5L engines', 'Wire-spoke wheels', 'Minimal aerodynamics'],
        context: 'The inaugural season established F1 as the premier motorsport championship. Giuseppe Farina became the first World Champion driving for Alfa Romeo, which dominated with their pre-war 158 "Alfetta" design. The championship featured mostly European circuits with minimal safety equipment.'
      }
    },
    {
      year: '1976',
      title: 'Hunt vs Lauda',
      description: 'The legendary rivalry that defined an era',
      stats: { races: 16, drivers: 85 },
      details: {
        cars: ['McLaren M23', 'Ferrari 312T2', 'Tyrrell P34 (6-wheel)', 'Lotus 77'],
        keyPeople: ['James Hunt', 'Niki Lauda', 'Emerson Fittipaldi', 'Mario Andretti'],
        technology: ['Ground effect aerodynamics', 'Slick tires', 'Cosworth DFV engines', 'Carbon fiber components'],
        context: 'The most dramatic championship battle in F1 history. Niki Lauda\'s near-fatal crash at Nürburgring and miraculous return, coupled with James Hunt\'s championship victory by just one point, created the ultimate sporting drama that defined 1970s Formula 1.'
      }
    },
    {
      year: '1988',
      title: 'Senna vs Prost',
      description: 'McLaren dominance with the ultimate rivalry',
      stats: { races: 16, drivers: 42 },
      details: {
        cars: ['McLaren MP4/4', 'Ferrari F1-87/88C', 'Williams FW12', 'Benetton B188'],
        keyPeople: ['Ayrton Senna', 'Alain Prost', 'Ron Dennis', 'Honda Engineers'],
        technology: ['Turbocharged Honda engines', 'Active suspension', 'Carbon fiber monocoque', 'Advanced telemetry'],
        context: 'McLaren achieved the most dominant season in F1 history, winning 15 of 16 races. The Senna-Prost rivalry intensified as teammates, with Senna claiming his first championship. The Honda turbo engine provided unprecedented power, while McLaren\'s technical excellence was unmatched.'
      }
    },
    {
      year: '2000',
      title: 'Schumacher Era',
      description: 'Ferrari returns to championship glory',
      stats: { races: 17, drivers: 44 },
      details: {
        cars: ['Ferrari F1-2000', 'McLaren MP4/15', 'Williams FW22', 'BAR 002'],
        keyPeople: ['Michael Schumacher', 'Mika Häkkinen', 'Ross Brawn', 'Rory Byrne'],
        technology: ['V10 engines', 'Launch control', 'Traction control', 'Carbon fiber construction'],
        context: 'Ferrari ended their 21-year championship drought with Michael Schumacher delivering their first drivers\' title since 1979. The combination of Schumacher\'s driving, Ross Brawn\'s strategy, and Rory Byrne\'s car design created a winning formula that would dominate the early 2000s.'
      }
    },
    {
      year: '2020',
      title: 'Hamilton Supremacy',
      description: 'Seventh championship equals Schumacher',
      stats: { races: 17, drivers: 40 },
      details: {
        cars: ['Mercedes W11', 'Red Bull RB16', 'McLaren MCL35', 'Racing Point RP20'],
        keyPeople: ['Lewis Hamilton', 'Max Verstappen', 'Toto Wolff', 'James Allison'],
        technology: ['Hybrid power units', 'DRS system', 'Advanced aerodynamics', 'Energy recovery systems'],
        context: 'Lewis Hamilton equaled Michael Schumacher\'s record of seven world championships during the COVID-19 affected season. Mercedes dominated with their W11, considered one of the greatest F1 cars ever built. The season featured closed-door races and strict health protocols.'
      }
    }
  ];

  const handleEventClick = async (event: TimelineEvent) => {
    setSelectedEvent(event);
    setLoading(true);
    setAdditionalInfo('');
    setMediaContent({ images: [], videos: [] });

    try {
      // Fetch comprehensive information
      const query = `Formula 1 ${event.year} season ${event.title} detailed history, technical specifications, race results, and cultural impact`;
      const info = await fetchAdditionalInfo(query);
      setAdditionalInfo(info);

      // Simulate media content (in a real app, you'd fetch actual URLs)
      setMediaContent({
        images: [
          `https://placeholder.com/800x600/FF0000/FFFFFF?text=${event.year}+Season`,
          `https://placeholder.com/600x400/FF0000/FFFFFF?text=${event.title.replace(/\s+/g, '+')}`,
          `https://placeholder.com/700x500/FF0000/FFFFFF?text=F1+${event.year}+Cars`
        ],
        videos: [
          `https://placeholder.com/800x450/FF0000/FFFFFF?text=${event.year}+Highlights`,
          `https://placeholder.com/800x450/FF0000/FFFFFF?text=Documentary+${event.year}`
        ]
      });
    } catch (error) {
      console.error('Error fetching additional info:', error);
      setAdditionalInfo('Unable to load additional information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
                <div 
                  className="ml-12 md:ml-0 bg-zinc-900/30 border border-zinc-800 hover:border-red-500/30 transition-all duration-300 group cursor-pointer"
                  onClick={() => handleEventClick(event)}
                >
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
                    
                    <p className="text-zinc-400 leading-relaxed mb-4">
                      {event.description}
                    </p>

                    <div className="text-sm text-red-400 font-mono">CLICK FOR COMPREHENSIVE DETAILS →</div>
                  </div>
                  
                  {/* Data stream effect */}
                  <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Modal with API Content */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="bg-zinc-900 border border-zinc-800 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-zinc-800">
                <div>
                  <div className="text-3xl font-black text-red-400 mb-2">{selectedEvent.year}</div>
                  <h2 className="text-2xl font-bold text-white">{selectedEvent.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8">
                {/* Media Gallery */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Image className="mr-2 text-red-400" size={20} />
                    Media Gallery
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {mediaContent.images.map((image, index) => (
                      <div key={index} className="bg-zinc-800 border border-zinc-700 aspect-video rounded overflow-hidden">
                        <img src={image} alt={`${selectedEvent.title} ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mediaContent.videos.map((video, index) => (
                      <div key={index} className="bg-zinc-800 border border-zinc-700 aspect-video rounded overflow-hidden flex items-center justify-center">
                        <Video className="text-red-400" size={48} />
                        <span className="ml-2 text-zinc-300">Video {index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comprehensive Information */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Calendar className="mr-2 text-red-400" size={20} />
                    Comprehensive Analysis
                  </h3>
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="animate-spin text-red-400 mr-2" size={24} />
                      <span className="text-zinc-300">Loading comprehensive information...</span>
                    </div>
                  ) : (
                    <div className="bg-zinc-800/50 border border-zinc-700 p-6">
                      <div className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
                        {additionalInfo || selectedEvent.details.context}
                      </div>
                    </div>
                  )}
                </div>

                {/* Cars */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Car className="mr-2 text-red-400" size={20} />
                    Iconic Cars
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedEvent.details.cars.map((car, index) => (
                      <div key={index} className="bg-zinc-800/50 border border-zinc-700 p-4">
                        <div className="text-white font-mono">{car}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key People */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Users className="mr-2 text-red-400" size={20} />
                    Key People
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedEvent.details.keyPeople.map((person, index) => (
                      <div key={index} className="bg-zinc-800/50 border border-zinc-700 p-4">
                        <div className="text-white font-mono">{person}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technology */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Cpu className="mr-2 text-red-400" size={20} />
                    Technology & Innovation
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedEvent.details.technology.map((tech, index) => (
                      <div key={index} className="bg-zinc-800/50 border border-zinc-700 p-4">
                        <div className="text-white font-mono">{tech}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default F1Timeline;
