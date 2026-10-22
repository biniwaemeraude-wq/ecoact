/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Recycle, ShieldCheck, Heart, ExternalLink, Leaf, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'landing' | 'map' | 'b2b' | 'education') => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuote }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-700 via-green-600 to-lime-400 flex items-center justify-center text-white shadow-sm">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Eco<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-lime-300">Act</span>
                <span className="ml-1.5 text-[10px] font-bold text-lime-400 uppercase tracking-wider">Abidjan</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              <strong className="text-slate-200">EcoAct</strong> est la plateforme éco-citoyenne et réseau B2B à Abidjan pour accélérer le réemploi et le recyclage territorial. Connecter la donnée citoyenne temps réel et les filières agréées ANAGED.
            </p>
            <div className="flex items-center gap-2 text-lime-400 font-semibold text-xs pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Conforme aux normes de Salubrité Urbaine & ANAGED</span>
            </div>
          </div>

          {/* Citizen Column */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide">
              Espace Éco-Citoyen
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('map')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Carte des bacs de tri
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('education')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Guide des consignes de tri
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('education')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Calculateur d'impact carbone
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('map')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Signaler un bac saturé
                </button>
              </li>
            </ul>
          </div>

          {/* B2B Column */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide">
              Espace Entreprises (B2B)
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('b2b')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Annuaire des collecteurs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('b2b')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Collecte plastique & films
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('b2b')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Collecte cartons & papiers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('b2b')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Ferraille & métaux industriels
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenQuote}
                  className="text-emerald-400 font-semibold hover:underline text-left block"
                >
                  Demande de devis gratuit &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Regulation Column */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide">
              Réglementation & Liens
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5 hover:text-white">
                <span>ANAGED (Salubrité Côte d'Ivoire)</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white">
                <span>Ministère de l'Environnement (MINEDD)</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white">
                <span>District Autonome d'Abidjan</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white">
                <span>Données OpenStreetMap Côte d'Ivoire</span>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin' as any)}
                  className="text-emerald-400 font-bold hover:underline flex items-center gap-1 mt-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Accès Administrateur (Statistiques Visiteurs)</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom micro bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} EcoAct Abidjan • Plateforme Éco-Citoyenne & B2B (Côte d'Ivoire).</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Conçu avec</span>
            <Leaf className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
            <span>pour un Abidjan vert et zéro-déchet</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

