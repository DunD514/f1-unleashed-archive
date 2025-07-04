import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Target, Calendar, Flag, Image, Video, Loader2, Download } from 'lucide-react';
import { fetchDriverMedia } from '../services/geminiService';

interface Driver {
  name: string;
  team: string;
  number: string;
  championships: number;
  wins: number;
  podiums: number;
  color: string;
  career: {
    debut: string;
    retirement?: string;
    nationality: string;
    careerHighlights: string[];
    rivalries: string[];
    signature: string;
  };
}

const F1DriverGrid = () => {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [driverMedia, setDriverMedia] = useState<{
    images: string[];
    videos: string[];
    biography: string;
  }>({ images: [], videos: [], biography: '' });
  const [loading, setLoading] = useState(false);
  const [downloadedVideos, setDownloadedVideos] = useState<Record<string, string>>({});
  const [downloadingVideos, setDownloadingVideos] = useState<Set<string>>(new Set());

  const drivers: Driver[] = [
    {
      name: 'Lewis Hamilton',
      team: 'Mercedes-AMG Petronas',
      number: '44',
      championships: 7,
      wins: 103,
      podiums: 197,
      color: 'from-cyan-400 to-teal-500',
      career: {
        debut: '2007',
        nationality: 'British',
        careerHighlights: [
          'First Black driver to win F1 championship',
          'Most pole positions in F1 history (103)',
          'Equal record holder for most championships (7)',
          'Youngest champion at the time (2008)'
        ],
        rivalries: ['Nico Rosberg', 'Sebastian Vettel', 'Fernando Alonso'],
        signature: 'Exceptional wet weather driving and late-race comebacks'
      }
    },
    {
      name: 'Max Verstappen',
      team: 'Red Bull Racing',
      number: '1',
      championships: 3,
      wins: 54,
      podiums: 89,
      color: 'from-blue-500 to-blue-700',
      career: {
        debut: '2015',
        nationality: 'Dutch',
        careerHighlights: [
          'Youngest F1 driver (17 years old)',
          'Youngest race winner (18 years old)',
          'First Dutch F1 world champion',
          'Most wins in a single season (15 in 2022)'
        ],
        rivalries: ['Lewis Hamilton', 'Charles Leclerc', 'Lando Norris'],
        signature: 'Aggressive wheel-to-wheel racing and raw speed'
      }
    },
    {
      name: 'Sebastian Vettel',
      team: 'Ferrari (Former)',
      number: '5',
      championships: 4,
      wins: 53,
      podiums: 122,
      color: 'from-red-500 to-red-700',
      career: {
        debut: '2007',
        retirement: '2022',
        nationality: 'German',
        careerHighlights: [
          'Youngest double world champion',
          '4 consecutive championships (2010-2013)',
          'Most consecutive wins (9 races)',
          'Environmental activism post-retirement'
        ],
        rivalries: ['Fernando Alonso', 'Lewis Hamilton', 'Mark Webber'],
        signature: 'Precision driving and strategic racecraft'
      }
    },
    {
      name: 'Fernando Alonso',
      team: 'Aston Martin',
      number: '14',
      championships: 2,
      wins: 32,
      podiums: 98,
      color: 'from-green-500 to-green-700',
      career: {
        debut: '2001',
        nationality: 'Spanish',
        careerHighlights: [
          'Youngest champion at the time (2005)',
          'Defeated Michael Schumacher for title',
          'Only driver to win with Renault',
          'Longest F1 career span (22+ years)'
        ],
        rivalries: ['Michael Schumacher', 'Lewis Hamilton', 'Sebastian Vettel'],
        signature: 'Extracting maximum performance from any car'
      }
    },
    {
      name: 'Charles Leclerc',
      team: 'Scuderia Ferrari',
      number: '16',
      championships: 0,
      wins: 5,
      podiums: 26,
      color: 'from-red-400 to-red-600',
      career: {
        debut: '2018',
        nationality: 'Monégasque',
        careerHighlights: [
          'First Monégasque F1 winner',
          'Ferrari youngest race winner',
          'Pole position at home Monaco GP',
          'Rising star of new generation'
        ],
        rivalries: ['Max Verstappen', 'Carlos Sainz', 'Lando Norris'],
        signature: 'Natural speed and racecraft maturity'
      }
    },
    {
      name: 'Lando Norris',
      team: 'McLaren Racing',
      number: '4',
      championships: 0,
      wins: 1,
      podiums: 12,
      color: 'from-orange-400 to-orange-600',
      career: {
        debut: '2019',
        nationality: 'British',
        careerHighlights: [
          'Youngest British F1 podium finisher',
          'McLaren revival key figure',
          'Social media personality',
          'Consistent points scorer'
        ],
        rivalries: ['Max Verstappen', 'Oscar Piastri', 'Charles Leclerc'],
        signature: 'Consistent pace and adaptability'
      }
    },
    {
      name: 'Ayrton Senna',
      team: 'McLaren (Legend)',
      number: '12',
      championships: 3,
      wins: 41,
      podiums: 80,
      color: 'from-yellow-400 to-yellow-600',
      career: {
        debut: '1984',
        retirement: '1994',
        nationality: 'Brazilian',
        careerHighlights: [
          'Greatest wet weather driver ever',
          '65 pole positions in 161 races',
          'Legendary rivalry with Prost',
          'Tragic death at Imola 1994'
        ],
        rivalries: ['Alain Prost', 'Nigel Mansell', 'Nelson Piquet'],
        signature: 'Unmatched qualifying pace and wet weather mastery'
      }
    },
    {
      name: 'Michael Schumacher',
      team: 'Ferrari (Legend)',
      number: '7',
      championships: 7,
      wins: 91,
      podiums: 155,
      color: 'from-red-600 to-red-800',
      career: {
        debut: '1991',
        retirement: '2012',
        nationality: 'German',
        careerHighlights: [
          'Most championships until Hamilton',
          'Ferrari golden era architect',
          '5 consecutive titles (2000-2004)',
          'Comeback with Mercedes'
        ],
        rivalries: ['Damon Hill', 'Mika Häkkinen', 'Fernando Alonso'],
        signature: 'Relentless perfectionism and strategic mastery'
      }
    }
  ];

  const downloadVideo = async (videoUrl: string): Promise<string> => {
    try {
      console.log('Starting download for:', videoUrl);
      const response = await fetch(videoUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch video: ${response.status}`);
      }
      
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      console.log('Video downloaded and blob URL created:', objectUrl);
      return objectUrl;
    } catch (error) {
      console.error('Error downloading video:', error);
      throw error;
    }
  };

  const handleVideoDownload = async (videoUrl: string, index: number) => {
    if (downloadedVideos[videoUrl] || downloadingVideos.has(videoUrl)) {
      return;
    }

    setDownloadingVideos(prev => new Set(prev).add(videoUrl));
    
    try {
      const blobUrl = await downloadVideo(videoUrl);
      setDownloadedVideos(prev => ({
        ...prev,
        [videoUrl]: blobUrl
      }));
    } catch (error) {
      console.error('Failed to download video:', error);
    } finally {
      setDownloadingVideos(prev => {
        const newSet = new Set(prev);
        newSet.delete(videoUrl);
        return newSet;
      });
    }
  };

  const handleDriverClick = async (driver: Driver) => {
    setSelectedDriver(driver);
    setLoading(true);
    setDriverMedia({ images: [], videos: [], biography: '' });
    setDownloadedVideos({});
    setDownloadingVideos(new Set());

    try {
      const media = await fetchDriverMedia(driver.name);
      console.log('Fetched media for', driver.name, ':', media);
      setDriverMedia(media);
    } catch (error) {
      console.error('Error fetching driver media:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="min-h-screen bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="text-red-400 font-mono text-sm tracking-widest mb-4">DRIVER DATABASE</div>
            <h2 className="text-4xl md:text-6xl font-black mb-6">PILOTS</h2>
            <div className="text-zinc-400 text-lg">Elite drivers and their complete racing legacy</div>
          </div>

          {/* Driver grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {drivers.map((driver, index) => (
              <motion.div
                key={driver.name}
                className="bg-zinc-950/50 border border-zinc-800 hover:border-red-500/30 transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleDriverClick(driver)}
              >
                {/* Driver number header */}
                <div className={`h-2 bg-gradient-to-r ${driver.color}`}></div>
                
                <div className="p-6">
                  {/* Driver info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`text-3xl font-black bg-gradient-to-r ${driver.color} bg-clip-text text-transparent`}>
                      #{driver.number}
                    </div>
                    <div className="text-xs font-mono text-zinc-500">
                      {driver.championships} WDC
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                    {driver.name}
                  </h3>
                  
                  <div className="text-zinc-400 text-xs mb-4">
                    {driver.team}
                  </div>
                  
                  {/* Statistics */}
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div>
                      <div className="text-lg font-black text-white">{driver.wins}</div>
                      <div className="text-xs text-zinc-500 font-mono">WINS</div>
                    </div>
                    <div>
                      <div className="text-lg font-black text-white">{driver.podiums}</div>
                      <div className="text-xs text-zinc-500 font-mono">PODIUMS</div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-red-400 font-mono mt-4">CLICK FOR MEDIA & DETAILS →</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Driver Detail Modal */}
      <AnimatePresence>
        {selectedDriver && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDriver(null)}
          >
            <motion.div
              className="bg-zinc-900 border border-zinc-800 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`h-1 bg-gradient-to-r ${selectedDriver.color}`}></div>
              <div className="flex items-center justify-between p-8 border-b border-zinc-800">
                <div className="flex items-center space-x-6">
                  <div className={`text-6xl font-black bg-gradient-to-r ${selectedDriver.color} bg-clip-text text-transparent`}>
                    #{selectedDriver.number}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedDriver.name}</h2>
                    <div className="text-zinc-400">{selectedDriver.team}</div>
                    <div className="text-sm text-zinc-500 font-mono">{selectedDriver.career.nationality}</div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedDriver(null)}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8">
                {/* Driver Media Gallery */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Image className="mr-2 text-red-400" size={20} />
                    Driver Gallery
                  </h3>
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="animate-spin text-red-400 mr-2" size={24} />
                      <span className="text-zinc-300">Loading driver media...</span>
                    </div>
                  ) : (
                    <>
                      {/* Images section */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {driverMedia.images.map((image, index) => (
                          <div key={index} className="bg-zinc-800 border border-zinc-700 rounded overflow-hidden" style={{ height: '300px' }}>
                            <img 
                              src={image} 
                              alt={`${selectedDriver.name} ${index + 1}`} 
                              className="w-full h-full object-contain bg-zinc-900 hover:scale-105 transition-transform duration-300" 
                            />
                          </div>
                        ))}
                      </div>
                      
                      {/* Videos section */}
                      <div className="grid grid-cols-1 gap-4">
                        {driverMedia.videos.length > 0 ? (
                          driverMedia.videos.map((video, index) => (
                            <div key={index} className="bg-zinc-800 border border-zinc-700 rounded overflow-hidden">
                              <div className="p-4 border-b border-zinc-700 flex items-center justify-between">
                                <div className="text-zinc-300 text-sm">
                                  Video {index + 1} - {selectedDriver.name}
                                </div>
                                <button
                                  onClick={() => handleVideoDownload(video, index)}
                                  disabled={downloadingVideos.has(video) || !!downloadedVideos[video]}
                                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 disabled:bg-zinc-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                >
                                  {downloadingVideos.has(video) ? (
                                    <>
                                      <Loader2 className="animate-spin" size={16} />
                                      <span>Downloading...</span>
                                    </>
                                  ) : downloadedVideos[video] ? (
                                    <>
                                      <Video size={16} />
                                      <span>Ready to Play</span>
                                    </>
                                  ) : (
                                    <>
                                      <Download size={16} />
                                      <span>Download Video</span>
                                    </>
                                  )}
                                </button>
                              </div>
                              
                              {downloadedVideos[video] && (
                                <video
                                  width="100%"
                                  height="400"
                                  controls
                                  preload="metadata"
                                  className="w-full"
                                  muted
                                  playsInline
                                  src={downloadedVideos[video]}
                                  onLoadStart={() => console.log('Downloaded video load started for:', video)}
                                  onCanPlay={() => console.log('Downloaded video can play:', video)}
                                  onLoadedData={() => console.log('Downloaded video data loaded:', video)}
                                  onLoadedMetadata={() => console.log('Downloaded video metadata loaded:', video)}
                                  onError={(e) => {
                                    console.error('Downloaded video loading error for:', video);
                                    console.error('Error details:', e.currentTarget.error);
                                  }}
                                >
                                  <p className="text-zinc-400 p-4">
                                    Your browser does not support the video tag.
                                  </p>
                                </video>
                              )}
                              
                              {!downloadedVideos[video] && !downloadingVideos.has(video) && (
                                <div className="p-8 text-center text-zinc-400">
                                  <Video size={48} className="mx-auto mb-4 opacity-50" />
                                  <p>Click "Download Video" to load the video for playback</p>
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="text-zinc-400 p-4">No videos available for {selectedDriver.name}</div>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* Comprehensive Biography */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Calendar className="mr-2 text-red-400" size={20} />
                    Complete Biography
                  </h3>
                  <div className="bg-zinc-800/50 border border-zinc-700 p-6">
                    <div className="text-zinc-300 leading-relaxed">
                      {driverMedia.biography || selectedDriver.career.signature}
                    </div>
                  </div>
                </div>

                {/* Career Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-black text-red-400">{selectedDriver.championships}</div>
                    <div className="text-zinc-500 text-sm font-mono">CHAMPIONSHIPS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-white">{selectedDriver.wins}</div>
                    <div className="text-zinc-500 text-sm font-mono">WINS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-white">{selectedDriver.podiums}</div>
                    <div className="text-zinc-500 text-sm font-mono">PODIUMS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-white">
                      {selectedDriver.career.debut}
                      {selectedDriver.career.retirement && `-${selectedDriver.career.retirement}`}
                    </div>
                    <div className="text-zinc-500 text-sm font-mono">CAREER SPAN</div>
                  </div>
                </div>

                {/* Career Highlights */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Trophy className="mr-2 text-red-400" size={20} />
                    Career Highlights
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {selectedDriver.career.careerHighlights.map((highlight, index) => (
                      <div key={index} className="bg-zinc-800/50 border border-zinc-700 p-4">
                        <div className="text-zinc-300">{highlight}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Rivalries */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Target className="mr-2 text-red-400" size={20} />
                    Key Rivalries
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedDriver.career.rivalries.map((rival, index) => (
                      <div key={index} className="bg-zinc-800/50 border border-zinc-700 px-4 py-2">
                        <div className="text-white font-mono">{rival}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Signature Style */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Flag className="mr-2 text-red-400" size={20} />
                    Signature Style
                  </h3>
                  <div className="bg-zinc-800/50 border border-zinc-700 p-6">
                    <p className="text-zinc-300 leading-relaxed">{selectedDriver.career.signature}</p>
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

export default F1DriverGrid;
