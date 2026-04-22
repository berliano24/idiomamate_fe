'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff,
  Languages, Lightbulb, Dices, Send, Sparkles, User,
  Settings, UserPlus, RefreshCw, MessageSquare, X, RotateCcw,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePartner } from '../../context/PartnerContext';

type Message = { id: string; sender: 'me' | 'partner' | 'system'; text: string; translatedText?: string; showTranslation?: boolean; };
type FloatingEmoji = { id: string; emoji: string; x: number; };

const REACTIONS = ['👋', '😂', '🤔', '👍', '❤️'];

// Agora-SDK-ready stub — swap for localAudioTrack.getVolumeLevel() > 0.05
function useAudioActivity(muted: boolean, active: boolean) { return !muted && active; }

export default function VideoRoomPage() {
  const router = useRouter();
  const { partnerTopics, partnerName, partnerFlag } = usePartner();
  const safeTopics = partnerTopics?.length ? partnerTopics : ['Anime & Manga', 'Casual English', 'Kyoto Travel'];
  const safeName   = partnerName || 'Kenji M.';
  const safeFlag   = partnerFlag || '🇯🇵';

  // ── Controls ─────────────────────────────────────────────────────────────
  const [isMuted,      setIsMuted]      = useState(false);
  const [isVideoOff,   setIsVideoOff]   = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState<'partner'|'me'>('partner');
  const [friendSent,   setFriendSent]   = useState(false);

  // ── Repeat request ────────────────────────────────────────────────────────
  const [repeating, setRepeating] = useState(false);

  // ── Chat ──────────────────────────────────────────────────────────────────
  const [messages, setMessages] = useState<Message[]>([
    { id:'1', sender:'system', text:'🎉 Connected! Your partner\'s topics are ready.' },
    { id:'2', sender:'partner', text:'Hi! Nice to meet you!', translatedText:'Hai! Senang bertemu denganmu!', showTranslation:false },
  ]);
  const [input, setInput] = useState('');
  const chatEnd = useRef<HTMLDivElement>(null);
  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior:'smooth' }); }, [messages]);

  // ── Silence / scaffolding ─────────────────────────────────────────────────
  const [silence,      setSilence]      = useState(0);
  const [showPresence, setShowPresence] = useState(false);
  const [showScaffold, setShowScaffold] = useState(false);
  const [topicIdx,     setTopicIdx]     = useState(0);
  const [userActive,   setUserActive]   = useState(true);
  const isSpeaking = useAudioActivity(isMuted, userActive);

  useEffect(() => {
    if (!userActive) return;
    const t = setTimeout(() => setUserActive(false), 3000);
    return () => clearTimeout(t);
  }, [userActive]);

  useEffect(() => {
    if (isSpeaking) { setSilence(0); setShowPresence(false); setShowScaffold(false); return; }
    const iv = setInterval(() => {
      setSilence(s => { const n = s+1; if(n>=8) setShowPresence(true); if(n>=12) setShowScaffold(true); return n; });
    }, 1000);
    return () => clearInterval(iv);
  }, [isSpeaking]);

  const signal = useCallback(() => {
    setUserActive(true); setSilence(0); setShowPresence(false); setShowScaffold(false);
  }, []);

  // ── Emoji reactions ───────────────────────────────────────────────────────
  const [showBar,   setShowBar]   = useState(false);
  const [emojis,    setEmojis]    = useState<FloatingEmoji[]>([]);

  const fireEmoji = (emoji: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    const x  = 15 + Math.random() * 70;
    setEmojis(p => [...p, { id, emoji, x }]);
    setTimeout(() => setEmojis(p => p.filter(e => e.id !== id)), 3200);
  };

  // ── Active speaker sim ────────────────────────────────────────────────────
  useEffect(() => {
    const iv = setInterval(() => setActiveSpeaker(p => p==='partner'?'me':'partner'), 4000);
    return () => clearInterval(iv);
  }, []);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const send = () => {
    if (!input.trim()) return;
    signal();
    setMessages(p => [...p, { id: Date.now().toString(), sender:'me', text:input }]);
    setInput('');
    setTimeout(() => setMessages(p => [...p, { id:(Date.now()+1).toString(), sender:'partner', text:'That\'s really interesting!', translatedText:'Itu sangat menarik!', showTranslation:false }]), 2000);
  };

  const repeatRequest = () => {
    setRepeating(true); signal();
    setMessages(p => [...p, { id:Date.now().toString(), sender:'system', text:'🔄 Please repeat that!' }]);
    setTimeout(() => setRepeating(false), 2000);
  };

  const toggleTranslation = (id: string) =>
    setMessages(p => p.map(m => m.id===id ? {...m, showTranslation:!m.showTranslation} : m));

  // ── Active speaker glow style ─────────────────────────────────────────────
  const partnerGlow = activeSpeaker==='partner'
    ? 'ring-4 ring-green-400 shadow-[0_0_30px_rgba(74,222,128,0.35)]'
    : 'border border-gray-200 shadow-sm';
  const selfBorder = activeSpeaker==='me'
    ? 'border-2 border-green-400 shadow-[0_0_14px_rgba(74,222,128,0.4)]'
    : 'border-2 border-white/20';

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-6 animate-fadeIn">

      {/* ── LEFT: Video ── */}
      <div className="flex-grow lg:w-[65%] flex flex-col gap-4 relative">

        {/* Partner video placeholder */}
        <div className={`flex-1 rounded-2xl overflow-hidden relative bg-gray-900 transition-all duration-500 ${partnerGlow}`}>
          <div className="w-full h-full bg-cover bg-center opacity-80"
            style={{ backgroundImage:"url('https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop')" }} />

          {/* Name + friend */}
          <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
            <div className="bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 border border-white/10">
              {safeFlag} {safeName}
              {activeSpeaker==='partner' && <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>}
            </div>
            <button onClick={()=>{setFriendSent(true);signal();}} disabled={friendSent}
              className={`bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 transition-all ${friendSent?'text-green-400 cursor-default':'text-white hover:bg-black/80'}`}>
              <UserPlus size={14}/><span className="hidden sm:inline">{friendSent?'Sent':'Add Friend'}</span>
            </button>
          </div>

          {/* Reaction bar — bottom-right, always on top of video (z-20) */}
          <div className="absolute bottom-4 right-4 z-20 flex flex-col items-end gap-2">
            <AnimatePresence>
              {showBar && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="flex gap-2 bg-black/80 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-2.5 shadow-2xl mb-1"
                >
                  {REACTIONS.map(e => (
                    <button key={e} onClick={() => fireEmoji(e)}
                      className="text-2xl hover:scale-125 transition-transform active:scale-105 select-none">
                      {e}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Always-visible React button */}
            <button
              onClick={() => setShowBar(v => !v)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-lg border transition-all ${
                showBar
                  ? 'bg-white text-black border-white'
                  : 'bg-black/70 backdrop-blur-md text-white border-white/20 hover:bg-black/90'
              }`}
            >
              <span className="text-base">😊</span>
              {showBar ? 'Close' : 'React'}
            </button>
          </div>

          {/* Floating emojis */}
          <AnimatePresence>
            {emojis.map(fe => (
              <motion.div key={fe.id} className="absolute bottom-20 text-4xl pointer-events-none z-30 select-none"
                style={{left:`${fe.x}%`}}
                initial={{opacity:1,y:0,rotate:0}}
                animate={{opacity:[1,1,0],y:-220,rotate:[0,12,-12,8,-8,0]}}
                transition={{duration:3,ease:'easeOut'}}>
                {fe.emoji}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Presence pill */}
          <AnimatePresence>
            {showPresence && (
              <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}}
                className="absolute bottom-4 left-4 z-10">
                <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md text-white text-xs font-medium px-3 py-2 rounded-full border border-white/10">
                  <span className="flex gap-0.5 items-end h-3">
                    {[0,150,300].map(d => <span key={d} className="w-1 bg-white rounded-full animate-bounce" style={{height:d===150?'10px':'6px',animationDelay:`${d}ms`}}/>)}
                  </span>
                  {safeName.split(' ')[0]} is thinking…
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scaffolding overlay */}
          <AnimatePresence>
            {showScaffold && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.4}}
                className="absolute inset-0 flex items-center justify-center z-20 px-6"
                style={{backdropFilter:'blur(3px)',background:'rgba(0,0,0,0.4)'}}>
                <motion.div initial={{scale:0.9,y:20}} animate={{scale:1,y:0}} exit={{scale:0.9,y:20}}
                  transition={{type:'spring',stiffness:350,damping:28}}
                  className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 w-full max-w-sm">

                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
                        <Lightbulb size={16} className="text-amber-500"/>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Topic Suggestion</p>
                        <p className="text-sm font-semibold text-gray-800">{safeName.split(' ')[0]}'s prompt</p>
                      </div>
                    </div>
                    <button onClick={()=>{setShowScaffold(false);signal();}}
                      className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors">
                      <X size={14}/>
                    </button>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4 flex items-start gap-3">
                    <MessageSquare size={16} className="text-gray-400 mt-0.5 shrink-0"/>
                    <p className="text-sm font-semibold text-gray-800 leading-snug">{safeTopics[topicIdx]}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {safeTopics.map((t,i)=>(
                      <button key={i} onClick={()=>{setTopicIdx(i);signal();}}
                        className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${i===topicIdx?'bg-black text-white border-black':'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}>
                        {t}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2 mb-3">
                    <button onClick={()=>{setTopicIdx(p=>(p+1)%safeTopics.length);signal();}}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium py-2.5 rounded-lg transition-colors">
                      <RefreshCw size={14}/> Next Topic
                    </button>
                    <button onClick={()=>{setShowScaffold(false);signal();}}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-black hover:bg-gray-800 text-white text-sm font-medium py-2.5 rounded-lg transition-colors">
                      <Sparkles size={14}/> Got It!
                    </button>
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                      <span>Silence detected</span><span>{silence}s</span>
                    </div>
                    <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div className="h-full bg-amber-400 rounded-full"
                        animate={{width:`${Math.min((silence/20)*100,100)}%`}} transition={{duration:1}}/>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Self PiP */}
        <div className={`absolute top-4 right-4 w-40 aspect-video rounded-lg overflow-hidden bg-gray-800 z-10 shadow-lg transition-all duration-300 ${selfBorder}`}>
          {!isVideoOff
            ? <div className="w-full h-full bg-cover bg-center" style={{backgroundImage:"url('https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop')"}}/>
            : <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-500"><User size={32}/></div>
          }
          <div className="absolute bottom-1 left-1 bg-black/50 backdrop-blur-sm text-white px-1.5 py-0.5 rounded text-[10px] font-medium flex items-center gap-1">
            You {isMuted && <MicOff size={10} className="text-red-400"/>}
          </div>
          {activeSpeaker==='me' && <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-400 animate-pulse"/>}
        </div>

        {/* Control bar */}
        <div className="h-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center gap-3 px-6">
          <button onClick={()=>{setIsMuted(!isMuted);signal();}}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isMuted?'bg-red-100 text-red-500':'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
            {isMuted?<MicOff size={22}/>:<Mic size={22}/>}
          </button>
          <button onClick={()=>{setIsVideoOff(!isVideoOff);signal();}}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isVideoOff?'bg-red-100 text-red-500':'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
            {isVideoOff?<VideoOff size={22}/>:<VideoIcon size={22}/>}
          </button>

          {/* Please Repeat button with Framer pulse */}
          <motion.button onClick={repeatRequest}
            animate={repeating ? {scale:[1,1.12,1,1.12,1],boxShadow:['0 0 0 0 rgba(239,68,68,0)','0 0 0 10px rgba(239,68,68,0.25)','0 0 0 0 rgba(239,68,68,0)']} : {}}
            transition={{duration:0.7}}
            className={`px-4 h-10 rounded-full text-xs font-bold flex items-center gap-1.5 border transition-all ${repeating?'bg-red-500 text-white border-red-500':'bg-white border-gray-200 text-gray-700 hover:border-gray-400'}`}>
            <RotateCcw size={13}/> Repeat?
          </motion.button>

          <button className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-all">
            <Settings size={22}/>
          </button>
          <div className="w-px h-8 bg-gray-200 mx-1"/>
          <button onClick={()=>router.push('/dashboard')}
            className="px-5 h-10 rounded-md bg-black hover:bg-gray-800 text-white font-medium flex items-center gap-2 transition-all shadow-sm text-sm">
            <PhoneOff size={16}/> End Call
          </button>
        </div>
      </div>

      {/* ── RIGHT: Sidebar ── */}
      <div className="lg:w-[35%] w-full bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">

        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
            <Sparkles size={16} className="text-gray-500"/> Anti-Anxiety Tools
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={()=>{signal();setMessages(p=>[...p,{id:Date.now().toString(),sender:'system',text:'💡 "What is your favorite travel destination?"'}]);}}
              className="bg-white border border-gray-200 hover:border-black text-gray-700 hover:text-black py-2.5 rounded-md text-xs font-medium shadow-sm flex items-center justify-center gap-2 transition-colors">
              <Lightbulb size={14}/> Suggest Topic
            </button>
            <button onClick={()=>{signal();setMessages(p=>[...p,{id:Date.now().toString(),sender:'system',text:'🎲 Truth: "Most embarrassing language mistake?"'}]);}}
              className="bg-white border border-gray-200 hover:border-black text-gray-700 hover:text-black py-2.5 rounded-md text-xs font-medium shadow-sm flex items-center justify-center gap-2 transition-colors">
              <Dices size={14}/> Truth/Dare
            </button>
          </div>

          {/* Partner topics */}
          <div className="mt-3 bg-white border border-dashed border-gray-200 rounded-xl p-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <MessageSquare size={10}/> {safeName.split(' ')[0]}'s Topics
            </p>
            {safeTopics.map((t,i)=>(
              <div key={i} className="text-xs text-gray-600 flex items-center gap-1.5 mb-0.5">
                <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0"/> {t}
              </div>
            ))}
          </div>

          {/* Silence alert */}
          <AnimatePresence>
            {silence > 3 && (
              <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}
                className="mt-3 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 flex items-center justify-between overflow-hidden">
                <p className="text-xs text-amber-700 font-medium">{silence<8?'🤫 Silence detected…':'💡 Try a topic!'}</p>
                <span className="text-xs font-bold text-amber-600">{silence}s</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {messages.map(msg=>(
            <div key={msg.id} className={`flex flex-col ${msg.sender==='system'?'items-center':msg.sender==='me'?'items-end':'items-start'}`}>
              {msg.sender==='system' && (
                <div className="bg-gray-100 border border-gray-200 text-gray-700 text-[11px] font-semibold px-4 py-1.5 rounded max-w-[90%] text-center">{msg.text}</div>
              )}
              {msg.sender!=='system' && (
                <div className={`flex flex-col ${msg.sender==='me'?'items-end':'items-start'} max-w-[85%]`}>
                  <span className="text-xs font-bold text-gray-500 px-1 mb-1">{msg.sender==='me'?'You':safeName.split(' ')[0]}</span>
                  <div className="relative group">
                    <div className={`px-4 py-2.5 rounded-lg text-sm ${msg.sender==='me'?'bg-black text-white rounded-tr-none':'bg-white text-gray-800 rounded-tl-none border border-gray-200 shadow-sm'}`}>
                      {msg.text}
                      {msg.translatedText && msg.showTranslation && (
                        <div className={`mt-2 pt-2 border-t text-sm ${msg.sender==='me'?'border-white/20 text-white/80':'border-gray-200 text-gray-600'}`}>
                          <span className="text-[10px] uppercase font-bold opacity-60 block mb-1">Translation</span>
                          {msg.translatedText}
                        </div>
                      )}
                    </div>
                    {msg.translatedText && (
                      <button onClick={()=>toggleTranslation(msg.id)}
                        className={`absolute top-2 ${msg.sender==='me'?'-left-8':'-right-8'} w-6 h-6 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black opacity-0 group-hover:opacity-100 transition-opacity`}>
                        <Languages size={12}/>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={chatEnd}/>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100">
          <div className="relative flex items-center">
            <input type="text" value={input} onChange={e=>{setInput(e.target.value);signal();}}
              onKeyDown={e=>e.key==='Enter'&&send()}
              placeholder="Type a message…"
              className="w-full bg-white border border-gray-200 rounded-md pl-4 pr-12 py-2.5 focus:ring-1 focus:ring-black focus:border-black text-sm shadow-sm focus:outline-none"/>
            <button onClick={send} disabled={!input.trim()}
              className={`absolute right-1 w-8 h-8 rounded flex items-center justify-center transition-colors ${input.trim()?'bg-black text-white hover:bg-gray-800':'bg-transparent text-gray-300'}`}>
              <Send size={16}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
