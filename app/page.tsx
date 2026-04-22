import Link from 'next/link';
import { ArrowRight, Video, MessageSquare, Globe, ShieldCheck, AreaChart, Users } from 'lucide-react';
import ExploreButton from './components/ExploreButton';

export const metadata = {
  title: 'IdiomaMate - Professional Language Exchange Platform',
  description: 'Master languages through authentic video conversations with native speakers worldwide. A professional platform for serious learners.',
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FCFBFA] text-gray-900 font-sans selection:bg-[#434CE6] selection:text-white flex flex-col relative overflow-hidden">
      {/* Warm glow on left */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#FFF2E0]/80 blur-[100px] rounded-full -translate-x-1/4 -translate-y-1/4 pointer-events-none z-0"></div>

      {/* Navigation */}
      <nav className="relative z-50 w-full pt-6">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex flex-wrap w-5 h-5 gap-[2px]">
              <div className="w-[9px] h-[9px] bg-[#FF7347] rounded-sm"></div>
              <div className="w-[9px] h-[9px] bg-[#FFC736] rounded-sm"></div>
              <div className="w-[9px] h-[9px] bg-[#FFC736] rounded-sm"></div>
              <div className="w-[9px] h-[9px] bg-[#FF7347] rounded-sm"></div>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#2B2B2B]">
              IDIOMAMATE
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10 text-[15px] font-medium text-[#4A4A4A]">
            <Link href="#features" className="hover:text-black transition-colors">Features</Link>
            <Link href="#methodology" className="hover:text-black transition-colors">Methodology</Link>
            <Link href="#enterprise" className="hover:text-black transition-colors">Enterprise</Link>
            <Link href="#reviews" className="hover:text-black transition-colors">Reviews</Link>
          </div>

          <div className="flex items-center gap-8">
            <Link href="/login" className="text-[#4A4A4A] font-medium hover:text-black transition-colors text-[15px]">
              Sign In
            </Link>
            <Link
              href="/register"
              className="bg-[#FFC736] hover:bg-[#F2B925] text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm text-[15px]"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 relative z-10">
        <section className="pt-20 pb-20 px-6 max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-100px)]">

          {/* Left Side: 50% Width - Text */}
          <div className="w-full lg:w-[45%] text-left flex flex-col items-start z-10 mt-10 lg:mt-0">
            <h1 className="text-5xl lg:text-[5rem] font-extrabold mb-6 tracking-tight text-[#2B2B2B] leading-[1.05]">
              Master languages <br />
              through authentic <br />
              connections.
            </h1>
            <p className="text-lg md:text-[1.1rem] text-[#5A5A5A] mb-10 leading-relaxed font-medium max-w-lg">
              A professional environment engineered for serious learners. Build fluency, confidence, and cross-cultural competence together.
            </p>

            <div className="flex flex-row items-center gap-8 w-full">
              <Link
                href="/register"
                className="bg-[#434CE6] hover:bg-[#3840C9] text-white px-8 py-4 rounded-xl font-medium transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Get Started
              </Link>
              <ExploreButton />
            </div>

            {/* Language Flags */}
            <div className="mt-12 flex flex-col items-center justify-center w-full max-w-[450px] bg-white/60 backdrop-blur-sm py-4 px-6 rounded-2xl border border-gray-100 shadow-sm">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Supported Languages Include</span>
              <div className="flex items-center justify-center gap-3">
                <img src="/flag_sa.png" alt="Arabic (Saudi Arabia)" className="w-10 h-10 object-contain hover:-translate-y-1 hover:scale-110 transition-all cursor-pointer mix-blend-multiply drop-shadow-sm" title="Arabic (Saudi Arabia)" />
                <img src="/flag_cn.png" alt="Mandarin (China)" className="w-10 h-10 object-contain hover:-translate-y-1 hover:scale-110 transition-all cursor-pointer mix-blend-multiply drop-shadow-sm" title="Mandarin (China)" />
                <img src="/flag_uk.png" alt="English" className="w-10 h-10 object-contain hover:-translate-y-1 hover:scale-110 transition-all cursor-pointer mix-blend-multiply drop-shadow-sm" title="English" />
                <img src="/flag_fr.png" alt="French" className="w-10 h-10 object-contain hover:-translate-y-1 hover:scale-110 transition-all cursor-pointer mix-blend-multiply drop-shadow-sm" title="French (France)" />
                <img src="/flag_ru.png" alt="Russian" className="w-10 h-10 object-contain hover:-translate-y-1 hover:scale-110 transition-all cursor-pointer mix-blend-multiply drop-shadow-sm" title="Russian (Russia)" />
                <img src="/flag_es.png" alt="Spanish" className="w-10 h-10 object-contain hover:-translate-y-1 hover:scale-110 transition-all cursor-pointer mix-blend-multiply drop-shadow-sm" title="Spanish" />
                <img src="/flag_ko.png" alt="korean" className="w-10 h-10 object-contain hover:-translate-y-1 hover:scale-110 transition-all cursor-pointer mix-blend-multiply drop-shadow-sm" title="korean" />
                <img src="/flag_jp.png" alt="japanese" className="w-10 h-10 object-contain hover:-translate-y-1 hover:scale-110 transition-all cursor-pointer mix-blend-multiply drop-shadow-sm" title="japanese" />
              </div>
            </div>
          </div>

          {/* Right Side: 50% Width - Visuals */}
          <div className="w-full lg:w-[50%] relative h-[500px] lg:h-[700px] mt-16 lg:mt-0 flex justify-end items-center">
            {/* Geometric Shapes */}
            <div className="absolute top-[5%] right-[5%] w-[350px] h-[350px] lg:w-[550px] lg:h-[550px] bg-[#FF7347] rounded-full -z-10"></div>
            <div className="absolute top-[0%] right-[0%] w-[150px] h-[150px] lg:w-[250px] lg:h-[250px] bg-[#FFC736] rounded-full -z-10"></div>
            <div className="absolute bottom-[5%] right-[-5%] w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] bg-[#434CE6] rounded-full -z-10"></div>

            {/* Small sparkle */}

            {/* Main Image */}
            <div className="absolute inset-x-0 bottom-0 top-[5%] flex items-end justify-center pointer-events-none overflow-visible z-10">
              <img src="/video_call_white_bg.png" alt="Video Call Interface" className="max-h-[105%] w-3xl object-contain mix-blend-multiply drop-shadow-2xl translate-x-4 translate-y-4" />
            </div>
          </div>
        </section>

        {/* Features Minimalist Layout */}
        <section id="features" className="py-24 bg-[#FCFBFA]">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-24">
              <h2 className="text-xs font-bold tracking-widest text-[#434CE6] uppercase mb-3">Core Capabilities</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-[#2B2B2B] mb-6 tracking-tight">Structured architecture to prevent conversation breakdown.</h3>
              <p className="text-[#5A5A5A] text-lg leading-relaxed font-medium">
                Casual language apps fail because they lack structure. We provide robust scaffolding to eliminate language anxiety and ensure productive learning sessions.
              </p>
            </div>

            <div className="flex flex-col gap-32">
              {/* Feature 1: Precision Matchmaking (Image Left, Text Right) */}
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="w-full lg:w-1/2 relative flex justify-center">
                   <div className="absolute inset-0 bg-[#FFF2E0] rounded-full blur-3xl opacity-60 -z-10 translate-y-4 scale-75"></div>
                   <img src="/feature_matchmaking.png" alt="Precision Matchmaking" className="w-[80%] h-auto object-contain mix-blend-multiply drop-shadow-2xl" />
                </div>
                <div className="w-full lg:w-1/2 flex flex-col items-start">
                  <div className="w-16 h-16 bg-white border border-gray-100 shadow-sm text-[#FF7347] rounded-2xl flex items-center justify-center mb-8">
                    <Video size={30} />
                  </div>
                  <h4 className="text-3xl lg:text-4xl font-extrabold text-[#2B2B2B] mb-5 tracking-tight">Precision Matchmaking</h4>
                  <p className="text-[#5A5A5A] text-lg leading-relaxed mb-6 font-medium">
                    Stop wasting time swiping. Define your target language proficiency, specific learning goals, and mandatory icebreaker questions before ever joining a session.
                  </p>
                  <p className="text-[#5A5A5A] text-lg leading-relaxed font-medium">
                    Our algorithm ensures that you only connect with partners who align with your learning style, guaranteeing immediate contextual alignment and highly productive 1-on-1 video calls.
                  </p>
                </div>
              </div>

              {/* Feature 2: Dynamic Scaffolding (Text Left, Image Right) */}
              <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
                <div className="w-full lg:w-1/2 relative flex justify-center">
                   <div className="absolute inset-0 bg-[#E0F2FE] rounded-full blur-3xl opacity-60 -z-10 translate-y-4 scale-75"></div>
                   <img src="/cartoon_student.png" alt="Dynamic Scaffolding" className="w-[80%] h-auto object-contain mix-blend-multiply drop-shadow-2xl" />
                </div>
                <div className="w-full lg:w-1/2 flex flex-col items-start">
                  <div className="w-16 h-16 bg-white border border-gray-100 shadow-sm text-[#434CE6] rounded-2xl flex items-center justify-center mb-8">
                    <MessageSquare size={30} />
                  </div>
                  <h4 className="text-3xl lg:text-4xl font-extrabold text-[#2B2B2B] mb-5 tracking-tight">Dynamic Scaffolding</h4>
                  <p className="text-[#5A5A5A] text-lg leading-relaxed mb-6 font-medium">
                    Never worry about awkward silences or running out of things to say. Our built-in conversational framework analyzes the flow of your video call.
                  </p>
                  <p className="text-[#5A5A5A] text-lg leading-relaxed font-medium">
                    If the conversation stalls, the system automatically suggests systematic topic generators, cultural trivia, and contextual grammar prompts directly on your screen to effortlessly revive the dialogue.
                  </p>
                </div>
              </div>

              {/* Feature 3: Public Lobbies (Image Left, Text Right) */}
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="w-full lg:w-1/2 relative flex justify-center">
                   <div className="absolute inset-0 bg-[#FCE7F3] rounded-full blur-3xl opacity-60 -z-10 translate-y-4 scale-75"></div>
                   <img src="/video_call_cartoon_v2.png" alt="Public Lobbies" className="w-[80%] h-auto object-contain mix-blend-multiply drop-shadow-2xl" />
                </div>
                <div className="w-full lg:w-1/2 flex flex-col items-start">
                  <div className="w-16 h-16 bg-white border border-gray-100 shadow-sm text-pink-500 rounded-2xl flex items-center justify-center mb-8">
                    <Globe size={30} />
                  </div>
                  <h4 className="text-3xl lg:text-4xl font-extrabold text-[#2B2B2B] mb-5 tracking-tight">Public Lobbies</h4>
                  <p className="text-[#5A5A5A] text-lg leading-relaxed mb-6 font-medium">
                    Learning is better together. Join organized group environments tailored to specific proficiency levels and topics. 
                  </p>
                  <p className="text-[#5A5A5A] text-lg leading-relaxed font-medium">
                    Foster a sense of community by practicing spontaneous multi-participant communication. Host up to 5 participants per room, moderate discussions, and build fluency in a relaxed, social atmosphere.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>


      </main>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-black flex items-center justify-center text-white font-bold text-[10px] tracking-tighter">
              iM
            </div>
            <span className="font-bold text-gray-900 tracking-tight">IdiomaMate</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-gray-500">
            <Link href="#" className="hover:text-black transition-colors">Platform</Link>
            <Link href="#" className="hover:text-black transition-colors">Documentation</Link>
            <Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-black transition-colors">Terms of Service</Link>
          </div>
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} IdiomaMate. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
