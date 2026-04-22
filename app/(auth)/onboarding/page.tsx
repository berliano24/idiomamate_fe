'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Globe,
  Target,
  BarChart3,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇧🇷' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
  { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
  { code: 'th', name: 'Thai', flag: '🇹🇭' },
];

const proficiencyLevels = [
  {
    value: 'beginner',
    label: 'Beginner',
    emoji: '🌱',
    description: 'I know a few words and basic phrases',
  },
  {
    value: 'intermediate',
    label: 'Intermediate',
    emoji: '📚',
    description: 'I can hold simple conversations',
  },
  {
    value: 'advanced',
    label: 'Advanced',
    emoji: '🚀',
    description: 'I\'m fluent but want to polish my skills',
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [nativeLanguage, setNativeLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [proficiency, setProficiency] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [nativeSearch, setNativeSearch] = useState('');
  const [targetSearch, setTargetSearch] = useState('');

  const totalSteps = 3;

  const canProceed = () => {
    if (step === 1) return nativeLanguage !== '';
    if (step === 2) return targetLanguage !== '' && targetLanguage !== nativeLanguage;
    if (step === 3) return proficiency !== '';
    return false;
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    // Simulate saving profile
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    router.push('/dashboard');
  };

  const filteredNativeLanguages = languages.filter((l) =>
    l.name.toLowerCase().includes(nativeSearch.toLowerCase())
  );

  const filteredTargetLanguages = languages
    .filter((l) => l.code !== nativeLanguage)
    .filter((l) => l.name.toLowerCase().includes(targetSearch.toLowerCase()));

  return (
    <>
      {/* Logo */}
      <div className="auth-logo">
        <div className="auth-logo-icon">iM</div>
        <span className="auth-logo-text">IdiomaMate</span>
      </div>

      <div className="auth-card onboarding-card animate-fadeInUp">
        {/* Progress Bar */}
        <div className="onboarding-progress">
          <div className="onboarding-progress-bar">
            <div
              className="onboarding-progress-fill"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
          <div className="onboarding-progress-label">
            Step {step} of {totalSteps}
          </div>
        </div>

        {/* Step 1: Native Language */}
        {step === 1 && (
          <div className="onboarding-step animate-fadeInUp" key="step1">
            <div className="onboarding-step-icon">
              <Globe size={28} />
            </div>
            <h2 className="onboarding-step-title">What&apos;s your native language?</h2>
            <p className="onboarding-step-desc">
              This helps us match you with the perfect conversation partners
            </p>

            <div className="onboarding-search-wrapper">
              <input
                type="text"
                className="onboarding-search"
                placeholder="Search languages..."
                value={nativeSearch}
                onChange={(e) => setNativeSearch(e.target.value)}
                id="native-language-search"
              />
            </div>

            <div className="onboarding-language-grid">
              {filteredNativeLanguages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  className={`onboarding-language-card ${nativeLanguage === lang.code ? 'selected' : ''}`}
                  onClick={() => setNativeLanguage(lang.code)}
                  id={`native-lang-${lang.code}`}
                >
                  <span className="onboarding-language-flag">{lang.flag}</span>
                  <span className="onboarding-language-name">{lang.name}</span>
                  {nativeLanguage === lang.code && (
                    <CheckCircle2 size={16} className="onboarding-language-check" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Target Language */}
        {step === 2 && (
          <div className="onboarding-step animate-fadeInUp" key="step2">
            <div className="onboarding-step-icon target">
              <Target size={28} />
            </div>
            <h2 className="onboarding-step-title">What language do you want to learn?</h2>
            <p className="onboarding-step-desc">
              Choose the language you want to practice and improve
            </p>

            <div className="onboarding-search-wrapper">
              <input
                type="text"
                className="onboarding-search"
                placeholder="Search languages..."
                value={targetSearch}
                onChange={(e) => setTargetSearch(e.target.value)}
                id="target-language-search"
              />
            </div>

            <div className="onboarding-language-grid">
              {filteredTargetLanguages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  className={`onboarding-language-card ${targetLanguage === lang.code ? 'selected' : ''}`}
                  onClick={() => setTargetLanguage(lang.code)}
                  id={`target-lang-${lang.code}`}
                >
                  <span className="onboarding-language-flag">{lang.flag}</span>
                  <span className="onboarding-language-name">{lang.name}</span>
                  {targetLanguage === lang.code && (
                    <CheckCircle2 size={16} className="onboarding-language-check" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Proficiency Level */}
        {step === 3 && (
          <div className="onboarding-step animate-fadeInUp" key="step3">
            <div className="onboarding-step-icon proficiency">
              <BarChart3 size={28} />
            </div>
            <h2 className="onboarding-step-title">What&apos;s your current level?</h2>
            <p className="onboarding-step-desc">
              In {languages.find((l) => l.code === targetLanguage)?.name || 'your target language'}, how would you describe your skills?
            </p>

            <div className="onboarding-proficiency-group">
              {proficiencyLevels.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  className={`onboarding-proficiency-card ${proficiency === level.value ? 'selected' : ''}`}
                  onClick={() => setProficiency(level.value)}
                  id={`proficiency-${level.value}`}
                >
                  <div className="onboarding-proficiency-radio">
                    <div className="onboarding-proficiency-radio-inner" />
                  </div>
                  <span className="onboarding-proficiency-emoji">{level.emoji}</span>
                  <div className="onboarding-proficiency-info">
                    <span className="onboarding-proficiency-label">{level.label}</span>
                    <span className="onboarding-proficiency-desc">{level.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="onboarding-actions">
          {step > 1 && (
            <button
              type="button"
              className="onboarding-back-btn"
              onClick={handleBack}
              id="onboarding-back-btn"
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
          )}

          <div style={{ flex: 1 }} />

          {step < totalSteps ? (
            <button
              type="button"
              className={`auth-submit-btn onboarding-next-btn ${!canProceed() ? 'disabled' : ''}`}
              onClick={handleNext}
              disabled={!canProceed()}
              id="onboarding-next-btn"
            >
              <span>Continue</span>
              <ArrowRight size={18} />
            </button>
          ) : (
            <button
              type="button"
              className={`auth-submit-btn onboarding-next-btn ${!canProceed() || isLoading ? 'disabled' : ''} ${isLoading ? 'loading' : ''}`}
              onClick={handleComplete}
              disabled={!canProceed() || isLoading}
              id="onboarding-complete-btn"
            >
              {isLoading ? (
                <span className="auth-spinner" />
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Start Learning</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
