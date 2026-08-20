'use client';

import React, { useState } from 'react';
import {
  Activity,
  Database,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ChevronRight,
} from 'lucide-react';
import { StatusPill } from '@/components/ui/StatusPill';
import { ScraperStatus } from '@/domain/scraper';

export default function ScraperHealthPage() {
  const [selectedScraper, setSelectedScraper] = useState<string | null>(null);

  const scrapers = [
    {
      id: 'c_8f7d6a5b',
      name: 'Fortis Hospital Delhi',
      status: 'healthy',
      lastRun: '2 hours ago',
      freshness: '100%',
      target: 'https://fortishealthcare.com/...',
    },
    {
      id: 'c_9a2b3c4d',
      name: 'Apollo Spectra',
      status: 'broken',
      lastRun: '1 day ago',
      freshness: '65%',
      target: 'https://apollo.com/...',
    },
    {
      id: 'c_1e2f3g4h',
      name: 'Max Super Speciality',
      status: 'healing',
      lastRun: 'Just now',
      freshness: 'N/A',
      target: 'https://maxhealthcare.in/...',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Activity className="text-brand" />
          Scraper Health Infrastructure
        </h1>
        <p className="text-slate-400">Powered by Bright Data Web Scraper API & AI Flow</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-neutral-950 border border-border rounded-xl p-6 shadow-sm">
          <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
            Total Collectors
          </div>
          <div className="text-3xl font-bold text-white">42</div>
        </div>
        <div className="bg-neutral-950 border border-border rounded-xl p-6 shadow-sm">
          <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
            Healthy
          </div>
          <div className="text-3xl font-bold text-green-500 flex items-center gap-2">
            39 <CheckCircle2 size={24} />
          </div>
        </div>
        <div className="bg-neutral-950 border border-emergency/30 rounded-xl p-6 shadow-[0_0_15px_rgba(225,29,72,0.05)]">
          <div className="text-sm font-bold text-emergency uppercase tracking-wider mb-2">
            Needs Attention
          </div>
          <div className="text-3xl font-bold text-white flex items-center gap-2">
            2 <AlertTriangle size={24} className="text-emergency" />
          </div>
        </div>
        <div className="bg-neutral-950 border border-amber-500/30 rounded-xl p-6 shadow-sm">
          <div className="text-sm font-bold text-amber-500 uppercase tracking-wider mb-2">
            AI Healing
          </div>
          <div className="text-3xl font-bold text-white flex items-center gap-2">
            1 <RefreshCw size={24} className="text-amber-500 animate-spin-slow" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Collector Table */}
        <div className="lg:col-span-2 bg-neutral-950 border border-border rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-900 border-b border-neutral-800">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-400">Facility / Target</th>
                <th className="px-6 py-4 font-semibold text-slate-400">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-400">Last Run</th>
                <th className="px-6 py-4 font-semibold text-slate-400"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {scrapers.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => setSelectedScraper(s.id)}
                  className={`cursor-pointer hover:bg-neutral-900 transition-colors ${selectedScraper === s.id ? 'bg-neutral-900' : ''}`}
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-200">{s.name}</div>
                    <div className="text-xs text-slate-500 font-mono mt-1">{s.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusPill status={s.status as ScraperStatus} />
                  </td>
                  <td className="px-6 py-4 text-slate-400">{s.lastRun}</td>
                  <td className="px-6 py-4 text-right">
                    <ChevronRight size={16} className="text-slate-500 ml-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail Panel */}
        {selectedScraper ? (
          <div className="bg-neutral-950 border border-border rounded-xl p-6">
            {scrapers.find((s) => s.id === selectedScraper)?.status === 'healing' ? (
              <div className="h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-800">
                  <RefreshCw className="text-amber-500 animate-spin" size={24} />
                  <div>
                    <h3 className="font-bold text-white text-lg">Self-Healing in Progress</h3>
                    <p className="text-slate-400 text-sm font-mono">{selectedScraper}</p>
                  </div>
                </div>

                <div className="space-y-6 flex-1">
                  <div className="relative pl-6 border-l-2 border-neutral-800 pb-2">
                    <div className="absolute w-3 h-3 bg-neutral-800 rounded-full -left-[7px] top-1"></div>
                    <p className="text-sm font-bold text-slate-300">Target Website Changed</p>
                    <p className="text-xs text-slate-500">10:42 AM</p>
                  </div>
                  <div className="relative pl-6 border-l-2 border-neutral-800 pb-2">
                    <div className="absolute w-3 h-3 bg-red-500/20 border border-red-500 rounded-full -left-[7px] top-1"></div>
                    <p className="text-sm font-bold text-red-400">Schema Validation Failed</p>
                    <p className="text-xs text-slate-500">
                      10:45 AM • Missing field: emergency_hours
                    </p>
                  </div>
                  <div className="relative pl-6 border-l-2 border-amber-500/30">
                    <div className="absolute w-3 h-3 bg-amber-500 rounded-full -left-[7px] top-1 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                    <p className="text-sm font-bold text-amber-500">AI Re-mapping Schema</p>
                    <p className="text-xs text-slate-500">In progress...</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-bold text-white text-lg mb-1">Collector Details</h3>
                <p className="text-slate-400 text-sm font-mono mb-6">{selectedScraper}</p>
                <div className="space-y-4 text-sm">
                  <div className="bg-neutral-900 p-3 rounded">
                    <span className="text-slate-500 block mb-1">Target</span>
                    <span className="text-brand truncate block">
                      {scrapers.find((s) => s.id === selectedScraper)?.target}
                    </span>
                  </div>
                  <div className="bg-neutral-900 p-3 rounded">
                    <span className="text-slate-500 block mb-1">Data Quality Score</span>
                    <span className="text-green-500 font-bold">98% Match</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-neutral-950 border border-dashed border-border rounded-xl p-12 flex flex-col items-center justify-center text-center">
            <Database size={32} className="text-slate-600 mb-4" />
            <p className="text-slate-400">Select a collector to view details and health history.</p>
          </div>
        )}
      </div>
    </div>
  );
}
