'use client';

import { useState } from 'react';
import { Globe, GraduationCap, CheckCircle2, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePartner } from '../context/PartnerContext';

const LANGUAGES = [
  { id: 'ar', name: 'Arabic', country: 'SAUDI ARABIA', code: 'SA', gradient: 'from-[#8CB3A3] to-[#B3D4C7]', flag: '/flag_sa.png' },
  { id: 'zh', name: 'Mandarin', country: 'CHINA', code: 'CN', gradient: 'from-[#B23B3B] to-[#D95D5D]', flag: '/flag_cn.png' },
  { id: 'en', name: 'English', country: 'UNITED KINGDOM', code: 'GB', gradient: 'from-[#2A3182] to-[#121542]', flag: '/flag_uk.png' },
  { id: 'ru', name: 'Russian', country: 'RUSSIA', code: 'RU', gradient: 'from-[#4B6684] to-[#6988A8]', flag: '/flag_ru.png' },
  { id: 'es', name: 'Spanish', country: 'SPAIN', code: 'ES', gradient: 'from-[#D4A37A] to-[#E8C2A1]', flag: '/flag_es.png' },
  { id: 'ko', name: 'Korean', country: 'SOUTH KOREA', code: 'KR', gradient: 'from-[#3B82B2] to-[#60AEE6]', flag: '/flag_ko.png' },
  { id: 'ja', name: 'Japanese', country: 'JAPAN', code: 'JP', gradient: 'from-[#B25C67] to-[#D98993]', flag: '/flag_jp.png' },
  { id: 'fr', name: 'French', country: 'FRANCE', code: 'FR', gradient: 'from-[#54739E] to-[#80A4D6]', flag: '/flag_fr.png' },
];

// Map the goal-selector levels → PartnerContext levels used in find-partner
const LEVELS = [
  { value: 'Beginner', label: 'Beginner', ctxLevel: 'Beginner', description: 'Just starting out' },
  { value: 'Intermediate', label: 'Intermediate', ctxLevel: 'Intermediate', description: 'Know some basics' },
  { value: 'Advanced', label: 'Advanced', ctxLevel: 'Advanced', description: 'Fluent or advanced' },
];

