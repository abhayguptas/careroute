'use client';

import React from 'react';
import { Activity, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export default function UpdatesPage() {
  const updates = [
    {
      facility: "Fortis Escorts Heart Institute",
      change: "Emergency timing changed",
      previous: "8:00 AM - 10:00 PM",
      current: "24/7",
      time: "2 hours ago",
      source: "Official website"
    },
    {
      facility: "Max Super Speciality",
      change: "New department detected",
      previous: null,
      current: "Pediatric Cardiology",
      time: "5 hours ago",
      source: "Facility directory update"
    },
    {
      facility: "Apollo Spectra",
      change: "Phone number updated",
      previous: "+91 11 2345 6789",
      current: "+91 11 9876 5432",
      time: "1 day ago",
      source: "Contact page"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Activity className="text-brand" />
          Intelligence Updates
        </h1>
        <p className="text-slate-400">Recent changes detected by the CareRoute network.</p>
      </div>

      <div className="relative border-l border-neutral-800 ml-4 space-y-8 pb-8">
        {updates.map((update, i) => (
          <div key={i} className="relative pl-8">
            <div className="absolute w-4 h-4 bg-neutral-900 border-2 border-brand rounded-full -left-[8px] top-1"></div>
            
            <div className="bg-neutral-950 border border-border rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-white">{update.facility}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="bg-brand/10 text-brand-light border-brand/20">
                      {update.change}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center text-xs text-slate-500 gap-1 bg-neutral-900 px-2 py-1 rounded">
                  <Clock size={12} />
                  {update.time}
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-neutral-900 p-3 rounded-lg border border-neutral-800 mb-3 text-sm">
                {update.previous ? (
                  <>
                    <span className="text-slate-500 line-through">{update.previous}</span>
                    <ArrowRight size={14} className="text-slate-600" />
                    <span className="text-green-500 font-semibold">{update.current}</span>
                  </>
                ) : (
                  <span className="text-green-500 font-semibold">+ {update.current}</span>
                )}
              </div>
              
              <p className="text-xs text-slate-500">Source: {update.source}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
