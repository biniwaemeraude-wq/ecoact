/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  Camera, 
  CheckCircle2, 
  MapPin, 
  Send, 
  ThumbsUp,
  Clock
} from 'lucide-react';
import { BinLocation } from '../types/index.ts';

interface ReportBinModalProps {
  bin: BinLocation | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportBinModal: React.FC<ReportBinModalProps> = ({
  bin,
  isOpen,
  onClose,
}) => {
  const [reason, setReason] = useState<'overflowing' | 'damaged' | 'unclean' | 'access_blocked'>('overflowing');
  const [comment, setComment] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [citizenEmail, setCitizenEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reportId, setReportId] = useState('');

  if (!isOpen || !bin) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setReportId(`SIG-${Math.floor(10000 + Math.random() * 90000)}`);
    }, 700);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setComment('');
    setHasPhoto(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-200 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <ThumbsUp className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Signalement citoyen transmis
              </span>
              <h3 className="text-xl font-black text-slate-900">
                Merci pour votre écocitoyenneté !
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                L'ANAGED et les équipes de salubrité urbaine d'Abidjan ont été informées pour intervention prioritaire sur le point <strong>{bin.name}</strong>.
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-left space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Ticket de suivi :</span>
                <span className="font-mono font-bold text-slate-900">{reportId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Délai estimé :</span>
                <span className="font-semibold text-emerald-700">Sous 2 heures (Tournée en cours)</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors"
            >
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-600">
                <AlertTriangle className="w-4 h-4" />
                Signalement Citoyen
              </div>
              <h2 className="text-xl font-black text-slate-900 mt-1">
                Signaler une anomalie sur un bac
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-700">{bin.name}</span>
                <span>({bin.address})</span>
              </div>
            </div>

            {/* Reason selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Nature du problème constaté :
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'overflowing', label: 'Bac débordant / plein' },
                  { id: 'damaged', label: 'Trappe bloquée / cassée' },
                  { id: 'unclean', label: 'Dépôt sauvage au sol' },
                  { id: 'access_blocked', label: 'Accès impossible (véhicule)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setReason(item.id as any)}
                    className={`p-2.5 rounded-xl text-xs font-bold text-left border transition-all ${
                      reason === item.id
                        ? 'bg-red-50 border-red-300 text-red-900 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Précisions supplémentaires :
              </label>
              <textarea
                rows={3}
                placeholder="Ex : Les cartons dépassent sur le trottoir, trappe d'emballage bloquée par un grand emballage..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 text-slate-900"
              />
            </div>

            {/* Photo upload simulation */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Photo (recommandé pour la brigade de voirie) :
              </label>
              <div
                onClick={() => setHasPhoto(!hasPhoto)}
                className={`border-2 border-dashed rounded-xl p-3 text-center cursor-pointer transition-colors ${
                  hasPhoto
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                    : 'border-slate-300 hover:border-slate-400 bg-slate-50 text-slate-600'
                }`}
              >
                <div className="flex items-center justify-center gap-2 text-xs font-semibold">
                  <Camera className="w-4 h-4 text-emerald-600" />
                  <span>
                    {hasPhoto ? '✓ 1 photo jointe (photo_bac_rempli.jpg)' : 'Cliquez pour joindre une photo'}
                  </span>
                </div>
              </div>
            </div>

            {/* Email for updates */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Votre email (optionnel, pour être notifié de la résolution) :
              </label>
              <input
                type="email"
                placeholder="citoyen@email.fr"
                value={citizenEmail}
                onChange={(e) => setCitizenEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 text-slate-900"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
              >
                {isSubmitting ? (
                  <span>Transmission...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Envoyer le signalement</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