export default function LearningGoalSelector() {
  const router = useRouter();
  const { setLanguage, setLevel, language, level } = usePartner();

  const [activeIndex, setActiveIndex] = useState(2);
  const [showLevels, setShowLevels] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const activeLang = LANGUAGES[activeIndex];

  const handlePrev = () => { setActiveIndex(prev => prev > 0 ? prev - 1 : LANGUAGES.length - 1); setShowLevels(false); };
  const handleNext = () => { setActiveIndex(prev => prev < LANGUAGES.length - 1 ? prev + 1 : 0); setShowLevels(false); };

  const handleSave = () => {
    if (!selectedLevel) return;
    const lvlEntry = LEVELS.find(l => l.value === selectedLevel)!;
    // Push into PartnerContext so find-partner skips Step 1
    setLanguage(activeLang.name);
    setLevel(lvlEntry.ctxLevel);
    setIsSaved(true);
    // Redirect to find-partner → topics step only
    router.push('/find-partner?from=goal');
  };

  // Saved / confirmed state (shown if user navigates back to dashboard)
  if (isSaved) {
    const lvl = LEVELS.find(l => l.value === selectedLevel);
    return (
      <div className="bg-[#FFF8F0] border border-[#F2DCC2] rounded-2xl p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between shadow-sm animate-fadeIn">
        <div className="flex items-center gap-5">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-md bg-gradient-to-br ${activeLang.gradient}`}>
            {activeLang.code}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
              Learning {activeLang.name} <CheckCircle2 className="text-[#E56A45]" size={20} />
            </h3>
            <p className="text-sm text-gray-600 font-medium">Target Level: {lvl?.label}</p>
          </div>
        </div>
        <div className="mt-6 md:mt-0 flex items-center gap-3">
          <button
            onClick={() => { setIsSaved(false); setShowLevels(false); setSelectedLevel(''); }}
            className="text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors px-4 py-2"
          >
            Change Goal
          </button>
          <Link
            href="/find-partner?from=goal"
            className="bg-[#E56A45] hover:bg-[#D45934] text-white px-6 py-2.5 rounded-full font-bold shadow-md transition-colors flex items-center gap-2"
          >
            Find a Partner <Play fill="currentColor" size={14} />
          </Link>
          <Link
            href="/lobbies"
            className="bg-white border border-gray-200 hover:border-gray-300 text-gray-800 px-6 py-2.5 rounded-full font-bold shadow-sm transition-colors"
          >
            Join Lobbies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-fadeInUp">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#E56A45] flex items-center justify-center">
          <Globe size={20} />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-gray-900">Set your learning goal</h2>
          <p className="text-gray-500 text-sm">Slide to find a language. Tap the center card to choose your level.</p>
        </div>
      </div>

      <div className="relative w-full h-[400px] mt-8 flex items-center justify-center overflow-hidden rounded-2xl bg-[#FCFAFB]">

        {/* Navigation Arrows */}
        <button onClick={handlePrev} className="absolute left-4 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur shadow-md flex items-center justify-center text-gray-800 hover:scale-105 transition-transform">
          <ChevronLeft size={24} />
        </button>
        <button onClick={handleNext} className="absolute right-4 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur shadow-md flex items-center justify-center text-gray-800 hover:scale-105 transition-transform">
          <ChevronRight size={24} />
        </button>

        {/* Carousel Cards */}
        <div className="relative w-full h-full flex items-center justify-center perspective-1000">
          {LANGUAGES.map((lang, index) => {
            const offset = index - activeIndex;
            let visualOffset = offset;
            if (offset > 3) visualOffset = offset - LANGUAGES.length;
            if (offset < -3) visualOffset = offset + LANGUAGES.length;
            const isActive = offset === 0;
            const isVisible = Math.abs(visualOffset) <= 2;
            if (!isVisible) return null;

            return (
              <div
                key={lang.id}
                onClick={() => { if (!isActive) setActiveIndex(index); }}
                className={`absolute w-[240px] md:w-[280px] h-[340px] rounded-[2rem] p-6 cursor-pointer transition-all duration-500 ease-out flex flex-col shadow-xl bg-gradient-to-br ${lang.gradient} text-white ${isActive ? 'z-10 scale-100' : 'z-0 opacity-60'}`}
                style={{ transform: `translateX(${visualOffset * 180}px) scale(${isActive ? 1 : 0.85}) ${!isActive ? 'rotateY(' + (visualOffset * -15) + 'deg)' : ''}` }}
              >
                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-[2rem]">
                  <span className="text-[140px] font-black opacity-10 select-none tracking-tighter">{lang.code}</span>
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-auto">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-xs font-bold">{lang.code}</div>
                    {lang.flag && (
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 shadow-md">
                        <img src={lang.flag} alt={`${lang.country} flag`} className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div className={`transition-all duration-300 ${isActive && showLevels ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                    <p className="text-[10px] font-bold tracking-[0.2em] opacity-80 uppercase mb-1">{lang.country}</p>
                    <h3 className="text-4xl font-extrabold tracking-tight">{lang.name}</h3>
                  </div>

                  {isActive && !showLevels && (
                    <button
                      onClick={e => { e.stopPropagation(); setShowLevels(true); }}
                      className="mt-6 w-full py-3.5 rounded-full bg-[#E56A45] hover:bg-[#D45934] text-white font-bold text-sm shadow-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <GraduationCap size={18} /> Choose level
                    </button>
                  )}

                  {/* Level overlay */}
                  {isActive && showLevels && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-md rounded-[2rem] p-6 flex flex-col justify-center animate-fadeIn z-20">
                      <h4 className="text-lg font-bold mb-4 text-center">Your Level</h4>
                      <div className="flex flex-col gap-2">
                        {LEVELS.map(lv => (
                          <button
                            key={lv.value}
                            onClick={e => { e.stopPropagation(); setSelectedLevel(lv.value); }}
                            className={`p-3 rounded-xl text-left transition-all ${selectedLevel === lv.value
                                ? 'bg-[#E56A45] text-white shadow-md'
                                : 'bg-white/20 hover:bg-white/30 text-white'
                              }`}
                          >
                            <div className="font-bold text-sm">{lv.label}</div>
                            <div className="text-[11px] opacity-70 mt-0.5">{lv.description}</div>
                          </button>
                        ))}
                      </div>
                      <div className="mt-auto flex gap-2 pt-4">
                        <button
                          onClick={e => { e.stopPropagation(); setShowLevels(false); setSelectedLevel(''); }}
                          className="flex-1 py-3 rounded-full bg-white/20 text-white font-bold text-sm"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={e => { e.stopPropagation(); handleSave(); }}
                          disabled={!selectedLevel}
                          className="flex-1 py-3 rounded-full bg-[#E56A45] disabled:opacity-50 text-white font-bold text-sm transition-colors"
                        >
                          Confirm →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 flex gap-2">
          {LANGUAGES.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-6 bg-[#E56A45]' : 'w-1.5 bg-gray-300'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
