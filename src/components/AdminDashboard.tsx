/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Activity, 
  Eye, 
  TrendingUp, 
  Smartphone, 
  Monitor, 
  Tablet, 
  MapPin, 
  Clock, 
  FileText, 
  AlertTriangle, 
  RefreshCw, 
  Download, 
  ShieldCheck, 
  Radio, 
  CheckCircle2, 
  Globe2,
  Calendar,
  Filter
} from 'lucide-react';
import { VisitorEvent, AnalyticsStats } from '../types/index.ts';
import { INITIAL_VISITOR_EVENTS } from '../data/mockData.ts';

interface AdminDashboardProps {
  onClose: () => void;
  quotesCount: number;
  reportsCount: number;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onClose,
  quotesCount,
  reportsCount,
}) => {
  // Real-time visitor state with local persistence
  const [stats, setStats] = useState<AnalyticsStats>(() => {
    const saved = localStorage.getItem('ecocollecte_admin_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      liveVisitors: 28,
      todayUniqueVisitors: 1420,
      totalPageViews: 4890,
      totalQuotesSent: quotesCount || 18,
      totalReportsSubmitted: reportsCount || 12,
      avgSessionDuration: '3m 48s',
    };
  });

  const [period, setPeriod] = useState<'today' | '7days' | 'month'>('today');
  const [recentEvents, setRecentEvents] = useState<VisitorEvent[]>(() => {
    const saved = localStorage.getItem('ecocollecte_admin_events');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_VISITOR_EVENTS;
  });

  const [isLiveActive, setIsLiveActive] = useState(true);

  // Periodic heartbeat simulating live visitor arrivals across Abidjan
  useEffect(() => {
    if (!isLiveActive) return;

    const interval = setInterval(() => {
      // Random fluctuation for live visitors
      const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
      setStats((prev) => {
        const nextLive = Math.max(12, Math.min(65, prev.liveVisitors + delta));
        const updated = {
          ...prev,
          liveVisitors: nextLive,
          todayUniqueVisitors: prev.todayUniqueVisitors + (Math.random() > 0.6 ? 1 : 0),
          totalPageViews: prev.totalPageViews + Math.floor(Math.random() * 3) + 1,
        };
        localStorage.setItem('ecocollecte_admin_stats', JSON.stringify(updated));
        return updated;
      });

      // Occasionally add a new live visitor event in Abidjan
      if (Math.random() > 0.4) {
        const communes = [
          'Cocody (Riviera)',
          'Cocody (Angré)',
          'Plateau',
          'Marcory (Zone 4)',
          'Yopougon (Siporex)',
          'Treichville',
          'Koumassi',
          'Adjamé',
        ];
        const actions = [
          'A ouvert la carte interactive des bacs',
          'A vérifié la disponibilité de la borne Riviera 3',
          'A consulté l’annuaire des collecteurs plastiques',
          'A calculé son empreinte carbone (simulateur)',
          'A partagé la position d’un point d’apport à Cocody',
          'A visualisé la jauge du bac Plateau - Rue du Commerce',
        ];
        const devices: ('Mobile' | 'Desktop' | 'Tablette')[] = [
          'Mobile',
          'Mobile',
          'Mobile',
          'Desktop',
          'Tablette',
        ];

        const newEvent: VisitorEvent = {
          id: `evt-${Date.now()}`,
          timestamp: 'À l’instant',
          commune: communes[Math.floor(Math.random() * communes.length)],
          device: devices[Math.floor(Math.random() * devices.length)],
          action: actions[Math.floor(Math.random() * actions.length)],
          page: 'Application Web Abidjan',
        };

        setRecentEvents((prev) => {
          const updated = [newEvent, ...prev.slice(0, 15)];
          localStorage.setItem('ecocollecte_admin_events', JSON.stringify(updated));
          return updated;
        });
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isLiveActive]);

  const communesBreakdown = [
    { commune: 'Cocody (Riviera, Angré, 2 Plateaux)', percent: 38, count: Math.round(stats.todayUniqueVisitors * 0.38) },
    { commune: 'Plateau (Quartier des affaires)', percent: 24, count: Math.round(stats.todayUniqueVisitors * 0.24) },
    { commune: 'Marcory & Zone 4 / Biétry', percent: 18, count: Math.round(stats.todayUniqueVisitors * 0.18) },
    { commune: 'Yopougon (Siporex, Maroc, Bel Air)', percent: 12, count: Math.round(stats.todayUniqueVisitors * 0.12) },
    { commune: 'Treichville, Koumassi & Vridi', percent: 8, count: Math.round(stats.todayUniqueVisitors * 0.08) },
  ];

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Admin Header */}
        <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                Session Administrateur Sécurisée
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold">
                <Globe2 className="w-3.5 h-3.5" />
                Territoire : Abidjan, Côte d'Ivoire
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-2 flex items-center gap-3">
              <span>Tableau de Bord & Métriques Visiteurs</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Supervision en temps réel des citoyens et entreprises utilisant la plateforme <strong className="text-lime-400 font-bold">EcoAct</strong> à Abidjan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Live Indicator toggle */}
            <button
              onClick={() => setIsLiveActive(!isLiveActive)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                isLiveActive
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-700 text-slate-400 border-slate-600'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${isLiveActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              <span>{isLiveActive ? 'Flux direct actif' : 'En pause'}</span>
            </button>

            {/* Time Period Filter */}
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-700 text-xs font-semibold">
              <button
                onClick={() => setPeriod('today')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  period === 'today' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Aujourd'hui
              </button>
              <button
                onClick={() => setPeriod('7days')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  period === '7days' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                7 jours
              </button>
              <button
                onClick={() => setPeriod('month')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  period === 'month' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Ce mois
              </button>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Retour au site
            </button>
          </div>
        </div>

        {/* 4 Key Real-Time Counter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Live Visitors Right Now */}
          <div className="bg-gradient-to-br from-emerald-950/80 to-slate-800 p-6 rounded-3xl border border-emerald-500/40 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full pointer-events-none" />
            <div className="flex items-center justify-between text-emerald-400 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                En ligne actuellement
              </span>
              <Radio className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                {stats.liveVisitors}
              </span>
              <span className="text-xs text-emerald-300 font-semibold">internautes actifs</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Naviguent sur la carte ou l’annuaire B2B
            </p>
          </div>

          {/* Card 2: Today Unique Visitors */}
          <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between text-blue-400 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">
                Visiteurs Uniques (24h)
              </span>
              <Users className="w-5 h-5" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                {stats.todayUniqueVisitors.toLocaleString('fr-FR')}
              </span>
              <span className="text-xs text-emerald-400 font-bold">+18.4%</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Citoyens et entreprises du Grand Abidjan
            </p>
          </div>

          {/* Card 3: Total Page Views */}
          <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between text-amber-400 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">
                Pages & Vues Bacs
              </span>
              <Eye className="w-5 h-5" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                {stats.totalPageViews.toLocaleString('fr-FR')}
              </span>
              <span className="text-xs text-slate-400 font-semibold">vues</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Moyenne : 3.4 pages par visiteur
            </p>
          </div>

          {/* Card 4: Session Duration & Engagement */}
          <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between text-purple-400 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">
                Durée Moyenne Session
              </span>
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                {stats.avgSessionDuration}
              </span>
              <span className="text-xs text-emerald-400 font-bold">Forte rétention</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Recherches actives de bacs et devis
            </p>
          </div>
        </div>

        {/* Breakdown by Communes in Abidjan & Device Tech */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Communes of Abidjan (8 cols) */}
          <div className="lg:col-span-7 bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-md space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <span>Provenance Géographique par Commune (Abidjan)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Répartition des visites selon les connexions réseau et requêtes géolocalisées
                </p>
              </div>
              <span className="text-xs bg-slate-900 px-2.5 py-1 rounded-lg text-slate-300 font-semibold border border-slate-700">
                Côte d'Ivoire
              </span>
            </div>

            <div className="space-y-4 pt-2">
              {communesBreakdown.map((item) => (
                <div key={item.commune} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-200">{item.commune}</span>
                    <span className="text-emerald-400 font-mono">
                      {item.count} visites ({item.percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-700/60">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-700/70 grid grid-cols-2 sm:grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-700">
                <span className="text-slate-400 block text-[11px]">Zone la plus active</span>
                <span className="text-white font-bold mt-0.5 block">Cocody (38%)</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-700">
                <span className="text-slate-400 block text-[11px]">Pic de consultation</span>
                <span className="text-white font-bold mt-0.5 block">11h30 & 18h00</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-700 col-span-2 sm:col-span-1">
                <span className="text-slate-400 block text-[11px]">Taux de rebond</span>
                <span className="text-emerald-400 font-bold mt-0.5 block">24.1% (Très bon)</span>
              </div>
            </div>
          </div>

          {/* Devices & Conversions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Device breakdown */}
            <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-md space-y-4">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <span>Supports de Consultation</span>
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-slate-300">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    Mobile (Android / iPhone)
                  </span>
                  <span className="font-bold text-white font-mono">72%</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[72%]" />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-slate-300">
                    <Monitor className="w-4 h-4 text-blue-400" />
                    Ordinateurs / Desktop (Bureaux)
                  </span>
                  <span className="font-bold text-white font-mono">24%</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[24%]" />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-slate-300">
                    <Tablet className="w-4 h-4 text-amber-400" />
                    Tablettes
                  </span>
                  <span className="font-bold text-white font-mono">4%</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[4%]" />
                </div>
              </div>
            </div>

            {/* Action / Conversion summary */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 border border-slate-700 shadow-md space-y-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                <span>Interactions Directes Citoyen & B2B</span>
              </h3>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-700">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Devis B2B Demandés
                  </span>
                  <span className="text-2xl font-black text-emerald-400">
                    {stats.totalQuotesSent}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    Transmis aux collecteurs
                  </span>
                </div>

                <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-700">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Bacs Signalés Pleins
                  </span>
                  <span className="text-2xl font-black text-amber-400">
                    {stats.totalReportsSubmitted}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    Remontés à l'ANAGED
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Visitor Activity Stream (Real-Time Feed) */}
        <div className="bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
                <span>Journal d'Activité en Direct des Utilisateurs (Abidjan)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Dernières interactions anonymisées des citoyens et gestionnaires de déchets à Abidjan.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => {
                  const reset = INITIAL_VISITOR_EVENTS;
                  setRecentEvents(reset);
                  localStorage.setItem('ecocollecte_admin_events', JSON.stringify(reset));
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-700"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Réinitialiser le flux</span>
              </button>
            </div>
          </div>

          <div className="divide-y divide-slate-700/60 max-h-96 overflow-y-auto pr-1">
            {recentEvents.map((event) => (
              <div
                key={event.id}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-700/40 px-3 rounded-xl transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-emerald-400 shrink-0 border border-slate-700">
                    {event.device === 'Mobile' ? (
                      <Smartphone className="w-4 h-4" />
                    ) : event.device === 'Desktop' ? (
                      <Monitor className="w-4 h-4" />
                    ) : (
                      <Tablet className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">
                        Visiteur • {event.commune}
                      </span>
                      <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-900 text-slate-400 border border-slate-700">
                        {event.device}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {event.action}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 self-end sm:self-auto">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{event.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
