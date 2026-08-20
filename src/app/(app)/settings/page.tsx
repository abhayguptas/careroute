'use client';

import React from 'react';
import { Settings, MapPin, ShieldAlert, Accessibility, Database } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Settings className="text-brand" />
          Settings
        </h1>
        <p className="text-slate-400">Manage your CareRoute preferences.</p>
      </div>

      <div className="space-y-6">
        {/* Location Preferences */}
        <section className="bg-neutral-950 border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-neutral-800 pb-3">
            <MapPin size={18} className="text-slate-400" /> Location Preferences
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Default Search Location
              </label>
              <input
                type="text"
                defaultValue="New Delhi NCR"
                className="w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-brand"
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium text-slate-200">Precise Location</div>
                <div className="text-sm text-slate-500">
                  Allow CareRoute to use your device GPS for emergency routing.
                </div>
              </div>
              <div className="w-12 h-6 bg-brand rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Defaults */}
        <section className="bg-neutral-950 border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-neutral-800 pb-3">
            <ShieldAlert size={18} className="text-emergency" /> Emergency Defaults
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Primary Emergency Service
              </label>
              <select className="w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-brand">
                <option>112 (National Emergency Number)</option>
                <option>108 (Ambulance)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Accessibility & Display */}
        <section className="bg-neutral-950 border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-neutral-800 pb-3">
            <Accessibility size={18} className="text-slate-400" /> Display & Accessibility
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium text-slate-200">High Contrast Mode</div>
                <div className="text-sm text-slate-500">
                  Increase contrast for better readability.
                </div>
              </div>
              <div className="w-12 h-6 bg-neutral-700 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Data & Privacy */}
        <section className="bg-neutral-950 border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-neutral-800 pb-3">
            <Database size={18} className="text-slate-400" /> Data & Privacy
          </h2>
          <div className="space-y-4">
            <p className="text-sm text-slate-400 mb-4">
              CareRoute does not store personal medical information. Search history is stored
              locally on your device.
            </p>
            <Button
              variant="outline"
              className="text-red-400 border-red-900/30 hover:bg-red-900/20"
            >
              Clear Local Search History
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
