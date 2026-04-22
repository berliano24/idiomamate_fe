'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Video, X, Plus, MessageSquare, Sparkles, Globe, BarChart2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type MatchState = 'idle' | 'searching' | 'found';

export default function FindPartnerPage() {
  const [matchState, setMatchState] = useState<MatchState>('idle');
  
  // Topic Cards State
  const [topics, setTopics] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  
  const router = useRouter();

  const handleSearch = () => {
    if (topics.length === 0) return;
    setMatchState('searching');
  };

  const cancelSearch = () => {
    setMatchState('idle');
  };

  const addTopic = (topic: string) => {
    const trimmed = topic.trim();
    if (trimmed && topics.length < 5 && !topics.includes(trimmed)) {
      setTopics([...topics, trimmed]);
      setCurrentInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTopic(currentInput);
    }
  };

  const removeTopic = (indexToRemove: number) => {
    setTopics(topics.filter((_, idx) => idx !== indexToRemove));
  };

  // Simulate finding a partner after 3.5 seconds
  useEffect(() => {
    if (matchState === 'searching') {
      const timer = setTimeout(() => {
        setMatchState('found');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [matchState]);

  return (
    <div className="flex flex-col min-h-[calc(100vh-120px)]">
      <div className="page-header animate-fadeInUp shrink-0">
        <h1>Find a Partner</h1>
        <p>Match with a native speaker for a 1-on-1 video conversation</p>
      </div>

      <div className="flex-1 flex items-start justify-center pt-8 pb-16">
        <div className="w-full max-w-2xl animate-fadeInUp delay-100">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden relative min-h-[500px] flex flex-col w-full">
          
          {/* STATE 1: IDLE */}
          {matchState === 'idle' && (
            <div className="p-8 flex-1 flex flex-col justify-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-white border border-gray-200 text-black flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Search size={28} />
              </div>
              
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Ready to practice?</h2>
              
              <div className="flex items-center justify-center mx-auto my-8 max-w-sm border border-gray-100 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
                <div className="flex-1 flex items-center justify-center gap-3 py-3.5 px-6">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                    <Globe size={18} />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-0.5">Language</div>
                    <div className="text-sm font-bold text-blue-600">English</div>
                  </div>
                </div>
                <div className="w-px h-12 bg-gray-100"></div>
                <div className="flex-1 flex items-center justify-center gap-3 py-3.5 px-6">
                  <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
                    <BarChart2 size={18} />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-0.5">Level</div>
                    <div className="text-sm font-bold text-orange-600">Beginner</div>
                  </div>
                </div>
              </div>

              <p className="text-gray-500 text-center mb-6">
                Create up to 5 topic cards to let your partner know what you want to discuss.
              </p>

              <div className="mb-6">
                {/* Visual rendering of Topic Cards */}
                <div className="grid grid-cols-2 gap-3 mb-4 min-h-[120px]">
                  {topics.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center border-[1.5px] border-dashed border-gray-200 rounded-xl p-8 text-sm text-gray-500 italic bg-white">
                      <MessageSquare size={24} className="mb-3 text-gray-300" />
                      No topics added yet. Type below to add.
                    </div>
                  )}
                  {topics.map((topic, idx) => (
                    <div key={idx} className="relative group bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:border-black hover:shadow-md transition-all flex flex-col animate-fadeIn">
                      <div className="flex justify-between w-full items-start">
                        <div className="bg-gray-100 p-1.5 rounded-lg text-gray-500 group-hover:bg-black group-hover:text-white transition-colors">
                          <MessageSquare size={14} />
                        </div>
                        <button onClick={() => removeTopic(idx)} className="text-gray-400 hover:text-red-500 transition-colors p-1 -mr-1 -mt-1">
                          <X size={16} />
                        </button>
                      </div>
                      <span className="font-semibold text-gray-800 text-sm mt-3 line-clamp-2 leading-tight break-words">{topic}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <div className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400">
                      <MessageSquare size={18} />
                    </div>
                    <input
                      type="text"
                      className="w-full bg-white border border-gray-200 rounded-lg pl-11 pr-4 py-3 focus:ring-1 focus:ring-black focus:border-black transition-all text-sm text-gray-900 focus:outline-none shadow-sm"
                      placeholder="e.g. Traditional foods, movies, hobbies..."
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={topics.length >= 5}
                    />
                  </div>
                  <button 
                    onClick={() => addTopic(currentInput)}
                    disabled={topics.length >= 5 || !currentInput.trim()}
                    className={`px-6 rounded-lg text-sm font-medium transition-colors border shadow-sm ${
                      topics.length >= 5 || !currentInput.trim() ? 'border-gray-200 text-gray-400 bg-white cursor-not-allowed' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                    }`}
                  >
                    Add
                  </button>
                </div>
                <div className="flex justify-between items-center text-[13px] text-gray-500 mt-2 px-1">
                  <span>{topics.length >= 5 ? 'Maximum limit reached' : 'Press Enter to add'}</span>
                  <span>{topics.length} / 5 Cards</span>
                </div>
              </div>

              {/* Suggestions */}
              <div className="mb-10">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
                  <Sparkles size={14} className="text-orange-400" /> Quick Ideas
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Local food", "Recent movies", "Travel stories", "Language tips", "Business English", "Current events"].map((idea) => {
                    const isAdded = topics.includes(idea) || topics.length >= 5;
                    return (
                      <button
                        key={idea}
                        onClick={() => addTopic(idea)}
                        disabled={isAdded}
                        className={`text-sm px-4 py-2 rounded-full transition-colors shadow-sm border flex items-center gap-1.5 ${
                          isAdded 
                            ? 'bg-gray-50 border-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        <Plus size={14} />
                        {idea}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-auto">
                <button
                  onClick={handleSearch}
                  disabled={topics.length === 0}
                  className={`w-full py-4 rounded-xl font-medium text-base flex items-center justify-center gap-2 transition-all ${
                    topics.length > 0
                      ? 'bg-black hover:bg-gray-800 text-white shadow-sm' 
                      : 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-100'
                  }`}
                >
                  <Search size={18} />
                  Find Partner
                </button>
              </div>
            </div>
          )}

          {/* STATE 2: SEARCHING */}
          {matchState === 'searching' && (
            <div className="p-8 flex-1 flex flex-col items-center justify-center animate-fadeIn text-center">
              <div className="relative w-40 h-40 flex items-center justify-center mb-10">
                {/* Radar Rings */}
                <div className="absolute inset-0 rounded-full border border-gray-300 opacity-20 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                <div className="absolute inset-4 rounded-full border border-gray-400 opacity-30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" style={{ animationDelay: '400ms' }}></div>
                <div className="absolute inset-8 rounded-full border border-gray-500 opacity-40 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" style={{ animationDelay: '800ms' }}></div>
                
                {/* Center Avatar Profile Map Pin */}
                <div className="relative z-10 w-16 h-16 rounded-lg bg-black shadow-lg flex items-center justify-center text-white border border-gray-800">
                  <MapPin size={28} />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2 animate-pulse">Searching the globe...</h2>
              <p className="text-gray-500 mb-12">Looking for a native speaker matching your criteria.</p>

              <button
                onClick={cancelSearch}
                className="text-gray-500 hover:text-black font-medium px-6 py-2.5 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2 border border-transparent hover:border-gray-200"
              >
                <X size={18} /> Cancel Search
              </button>
            </div>
          )}

          {/* STATE 3: FOUND */}
          {matchState === 'found' && (
            <div className="flex-1 flex flex-col justify-center animate-fadeIn">
              <div className="absolute top-0 left-0 w-full h-32 bg-gray-900"></div>
              
              <div className="px-8 pb-8 pt-16 relative z-10 text-center flex-1 flex flex-col">
                <div className="w-24 h-24 mx-auto bg-white p-1 rounded-full shadow-md mb-4 border border-gray-200">
                  <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                    {/* Simulated partner avatar */}
                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Partner" className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 bg-gray-800 text-white px-3 py-1 rounded font-medium text-xs mx-auto mb-3 tracking-wide shadow-sm">
                  <Sparkles size={12} /> Match Found
                </div>

                <h2 className="text-2xl font-bold text-gray-900">Kenji M.</h2>
                <p className="text-gray-500 text-sm mb-6 flex justify-center items-center gap-2">
                  <span>🇯🇵 Japanese (Native)</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>Learning English</span>
                </p>

                <div className="bg-gray-50 rounded-xl p-5 mb-8 text-left border border-gray-200">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Their Topic Cards</div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {["Anime & Manga", "Casual English", "Kyoto Travel"].map((topic, idx) => (
                      <div key={idx} className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm flex items-center gap-2">
                         <MessageSquare size={14} className="text-gray-400 flex-shrink-0" />
                         <span className="text-gray-800 text-sm font-medium truncate">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex gap-4">
                  <button
                    onClick={cancelSearch}
                    className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 font-medium py-3 rounded-md transition-colors shadow-sm"
                  >
                    Skip
                  </button>
                  <button
                    onClick={() => router.push('/room')}
                    className="flex-[2] bg-black hover:bg-gray-800 text-white font-medium py-3 rounded-md shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Video size={20} />
                    Join Video Call
                  </button>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
