/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Search, 
  Filter, 
  Layers, 
  Plus, 
  Minus, 
  Compass, 
  AlertTriangle, 
  Navigation, 
  Clock, 
  CheckCircle2, 
  Info, 
  X, 
  ChevronRight,
  Maximize2,
  SlidersHorizontal,
  Share2,
  ShieldAlert
} from 'lucide-react';
import { BinLocation, WasteCategory } from '../types/index.ts';
import { MOCK_BINS, WASTE_TYPES } from '../data/mockData.ts';

interface LeafletMapSimulationProps {
  onReportBin: (bin: BinLocation) => void;
}

interface CommunePreset {
  id: string;
  name: string;
  short: string;
  x: number;
  y: number;
  count: number;
}

const ABIDJAN_COMMUNES: CommunePreset[] = [
  { id: 'all', name: "Toutes les communes d'Abidjan", short: 'Toutes les communes', x: 48, y: 38, count: 8 },
  { id: 'Cocody', name: 'Cocody (Riviera, Angré, 2 Plateaux)', short: 'Cocody', x: 62, y: 28, count: 3 },
  { id: 'Plateau', name: 'Plateau (Centre des affaires)', short: 'Plateau', x: 44, y: 48, count: 1 },
  { id: 'Marcory', name: 'Marcory (Zone 4, Biétry)', short: 'Marcory (Zone 4)', x: 72, y: 76, count: 1 },
  { id: 'Yopougon', name: 'Yopougon (Siporex, Bel Air)', short: 'Yopougon', x: 18, y: 38, count: 1 },
  { id: 'Treichville', name: 'Treichville (Christiani)', short: 'Treichville', x: 46, y: 66, count: 1 },
  { id: 'Koumassi', name: 'Koumassi (Zone Industrielle)', short: 'Koumassi', x: 86, y: 68, count: 1 },
  { id: 'Adjamé', name: 'Adjamé (Mirador, Mairie)', short: 'Adjamé', x: 38, y: 24, count: 0 },
  { id: 'Port-Bouët', name: 'Port-Bouët (Aéroport, Vridi)', short: 'Port-Bouët', x: 90, y: 84, count: 0 },
];

