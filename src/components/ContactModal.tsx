/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  FileText, 
  Phone, 
  Mail, 
  AlertCircle 
} from 'lucide-react';
import { Collector, WasteCategory } from '../types/index.ts';
import { WASTE_TYPES } from '../data/mockData.ts';

interface ContactModalProps {
  collector: Collector | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  collector,
  isOpen,
  onClose,
}) => {
  const [companyName, setCompanyName] = useState('');
  const [siret, setSiret] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [wasteType, setWasteType] = useState<WasteCategory>('plastique');
  const [volume, setVolume] = useState('1 à 5 tonnes / mois');
  const [frequency, setFrequency] = useState('weekly');
  const [postalCode, setPostalCode] = useState('75000');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTicketNumber(`DEVIS-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 800);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="p-8 sm:p-12 text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Demande transmise avec succès
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                Votre demande de collecte B2B est enregistrée !
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Le prestataire {collector ? <strong>{collector.name}</strong> : 'partenaire'} a bien reçu votre cahier des charges et vous contactera sous <strong>24 heures ouvrées</strong> avec une proposition chiffrée.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Numéro de référence :</span>
                <span className="font-mono font-bold text-slate-900">{ticketNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Entreprise :</span>
                <span className="font-bold text-slate-800">{companyName || 'Votre société'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Matière principale :</span>
                <span className="font-bold text-slate-800">{WASTE_TYPES[wasteType]?.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Suivi Trackdéchets :</span>
                <span className="text-emerald-700 font-bold">Inclus & Certifié</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors"
            >
              Fermer et revenir à l'annuaire
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
                <Building2 className="w-4 h-4" />
                Mise en Relation Directe B2B
              </div>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                {collector ? `Contacter ${collector.name}` : 'Demande de Collecte Déchets Entreprise'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {collector
                  ? `Demandez un devis d'enlèvement, pose de benne ou rotation de bacs roulants.`
                  : `Décrivez vos flux pour être mis en relation avec le collecteur le plus compétitif.`}
              </p>
            </div>

            {/* Collector recap pill if selected */}
            {collector && (
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-emerald-950">
                    {collector.name} • {collector.city}
                  </span>
                </div>
                <span className="font-bold text-emerald-700">{collector.turnaroundTime}</span>
              </div>
            )}

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Company Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Raison Sociale / Entreprise *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Ateliers Métropole SAS"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
                />
              </div>

              {/* SIRET */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Numéro SIRET (optionnel)
                </label>
                <input
                  type="text"
                  placeholder="14 chiffres"
                  value={siret}
                  onChange={(e) => setSiret(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
                />
              </div>

              {/* Contact Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nom du responsable déchet / contact *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Prénom et Nom"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Professionnel *
                </label>
                <input
                  type="email"
                  required
                  placeholder="contact@entreprise.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Téléphone direct (Côte d'Ivoire) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+225 07 00 00 00 00"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
                />
              </div>

              {/* Commune / Quartier */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Commune / Quartier d'enlèvement *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Cocody Angré, Zone 4, Yopougon..."
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
                />
              </div>

              {/* Waste Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Matière principale à collecter *
                </label>
                <select
                  value={wasteType}
                  onChange={(e) => setWasteType(e.target.value as WasteCategory)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                >
                  <option value="plastique">Plastique (PEHD, PP, film étirable)</option>
                  <option value="carton">Carton ondulé & boîtages</option>
                  <option value="metal">Métal & chutes ferraille</option>
                  <option value="bois">Palettes bois & chutes</option>
                  <option value="deee">Matériel informatique & DEEE</option>
                  <option value="dib">DIB Déchets Industriels Banals</option>
                  <option value="biodechets">Biodéchets & Restauration</option>
                </select>
              </div>

              {/* Estimated Volume */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Volume estimé
                </label>
                <select
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                >
                  <option value="50 à 250 kg">Moins de 250 kg (bac roulant)</option>
                  <option value="250 kg à 1 tonne">250 kg à 1 tonne</option>
                  <option value="1 à 5 tonnes / mois">1 à 5 tonnes / mois</option>
                  <option value="+5 tonnes (Benne 15-30 m³)">+5 tonnes (Benne 15-30 m³)</option>
                </select>
              </div>
            </div>

            {/* Message / Specific notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Détails complémentaires (accès quai, compacteur, date souhaitée...)
              </label>
              <textarea
                rows={3}
                placeholder="Indiquez si vous possédez déjà une benne, vos contraintes horaires ou si vous souhaitez un rachat de matière valorisable."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Données protégées. Conformité Trackdéchets garantie.</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-1/2 sm:w-auto px-6 py-2.5 bg-gradient-to-r from-emerald-700 via-green-600 to-lime-500 hover:from-emerald-800 hover:via-green-700 hover:to-lime-600 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-green-700/20 flex items-center justify-center gap-2 transition-all"
                >
                  {isSubmitting ? (
                    <span>Envoi en cours...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Envoyer la demande</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
