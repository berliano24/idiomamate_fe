'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff, Settings, Lightbulb, Dices, Send, Sparkles, MoreVertical, ShieldAlert, UserPlus, Check, X, Users } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

type Participant = {
  id: string;
  name: string;
  language: string;
  flag: string;
  isMaster: boolean;
  image: string;
  isMuted: boolean;
};

// Simulated mock data for a 5-person room
const INITIAL_PARTICIPANTS: Participant[] = [
  { id: '1', name: 'You', language: 'Indonesian', flag: '🇮🇩', isMaster: true, image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop', isMuted: false },
  { id: '2', name: 'Maria G.', language: 'Spanish', flag: '🇪🇸', isMaster: false, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop', isMuted: true },
  { id: '3', name: 'Kenji M.', language: 'Japanese', flag: '🇯🇵', isMaster: false, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop', isMuted: false },
  { id: '4', name: 'Alex W.', language: 'English', flag: '🇬🇧', isMaster: false, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop', isMuted: false },
  { id: '5', name: 'Ji-Eun', language: 'Korean', flag: '🇰🇷', isMaster: false, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop', isMuted: true },
];

export default function GroupLobbyRoom() {
  const router = useRouter();
  const params = useParams();
  
  const [participants, setParticipants] = useState<Participant[]>(INITIAL_PARTICIPANTS);
  const [activeSpeakerId, setActiveSpeakerId] = useState<string>('3'); // Kenji starts speaking
  const [sentRequests, setSentRequests] = useState<string[]>([]);
  
  const handleAddFriend = (id: string) => {
    if (!sentRequests.includes(id)) {
      setSentRequests([...sentRequests, id]);
    }
  };
  
  // Controls
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Join Request Simulation State
  const [showJoinRequest, setShowJoinRequest] = useState(false);

  // Chat state
  const [messages, setMessages] = useState<{id: string, sender: string, text: string}[]>([
    { id: '1', sender: 'system', text: 'Welcome to the group lobby! Be respectful to other learners.' }
  ]);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isMaster = participants.find(p => p.id === '1')?.isMaster || false;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate Join Request Pop-up after 5 seconds if room is not full
  useEffect(() => {
    if (isMaster && participants.length < 5) {
      const timer = setTimeout(() => {
        setShowJoinRequest(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isMaster, participants.length]);

  // Active Speaker Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Pick random unmuted participant to speak
      const unmuted = participants.filter(p => !p.isMuted);
      if (unmuted.length > 0) {
        const random = unmuted[Math.floor(Math.random() * unmuted.length)];
        setActiveSpeakerId(random.id);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [participants]);

  const handleKick = (participantId: string) => {
    setParticipants(prev => prev.filter(p => p.id !== participantId));
    setActiveDropdown(null);
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'system', text: 'A user was removed by the Host.' }]);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), sender: 'You', text: inputText }]);
    setInputText('');
  };

  const triggerSuggestTopic = () => {
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'system', text: '💡 Topic Suggestion: "What are the biggest culture shocks you\'ve experienced?"' }]);
  };

  const triggerTruthOrDare = () => {
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'system', text: '🎲 Truth! "What word in your native language sounds the funniest to foreigners?"' }]);
  };

  const handleEndCall = () => {
    router.push('/lobbies');
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-6 animate-fadeIn relative">
      
      {/* simulated Join Request Modal for Master */}
      {showJoinRequest && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 bg-white rounded-lg shadow-lg p-4 border border-gray-200 animate-fadeInDown flex items-center gap-4">
          <div className="w-10 h-10 rounded border border-gray-200 bg-gray-50 text-gray-900 flex items-center justify-center">
            <UserPlus size={18} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">Join Request</p>
            <p className="text-gray-500 text-xs">Carlos (🇪🇸 Spanish) wants to join the lobby.</p>
          </div>
          <div className="flex gap-2 ml-4">
            <button 
              onClick={() => setShowJoinRequest(false)} 
              className="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors"
            >
              <X size={16} />
            </button>
            <button 
              onClick={() => {
                setShowJoinRequest(false);
                setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'system', text: 'Carlos joined the lobby!' }]);
                // Logic to actually add Carlos to participants array would go here
              }} 
              className="w-8 h-8 rounded-full bg-green-50 text-green-500 hover:bg-green-100 flex items-center justify-center transition-colors"
            >
              <Check size={16} />
            </button>
          </div>
        </div>
      )}

      {/* LEFT COLUMN: 5-Person Video Grid (70%) */}
      <div className="flex-grow lg:w-[70%] flex flex-col gap-4">
        
        {/* CSS Grid for Participants (Max 5) */}
        <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
          {participants.map((p) => (
            <div 
              key={p.id} 
              className={`relative rounded-xl overflow-hidden bg-gray-900 transition-all duration-300 ${
                activeSpeakerId === p.id ? 'ring-4 ring-black scale-[1.01] z-10' : 'shadow-sm border border-gray-200'
              }`}
            >
              {/* Video Feed */}
              {p.id === '1' && isVideoOff ? (
                 <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500">Video Off</div>
              ) : (
                <div className="w-full h-full bg-cover bg-center opacity-90" style={{ backgroundImage: `url('${p.image}')` }}></div>
              )}

              {/* Add Friend Button */}
              {p.id !== '1' && (
                <div className="absolute top-3 left-3 z-20">
                  <button 
                    onClick={() => handleAddFriend(p.id)}
                    disabled={sentRequests.includes(p.id)}
                    className={`bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm ${
                      sentRequests.includes(p.id) ? 'text-green-400 cursor-default' : 'text-white hover:bg-black/80'
                    }`}
                  >
                    {sentRequests.includes(p.id) ? <Check size={12} /> : <UserPlus size={12} />}
                    <span className="hidden sm:inline">{sentRequests.includes(p.id) ? 'Request Sent' : 'Add Friend'}</span>
                  </button>
                </div>
              )}

              {/* Badges */}
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 border border-white/10">
                {p.flag} {p.name}
                {(p.id === '1' ? isMuted : p.isMuted) && <MicOff size={12} className="text-red-400" />}
                {p.isMaster && <span className="ml-1 bg-black text-white px-1.5 py-0.5 rounded text-[10px] uppercase font-bold border border-white/20">Host</span>}
              </div>

              {/* Master Controls Dropdown */}
              {isMaster && p.id !== '1' && (
                <div className="absolute top-3 right-3">
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === p.id ? null : p.id)}
                    className="w-8 h-8 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center backdrop-blur-sm transition-colors"
                  >
                    <MoreVertical size={16} />
                  </button>
                  
                  {activeDropdown === p.id && (
                    <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20 animate-fadeIn">
                      <button 
                        onClick={() => handleKick(p.id)}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-medium flex items-center gap-2"
                      >
                        <ShieldAlert size={14} /> Kick User
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Empty slot placeholder if room is less than 5 people */}
          {Array.from({ length: 5 - participants.length }).map((_, i) => (
             <div key={`empty-${i}`} className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center text-gray-400">
                <Users size={24} className="mb-2 opacity-50" />
                <span className="text-xs font-medium uppercase tracking-wider">Waiting...</span>
             </div>
          ))}
        </div>

        {/* Video Control Bar */}
        <div className="h-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isMuted ? 'bg-red-100 text-red-500' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
            </button>

            <button 
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isVideoOff ? 'bg-red-100 text-red-500' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {isVideoOff ? <VideoOff size={22} /> : <VideoIcon size={22} />}
            </button>

            <button className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-all hidden sm:flex">
              <Settings size={22} />
            </button>
          </div>

          <button 
            onClick={handleEndCall}
            className="px-6 h-10 rounded-md bg-red-600 hover:bg-red-700 text-white font-medium flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <PhoneOff size={18} /> {isMaster ? 'Close Room' : 'Leave Lobby'}
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: Scaffolding Sidebar (30%) */}
      {/* Reusing exact logic from /room for consistency across the app */}
      <div className="lg:w-[30%] w-full bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        
        {/* Scaffolding Tools */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm tracking-wide">
            <Sparkles size={16} className="text-gray-500" /> 
            Group Scaffolding
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={triggerSuggestTopic}
              className="bg-white border border-gray-200 hover:border-black text-gray-700 hover:text-black py-2.5 rounded-md text-xs font-medium shadow-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <Lightbulb size={14} /> Suggest Topic
            </button>
            <button 
              onClick={triggerTruthOrDare}
              className="bg-white border border-gray-200 hover:border-black text-gray-700 hover:text-black py-2.5 rounded-md text-xs font-medium shadow-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <Dices size={14} /> Truth/Dare AI
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 text-sm">
          {messages.map(msg => (
            <div key={msg.id} className={`flex flex-col ${
              msg.sender === 'system' ? 'items-center' : 
              msg.sender === 'You' ? 'items-end' : 'items-start'
            }`}>
              {msg.sender === 'system' && (
                <div className="bg-gray-100 border border-gray-200 text-gray-800 text-[11px] font-semibold px-4 py-1.5 rounded max-w-[90%] text-center uppercase tracking-wide">
                  {msg.text}
                </div>
              )}

              {msg.sender !== 'system' && (
                <div className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'} max-w-[85%]`}>
                  <div className="text-xs font-bold text-gray-500 mb-1 px-1">
                    {msg.sender}
                  </div>
                  <div className={`px-4 py-2.5 rounded-lg text-sm ${
                    msg.sender === 'You' 
                      ? 'bg-black text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 rounded-tl-none border border-gray-200 shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="relative flex items-center">
            <input 
              type="text" 
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              placeholder="Group message..."
              className="w-full bg-white border border-gray-200 rounded-md pl-4 pr-12 py-2.5 focus:ring-1 focus:ring-black focus:border-black text-sm shadow-sm"
            />
            <button 
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className={`absolute right-1 w-8 h-8 rounded shrink-0 flex items-center justify-center transition-colors ${
                inputText.trim() ? 'bg-black text-white hover:bg-gray-800' : 'bg-transparent text-gray-300'
              }`}
            >
              <Send size={16} className={inputText.trim() ? 'ml-1' : ''} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
