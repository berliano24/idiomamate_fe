'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Globe, Hash, Users, BookOpen, ChevronDown } from 'lucide-react';

export default function CreateLobbyPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    topic: '',
    language: 'English',
    level: 'Beginner',
    capacity: 5
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to create lobby
    setTimeout(() => {
      setIsSubmitting(false);
      // Simulate redirect to lobbies page
      router.push('/lobbies');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto animate-fadeInUp">
      {/* Header */}
      <div className="mb-8">
        <Link href="/lobbies" className="inline-flex items-center text-gray-500 hover:text-black font-medium text-sm mb-6 transition-colors">
          <ArrowLeft size={16} className="mr-1" /> Back to Lobbies
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create a Public Lobby</h1>
        <p className="text-gray-500 mt-2">Set up a group conversation and invite others to join your topic.</p>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {/* Main Info */}
          <div className="space-y-5">
            <div>
              <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2">
                Lobby Title
              </label>
              <div className="relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400">
                  <Hash size={18} />
                </div>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  placeholder="e.g. Kyoto Travel Recommendations 🇯🇵"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-11 pr-4 py-3 focus:ring-1 focus:ring-black focus:border-black transition-all text-gray-900 focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="topic" className="block text-sm font-bold text-gray-700 mb-2">
                Discussion Topic
              </label>
              <div className="relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400">
                  <BookOpen size={18} />
                </div>
                <input
                  type="text"
                  id="topic"
                  name="topic"
                  required
                  placeholder="e.g. Casual Conversation, Tech Debate..."
                  value={formData.topic}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-11 pr-4 py-3 focus:ring-1 focus:ring-black focus:border-black transition-all text-gray-900 focus:outline-none focus:bg-white"
                />
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="language" className="block text-sm font-bold text-gray-700 mb-2">
                Language
              </label>
              <div className="relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400">
                  <Globe size={18} />
                </div>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-11 pr-10 py-3 focus:ring-1 focus:ring-black focus:border-black transition-all text-gray-900 appearance-none focus:outline-none focus:bg-white cursor-pointer font-medium"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Korean">Korean</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
                <div className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-400 pointer-events-none">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="level" className="block text-sm font-bold text-gray-700 mb-2">
                Proficiency Level
              </label>
              <div className="relative">
                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-1 focus:ring-black focus:border-black transition-all text-gray-900 appearance-none focus:outline-none focus:bg-white cursor-pointer font-medium"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Native">Native</option>
                </select>
                <div className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-400 pointer-events-none">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="capacity" className="block text-sm font-bold text-gray-700 mb-2">
                Max Capacity
              </label>
              <div className="relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400">
                  <Users size={18} />
                </div>
                <select
                  id="capacity"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-11 pr-10 py-3 focus:ring-1 focus:ring-black focus:border-black transition-all text-gray-900 appearance-none focus:outline-none focus:bg-white cursor-pointer font-medium"
                >
                  <option value={2}>2 People</option>
                  <option value={3}>3 People</option>
                  <option value={4}>4 People</option>
                  <option value={5}>5 People</option>
                </select>
                <div className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-400 pointer-events-none">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 flex gap-4">
            <Link
              href="/lobbies"
              className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3.5 rounded-lg text-center transition-colors shadow-sm"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting || !formData.title.trim() || !formData.topic.trim()}
              className={`flex-[2] py-3.5 rounded-lg font-medium shadow-sm transition-all flex items-center justify-center gap-2 ${
                isSubmitting || !formData.title.trim() || !formData.topic.trim()
                  ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                  : 'bg-black hover:bg-gray-800 text-white border border-transparent'
              }`}
            >
              {isSubmitting ? (
                <><span className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span> Creating...</>
              ) : (
                'Create Lobby'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
