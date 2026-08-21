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

export default function ScraperHealthPage() {
  const [selectedScraper, setSelectedScraper] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [scrapers, setScrapers] = useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/scrapers')
      .then((res) => res.json())
      .then((data) => {
        setScrapers(data);
      })
      .catch((err) => {
        console.error('Failed to fetch scrapers:', err);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto pb-24">
      <div className="mb-10 lg:mb-16">
        <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-2 flex items-center gap-3 tracking-tight">
          <div className="bg-brand/10 p-2 rounded-xl text-brand">
            <Activity size={28} />
          </div>
          Scraper Health Infrastructure
        </h1>
        <p className="text-neutral-500 text-lg lg:ml-14">
          Powered by Bright Data Web Scraper API & AI Flow
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6 mb-12">
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
          <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-3">
            Total Collectors
          </div>
          <div className="text-4xl font-bold text-neutral-900">{scrapers.length}</div>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
          <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-3">
            Ready
          </div>
          <div className="text-4xl font-bold text-success flex items-center gap-2">
            {scrapers.filter(s => s.status === 'ready').length} <CheckCircle2 size={24} />
          </div>
        </div>
        <div className="bg-emergency/5 border border-emergency/20 rounded-2xl p-6 shadow-sm">
          <div className="text-[11px] font-bold text-emergency uppercase tracking-widest mb-3">
            Needs Attention / Failed
          </div>
          <div className="text-4xl font-bold text-emergency flex items-center gap-2">
            {scrapers.filter(s => ['needs_attention', 'failed'].includes(s.status)).length} <AlertTriangle size={24} className="text-emergency" />
          </div>
        </div>
        <div className="bg-warning/5 border border-warning/20 rounded-2xl p-6 shadow-sm">
          <div className="text-[11px] font-bold text-warning-foreground uppercase tracking-widest mb-3">
            AI Healing
          </div>
          <div className="text-4xl font-bold text-warning-foreground flex items-center gap-2">
            {scrapers.filter(s => s.status === 'healing').length} <RefreshCw size={24} className="text-warning-foreground animate-spin-slow" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Collector Table */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-50 border-b border-border/60">
                <tr>
                  <th className="px-6 py-4 font-bold text-[11px] text-neutral-400 uppercase tracking-widest">
                    Facility / Target
                  </th>
                  <th className="px-6 py-4 font-bold text-[11px] text-neutral-400 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-6 py-4 font-bold text-[11px] text-neutral-400 uppercase tracking-widest">
                    Last Known Run
                  </th>
                  <th className="px-6 py-4 font-bold text-[11px] text-neutral-400 uppercase tracking-widest"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {scrapers.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => setSelectedScraper(s.id)}
                    className={`cursor-pointer hover:bg-neutral-50 transition-colors ${selectedScraper === s.id ? 'bg-neutral-50' : ''}`}
                  >
                    <td className="px-6 py-5">
                      <div className="font-bold text-neutral-900">{s.name}</div>
                      <div className="text-xs text-neutral-400 font-mono mt-1">{s.collectorId}</div>
                    </td>
                    <td className="px-6 py-5">
                      <StatusPill status={s.status === 'queued' ? s.generationStatus : s.status} />
                    </td>
                    <td className="px-6 py-5 text-neutral-500 font-medium">
                      {s.lastRunAt ? new Date(s.lastRunAt).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <ChevronRight
                        size={16}
                        className={`ml-auto transition-transform ${selectedScraper === s.id ? 'text-brand translate-x-1' : 'text-neutral-300'}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Panel */}
        {selectedScraper ? (
          <div className="bg-surface border border-border rounded-2xl p-6 lg:p-8 shadow-sm relative overflow-hidden">
            {scrapers.find((s) => s.id === selectedScraper)?.status === 'healing' ? (
              <div className="h-full flex flex-col relative z-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-warning/10 blur-[40px] rounded-full -z-10"></div>
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border/60">
                  <div className="bg-warning/10 text-warning-foreground p-3 rounded-full">
                    <RefreshCw className="animate-spin" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 text-xl tracking-tight">
                      Self-Healing in Progress
                    </h3>
                    <p className="text-neutral-500 text-xs font-mono mt-1">{selectedScraper}</p>
                  </div>
                </div>

                <div className="space-y-8 flex-1 pl-2">
                  <div className="relative pl-6 border-l-2 border-neutral-200 pb-2">
                    <div className="absolute w-3 h-3 bg-neutral-300 rounded-full -left-[7px] top-1"></div>
                    <p className="text-sm font-bold text-neutral-900">Target Website Changed</p>
                    <p className="text-xs text-neutral-500 font-medium mt-1">10:42 AM</p>
                  </div>
                  <div className="relative pl-6 border-l-2 border-neutral-200 pb-2">
                    <div className="absolute w-3 h-3 bg-red-100 border-2 border-red-500 rounded-full -left-[7px] top-1"></div>
                    <p className="text-sm font-bold text-red-600">Schema Validation Failed</p>
                    <p className="text-xs text-neutral-500 font-medium mt-1">
                      10:45 AM • Missing field: emergency_hours
                    </p>
                  </div>
                  <div className="relative pl-6 border-l-2 border-warning/30">
                    <div className="absolute w-3 h-3 bg-warning-foreground rounded-full -left-[7px] top-1 shadow-[0_0_10px_rgba(217,119,6,0.4)]"></div>
                    <p className="text-sm font-bold text-warning-foreground">
                      AI Re-mapping Schema
                    </p>
                    <p className="text-xs text-neutral-500 font-medium mt-1">In progress...</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-bold text-neutral-900 text-xl mb-1 tracking-tight">
                  Collector Details
                </h3>
                <p className="text-neutral-500 text-sm font-mono mb-8 pb-6 border-b border-border/60">
                  {selectedScraper}
                </p>
                <div className="space-y-4 text-sm">
                  <div className="bg-neutral-50 border border-border p-4 rounded-xl shadow-inner">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-2">
                      Target
                    </span>
                    <span className="text-brand font-medium truncate block">
                      {scrapers.find((s) => s.id === selectedScraper)?.targetUrl}
                    </span>
                  </div>
                  <div className="bg-neutral-50 border border-border p-4 rounded-xl shadow-inner">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-2">
                      Schema Version
                    </span>
                    <span className="text-success font-bold text-lg">
                      v{scrapers.find((s) => s.id === selectedScraper)?.schemaVersion || '1.0'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-neutral-50 border-2 border-dashed border-border rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <Database size={48} className="text-neutral-300 mb-6" />
            <p className="text-neutral-500 font-medium max-w-[200px]">
              Select a collector to view details and health history.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
