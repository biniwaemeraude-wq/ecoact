/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { LandingHero } from './components/LandingHero.tsx';
import { LeafletMapSimulation } from './components/LeafletMapSimulation.tsx';
import { B2BCollectorsDirectory } from './components/B2BCollectorsDirectory.tsx';
import { EducationalSection } from './components/EducationalSection.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';
import { ContactModal } from './components/ContactModal.tsx';
import { ReportBinModal } from './components/ReportBinModal.tsx';
import { Footer } from './components/Footer.tsx';
import { BinLocation, Collector } from './types/index.ts';
import { MOCK_COLLECTORS } from './data/mockData.ts';
import { ArrowRight, MapPin, Building2, Leaf, ShieldCheck, Activity, Users } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'landing' | 'map' | 'b2b' | 'education' | 'admin'>('landing');

  // Conversions count tracking for admin dashboard
  const [quotesCount, setQuotesCount] = useState<number>(() => {
    return Number(localStorage.getItem('ecocollecte_quotes_count') || 18);
  });
  const [reportsCount, setReportsCount] = useState<number>(() => {
    return Number(localStorage.getItem('ecocollecte_reports_count') || 12);
  });

  // Contact / Quote Modal State
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedCollector, setSelectedCollector] = useState<Collector | null>(null);

  // Bin Report Modal State
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedBinForReport, setSelectedBinForReport] = useState<BinLocation | null>(null);

  const handleOpenQuickQuote = () => {
    setSelectedCollector(MOCK_COLLECTORS[0]);
    setIsContactModalOpen(true);
  };

  const handleSelectCollectorForQuote = (collector: Collector) => {
    setSelectedCollector(collector);
    setIsContactModalOpen(true);
  };

  const handleReportBin = (bin: BinLocation) => {
    setSelectedBinForReport(bin);
    setIsReportModalOpen(true);
  };

  const handleQuoteSubmitted = () => {
    setQuotesCount((prev) => {
      const next = prev + 1;
      localStorage.setItem('ecocollecte_quotes_count', next.toString());
      return next;
    });
  };

  const handleReportSubmitted = () => {
    setReportsCount((prev) => {
      const next = prev + 1;
      localStorage.setItem('ecocollecte_reports_count', next.toString());
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-lime-400 selection:text-slate-950 relative">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuickQuote={handleOpenQuickQuote}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <div className="space-y-0">
            {/* 1. Landing Hero with Value Prop & Stats */}
            <LandingHero
              onNavigateMap={() => setActiveTab('map')}
              onNavigateB2B={() => setActiveTab('b2b')}
              onNavigateEducation={() => setActiveTab('education')}
            />

            {/* Interactive Preview Teaser for the Leaflet Map in Abidjan */}
            <section className="bg-slate-100 py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
              <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                      Géolocalisation • Abidjan, Côte d'Ivoire
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                      Localisez vos bacs de quartier à Abidjan en temps réel
                    </h2>
                    <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                      Bornes d'apport volontaire à Cocody, Plateau, Marcory, Yopougon, Treichville connectées par capteurs de remplissage IoT.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('map')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors"
                  >
                    <span>Ouvrir la carte complète</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Embedded Map Component */}
                <LeafletMapSimulation onReportBin={handleReportBin} />
              </div>
            </section>

            {/* 2. Educational Section on Green Economy, Circular Pillars & Sorting Guide */}
            <EducationalSection />

            {/* 3. B2B Collectors Directory Preview in Grand Abidjan */}
            <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
              <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                      Réseau Déchets Professionnels d'Abidjan
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                      Collecteurs agréés pour entreprises (Plastique, Carton, Métal...)
                    </h2>
                    <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                      Valorisez vos matières recyclables et respectez les normes de salubrité urbaine de l'ANAGED.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('b2b')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-colors"
                  >
                    <span>Voir tout l'annuaire ({MOCK_COLLECTORS.length} prestataires)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <B2BCollectorsDirectory
                  onSelectCollectorForQuote={handleSelectCollectorForQuote}
                />
              </div>
            </section>
          </div>
        )}

        {/* View 2: Dedicated Fullscreen Map */}
        {activeTab === 'map' && (
          <div className="py-2">
            <LeafletMapSimulation onReportBin={handleReportBin} />
          </div>
        )}

        {/* View 3: Dedicated B2B Directory */}
        {activeTab === 'b2b' && (
          <B2BCollectorsDirectory
            onSelectCollectorForQuote={handleSelectCollectorForQuote}
          />
        )}

        {/* View 4: Dedicated Educational / RSE Guide */}
        {activeTab === 'education' && (
          <EducationalSection />
        )}

        {/* View 5: Dedicated Admin Dashboard (Live Visitors & Traffic) */}
        {activeTab === 'admin' && (
          <AdminDashboard
            onClose={() => setActiveTab('landing')}
            quotesCount={quotesCount}
            reportsCount={reportsCount}
          />
        )}
      </main>

      {/* Floating Admin Quick Widget: visible anywhere for the administrator */}
      {activeTab !== 'admin' && (
        <aside aria-label="Statistiques Visiteurs Admin" className="fixed bottom-5 right-5 z-40">
          <button
            onClick={() => setActiveTab('admin')}
            className="flex items-center gap-2.5 bg-slate-900/95 hover:bg-slate-900 text-white pl-3.5 pr-4 py-2.5 rounded-2xl shadow-xl border border-lime-400/50 hover:border-lime-400 hover:shadow-lime-500/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 group"
            title="Cliquez pour ouvrir le tableau de bord administrateur (Statistiques Visiteurs EcoAct)"
          >
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-lime-400 animate-ping absolute" />
              <span className="w-2.5 h-2.5 rounded-full bg-lime-400 relative" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5 text-[10px] text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-green-400 to-emerald-300 font-extrabold uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3 text-lime-400" />
                <span>EcoAct Admin</span>
              </div>
              <div className="text-xs font-bold text-white flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-lime-400" />
                <span>Visiteurs en direct</span>
              </div>
            </div>
          </button>
        </aside>
      )}

      {/* Global Modals */}
      <ContactModal
        collector={selectedCollector}
        isOpen={isContactModalOpen}
        onClose={() => {
          setIsContactModalOpen(false);
          handleQuoteSubmitted();
        }}
      />

      <ReportBinModal
        bin={selectedBinForReport}
        isOpen={isReportModalOpen}
        onClose={() => {
          setIsReportModalOpen(false);
          handleReportSubmitted();
        }}
      />

      {/* Footer */}
      <Footer
        onNavigate={setActiveTab}
        onOpenQuote={handleOpenQuickQuote}
      />
    </div>
  );
}
