/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  MapPin, 
  Building2, 
  ArrowRight, 
  CheckCircle, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Leaf, 
  Truck, 
  Trash2,
  Users
} from 'lucide-react';
import { KEY_METRICS } from '../data/mockData.ts';

interface LandingHeroProps {
  onNavigateMap: () => void;
  onNavigateB2B: () => void;
  onNavigateEducation: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onNavigateMap,
  onNavigateB2B,
  onNavigateEducation,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-lime-50/60 via-emerald-50/30 to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-lime-200/60">
      {/* Decorative ambient background glows blending Apple green, Prairie, and Emerald */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-r from-emerald-300/30 via-green-300/30 to-lime-300/30 blur-3xl -z-10 pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-lime-300/25 rounded-full blur-2xl -z-10 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-lime-100 via-green-100 to-emerald-100 border border-lime-300 text-emerald-950 text-xs sm:text-sm font-bold shadow-2xs">
            <Sparkles className="w-4 h-4 text-emerald-600 animate-spin-slow" />
            <span>EcoAct • Plateforme Éco-Citoyenne & B2B Grand Abidjan (Côte d'Ivoire)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Agir ensemble pour un <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-green-600 to-lime-500">Abidjan plus propre</span> et circulaire.
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Avec <strong className="text-emerald-800 font-bold">EcoAct</strong>, géolocalisez en temps réel les bacs de tri municipaux à Cocody, Plateau, Marcory, Yopougon... ou confiez vos flux industriels aux collecteurs agréés ANAGED.
          </p>

          {/* Quick CTA actions with tri-color green harmony */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={onNavigateMap}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-700 via-green-600 to-lime-500 hover:from-emerald-800 hover:via-green-700 hover:to-lime-600 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-green-700/25 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <MapPin className="w-5 h-5 text-lime-200" />
              <span>Trouver un bac à Abidjan</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateB2B}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md shadow-slate-900/20 transition-all hover:-translate-y-0.5 active:translate-y-0 border border-slate-700 hover:border-lime-500/50"
            >
              <Building2 className="w-5 h-5 text-lime-400" />
              <span>Annuaire Collecteurs Pro (B2B)</span>
            </button>

            <button
              onClick={onNavigateEducation}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white hover:bg-lime-50/50 text-emerald-900 font-bold text-sm sm:text-base border border-lime-300 shadow-2xs flex items-center justify-center gap-2 transition-all"
            >
              <Leaf className="w-4 h-4 text-lime-600" />
              <span>Guide, Quiz & Jeux</span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-600 pt-2 font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Conforme Salubrité Urbaine & ANAGED
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Partenaires Agréés République de Côte d'Ivoire
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-lime-600" />
              Capteurs de niveau de remplissage IoT
            </span>
          </div>
        </div>

        {/* Dual Audience Cards: Citoyen vs Entreprise */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 lg:mt-16">
          {/* Card 1: Citoyens (Nuances Émeraude & Vert Pomme) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-lime-200/90 shadow-md shadow-green-950/5 relative overflow-hidden group hover:border-lime-400 transition-all">
            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-lime-100/70 to-emerald-50/30 rounded-bl-full -z-0" />
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-lime-100 to-green-100 text-emerald-950 border border-lime-300 text-xs font-bold uppercase tracking-wide">
                <Users className="w-3.5 h-3.5 text-green-700" />
                Espace Éco-Citoyen Abidjanais
              </div>
              <h2 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Localisez vos bacs de quartier & signalez les saturations
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Visualisez sur la carte EcoAct les colonnes à verre, bacs jaunes d'emballages, abri-bacs à biodéchets et points d'apport. Vérifiez le taux de remplissage avant de vous déplacer.
              </p>

              <ul className="space-y-2 pt-1 text-sm text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-lime-500" />
                  <span>Jauges connectées en direct sur les bornes</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>Signalement citoyen en 1 clic pour les services d'Abidjan</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>Itinéraires piétons et accessibilité PMR</span>
                </li>
              </ul>

              <div className="pt-3">
                <button
                  onClick={onNavigateMap}
                  className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-green-700 group-hover:underline"
                >
                  <span>Ouvrir la carte interactive EcoAct</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: B2B Entreprises */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl shadow-slate-950/20 relative overflow-hidden group hover:border-lime-500/50 transition-all">
            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-emerald-900/40 to-green-950/20 rounded-bl-full -z-0" />
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/15 text-lime-300 border border-lime-400/30 text-xs font-bold uppercase tracking-wide">
                <Building2 className="w-3.5 h-3.5 text-lime-400" />
                Espace Entreprises & Industries
              </div>
              <h2 className="text-2xl font-bold text-white group-hover:text-lime-300 transition-colors">
                Trouvez le prestataire agréé pour vos flux professionnels
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Cartons d'emballage, films plastiques étirables, chutes de métaux, DEEE et DIB : comparez les prestataires certifiés à Yopougon, Koumassi, Vridi, Zone 4 et obtenez vos devis en FCFA.
              </p>

              <ul className="space-y-2 pt-1 text-sm text-slate-300 font-medium">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-lime-400" />
                  <span>Filtres précis : Plastique, Carton ondulé, Métal, Palettes, DIB</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span>Collecteurs agréés ANAGED & traçabilité sécurisée</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Mise en relation directe avec les usines de recyclage</span>
                </li>
              </ul>

              <div className="pt-3">
                <button
                  onClick={onNavigateB2B}
                  className="inline-flex items-center gap-2 text-sm font-bold text-lime-400 hover:text-lime-300 group-hover:underline"
                >
                  <span>Accéder à l'annuaire des collecteurs B2B</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Numbers Bar */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-lime-200/80 shadow-xs">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-lime-100">
            {KEY_METRICS.map((metric, index) => (
              <div 
                key={metric.id} 
                className={`flex flex-col text-center ${index > 0 ? 'pt-4 lg:pt-0 lg:pl-6' : ''}`}
              >
                <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {metric.value}
                </span>
                <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-green-600 mt-1">
                  {metric.label}
                </span>
                <span className="text-xs text-slate-500 mt-0.5">
                  {metric.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
