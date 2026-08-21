'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  ShieldAlert,
  Building2,
  Activity,
  ChevronRight,
  Droplet,
  Stethoscope,
  ArrowRight,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function AppHome() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('Lucknow');

  useEffect(() => {
    const saved = localStorage.getItem('careroute_location');
    if (saved) setLocation(saved);
  }, []);

  const handleLocationChange = (loc: string) => {
    setLocation(loc);
    localStorage.setItem('careroute_location', loc);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/app/search?q=${encodeURIComponent(query)}&loc=${encodeURIComponent(location)}`);
    }
  };

  const quickSearches = [
    { label: 'Government hospitals', icon: Building2 },
    { label: 'Trauma care', icon: Activity },
    { label: 'Blood resources', icon: Droplet },
    { label: 'Pediatric cardiology', icon: Stethoscope },
  ];

  return (
    <div className="max-w-4xl mx-auto pt-8 lg:pt-16 pb-24">
      <div className="mb-10 lg:mb-16">
        <h1 className="text-xl lg:text-2xl font-medium text-neutral-500 mb-2">Good afternoon.</h1>
        <h2 className="text-4xl lg:text-6xl font-bold text-neutral-900 tracking-tight">
          What healthcare help do you need?
        </h2>
      </div>

      {/* Main Search Composer */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        <span className="text-sm font-medium text-neutral-500 whitespace-nowrap flex items-center gap-1">
          <MapPin size={14} /> Location:
        </span>
        {['Lucknow', 'Gomti Nagar', 'Alambagh', 'Chowk'].map((loc) => (
          <button
            key={loc}
            onClick={() => handleLocationChange(loc)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              location === loc
                ? 'bg-brand text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {loc}
          </button>
        ))}
      </div>

      <form onSubmit={handleSearch} className="relative mb-12 lg:mb-20 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-brand/20 to-brand/5 rounded-[2rem] blur-xl opacity-50 group-focus-within:opacity-100 transition duration-500"></div>
        <div className="relative bg-surface border border-border rounded-2xl lg:rounded-[2rem] shadow-xl flex flex-col md:flex-row items-center p-3 lg:p-4 transition-all">
          <div className="w-full flex items-center">
            <div className="pl-4 pr-3 text-brand">
              <Search size={24} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Find a government hospital with nephrology..."
              className="flex-1 bg-transparent border-none text-neutral-900 text-lg lg:text-xl py-4 focus:ring-0 placeholder-neutral-400 font-medium w-full outline-none"
              autoFocus
            />
          </div>
          <div className="w-full md:w-auto mt-2 md:mt-0 md:pl-4 md:border-l border-border flex items-center justify-end">
            <Button
              type="submit"
              size="lg"
              className="w-full md:w-auto rounded-xl lg:rounded-full px-8 shadow-sm"
            >
              Search
            </Button>
          </div>
        </div>
      </form>

      {/* Quick Actions */}
      <div className="mb-20">
        <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">
          Quick Navigation
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <button
            onClick={() => router.push('/app/emergency')}
            className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-emergency/5 border border-emergency/20 text-emergency hover:bg-emergency/10 hover:shadow-sm transition-all duration-300 col-span-2 md:col-span-1 group"
          >
            <ShieldAlert size={28} className="group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-sm">Emergency</span>
          </button>

          {quickSearches.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                setQuery(item.label);
                router.push(`/app/search?q=${encodeURIComponent(item.label)}&loc=${encodeURIComponent(location)}`);
              }}
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-surface border border-border text-neutral-700 hover:border-brand/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center group"
            >
              <item.icon size={24} className="text-brand opacity-80 group-hover:opacity-100" />
              <span className="font-medium text-sm leading-tight">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity Layout */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">
            Recent Searches
          </h3>
          <div className="space-y-3">
            <button 
              onClick={() => {
                setQuery('Dialysis center near me');
                router.push(`/app/search?q=${encodeURIComponent('Dialysis center near me')}&loc=${encodeURIComponent(location)}`);
              }}
              className="w-full text-left p-4 rounded-xl bg-surface border border-border shadow-sm hover:border-brand/30 hover:shadow-md transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-neutral-100 p-2 rounded-lg">
                  <Search size={18} className="text-neutral-500" />
                </div>
                <span className="font-medium text-neutral-800">Dialysis center near me</span>
              </div>
              <ChevronRight
                size={18}
                className="text-neutral-400 group-hover:text-brand group-hover:translate-x-1 transition-all"
              />
            </button>
            <button 
              onClick={() => {
                setQuery('24/7 Pharmacy');
                router.push(`/app/search?q=${encodeURIComponent('24/7 Pharmacy')}&loc=${encodeURIComponent(location)}`);
              }}
              className="w-full text-left p-4 rounded-xl bg-surface border border-border shadow-sm hover:border-brand/30 hover:shadow-md transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-neutral-100 p-2 rounded-lg">
                  <Search size={18} className="text-neutral-500" />
                </div>
                <span className="font-medium text-neutral-800">24/7 Pharmacy</span>
              </div>
              <ChevronRight
                size={18}
                className="text-neutral-400 group-hover:text-brand group-hover:translate-x-1 transition-all"
              />
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6 flex justify-between items-center">
            Recently Updated
            <button
              onClick={() => router.push('/app/updates')}
              className="text-brand hover:text-brand-light flex items-center gap-1 normal-case text-xs font-semibold"
            >
              View all <ArrowRight size={12} />
            </button>
          </h3>
          <div className="space-y-3">
            <Card className="p-4 hover:border-brand/30 transition-colors cursor-pointer group">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-neutral-900 group-hover:text-brand transition-colors">
                  Fortis Hospital
                </span>
                <span className="text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">
                  2h ago
                </span>
              </div>
              <p className="text-sm text-neutral-600">Emergency timing verified as 24/7</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
