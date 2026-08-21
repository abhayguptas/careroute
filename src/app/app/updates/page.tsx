'use client';

import React from 'react';
import { Activity, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export default function UpdatesPage() {
  const updates = [
    {
      facility: 'Fortis Escorts Heart Institute',
      change: 'Emergency timing changed',
      previous: '8:00 AM - 10:00 PM',
      current: '24/7',
      time: '2 hours ago',
      source: 'Official website',
    },
    {
      facility: 'Max Super Speciality',
      change: 'New department detected',
      previous: null,
      current: 'Pediatric Cardiology',
      time: '5 hours ago',
      source: 'Facility directory update',
    },
    {
      facility: 'Apollo Spectra',
      change: 'Phone number updated',
      previous: '+91 11 2345 6789',
      current: '+91 11 9876 5432',
      time: '1 day ago',
      source: 'Contact page',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="mb-10">
        <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-2 flex items-center gap-3 tracking-tight">
          <div className="bg-brand/10 p-2 rounded-xl text-brand">
            <Activity size={28} />
          </div>
          Intelligence Updates
        </h1>
        <p className="text-neutral-500 text-lg lg:ml-14">Recent changes detected by the CareRoute network.</p>
      </div>

      <div className="relative border-l-2 border-neutral-200 ml-6 space-y-10 pb-8">
        {updates.map((update, i) => (
          <div key={i} className="relative pl-10">
            <div className="absolute w-4 h-4 bg-surface border-2 border-brand rounded-full -left-[9px] top-2 shadow-sm"></div>

            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-neutral-900 text-lg">{update.facility}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant="outline"
                      className="bg-brand/5 text-brand border-brand/20"
                    >
                      {update.change}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center text-xs text-neutral-500 gap-1 bg-neutral-100 px-3 py-1.5 rounded-lg font-medium">
                  <Clock size={12} />
                  {update.time}
                </div>
              </div>

              <div className="flex items-center gap-4 bg-neutral-50 p-4 rounded-xl border border-border/60 mb-3 text-sm">
                {update.previous ? (
                  <>
                    <span className="text-neutral-400 line-through">{update.previous}</span>
                    <ArrowRight size={14} className="text-neutral-300" />
                    <span className="text-success font-semibold">{update.current}</span>
                  </>
                ) : (
                  <span className="text-success font-semibold">+ {update.current}</span>
                )}
              </div>

              <p className="text-xs text-neutral-500 font-medium">Source: {update.source}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
