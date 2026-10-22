/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  ExternalLink, 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Award, 
  FileText, 
  ChevronRight,
  Info,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { Collector, WasteCategory } from '../types/index.ts';
import { MOCK_COLLECTORS, WASTE_TYPES } from '../data/mockData.ts';

interface B2BCollectorsDirectoryProps {
  onSelectCollectorForQuote: (collector: Collector) => void;
}

export const B2BCollectorsDirectory: React.FC<B2BCollectorsDirectoryProps> = ({
  onSelectCollectorForQuote,
}) => {
  const [collectors] = useState<Collector[]>(MOCK_COLLECTORS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWasteType, setSelectedWasteType] = useState<WasteCategory | 'all'>('all');
  const [filterTrackdechetsOnly, setFilterTrackdechetsOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'valorisation' | 'name'>('rating');

  // Filter and sort collectors
  const filteredCollectors = useMemo(() => {
    return collectors
      .filter((col) => {
        const matchesSearch =
          col.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          col.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          col.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          col.certifications.some((cert) =>
            cert.toLowerCase().includes(searchQuery.toLowerCase())
          );

        const matchesWaste =
          selectedWasteType === 'all' || col.wasteTypes.includes(selectedWasteType);

        const matchesTrackdechets =
          !filterTrackdechetsOnly || col.trackdechetsCompliant;

        return matchesSearch && matchesWaste && matchesTrackdechets;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'valorisation') return b.valorisationRate - a.valorisationRate;
        return a.name.localeCompare(b.name);
      });
  }, [collectors, searchQuery, selectedWasteType, filterTrackdechetsOnly, sortBy]);

  // Specific highlighted types requested by user: Plastique, Carton, Métal
  const quickWasteFilters: { id: WasteCategory | 'all'; label: string; count?: number }[] = [
    { id: 'all', label: 'Tous les collecteurs' },
    { id: 'plastique', label: 'Plastique & Films' },
    { id: 'carton', label: 'Carton & Papier' },
    { id: 'metal', label: 'Métal & Ferraille' },
    { id: 'bois', label: 'Bois & Palettes' },
    { id: 'deee', label: 'DEEE Informatique' },
    { id: 'dib', label: 'DIB Tout-Venant' },
  ];

  return (
    <section className="bg-slate-50 min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5" />
                Espace Entreprises, Artisans & Industries • Grand Abidjan
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
                Annuaire des Collecteurs de Déchets d'Abidjan
              </h1>
              <p className="text-base text-slate-600 max-w-3xl mt-1">
                Trouvez des prestataires agréés ANAGED pour l'enlèvement, le rachat et le recyclage de vos flux industriels (Yopougon, Koumassi, Vridi, Zone 4, Plateau).
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => onSelectCollectorForQuote(collectors[0])}
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-700/20 flex items-center gap-2 transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Demande de devis multi-collecteurs</span>
              </button>
            </div>
          </div>

          {/* Regulatory Reminder Banner */}
          <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-emerald-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0 text-emerald-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span>Conformité Salubrité & Normes ANAGED Côte d'Ivoire</span>
                  <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded-full uppercase">
                    Agréé CI
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Toute entreprise implantée dans le Grand Abidjan produisant des flux de carton, plastique, ferraille ou DIB doit s'assurer de leur valorisation par des acteurs enregistrés auprès du Ministère de l'Assainissement et de l'ANAGED.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold shrink-0 text-emerald-300">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Audit ANAGED
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Traçabilité & Facturation FCFA
              </span>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher par nom d'entreprise, matière, ville (ex: Lyon, Bordeaux, plastiques)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800 placeholder-slate-400 font-medium"
              />
            </div>

            {/* Sort & Quick Toggle */}
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 px-3 py-2.5 rounded-xl border border-slate-200 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filterTrackdechetsOnly}
                  onChange={(e) => setFilterTrackdechetsOnly(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Trackdéchets uniquement</span>
              </label>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <span className="hidden sm:inline">Trier par :</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="rating">Meilleures notes ⭐</option>
                  <option value="valorisation">Taux de valorisation %</option>
                  <option value="name">Nom alphabétique</option>
                </select>
              </div>
            </div>
          </div>

          {/* Primary Waste Type Buttons: Plastique, Carton, Métal */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
              Filtre Déchet :
            </span>
            {quickWasteFilters.map((tab) => {
              const isSelected = selectedWasteType === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedWasteType(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tab.id !== 'all' && (
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: WASTE_TYPES[tab.id]?.color }}
                    />
                  )}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Collectors List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-slate-600 px-1">
            <span className="font-semibold">
              {filteredCollectors.length} collecteur{filteredCollectors.length > 1 ? 's' : ''} disponible{filteredCollectors.length > 1 ? 's' : ''}
            </span>
            {selectedWasteType !== 'all' && (
              <span className="text-xs bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full font-semibold border border-emerald-200">
                Filtre actif : {WASTE_TYPES[selectedWasteType]?.label}
              </span>
            )}
          </div>

          {filteredCollectors.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <Info className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">
                Aucun collecteur ne correspond à vos critères
              </h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Essayez de réinitialiser vos filtres ou contactez notre support B2B pour une recherche manuelle de prestataires dans votre région.
              </p>
              <button
                onClick={() => {
                  setSelectedWasteType('all');
                  setSearchQuery('');
                  setFilterTrackdechetsOnly(false);
                }}
                className="mt-2 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCollectors.map((collector) => (
                <div
                  key={collector.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Top line: Name & rating & badges */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {collector.name}
                          </h3>
                          {collector.featured && (
                            <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                              Recommandé
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-emerald-800 mt-0.5">
                          {collector.tagline}
                        </p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200 shrink-0">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-black text-amber-900">
                          {collector.rating}
                        </span>
                        <span className="text-[10px] text-amber-700">
                          ({collector.reviewsCount})
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {collector.description}
                    </p>

                    {/* Accepted Waste Pills */}
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Matières collectées :
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {collector.wasteTypes.map((cat) => {
                          const meta = WASTE_TYPES[cat];
                          return (
                            <span
                              key={cat}
                              className={`text-xs px-2.5 py-1 rounded-lg font-bold border ${meta.bgLight} ${meta.textColor} ${meta.borderColor}`}
                            >
                              {meta.label}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Operational specifications */}
                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div>
                        <span className="text-slate-400 block text-[10px] font-semibold uppercase">
                          Taux de valorisation
                        </span>
                        <span className="font-black text-emerald-700 text-sm">
                          {collector.valorisationRate}% recyclé
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-semibold uppercase">
                          Délai d'intervention
                        </span>
                        <span className="font-bold text-slate-800">
                          {collector.turnaroundTime}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-semibold uppercase">
                          Rayon de service
                        </span>
                        <span className="font-bold text-slate-800">
                          {collector.serviceRadius}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-semibold uppercase">
                          Quantité min.
                        </span>
                        <span className="font-bold text-slate-800 truncate block" title={collector.minQuantity}>
                          {collector.minQuantity}
                        </span>
                      </div>
                    </div>

                    {/* Certifications & Compliance */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {collector.trackdechetsCompliant && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Trackdéchets Agréé
                        </span>
                      )}
                      {collector.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions & Contact CTA */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <a
                        href={`tel:${collector.phone}`}
                        className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors flex items-center justify-center shrink-0"
                        title={`Appeler au ${collector.phone}`}
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                      <div className="text-xs text-slate-500 truncate">
                        <span className="block font-semibold text-slate-700">{collector.city}</span>
                        <span>{collector.phone}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectCollectorForQuote(collector)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs group-hover:bg-emerald-600 transition-all"
                    >
                      <span>Contacter directement</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
