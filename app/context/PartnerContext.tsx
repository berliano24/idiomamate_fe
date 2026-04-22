'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface PartnerData {
  // User's pre-match selections
  language: string;
  level: string;
  myTopics: string[];

  // Populated when a match is found
  partnerTopics: string[];
  partnerName: string;
  partnerFlag: string;
  partnerNative: string;

  // Setters
  setLanguage: (v: string) => void;
  setLevel: (v: string) => void;
  setMyTopics: (v: string[]) => void;
  setPartnerInfo: (topics: string[], name: string, flag: string, native: string) => void;
}

const PartnerContext = createContext<PartnerData | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export function PartnerProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<string>('English');
  const [level, setLevelState] = useState<string>('Beginner');
  const [myTopics, setMyTopicsState] = useState<string[]>([]);
  const [partnerTopics, setPartnerTopics] = useState<string[]>([]);
  const [partnerName, setPartnerName] = useState('Kenji M.');
  const [partnerFlag, setPartnerFlag] = useState('🇯🇵');
  const [partnerNative, setPartnerNative] = useState('Japanese (Native)');

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('idiomamate_partner_ctx');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.language) setLanguageState(parsed.language);
        if (parsed.level) setLevelState(parsed.level);
        if (parsed.myTopics) setMyTopicsState(parsed.myTopics);
        if (parsed.partnerTopics) setPartnerTopics(parsed.partnerTopics);
        if (parsed.partnerName) setPartnerName(parsed.partnerName);
        if (parsed.partnerFlag) setPartnerFlag(parsed.partnerFlag);
        if (parsed.partnerNative) setPartnerNative(parsed.partnerNative);
      } catch { /* ignore */ }
    }
  }, []);

  const persist = (patch: object) => {
    const current = (() => {
      try { return JSON.parse(localStorage.getItem('idiomamate_partner_ctx') || '{}'); } catch { return {}; }
    })();
    localStorage.setItem('idiomamate_partner_ctx', JSON.stringify({ ...current, ...patch }));
  };

  const setLanguage = (v: string) => { setLanguageState(v); persist({ language: v }); };
  const setLevel = (v: string) => { setLevelState(v); persist({ level: v }); };
  const setMyTopics = (v: string[]) => { setMyTopicsState(v); persist({ myTopics: v }); };
  const setPartnerInfo = (topics: string[], name: string, flag: string, native: string) => {
    setPartnerTopics(topics);
    setPartnerName(name);
    setPartnerFlag(flag);
    setPartnerNative(native);
    persist({ partnerTopics: topics, partnerName: name, partnerFlag: flag, partnerNative: native });
  };

  return (
    <PartnerContext.Provider value={{
      language, level, myTopics, partnerTopics, partnerName, partnerFlag, partnerNative,
      setLanguage, setLevel, setMyTopics, setPartnerInfo,
    }}>
      {children}
    </PartnerContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function usePartner(): PartnerData {
  const ctx = useContext(PartnerContext);
  if (!ctx) throw new Error('usePartner must be used inside <PartnerProvider>');
  return ctx;
}
