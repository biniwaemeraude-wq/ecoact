/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Recycle, 
  MapPin, 
  Building2, 
  BookOpen, 
  Menu, 
  X, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck,
  Activity,
  Users,
  Radio,
  Leaf
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'landing' | 'map' | 'b2b' | 'education' | 'admin';
  setActiveTab: (tab: 'landing' | 'map' | 'b2b' | 'education' | 'admin') => void;
  onOpenQuickQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenQuickQuote,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [liveVisitors, setLiveVisitors] = useState(28);

  // Read stored or dynamic live visitors
  useEffect(() => {
    const checkStats = () => {
      const stored = localStorage.getItem('ecocollecte_admin_stats');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.liveVisitors) {
            setLiveVisitors(parsed.liveVisitors);
          }
        } catch (e) {}
      }
    };
    checkStats();
    const timer = setInterval(checkStats, 3000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    {
      id: 'landing' as const,
      label: 'Accueil',
      icon: Sparkles,
      badge: null,
    },
    {
      id: 'map' as const,
      label: 'Carte des Bacs',
      icon: MapPin,
      badge: 'Abidjan',
    },
    {
      id: 'b2b' as const,
      label: 'Annuaire Collecteurs',
      icon: Building2,
      badge: 'B2B Pro',
    },
    {
      id: 'education' as const,
      label: 'Guide & Quiz Jeux',
      icon: BookOpen,
      badge: 'Quiz & Jeux',
    },
    {
      id: 'admin' as const,
      label: 'Admin (Visiteurs)',
      icon: Activity,
      badge: `${liveVisitors} en direct`,
    },
  ];

  const handleSelectTab = (tab: 'landing' | 'map' | 'b2b' | 'education' | 'admin') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-lime-200/80 shadow-xs">
      {/* Top micro-bar with tri-green gradient (Émeraude, Prairie, Vert Pomme) */}
      <div className="bg-gradient-to-r from-emerald-950 via-green-950 to-emerald-900 text-lime-100 text-xs py-1.5 px-4 hidden md:block border-b border-lime-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-lime-400 to-green-500 text-slate-950 shadow-xs">
              Abidjan • Côte d'Ivoire
            </span>
            <span className="text-emerald-100 font-medium">
              EcoAct : Agir pour la salubrité & l'économie circulaire (Partenariat ANAGED).
            </span>
          </div>

          <div className="flex items-center gap-4 text-emerald-200">
            {/* Live Visitor Widget in Header */}
            <button
              onClick={() => handleSelectTab('admin')}
              className="flex items-center gap-1.5 bg-emerald-900/90 hover:bg-emerald-800 text-lime-300 px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-lime-400/40 transition-colors shadow-xs"
              title="Cliquer pour ouvrir le tableau de bord administrateur"
            >
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping" />
              <span>{liveVisitors} internautes en direct</span>
            </button>

            <span className="opacity-40">|</span>

            <button 
              onClick={() => handleSelectTab('admin')} 
              className="hover:text-white transition-colors flex items-center gap-1 text-[11px] font-bold underline text-lime-300"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
              <span>Espace Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand: EcoAct with tri-color green blend (Émeraude, Prairie, Vert Pomme) */}
          <div 
            onClick={() => handleSelectTab('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Tri-green badge icon */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-emerald-700 via-green-600 to-lime-400 flex items-center justify-center text-white shadow-md shadow-green-700/25 group-hover:scale-105 group-hover:rotate-3 transition-transform">
              <Leaf className="w-6 h-6 text-white drop-shadow-xs" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  Eco<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-lime-500 font-extrabold">Act</span>
                </span>
                <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 bg-gradient-to-r from-lime-100 to-green-100 text-emerald-900 rounded-full border border-lime-300">
                  Abidjan
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Recyclage Citoyen & Collecte Déchets B2B
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-50/90 p-1.5 rounded-2xl border border-lime-200/60 shadow-2xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isAdminItem = item.id === 'admin';
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? isAdminItem
                        ? 'bg-slate-900 text-lime-400 shadow-sm'
                        : 'bg-gradient-to-r from-emerald-700 via-green-600 to-lime-600 text-white shadow-sm shadow-green-800/30 font-bold'
                      : isAdminItem
                      ? 'text-emerald-900 bg-lime-100/70 hover:bg-lime-200/80 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : isAdminItem ? 'text-emerald-700' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold transition-colors ${
                        isActive
                          ? 'bg-black/20 text-lime-200'
                          : isAdminItem
                          ? 'bg-lime-300 text-emerald-950'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleSelectTab('map')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-900 bg-gradient-to-r from-lime-50 to-green-100 hover:from-lime-100 hover:to-green-200 border border-lime-300 rounded-xl transition-all shadow-2xs"
            >
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>Bacs Abidjan</span>
            </button>

            <button
              onClick={onOpenQuickQuote}
              className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-98 border border-slate-800 hover:border-lime-500/50"
            >
              <Building2 className="w-4 h-4 text-lime-400" />
              <span>Devis Pro B2B</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleSelectTab('admin')}
              className="p-2 rounded-xl bg-gradient-to-r from-emerald-800 to-green-700 text-lime-300 flex items-center gap-1.5 text-xs font-bold border border-lime-400/40"
              aria-label="Admin Visiteurs"
            >
              <Activity className="w-4 h-4 text-lime-300" />
              <span>{liveVisitors}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
              aria-label="Menu principal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left font-semibold text-sm transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-700 via-green-600 to-lime-600 text-white font-bold'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-md font-bold ${
                      isActive ? 'bg-black/20 text-lime-200' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuickQuote();
              }}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md border border-slate-800"
            >
              <Building2 className="w-4 h-4 text-lime-400" />
              <span>Demande de Collecte B2B (Abidjan)</span>
            </button>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-2 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
              <span>EcoAct : Cocody, Plateau, Marcory, Yopougon...</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
