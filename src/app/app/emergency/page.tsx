'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldAlert,
  Phone,
  Activity,
  HeartPulse,
  Droplet,
  Users,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function EmergencyPage() {
  const router = useRouter();

  const handleEmergencySelect = (query: string) => {
    router.push(`/app/search?q=${encodeURIComponent(query)}`);
  };

  const categories = [
    {
      label: 'Trauma / Injury',
      icon: Activity,
      query: 'trauma center emergency',
      desc: 'Accidents, severe falls, fractures',
    },
    {
      label: 'Unconscious / Unresponsive',
      icon: AlertTriangle,
      query: 'emergency hospital ICU',
      desc: 'Fainting, stroke symptoms',
    },
    {
      label: 'Cardiac Emergency',
      icon: HeartPulse,
      query: 'cardiology emergency hospital',
      desc: 'Chest pain, heart attacks',
    },
    {
      label: 'Severe Bleeding',
      icon: Droplet,
      query: 'emergency blood bank surgery',
      desc: 'Uncontrolled hemorrhage',
    },
    {
      label: 'Pediatric Emergency',
      icon: Users,
      query: 'pediatric emergency hospital',
      desc: 'Urgent care for children',
    },
    {
      label: 'Other Urgent Care',
      icon: ShieldAlert,
      query: '24/7 emergency hospital',
      desc: 'General 24/7 care',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto pt-8 pb-24">
      {/* Top Warning Banner - Distinct Graphite & Coral */}
      <div className="emergency-panel rounded-3xl p-8 lg:p-10 mb-16 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emergency opacity-10 blur-[100px] rounded-full"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
          <div className="bg-surface/10 backdrop-blur-xl p-5 rounded-full text-emergency shrink-0 border border-emergency/20 shadow-[0_0_30px_rgba(225,29,72,0.15)]">
            <ShieldAlert size={48} className="animate-pulse" />
          </div>

          <div className="flex-1">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight">
              Emergency situation?
            </h2>
            <p className="text-lg text-neutral-300 mb-8 max-w-2xl leading-relaxed">
              For life-threatening emergencies, do not rely on app search results.{' '}
              <strong className="text-white">Contact local emergency services immediately.</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:112"
                className="inline-flex items-center justify-center gap-3 bg-emergency hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg shadow-emergency/20 hover:shadow-emergency/40 text-lg"
              >
                <Phone size={22} /> Call 112 (National)
              </a>
              <a
                href="tel:108"
                className="inline-flex items-center justify-center gap-3 bg-surface/10 hover:bg-surface/20 text-white font-bold py-4 px-8 rounded-full border border-white/10 transition-all duration-300 text-lg backdrop-blur-sm"
              >
                <Phone size={22} /> Call 108 (Ambulance)
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10 text-center">
        <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-3 tracking-tight">
          What kind of help is needed?
        </h1>
        <p className="text-neutral-500 text-lg">
          Select a category to find the nearest equipped facility.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => handleEmergencySelect(cat.query)}
            className="flex items-start gap-5 bg-surface border border-border hover:border-emergency/30 hover:shadow-md p-6 rounded-2xl transition-all duration-300 group text-left"
          >
            <div className="bg-neutral-50 border border-border p-4 rounded-xl text-neutral-400 group-hover:text-emergency group-hover:bg-emergency/5 group-hover:border-emergency/20 transition-all">
              <cat.icon size={28} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-neutral-900 group-hover:text-emergency transition-colors mb-1">
                {cat.label}
              </h3>
              <p className="text-neutral-500 text-sm mb-3">{cat.desc}</p>
              <span className="text-xs font-semibold text-neutral-400 group-hover:text-emergency uppercase tracking-wider flex items-center gap-1">
                Find nearby{' '}
                <ArrowRight
                  size={12}
                  className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