export const LeafletMapSimulation: React.FC<LeafletMapSimulationProps> = ({
  onReportBin,
}) => {
  const [bins, setBins] = useState<BinLocation[]>(MOCK_BINS);
  const [selectedBin, setSelectedBin] = useState<BinLocation | null>(MOCK_BINS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommune, setSelectedCommune] = useState<string>('all');
  const [selectedWasteType, setSelectedWasteType] = useState<WasteCategory | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'high_or_full'>('all');
  const [mapStyle, setMapStyle] = useState<'standard' | 'satellite' | 'eco'>('standard');
  const [zoomLevel, setZoomLevel] = useState(14);
  const [userLocation, setUserLocation] = useState({ x: 48, y: 38 });
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [showNearbyDrawer, setShowNearbyDrawer] = useState(true);

  // Filter logic including commune
  const filteredBins = useMemo(() => {
    return bins.filter((bin) => {
      const matchesSearch =
        bin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bin.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bin.district.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCommune =
        selectedCommune === 'all' ||
        bin.district.toLowerCase().includes(selectedCommune.toLowerCase());

      const matchesWaste =
        selectedWasteType === 'all' || bin.wasteTypes.includes(selectedWasteType);

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'available' && bin.fillLevel < 80) ||
        (statusFilter === 'high_or_full' && bin.fillLevel >= 80);

      return matchesSearch && matchesCommune && matchesWaste && matchesStatus;
    });
  }, [bins, searchQuery, selectedCommune, selectedWasteType, statusFilter]);

  const handleSelectCommune = (communeId: string) => {
    setSelectedCommune(communeId);
    const preset = ABIDJAN_COMMUNES.find((c) => c.id === communeId);
    if (preset) {
      setUserLocation({ x: preset.x, y: preset.y });
    }
    // Find bin in this commune if any
    if (communeId !== 'all') {
      const matched = bins.find((b) =>
        b.district.toLowerCase().includes(communeId.toLowerCase())
      );
      if (matched) {
        setSelectedBin(matched);
      }
    }
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard?.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const getPinColor = (bin: BinLocation) => {
    if (bin.fillLevel >= 90) return '#EF4444'; // Red if full
    if (bin.fillLevel >= 75) return '#F59E0B'; // Amber if nearly full
    if (bin.wasteTypes.includes('biodechets')) return '#78350F';
    if (bin.wasteTypes.includes('verre')) return '#10B981';
    if (bin.wasteTypes.includes('carton')) return '#2563EB';
    return '#EAB308'; // Default yellow for plastic/packaging
  };

  const handleSimulateGPS = () => {
    setUserLocation({ x: 48, y: 38 });
    // find nearest bin
    if (filteredBins.length > 0) {
      setSelectedBin(filteredBins[0]);
    }
  };

  return (
    <div className="bg-slate-100 min-h-[calc(100vh-80px)] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Top Header & Breadcrumbs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Salubrité Urbaine & Points Éco • Abidjan, Côte d'Ivoire
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Carte des Bacs de Tri & Points d'Apport d'Abidjan
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Localisez les bornes d'apport volontaire à Cocody, Plateau, Marcory, Yopougon... Taux de remplissage IoT en direct avec l'ANAGED.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleSimulateGPS}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs sm:text-sm border border-emerald-200 transition-colors"
            >
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>Ma position (Abidjan)</span>
            </button>

            <button
              onClick={() => setShowNearbyDrawer(!showNearbyDrawer)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs sm:text-sm hover:bg-slate-800 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Liste des</span> bacs ({filteredBins.length})
            </button>
          </div>
        </div>

        {/* Filter Bar with Commune Selector next to Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-lime-300/80 shadow-xs space-y-3">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher par adresse, quartier (ex: Angré, Zone 4, Saint-Jean, Siporex)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800 placeholder-slate-400 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Commune Dropdown Selector placed right beside the search input */}
            <div className="relative min-w-[220px] sm:min-w-[260px]">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-700 pointer-events-none flex items-center gap-1 font-bold">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              </div>
              <select
                value={selectedCommune}
                onChange={(e) => handleSelectCommune(e.target.value)}
                className="w-full pl-8 pr-8 py-2 text-xs sm:text-sm font-bold bg-gradient-to-r from-lime-50 to-green-100/70 hover:from-lime-100 hover:to-green-100 border border-lime-400/80 text-emerald-950 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-lime-500 cursor-pointer transition-colors shadow-2xs"
                title="Choisir une commune d'Abidjan pour géolocaliser"
              >
                {ABIDJAN_COMMUNES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.id === 'all'
                      ? "📍 Toutes les communes d'Abidjan"
                      : `${c.short} (${c.count ? `${c.count} point${c.count > 1 ? 's' : ''}` : 'Filière en cours'})`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Commune List Badges right below for 1-click geolocation */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-0.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 shrink-0 mr-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Communes :</span>
            </span>
            {ABIDJAN_COMMUNES.map((c) => {
              const isSelected = selectedCommune === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => handleSelectCommune(c.id)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-emerald-700 via-green-600 to-lime-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-lime-100 hover:text-emerald-900 border border-transparent hover:border-lime-300'
                  }`}
                >
                  <span>{c.short}</span>
                  {c.count > 0 && (
                    <span
                      className={`text-[10px] px-1 rounded-full font-black ${
                        isSelected ? 'bg-black/20 text-lime-100' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {c.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-semibold text-slate-500 whitespace-nowrap pl-1">
                Disponibilité :
              </span>
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  statusFilter === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Tous les bacs
              </button>
              <button
                onClick={() => setStatusFilter('available')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  statusFilter === 'available'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Disponibles (&lt;80%)
              </button>
              <button
                onClick={() => setStatusFilter('high_or_full')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  statusFilter === 'high_or_full'
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                }`}
              >
                <AlertTriangle className="w-3 h-3" />
                Saturés (&ge;80%)
              </button>
            </div>

          {/* Waste Type Badges */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 no-scrollbar">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
              Type de déchet :
            </span>
            <button
              onClick={() => setSelectedWasteType('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedWasteType === 'all'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tous ({bins.length})
            </button>

            {(['plastique', 'carton', 'metal', 'verre', 'biodechets', 'deee'] as WasteCategory[]).map(
              (cat) => {
                const meta = WASTE_TYPES[cat];
                const isSelected = selectedWasteType === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedWasteType(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                      isSelected
                        ? 'ring-2 ring-slate-900 bg-white font-bold text-slate-900 shadow-sm'
                        : `${meta.bgLight} ${meta.textColor} hover:opacity-90`
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: meta.color }}
                    />
                    <span>{meta.label}</span>
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Map Container & Interactive Leaflet Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Leaflet-Simulated Map Canvas */}
          <div className={`${showNearbyDrawer ? 'lg:col-span-8' : 'lg:col-span-12'} relative h-[560px] sm:h-[620px] rounded-3xl overflow-hidden border border-slate-300 shadow-lg bg-slate-200 transition-all select-none`}>
            
            {/* The Map Background Tile Rendering (Leaflet Canvas look) */}
            <div 
              className={`absolute inset-0 w-full h-full transition-colors duration-500 ${
                mapStyle === 'satellite'
                  ? 'bg-[#1b2a26]'
                  : mapStyle === 'eco'
                  ? 'bg-[#eef5ee]'
                  : 'bg-[#f4f3f0]'
              }`}
            >
              {/* Realistic SVG OpenStreetMap-style vector road grid & river */}
              <svg 
                className="w-full h-full opacity-90" 
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                viewBox="0 0 1000 600"
              >
                <defs>
                  <pattern id="city-blocks" width="100" height="100" patternUnits="userSpaceOnUse">
                    <rect width="90" height="90" fill={mapStyle === 'satellite' ? '#1f342f' : '#f9f8f6'} rx="4" />
                    <line x1="0" y1="0" x2="100" y2="0" stroke={mapStyle === 'satellite' ? '#2c4740' : '#e8e6e1'} strokeWidth="2" />
                    <line x1="0" y1="0" x2="0" y2="100" stroke={mapStyle === 'satellite' ? '#2c4740' : '#e8e6e1'} strokeWidth="2" />
                  </pattern>
                </defs>

                {/* Base grid blocks */}
                <rect width="1000" height="600" fill="url(#city-blocks)" />

                {/* Parc National du Banco (Green Space North-West) */}
                <path
                  d="M 50 20 C 120 10, 240 20, 280 120 C 260 190, 160 210, 60 170 Z"
                  fill={mapStyle === 'satellite' ? '#143827' : '#d2ebd6'}
                  stroke={mapStyle === 'satellite' ? '#194932' : '#bde0c3'}
                  strokeWidth="2"
                />
                <text x="80" y="90" fill="#2d6a4f" fontSize="13" fontWeight="bold" fontFamily="system-ui">
                  Parc National du Banco
                </text>

                {/* Baie de Cocody & Lagune Ébrié */}
                <path
                  d="M 0 360 C 200 340, 360 380, 480 320 C 580 270, 640 230, 720 280 C 820 340, 910 290, 1000 270 L 1000 440 C 900 460, 780 430, 680 490 C 560 550, 420 520, 320 540 C 200 560, 90 530, 0 540 Z"
                  fill={mapStyle === 'satellite' ? '#143d54' : '#bfe3f7'}
                  stroke={mapStyle === 'satellite' ? '#1b4d6b' : '#a2d2ee'}
                  strokeWidth="4"
                />
                <text x="440" y="420" fill="#2b6cb0" fontSize="14" fontWeight="black" letterSpacing="3" fontFamily="system-ui">
                  LAGUNE ÉBRIÉ (ABIDJAN)
                </text>
                <text x="590" y="270" fill="#3182ce" fontSize="11" fontWeight="bold" fontFamily="system-ui">
                  Baie de Cocody
                </text>

                {/* Communes Labels */}
                <text x="640" y="140" fill="#1b4332" fontSize="15" fontWeight="black" fontFamily="system-ui">
                  COCODY
                </text>
                <text x="400" y="240" fill="#1a202c" fontSize="15" fontWeight="black" fontFamily="system-ui">
                  PLATEAU
                </text>
                <text x="120" y="320" fill="#1a202c" fontSize="15" fontWeight="black" fontFamily="system-ui">
                  YOPOUGON
                </text>
                <text x="390" y="580" fill="#1a202c" fontSize="14" fontWeight="black" fontFamily="system-ui">
                  TREICHVILLE
                </text>
                <text x="700" y="560" fill="#1a202c" fontSize="14" fontWeight="black" fontFamily="system-ui">
                  MARCORY (Zone 4)
                </text>
                <text x="840" y="520" fill="#1a202c" fontSize="13" fontWeight="bold" fontFamily="system-ui">
                  KOUMASSI
                </text>

                {/* Bridges (Pont HKB, Pont Houphouët-Boigny, Pont Alassane Ouattara) */}
                <line x1="490" y1="280" x2="570" y2="240" stroke="#e53e3e" strokeWidth="6" strokeLinecap="round" />
                <text x="510" y="250" fill="#9b2c2c" fontSize="8" fontWeight="bold">Pont A. Ouattara</text>

                <line x1="680" y1="280" x2="730" y2="470" stroke="#dd6b20" strokeWidth="6" strokeLinecap="round" />
                <text x="715" y="380" fill="#7b341e" fontSize="9" fontWeight="bold">Pont HKB</text>

                <line x1="430" y1="290" x2="430" y2="520" stroke="#319795" strokeWidth="6" strokeLinecap="round" />
                <text x="350" y="390" fill="#234e52" fontSize="9" fontWeight="bold">Pont F.H. Boigny</text>

                {/* Major Arteries / Boulevards */}
                <line x1="500" y1="240" x2="980" y2="60" stroke="#ffd17d" strokeWidth="8" />
                <text x="680" y="160" fill="#744210" fontSize="9" fontWeight="bold">Boulevard Mitterrand</text>

                <line x1="440" y1="540" x2="980" y2="580" stroke="#ffd17d" strokeWidth="8" />
                <text x="530" y="560" fill="#744210" fontSize="9" fontWeight="bold">Boulevard VGE</text>

                <line x1="420" y1="230" x2="40" y2="280" stroke="#ffd17d" strokeWidth="7" />
                <text x="180" y="250" fill="#744210" fontSize="9" fontWeight="bold">Autoroute du Nord</text>
              </svg>
            </div>

            {/* Simulated User GPS Indicator */}
            <div
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-700"
              style={{ left: `${userLocation.x}%`, top: `${userLocation.y}%` }}
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-blue-500/30 animate-ping" />
                <span className="w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow-md flex items-center justify-center text-[10px] text-white font-bold">
                  ●
                </span>
                <span className="absolute -bottom-5 bg-blue-900/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs whitespace-nowrap">
                  Votre position
                </span>
              </div>
            </div>

            {/* Pins on the Map */}
            {filteredBins.map((bin) => {
              const isSelected = selectedBin?.id === bin.id;
              const pinColor = getPinColor(bin);
              return (
                <div
                  key={bin.id}
                  onClick={() => setSelectedBin(bin)}
                  className={`absolute z-20 cursor-pointer -translate-x-1/2 -translate-y-full transition-transform duration-200 group ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                  style={{ left: `${bin.mapX}%`, top: `${bin.mapY}%` }}
                >
                  <div className="relative flex flex-col items-center">
                    {/* Pulsing indicator if nearly full or full */}
                    {bin.fillLevel >= 80 && (
                      <span className="absolute -top-1 w-6 h-6 rounded-full bg-red-500/40 animate-ping pointer-events-none" />
                    )}

                    {/* Leaflet-like Pin Droplet */}
                    <div 
                      className="w-8 h-8 rounded-full rounded-br-none rotate-45 flex items-center justify-center shadow-lg border-2 border-white transition-all"
                      style={{ backgroundColor: pinColor }}
                    >
                      <div className="-rotate-45 flex items-center justify-center text-white">
                        <MapPin className="w-4 h-4 fill-white text-white" />
                      </div>
                    </div>

                    {/* Fill Level Bubble */}
                    <span 
                      className={`text-[9px] font-black px-1.5 py-0.2 rounded-full border shadow-xs -mt-1 ${
                        bin.fillLevel >= 90
                          ? 'bg-red-600 text-white border-red-700'
                          : bin.fillLevel >= 70
                          ? 'bg-amber-500 text-white border-amber-600'
                          : 'bg-emerald-600 text-white border-emerald-700'
                      }`}
                    >
                      {bin.fillLevel}%
                    </span>

                    {/* Mini tooltip on hover if not selected */}
                    {!isSelected && (
                      <div className="hidden group-hover:block absolute bottom-full mb-2 bg-slate-900 text-white text-[10px] font-medium px-2 py-1 rounded shadow-md whitespace-nowrap pointer-events-none">
                        {bin.name} ({bin.fillLevel}%)
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Leaflet Zoom Controls (Top Left) */}
            <div className="absolute top-4 left-4 z-30 flex flex-col rounded-lg overflow-hidden border border-slate-300 shadow-md bg-white">
              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 1, 18))}
                className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 text-slate-700 border-b border-slate-200 active:bg-slate-200"
                aria-label="Zoom avant"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 1, 11))}
                className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 text-slate-700 active:bg-slate-200"
                aria-label="Zoom arrière"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>

            {/* Leaflet Layer Switcher (Top Right) */}
            <div className="absolute top-4 right-4 z-30 flex items-center bg-white/95 backdrop-blur-sm rounded-xl p-1 border border-slate-300 shadow-md text-xs font-semibold text-slate-700">
              <span className="px-2 py-1 text-slate-400 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Fond de carte:</span>
              </span>
              <button
                onClick={() => setMapStyle('standard')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  mapStyle === 'standard' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-100'
                }`}
              >
                Plan Urbain
              </button>
              <button
                onClick={() => setMapStyle('eco')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  mapStyle === 'eco' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-100'
                }`}
              >
                Parcs & Espaces
              </button>
              <button
                onClick={() => setMapStyle('satellite')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  mapStyle === 'satellite' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-100'
                }`}
              >
                Sombre
              </button>
            </div>

            {/* Leaflet Scale Bar (Bottom Left) */}
            <div className="absolute bottom-4 left-4 z-30 pointer-events-none select-none">
              <div className="bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] text-slate-700 font-mono border-b-2 border-l-2 border-slate-700">
                200 m (Zoom {zoomLevel})
              </div>
            </div>

            {/* Leaflet Legal & Attribution Notice (Bottom Right) */}
            <div className="absolute bottom-2 right-2 z-30 pointer-events-none">
              <div className="bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded text-[9px] text-slate-500 font-sans shadow-xs">
                Leaflet 1.9.4 | © <span className="underline">OpenStreetMap</span> contributors, © EcoAct Abidjan IoT
              </div>
            </div>

            {/* Leaflet Interactive Popup Card (Anchor at bottom center of map viewport) */}
            {selectedBin && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-[92%] sm:w-[420px] max-w-full animate-in fade-in slide-in-from-bottom-3 duration-200">
                <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-200/90 relative">
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedBin(null)}
                    className="absolute top-3.5 right-3.5 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Header info */}
                  <div className="flex items-start gap-3 pr-6">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs"
                      style={{ backgroundColor: getPinColor(selectedBin) }}
                    >
                      <MapPin className="w-5 h-5 fill-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {selectedBin.district} • {selectedBin.type === 'enterre' ? 'Bornes enterrées' : 'Point aérien'}
                        </span>
                        {selectedBin.accessiblePMR && (
                          <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded font-semibold border border-blue-200">
                            PMR
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 leading-tight">
                        {selectedBin.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {selectedBin.address}, {selectedBin.city}
                      </p>
                    </div>
                  </div>

                  {/* Gauge of fill level */}
                  <div className="mt-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                      <span className="text-slate-600 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        Niveau de remplissage capteur IoT :
                      </span>
                      <span 
                        className={`font-black ${
                          selectedBin.fillLevel >= 90
                            ? 'text-red-600'
                            : selectedBin.fillLevel >= 75
                            ? 'text-amber-600'
                            : 'text-emerald-600'
                        }`}
                      >
                        {selectedBin.fillLevel}% - {selectedBin.fillLevel >= 90 ? 'Saturé' : selectedBin.fillLevel >= 75 ? 'Presque plein' : 'Disponible'}
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          selectedBin.fillLevel >= 90
                            ? 'bg-red-500'
                            : selectedBin.fillLevel >= 75
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${selectedBin.fillLevel}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                      <span>Dernière vidange : {selectedBin.lastCollected}</span>
                      <span className="font-medium text-emerald-800">Prochaine : {selectedBin.nextScheduledCollection}</span>
                    </div>
                  </div>

                  {/* Accepted waste categories */}
                  <div className="mt-3">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Déchets acceptés sur cette station :
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedBin.wasteTypes.map((cat) => {
                        const meta = WASTE_TYPES[cat];
                        return (
                          <span
                            key={cat}
                            className={`text-xs px-2 py-0.5 rounded-md font-semibold border ${meta.bgLight} ${meta.textColor} ${meta.borderColor}`}
                          >
                            {meta.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleCopyAddress(`${selectedBin.name}, ${selectedBin.address}`)}
                      className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5 text-slate-500" />
                      <span>{copiedAddress ? 'Adresse copiée !' : 'Itinéraire'}</span>
                    </button>

                    <button
                      onClick={() => onReportBin(selectedBin)}
                      className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                      <span>Signaler bac plein / problème</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Side Drawer: Nearby Bins List */}
          {showNearbyDrawer && (
            <div className="lg:col-span-4 bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col h-[560px] sm:h-[620px]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Points de collecte proches
                  </h3>
                  <p className="text-xs text-slate-500">
                    {filteredBins.length} bacs trouvés dans le secteur
                  </p>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Temps réel
                </span>
              </div>

              {/* Scrollable list */}
              <div className="flex-1 overflow-y-auto space-y-2.5 pt-3 pr-1">
                {filteredBins.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 space-y-2">
                    <Info className="w-8 h-8 mx-auto text-slate-400" />
                    <p className="text-sm font-semibold">Aucun bac ne correspond à vos filtres</p>
                    <p className="text-xs">Essayez d'élargir votre recherche ou de modifier les filtres.</p>
                  </div>
                ) : (
                  filteredBins.map((bin) => {
                    const isSelected = selectedBin?.id === bin.id;
                    return (
                      <div
                        key={bin.id}
                        onClick={() => setSelectedBin(bin)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50/70 border-emerald-400 shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">
                              À {bin.distanceMeters}m • {bin.district}
                            </span>
                            <h4 className="text-sm font-bold text-slate-900 leading-snug">
                              {bin.name}
                            </h4>
                            <p className="text-xs text-slate-500">{bin.address}</p>
                          </div>
                          <span
                            className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0 ${
                              bin.fillLevel >= 90
                                ? 'bg-red-100 text-red-700'
                                : bin.fillLevel >= 75
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {bin.fillLevel}% plein
                          </span>
                        </div>

                        {/* Waste badges */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {bin.wasteTypes.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-medium"
                            >
                              {WASTE_TYPES[t]?.label.split(' ')[0]}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
