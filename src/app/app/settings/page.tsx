'use client';

import React from 'react';
import { Settings, MapPin, ShieldAlert, Accessibility, Database } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto pb-24">
      <div className="mb-10">
        <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-2 flex items-center gap-3 tracking-tight">
          <div className="bg-brand/10 p-2 rounded-xl text-brand">
            <Settings size={28} />
          </div>
          Settings
        </h1>
        <p className="text-neutral-500 text-lg lg:ml-14">Manage your CareRoute preferences.</p>
      </div>

      <div className="space-y-6">
        {/* Location Preferences */}
        <section className="bg-surface border border-border rounded-2xl p-6 lg:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-neutral-900 mb-6 flex items-center gap-2 border-b border-border/60 pb-4">
            <MapPin size={18} className="text-neutral-400" /> Location Preferences
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2 uppercase tracking-widest">
                Default Search Location
              </label>
              <input
                type="text"
                defaultValue="Lucknow"
                className="w-full max-w-md bg-neutral-50 border border-border rounded-xl py-3 px-4 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand transition-all shadow-inner"
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium text-neutral-900">Precise Location</div>
                <div className="text-sm text-neutral-500">
                  Allow CareRoute to use your device GPS for emergency routing.
                </div>
              </div>
              <div className="w-12 h-6 bg-brand rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Defaults */}
        <section className="bg-surface border border-border rounded-2xl p-6 lg:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-neutral-900 mb-6 flex items-center gap-2 border-b border-border/60 pb-4">
            <ShieldAlert size={18} className="text-emergency" /> Emergency Defaults
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2 uppercase tracking-widest">
                Primary Emergency Service
              </label>
              <select className="w-full max-w-md bg-neutral-50 border border-border rounded-xl py-3 px-4 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand transition-all shadow-inner">
                <option>112 (National Emergency Number)</option>
                <option>108 (Ambulance)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Accessibility & Display */}
        <section className="bg-surface border border-border rounded-2xl p-6 lg:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-neutral-900 mb-6 flex items-center gap-2 border-b border-border/60 pb-4">
            <Accessibility size={18} className="text-neutral-400" /> Display & Accessibility
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium text-neutral-900">High Contrast Mode</div>
                <div className="text-sm text-neutral-500">
                  Increase contrast for better readability.
                </div>
              </div>
              <div className="w-12 h-6 bg-neutral-200 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Data & Privacy */}
        <section className="bg-surface border border-border rounded-2xl p-6 lg:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-neutral-900 mb-6 flex items-center gap-2 border-b border-border/60 pb-4">
            <Database size={18} className="text-neutral-400" /> Data & Privacy
          </h2>
          <div className="space-y-4">
            <p className="text-sm text-neutral-600 mb-4">
              CareRoute does not store personal medical information. Search history is stored
              locally on your device.
            </p>
            <Button
              variant="outline"
              className="text-emergency border-emergency/20 hover:bg-emergency/5"
            >
              Clear Local Search History
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
