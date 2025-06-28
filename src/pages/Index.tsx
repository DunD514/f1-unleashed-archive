
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import F1Speedometer from '../components/F1Speedometer';
import F1Navigation from '../components/F1Navigation';
import F1HUD from '../components/F1HUD';
import F1LoadingBar from '../components/F1LoadingBar';

const Index = () => {
  const [speed, setSpeed] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setScrollY(scrollTop);
      // Convert scroll to speed (0-350 km/h range)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const speedValue = Math.min((scrollTop / maxScroll) * 350, 350);
      setSpeed(speedValue);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 3000);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return <F1LoadingBar />;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Carbon fiber background texture */}
      <div className="fixed inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

      {/* F1 HUD Overlay */}
      <F1HUD speed={speed} />

      {/* Main Cockpit Interface */}
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Header - Steering Wheel Style */}
        <header className="relative h-screen flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-radial from-red-900/20 via-black to-black"></div>
          
          {/* Central Display */}
          <motion.div 
            className="relative z-20 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">
              F1 UNLEASHED
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              ARCHIVE • EXPERIENCE • DOMINATE
            </p>
            
            {/* F1 Navigation Buttons */}
            <F1Navigation />
          </motion.div>

          {/* Speedometer */}
          <div className="absolute bottom-10 right-10">
            <F1Speedometer speed={speed} />
          </div>

          {/* Racing Line Decoration */}
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        </header>

        {/* Content Sections */}
        <main className="relative z-10">
          {/* Timeline Section - Exhaust Trail */}
          <motion.section 
            className="min-h-screen p-8 relative"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-red-500">TIMELINE</h2>
              <div className="relative">
                {/* Exhaust Trail Effect */}
                <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 via-orange-500 to-yellow-500 opacity-60"></div>
                
                {/* Timeline Events */}
                {[
                  { year: "1950", event: "First F1 World Championship" },
                  { year: "1976", event: "Hunt vs Lauda Rivalry" },
                  { year: "1988", event: "Senna vs Prost Era" },
                  { year: "2000", event: "Schumacher Dominance" },
                  { year: "2020", event: "Hamilton's 7th Title" }
                ].map((item, index) => (
                  <motion.div 
                    key={item.year}
                    className="relative pl-12 pb-8"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="absolute left-2 w-6 h-6 bg-red-500 rounded-full border-4 border-black"></div>
                    <h3 className="text-2xl font-bold text-white">{item.year}</h3>
                    <p className="text-gray-300">{item.event}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Drivers Section */}
          <motion.section 
            className="min-h-screen p-8 bg-gradient-to-b from-black to-gray-900"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-red-500">DRIVERS</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: "Lewis Hamilton", team: "Mercedes", wins: "103" },
                  { name: "Max Verstappen", team: "Red Bull", wins: "54" },
                  { name: "Sebastian Vettel", team: "Ferrari", wins: "53" }
                ].map((driver, index) => (
                  <motion.div 
                    key={driver.name}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg border-2 border-red-500/30 hover:border-red-500 transition-all duration-300 cursor-pointer group"
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="relative overflow-hidden rounded-lg mb-4 h-48 bg-gradient-to-br from-red-900 to-black flex items-center justify-center">
                      <div className="text-6xl opacity-20">🏎️</div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{driver.name}</h3>
                    <p className="text-red-400 mb-1">{driver.team}</p>
                    <p className="text-gray-400">{driver.wins} Race Wins</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        </main>
      </motion.div>
    </div>
  );
};

export default Index;
