/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Leaf, 
  RotateCcw, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Droplet, 
  TreePine, 
  Car, 
  ArrowRight,
  Info,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { CIRCULAR_PILLARS, SORTING_ITEMS, WASTE_TYPES } from '../data/mockData.ts';
import { WasteCategory } from '../types/index.ts';
import { EcoQuizAndGame } from './EcoQuizAndGame.tsx';

export const EducationalSection: React.FC = () => {
  // Impact calculator state
  const [cartonKg, setCartonKg] = useState<number>(150);
  const [plastiqueKg, setPlastiqueKg] = useState<number>(60);
  const [metalKg, setMetalKg] = useState<number>(30);
  const [biodechetsKg, setBiodechetsKg] = useState<number>(80);

  // Sorting guide search
  const [sortSearch, setSortSearch] = useState<string>('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<WasteCategory | 'all'>('all');

  // Carbon and resource savings calculations
  // Factors:
  // Carton: 1.2 kg CO2 / kg, 20L water / kg
  // Plastique: 1.8 kg CO2 / kg, 30L water / kg
  // Métal: 4.5 kg CO2 / kg, 50L water / kg
  // Biodéchets: 0.8 kg CO2 / kg, 5L water / kg
  const totalCo2SavedKg = useMemo(() => {
    return Math.round(
      cartonKg * 1.2 + plastiqueKg * 1.8 + metalKg * 4.5 + biodechetsKg * 0.8
    );
  }, [cartonKg, plastiqueKg, metalKg, biodechetsKg]);

  const totalWaterSavedLiters = useMemo(() => {
    return Math.round(
      cartonKg * 20 + plastiqueKg * 30 + metalKg * 50 + biodechetsKg * 5
    );
  }, [cartonKg, plastiqueKg, metalKg, biodechetsKg]);

  const carKmEquivalent = useMemo(() => {
    // ~0.12 kg CO2 / km for average car
    return Math.round(totalCo2SavedKg / 0.12);
  }, [totalCo2SavedKg]);

  const treesEquivalent = useMemo(() => {
    // 1 mature tree absorbs ~25kg CO2 per year
    return (totalCo2SavedKg / 25).toFixed(1);
  }, [totalCo2SavedKg]);

  // Filtered sorting items
  const filteredSortingItems = useMemo(() => {
    return SORTING_ITEMS.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(sortSearch.toLowerCase()) ||
        item.destination.toLowerCase().includes(sortSearch.toLowerCase()) ||
        item.tips.toLowerCase().includes(sortSearch.toLowerCase());

      const matchesCat =
        activeCategoryFilter === 'all' || item.category === activeCategoryFilter;

      return matchesSearch && matchesCat;
    });
  }, [sortSearch, activeCategoryFilter]);

  return (
    <section className="bg-white py-12 sm:py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-lime-100 via-green-100 to-emerald-100 border border-lime-300 text-emerald-950 text-xs font-black uppercase tracking-wider shadow-2xs">
            <Leaf className="w-4 h-4 text-lime-600" />
            <span>EcoAct Pédagogie • Économie Verte & Circulaire</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Comprendre l'Économie Circulaire & Maîtriser le Tri à Abidjan
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Sortir du modèle linéaire "extraire, fabriquer, jeter". Découvrez les piliers vertueux de la valorisation matière en Côte d'Ivoire et calculez l'impact concret de vos gestes quotidiens avec <strong className="text-emerald-800">EcoAct</strong>.
          </p>
        </div>

        {/* 5 Circular Economy Pillars */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-green-600" />
              <span>Les 5 Piliers Fondamentaux de la Boucle Circulaire</span>
            </h3>
            <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
              Source : Cadre ANAGED & Ministère de l'Assainissement (Côte d'Ivoire)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CIRCULAR_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-emerald-600">
                      {pillar.number}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug">
                    {pillar.title}
                  </h4>
                  <p className="text-xs font-semibold text-emerald-800">
                    {pillar.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded block text-center">
                    {pillar.benefit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Impact Calculator */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-700 space-y-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Simulateur d'Économie Écologique
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Estimez l'empreinte positive de votre tri mensuel
            </h3>
            <p className="text-slate-300 text-sm mt-1">
              Ajustez les volumes recyclés estimés par votre foyer ou votre entreprise pour visualiser instantanément les ressources préservées.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left sliders */}
            <div className="lg:col-span-7 space-y-5 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-xs">
              {/* Carton slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-slate-200 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-400" />
                    Carton & Emballages papier
                  </span>
                  <span className="text-emerald-400 font-bold">{cartonKg} kg / mois</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={cartonKg}
                  onChange={(e) => setCartonKg(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Plastique slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-slate-200 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    Plastiques rigides & films étirables
                  </span>
                  <span className="text-emerald-400 font-bold">{plastiqueKg} kg / mois</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="5"
                  value={plastiqueKg}
                  onChange={(e) => setPlastiqueKg(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Métal slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-slate-200 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-slate-400" />
                    Métaux & Canettes aluminium
                  </span>
                  <span className="text-emerald-400 font-bold">{metalKg} kg / mois</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="300"
                  step="5"
                  value={metalKg}
                  onChange={(e) => setMetalKg(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Biodéchets slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-slate-200 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-700" />
                    Biodéchets & Organique de cuisine
                  </span>
                  <span className="text-emerald-400 font-bold">{biodechetsKg} kg / mois</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="400"
                  step="5"
                  value={biodechetsKg}
                  onChange={(e) => setBiodechetsKg(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Right Result Indicators with Tri-Green Harmony */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              {/* Vert Émeraude: CO2 Évité */}
              <div className="bg-emerald-500/15 border border-emerald-400/40 p-4 rounded-2xl flex flex-col justify-between shadow-xs">
                <div className="flex items-center justify-between text-emerald-300">
                  <span className="text-xs uppercase font-black tracking-wider">CO2 Évité (Émeraude)</span>
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-black text-white">{totalCo2SavedKg}</span>
                  <span className="text-xs text-emerald-300 ml-1 font-bold">kg / an</span>
                </div>
                <span className="text-[11px] text-slate-300 mt-1">Gaz à effet de serre épargnés à Abidjan</span>
              </div>

              {/* Vert Pomme: Énergie & Trajets Voiture */}
              <div className="bg-lime-500/15 border border-lime-400/40 p-4 rounded-2xl flex flex-col justify-between shadow-xs">
                <div className="flex items-center justify-between text-lime-300">
                  <span className="text-xs uppercase font-black tracking-wider">Trajets Évités (Pomme)</span>
                  <Car className="w-4 h-4 text-lime-400" />
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-black text-white">{carKmEquivalent.toLocaleString('fr-FR')}</span>
                  <span className="text-xs text-lime-300 ml-1 font-bold">km</span>
                </div>
                <span className="text-[11px] text-slate-300 mt-1">Équivalent circulation thermique évitée</span>
              </div>

              {/* Bleu Lagune / Eau */}
              <div className="bg-teal-500/15 border border-teal-400/40 p-4 rounded-2xl flex flex-col justify-between shadow-xs">
                <div className="flex items-center justify-between text-teal-300">
                  <span className="text-xs uppercase font-black tracking-wider">Eau Préservée</span>
                  <Droplet className="w-4 h-4 text-teal-400" />
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-black text-white">{totalWaterSavedLiters.toLocaleString('fr-FR')}</span>
                  <span className="text-xs text-teal-300 ml-1 font-bold">litres</span>
                </div>
                <span className="text-[11px] text-slate-300 mt-1">Économisés vs cycle vierge</span>
              </div>

              {/* Vert Prairie: Arbres Équivalents */}
              <div className="bg-green-500/15 border border-green-400/40 p-4 rounded-2xl flex flex-col justify-between shadow-xs">
                <div className="flex items-center justify-between text-green-300">
                  <span className="text-xs uppercase font-black tracking-wider">Arbres (Prairie)</span>
                  <TreePine className="w-4 h-4 text-green-400" />
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-black text-white">{treesEquivalent}</span>
                  <span className="text-xs text-green-300 ml-1 font-bold">arbres</span>
                </div>
                <span className="text-[11px] text-slate-300 mt-1">Capacité d'absorption annuelle</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Sorting Guide */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-amber-500" />
                <span>Guide de Tri & Que devient ma matière ?</span>
              </h3>
              <p className="text-sm text-slate-600 mt-0.5">
                Vérifiez instantanément la consigne pour chaque objet et découvrez son circuit de recyclage.
              </p>
            </div>

            {/* Quick search input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Ex : canette, film palette..."
                value={sortSearch}
                onChange={(e) => setSortSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                activeCategoryFilter === 'all'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Toutes les matières
            </button>
            {(['plastique', 'carton', 'metal', 'verre', 'biodechets', 'deee'] as WasteCategory[]).map(
              (cat) => {
                const meta = WASTE_TYPES[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      activeCategoryFilter === cat
                        ? 'bg-slate-900 text-white font-bold'
                        : `${meta.bgLight} ${meta.textColor} hover:opacity-80`
                    }`}
                  >
                    {meta.label}
                  </button>
                );
              }
            )}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredSortingItems.map((item) => {
              const meta = WASTE_TYPES[item.category];
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-300 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${meta.bgLight} ${meta.textColor} border ${meta.borderColor}`}>
                        {meta.label}
                      </span>
                      {item.b2bRecyclable && (
                        <span className="text-[10px] font-semibold text-slate-500">
                          Filière Pro B2B
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm leading-snug">
                      {item.name}
                    </h4>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Destination de tri recommandée :
                      </span>
                      <span className="text-xs font-bold text-emerald-800 block">
                        {item.binColor}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong className="text-slate-800">Deuxième vie :</strong> {item.destination}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-medium">Économie CO2 :</span>
                    <span className="font-bold text-emerald-700">+{item.co2SavedPerKg} kg CO2/kg</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Quiz & Interactive Games Section */}
        <div id="quiz-jeux" className="pt-4">
          <EcoQuizAndGame />
        </div>
      </div>
    </section>
  );
};
