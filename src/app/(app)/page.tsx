'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  ShieldAlert,
  HeartPulse,
  Building2,
  Activity,
  ChevronRight,
  Droplet,
  Stethoscope,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AppHome() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/app/search?q=${encodeURIComponent(query)}`);
    }
  };

  const quickSearches = [
    { label: 'Government hospitals', icon: Building2 },
    { label: 'Trauma care', icon: Activity },
    { label: 'Blood resources', icon: Droplet },
    { label: 'Pediatric cardiology', icon: Stethoscope },
  ];

  return (
    <div className="max-w-4xl mx-auto pt-12 pb-24">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-slate-400 mb-2 font-normal">Good afternoon.</h1>
        <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
          What healthcare help do you need?
        </h2>
      </div>

      {/* Main Search Composer */}
      <form onSubmit={handleSearch} className="relative mb-12 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-brand/50 to-blue-600/50 rounded-2xl blur opacity-25 group-focus-within:opacity-75 transition duration-500"></div>
        <div className="relative bg-neutral-950 border border-neutral-700 rounded-2xl shadow-xl flex items-center p-2 transition-all">
          <div className="pl-4 pr-2 text-brand">
            <Search size={24} />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Find a government hospital with nephrology..."
            className="flex-1 bg-transparent border-none text-white text-lg lg:text-xl py-4 focus:ring-0 placeholder-slate-500 font-medium w-full outline-none"
            autoFocus
          />
          <div className="pr-2 pl-4 border-l border-neutral-800 flex items-center gap-2">
            <Button type="submit" size="lg" className="px-8 rounded-xl shadow-lg">
              Search
            </Button>
          </div>
        </div>
      </form>

      {/* Quick Actions */}
      <div className="mb-16">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
          Quick Navigation
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <button
            onClick={() => router.push('/app/emergency')}
            className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-emergency/10 border border-emergency/20 text-emergency hover:bg-emergency/20 transition-colors col-span-2 md:col-span-1"
          >
            <ShieldAlert size={24} />
            <span className="font-semibold text-sm">Emergency</span>
          </button>

          {quickSearches.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                setQuery(item.label);
                router.push(`/app/search?q=${encodeURIComponent(item.label)}`);
              }}
              className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-slate-300 hover:bg-neutral-800 hover:text-white transition-colors text-center"
            >
              <item.icon size={24} className="text-brand" />
              <span className="font-medium text-sm leading-tight">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
            Recent Searches
          </h3>
          <div className="space-y-2">
            <button className="w-full text-left p-3 rounded-lg bg-neutral-900/50 hover:bg-neutral-800 text-slate-300 flex items-center justify-between group transition-colors border border-transparent hover:border-neutral-700">
              <div className="flex items-center gap-3">
                <Search size={16} className="text-slate-500" />
                <span>Dialysis center near me</span>
              </div>
              <ChevronRight
                size={16}
                className="text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </button>
            <button className="w-full text-left p-3 rounded-lg bg-neutral-900/50 hover:bg-neutral-800 text-slate-300 flex items-center justify-between group transition-colors border border-transparent hover:border-neutral-700">
              <div className="flex items-center gap-3">
                <Search size={16} className="text-slate-500" />
                <span>24/7 Pharmacy</span>
              </div>
              <ChevronRight
                size={16}
                className="text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex justify-between items-center">
            Recently Updated
            <button
              onClick={() => router.push('/app/updates')}
              className="text-brand hover:text-brand-light capitalize normal-case text-xs"
            >
              View all
            </button>
          </h3>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-neutral-900/50 border border-neutral-800">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-white text-sm">Fortis Hospital</span>
                <span className="text-xs text-slate-500">2h ago</span>
              </div>
              <p className="text-xs text-slate-400">Emergency timing verified as 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
