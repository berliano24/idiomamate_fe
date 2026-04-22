'use client';

import { useState, useEffect, useRef } from 'react';
import { User, Camera, Globe, Mail, CheckCircle2, Lock, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('user@example.com');
  const [language, setLanguage] = useState('English');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved settings from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem('idiomamate_display_name');
    const savedLanguage = localStorage.getItem('idiomamate_language');
    const savedAvatar = localStorage.getItem('idiomamate_avatar');
    
    if (savedName) setDisplayName(savedName);
    else setDisplayName('John Doe'); // default mockup
    
    if (savedLanguage) setLanguage(savedLanguage);
    if (savedAvatar) setAvatarUrl(savedAvatar);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setIsSuccess(false);

    // Simulate API delay
    setTimeout(() => {
      localStorage.setItem('idiomamate_display_name', displayName);
      localStorage.setItem('idiomamate_language', language);
      if (avatarUrl) {
        localStorage.setItem('idiomamate_avatar', avatarUrl);
      }
      
      setIsSaving(false);
      setIsSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeInUp pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Account Settings</h1>
        <p className="text-gray-500 mt-2">Manage your profile information and website preferences.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Sidebar / Navigation (Simulated) */}
        <div className="md:w-64 bg-gray-50 border-r border-gray-200 p-6 hidden md:block">
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white text-black font-semibold shadow-sm border border-gray-200">
              <User size={18} /> Profile
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 hover:bg-gray-100 font-medium transition-colors">
              <Globe size={18} /> Preferences
            </a>
          </nav>
        </div>

        {/* Form Content */}
        <div className="flex-1 p-8">
          <form onSubmit={handleSave} className="space-y-10">
            
            {/* Profile Picture Section */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">Profile Picture</h2>
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center relative">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User size={40} className="text-gray-400" />
                    )}
                    
                    {/* Hover Overlay */}
                    <div 
                      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="text-white" size={24} />
                    </div>
                  </div>
                </div>
                
                <div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept="image/*"
                  />
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors shadow-sm text-sm"
                  >
                    Upload New Picture
                  </button>
                  <p className="text-xs text-gray-400 mt-2">JPG, GIF or PNG. Max size of 2MB.</p>
                </div>
              </div>
            </section>

            {/* Personal Info Section */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="displayName" className="block text-sm font-bold text-gray-700 mb-2">Display Name</label>
                  <div className="relative">
                    <div className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-11 pr-4 py-3 focus:ring-1 focus:ring-black focus:border-black transition-all text-sm text-gray-900 focus:outline-none focus:bg-white shadow-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      disabled
                      className="w-full bg-gray-100 border border-gray-200 rounded-lg pl-11 pr-4 py-3 text-sm text-gray-500 cursor-not-allowed shadow-sm"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5">Email cannot be changed.</p>
                </div>
              </div>
            </section>

            {/* Security Section */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">Security</h2>
              <div className="flex items-center justify-between max-w-2xl bg-gray-50 border border-gray-200 rounded-xl px-5 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500">
                    <Lock size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Password</p>
                    <p className="text-xs text-gray-400 mt-0.5">Update your password to keep your account secure.</p>
                  </div>
                </div>
                <button
                  type="button"
                  id="change-password-btn"
                  onClick={() => router.push('/change-password')}
                  className="flex items-center gap-1.5 text-sm font-semibold text-black hover:text-gray-600 transition-colors whitespace-nowrap"
                >
                  Change Password <ChevronRight size={16} />
                </button>
              </div>
            </section>

            {/* Preferences Section */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">System Preferences</h2>
              <div>
                <label htmlFor="language" className="block text-sm font-bold text-gray-700 mb-2">Website Language</label>
                <p className="text-sm text-gray-500 mb-3">Select the language you want to navigate the application in.</p>
                <div className="relative max-w-md">
                  <div className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400">
                    <Globe size={18} />
                  </div>
                  <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-11 pr-10 py-3 focus:ring-1 focus:ring-black focus:border-black transition-all text-sm text-gray-900 appearance-none focus:outline-none focus:bg-white cursor-pointer font-medium shadow-sm"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish (Español)</option>
                    <option value="Japanese">Japanese (日本語)</option>
                    <option value="Korean">Korean (한국어)</option>
                    <option value="French">French (Français)</option>
                  </select>
                  <div className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-400 pointer-events-none">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              </div>
            </section>

            <div className="pt-4 flex items-center gap-4 flex-wrap">
              <button
                type="submit"
                disabled={isSaving}
                id="save-changes-btn"
                className={`py-3 px-8 rounded-lg font-medium shadow-sm transition-all flex items-center justify-center min-w-[140px] ${
                  isSaving
                    ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                    : 'bg-black hover:bg-gray-800 text-white border border-transparent'
                }`}
              >
                {isSaving ? (
                  <><span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2"></span> Saving...</>
                ) : (
                  'Save Changes'
                )}
              </button>

              <button
                type="button"
                id="goto-change-password-btn"
                onClick={() => router.push('/change-password')}
                className="py-3 px-8 rounded-lg font-medium shadow-sm transition-all border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 flex items-center gap-2"
              >
                <Lock size={16} /> Change Password
              </button>
              
              {isSuccess && (
                <div className="flex items-center text-green-600 text-sm font-medium animate-fadeIn">
                  <CheckCircle2 size={16} className="mr-1.5" /> Settings saved successfully
                </div>
              )}
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}
