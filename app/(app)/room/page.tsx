'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff, Languages, Lightbulb, Dices, Send, Sparkles, User, Settings, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Message = {
  id: string;
  sender: 'me' | 'partner' | 'system';
  text: string;
  translatedText?: string;
  showTranslation?: boolean;
};

export default function VideoRoomPage() {
  const router = useRouter();
  
  // Controls state
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState<'partner' | 'me'>('partner');
  const [isFriendRequested, setIsFriendRequested] = useState(false);
  
  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'system',
      text: 'Icebreaker: "I want to improve my English casual conversation. Do you like watching anime?"',
    },
    {
      id: '2',
      sender: 'partner',
      text: 'Hi! Nice to meet you. Yes, I really like watching anime!',
      translatedText: 'Hai! Senang bertemu denganmu. Ya, aku sangat suka menonton anime!',
      showTranslation: false,
    }
  ]);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate active speaker toggle every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSpeaker(prev => prev === 'partner' ? 'me' : 'partner');
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleTranslation = (id: string) => {
    setMessages(msgs => msgs.map(m => 
      m.id === id ? { ...m, showTranslation: !m.showTranslation } : m
    ));
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    setMessages([...messages, {
      id: Date.now().toString(),
      sender: 'me',
      text: inputText
    }]);
    setInputText('');

    // Simulate partner typing back
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'partner',
        text: 'That sounds really interesting!',
        translatedText: 'Itu kedengarannya sangat menarik!',
        showTranslation: false
      }]);
    }, 2000);
  };

  const triggerSuggestTopic = () => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: 'system',
      text: '💡 Topic Suggestion: "If you could travel anywhere right now, where would it be?"'
    }]);
  };

  const triggerTruthOrDare = () => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: 'system',
      text: '🎲 Truth! "What is the most embarrassing mistake you\'ve made while learning a language?"'
    }]);
  };

  const handleEndCall = () => {
    router.push('/dashboard');
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-6 animate-fadeIn">
      
      {/* LEFT COLUMN: Video Grid (65%) */}
      <div className="flex-grow lg:w-[65%] flex flex-col gap-4 relative">
        
        {/* Main Partner Video */}
        <div className={`flex-1 rounded-2xl overflow-hidden relative bg-gray-900 transition-all duration-300 ${
          activeSpeaker === 'partner' ? 'ring-4 ring-black' : 'shadow-sm border border-gray-200'
        }`}>
          {/* Simulated Partner Stream */}
          <div className="w-full h-full bg-cover bg-center opacity-80" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop')" }}></div>
          
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 border border-white/10 shadow-sm">
              🇯🇵 Kenji M. 
              {activeSpeaker === 'partner' && <span className="w-2 h-2 rounded-full bg-green-500 animate-[pulse_2s_ease-in-out_infinite]"></span>}
            </div>
            
            <button 
              onClick={() => setIsFriendRequested(true)}
              disabled={isFriendRequested}
              className={`bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 transition-all shadow-sm ${
                isFriendRequested ? 'text-green-400 cursor-default' : 'text-white hover:bg-black/80'
              }`}
            >
              <UserPlus size={14} />
              <span className="hidden sm:inline">{isFriendRequested ? 'Request Sent' : 'Add Friend'}</span>
            </button>
          </div>
        </div>

        {/* Self PiP Video */}
        <div className={`absolute top-4 right-4 w-40 aspect-video rounded-lg overflow-hidden border-2 bg-gray-800 transition-all duration-300 z-10 shadow-lg ${
          activeSpeaker === 'me' ? 'border-black' : 'border-white/20'
        }`}>
          {/* Simulated Self Stream */}
          {!isVideoOff ? (
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop')" }}></div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-500">
              <User size={32} />
            </div>
          )}
          <div className="absolute bottom-1 left-1 bg-black/50 backdrop-blur-sm text-white px-1.5 py-0.5 rounded text-[10px] font-medium flex items-center gap-1">
            You {isMuted && <MicOff size={10} className="text-red-400" />}
          </div>
        </div>

        {/* Video Control Bar */}
        <div className="h-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center gap-4 px-6">
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

          <button className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-all">
            <Settings size={22} />
          </button>

          <div className="w-px h-8 bg-gray-200 mx-2"></div>

          <button 
            onClick={handleEndCall}
            className="px-6 h-10 rounded-md bg-black hover:bg-gray-800 text-white font-medium flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <PhoneOff size={18} /> End Call
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: Scaffolding Sidebar (35%) */}
      <div className="lg:w-[35%] w-full bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        
        {/* Sidebar Header & Scaffolding Tools */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm tracking-wide">
            <Sparkles size={16} className="text-gray-500" /> 
            Anti-Anxiety Tools
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={triggerSuggestTopic}
              className="bg-white border border-gray-200 hover:border-black text-gray-700 hover:text-black py-2.5 rounded-md text-xs font-medium shadow-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Lightbulb size={14} /> Suggest Topic
            </button>
            <button 
              onClick={triggerTruthOrDare}
              className="bg-white border border-gray-200 hover:border-black text-gray-700 hover:text-black py-2.5 rounded-md text-xs font-medium shadow-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Dices size={14} /> Truth/Dare AI
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex flex-col ${
              msg.sender === 'system' ? 'items-center' : 
              msg.sender === 'me' ? 'items-end' : 'items-start'
            }`}>
              
              {/* System Message */}
              {msg.sender === 'system' && (
                <div className="bg-gray-100 border border-gray-200 text-gray-800 text-[11px] font-semibold px-4 py-1.5 rounded max-w-[85%] text-center uppercase tracking-wide">
                  {msg.text}
                </div>
              )}

              {/* User/Partner Message */}
              {msg.sender !== 'system' && (
                <div className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'} max-w-[85%]`}>
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <span className="text-xs font-bold text-gray-500">
                      {msg.sender === 'me' ? 'You' : 'Kenji'}
                    </span>
                  </div>
                  
                  <div className="relative group">
                    <div className={`px-4 py-2.5 rounded-lg text-sm ${
                      msg.sender === 'me' 
                        ? 'bg-black text-white rounded-tr-none' 
                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-200 shadow-sm'
                    }`}>
                      {msg.text}
                      
                      {msg.translatedText && msg.showTranslation && (
                        <div className={`mt-2 pt-2 border-t text-sm ${msg.sender === 'me' ? 'border-white/20 text-white/90' : 'border-gray-200 text-gray-600'}`}>
                          <span className="font-semibold text-[10px] uppercase opacity-70 block mb-1">Translation</span>
                          {msg.translatedText}
                        </div>
                      )}
                    </div>

                    {/* Quick Translate Button */}
                    {msg.translatedText && (
                      <button 
                        onClick={() => toggleTranslation(msg.id)}
                        className={`absolute top-2 ${msg.sender === 'me' ? '-left-8' : '-right-8'} w-6 h-6 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black opacity-0 group-hover:opacity-100 transition-opacity`}
                        title="Translate"
                      >
                        <Languages size={12} />
                      </button>
                    )}
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
              placeholder="Type a message..."
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
