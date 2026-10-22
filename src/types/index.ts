/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type WasteCategory =
  | 'plastique'
  | 'carton'
  | 'metal'
  | 'verre'
  | 'biodechets'
  | 'deee'
  | 'textile'
  | 'bois'
  | 'dib';

export interface WasteTypeMeta {
  id: WasteCategory;
  label: string;
  color: string;
  bgLight: string;
  textColor: string;
  borderColor: string;
  iconName: string;
  description: string;
  binColor: string;
}

export interface BinLocation {
  id: string;
  name: string;
  address: string;
  district: string;
  city: string;
  lat: number;
  lng: number;
  // Normalized percentage coordinate for simulated canvas (0 - 100)
  mapX: number;
  mapY: number;
  wasteTypes: WasteCategory[];
  fillLevel: number; // 0 - 100%
  status: 'available' | 'high' | 'full' | 'maintenance';
  lastCollected: string;
  nextScheduledCollection: string;
  distanceMeters: number;
  accessiblePMR: boolean;
  type: 'aerien' | 'enterre' | 'composteur';
  notes?: string;
}

export interface Collector {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logoUrl?: string;
  rating: number;
  reviewsCount: number;
  wasteTypes: WasteCategory[];
  serviceRadius: string;
  minQuantity: string;
  certifications: string[];
  city: string;
  postalCode: string;
  phone: string;
  email: string;
  website: string;
  trackdechetsCompliant: boolean; // Bordereau de Suivi Déchets dématérialisé
  valorisationRate: number; // %
  pricingModel: string;
  turnaroundTime: string;
  featured?: boolean;
}

export interface WasteSortingItem {
  id: string;
  name: string;
  category: WasteCategory;
  binColor: string;
  destination: string;
  tips: string;
  co2SavedPerKg: number;
  b2bRecyclable: boolean;
}

export interface QuoteRequest {
  collectorId: string;
  collectorName: string;
  companyName: string;
  siret?: string;
  contactName: string;
  email: string;
  phone: string;
  wasteType: WasteCategory | 'multiple';
  estimatedVolume: string;
  collectionFrequency: 'one-shot' | 'weekly' | 'bi-weekly' | 'monthly' | 'on-demand';
  postalCode: string;
  address: string;
  message: string;
}

export interface BinReport {
  binId: string;
  binName: string;
  reason: 'overflowing' | 'damaged' | 'unclean' | 'access_blocked' | 'other';
  urgency: 'low' | 'medium' | 'high';
  citizenEmail?: string;
  comment: string;
  timestamp: string;
}

export interface VisitorEvent {
  id: string;
  timestamp: string;
  commune: string;
  device: 'Mobile' | 'Desktop' | 'Tablette';
  action: string;
  page: string;
}

export interface AnalyticsStats {
  liveVisitors: number;
  todayUniqueVisitors: number;
  totalPageViews: number;
  totalQuotesSent: number;
  totalReportsSubmitted: number;
  avgSessionDuration: string;
}
