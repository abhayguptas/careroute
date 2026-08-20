'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Phone, Activity, HeartPulse, Droplet, Users, AlertTriangle } from 'lucide-react';

export default function EmergencyPage() {
  const router = useRouter();

  const handleEmergencySelect = (query: string) => {
    router.push(`/app/search?q=${encodeURIComponent(query)}`);
  };

  const categories = [
    { label: 'Trauma / Injury', icon: Activity, query: 'trauma center emergency' },
    { label: 'Unconscious / Unresponsive', icon: AlertTriangle, query: 'emergency hospital ICU' },
    { label: 'Cardiac Emergency', icon: HeartPulse, query: 'cardiology emergency hospital' },
    { label: 'Severe Bleeding', icon: Droplet, query: 'emergency blood bank surgery' },
    { label: 'Pediatric Emergency', icon: Users, query: 'pediatric emergency hospital' },
    { label: 'Other Urgent Care', icon: ShieldAlert, query: '24/7 emergency hospital' },
  ];

  return (
    <div className="max-w-3xl mx-auto pt-8 pb-24">
      {/* Top Warning Banner */}
      <div className="bg-emergency/10 border border-emergency/30 rounded-xl p-6 mb-12 flex items-start gap-4 shadow-[0_0_30px_rgba(225,29,72,0.1)]">
        <div className="bg-emergency/20 p-3 rounded-full text-emergency shrink-0">
          <ShieldAlert size={32} className="animate-pulse" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Emergency situation?</h2>
          <p className="text-slate-300 mb-4">
            For life-threatening emergencies, do not rely on app search results. <strong className="text-white">Contact local emergency services immediately.</strong>
          </p>
          <div className="flex gap-4">
            <a href="tel:112" className="inline-flex items-center gap-2 bg-emergency hover:bg-emergency/80 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              <Phone size={20} /> Call 112 (National)
            </a>
            <a href="tel:108" className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3 px-6 rounded-lg border border-neutral-600 transition-colors">
              <Phone size={20} /> Call 108 (Ambulance)
            </a>
          </div>
        </div>
      </div>

      <h1 className="text-3xl lg:text-4xl font-bold text-white mb-8 text-center">What kind of help is needed?</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => handleEmergencySelect(cat.query)}
            className="flex items-center gap-4 bg-neutral-950 border border-neutral-800 hover:border-emergency/50 hover:bg-emergency/5 p-6 rounded-2xl transition-all group text-left"
          >
            <div className="bg-neutral-900 border border-neutral-700 p-4 rounded-xl text-slate-400 group-hover:text-emergency group-hover:border-emergency/30 transition-colors">
              <cat.icon size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-200 group-hover:text-white transition-colors">{cat.label}</h3>
              <p className="text-slate-500 text-sm mt-1">Find nearby verified resources</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
