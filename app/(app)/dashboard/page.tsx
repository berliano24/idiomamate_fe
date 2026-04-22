import {
  Search,
  Globe,
  Plus,
  TrendingUp,
  Clock,
  Users,
  MessageSquare,
  Video,
  Star,
  ArrowRight,
  MoreHorizontal
} from 'lucide-react';
import Link from 'next/link';
import LearningGoalSelector from '../../components/LearningGoalSelector';

export const metadata = {
  title: 'Dashboard - IdiomaMate',
  description: 'Your language learning hub. Find partners, join lobbies, and practice conversations.',
};

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto w-full animate-fadeIn bg-[#FFFBF7] dark:bg-[#0a0a0a] min-h-screen p-4 md:p-8 rounded-3xl transition-colors">
      
      {/* Motivational Banner */}
      <div className="bg-gradient-to-r from-[#E56A45] to-[#F29472] rounded-3xl p-8 mb-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-black mb-2 tracking-tight">Ready to master a new language today?</h2>
          <p className="text-white/90 text-lg">Consistency is key. Set your learning goal below and jump right into a conversation with native speakers.</p>
        </div>
      </div>



      <LearningGoalSelector />

      {/* Primary Video Call Match Button */}
      <div className="mb-8">
        <Link href="/find-partner" className="group relative block w-full overflow-hidden rounded-3xl bg-black dark:bg-white text-white dark:text-black p-8 transition-all hover:scale-[1.01] shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
          <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/10 dark:bg-black/10 blur-3xl transition-transform group-hover:scale-110"></div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-opacity">
            <Video size={140} strokeWidth={1} />
          </div>
          <div className="relative z-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 dark:bg-black/10 px-4 py-1.5 text-sm font-semibold backdrop-blur-md border border-white/10 dark:border-black/10">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              Video Calling Active
            </div>
            <h2 className="mb-2 text-3xl font-black tracking-tight">Start 1-on-1 Video Match</h2>
            <p className="max-w-md text-white/80 dark:text-black/80 text-lg mb-6 leading-relaxed">
              Jump instantly into a live video conversation with a native speaker based on your selected language goals.
            </p>
            <div className="inline-flex items-center gap-3 rounded-xl bg-white dark:bg-black text-black dark:text-white px-6 py-3 font-bold transition-transform group-hover:translate-x-2">
              <Video size={20} />
              Find Video Partner Now
              <ArrowRight size={18} />
            </div>
          </div>
        </Link>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 gap-8">
        
        {/* Actions */}
        <div className="w-full">
          <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">More Options</h2>
          
          <div className="flex flex-col gap-3">
            <Link href="/lobbies" className="group bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-lg p-5 flex items-center justify-between hover:border-black dark:hover:border-white transition-colors shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-900 dark:text-white group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-colors">
                  <Globe size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Browse Public Lobbies</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">Join exist 5-person group conversations by topic or language.</p>
                </div>
              </div>
              <ArrowRight size={18} className="text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
            </Link>

            <Link href="/lobbies/create" className="group bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-lg p-5 flex items-center justify-between hover:border-black dark:hover:border-white transition-colors shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-900 dark:text-white group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-colors">
                  <Plus size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Create New Lobby</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">Host your own room and set the learning topic.</p>
                </div>
              </div>
              <ArrowRight size={18} className="text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
            </Link>

            <Link href="/messages" className="group bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-lg p-5 flex items-center justify-between hover:border-black dark:hover:border-white transition-colors shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-900 dark:text-white group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-colors">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Messages</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">Review history or continue conversations with previous partners.</p>
                </div>
              </div>
              <ArrowRight size={18} className="text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
