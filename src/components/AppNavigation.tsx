'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  ShieldAlert,
  HeartPulse,
  Building2,
  Activity,
  PlusCircle,
  Settings,
  Bookmark,
  Map,
} from 'lucide-react';

export function AppNavigation() {
  const pathname = usePathname();

  const mainLinks = [
    { href: '/app', label: 'Overview', icon: HeartPulse },
    { href: '/app/search', label: 'Find Care', icon: Search },
    { href: '/app/coverage', label: 'Coverage', icon: Map },
    { href: '/app/facilities', label: 'Facilities', icon: Building2 },
    { href: '/app/saved', label: 'Saved', icon: Bookmark },
  ];

  const systemLinks = [
    { href: '/app/onboard', label: 'Add Facility', icon: PlusCircle },
    { href: '/app/scraper-health', label: 'Health', icon: Activity },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 bottom-0 w-64 bg-surface/80 backdrop-blur-xl border-r border-border z-40">
        <div className="h-20 flex items-center px-8">
          <Link href="/app" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-white shadow-md shadow-brand/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:-rotate-3">
              <HeartPulse size={18} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-lg tracking-tight text-neutral-800">CareRoute</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
          <div>
            <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-3 px-4">
              Intelligence
            </div>
            <div className="space-y-1">
              {mainLinks.map((link) => {
                const active = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-full transition-all duration-200 ${
                      active
                        ? 'bg-neutral-100 text-neutral-900 font-semibold shadow-sm'
                        : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
                    }`}
                  >
                    <Icon size={18} className={active ? 'text-brand' : 'opacity-70'} />
                    <span className="text-sm">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-3 px-4">
              Emergency
            </div>
            <Link
              href="/app/emergency"
              className={`flex items-center gap-3 px-4 py-2.5 rounded-full transition-all duration-200 ${
                pathname === '/app/emergency'
                  ? 'bg-emergency/10 text-emergency font-semibold shadow-sm ring-1 ring-emergency/20'
                  : 'text-emergency/80 hover:bg-emergency/5 hover:text-emergency'
              }`}
            >
              <ShieldAlert size={18} />
              <span className="text-sm">Emergency Mode</span>
            </Link>
          </div>

          <div>
            <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-3 px-4">
              System
            </div>
            <div className="space-y-1">
              {systemLinks.map((link) => {
                const active = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-full transition-all duration-200 ${
                      active
                        ? 'bg-neutral-100 text-neutral-900 font-semibold shadow-sm'
                        : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
                    }`}
                  >
                    <Icon size={18} className={active ? 'text-neutral-900' : 'opacity-70'} />
                    <span className="text-sm">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-border/50">
          <Link
            href="/app/settings"
            className="flex items-center gap-3 px-4 py-2.5 rounded-full text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 transition-all duration-200"
          >
            <Settings size={18} className="opacity-70" />
            <span className="text-sm font-medium">Settings</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Bottom Navigation - Premium Glass */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 pb-safe pointer-events-none">
        <div className="glass-nav rounded-full shadow-2xl mx-auto max-w-md flex items-center justify-around p-2 pointer-events-auto border border-white/20">
          {[
            { href: '/app', icon: HeartPulse, label: 'Home' },
            { href: '/app/search', icon: Search, label: 'Search' },
            { href: '/app/emergency', icon: ShieldAlert, label: 'Urgent', isEmergency: true },
            { href: '/app/facilities', icon: Building2, label: 'Places' },
            { href: '/app/saved', icon: Bookmark, label: 'Saved' },
          ].map((link) => {
            const active = pathname === link.href;
            const Icon = link.icon;

            if (link.isEmergency) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                    active
                      ? 'bg-emergency text-white shadow-md shadow-emergency/20 scale-110'
                      : 'text-emergency hover:bg-emergency/10'
                  }`}
                >
                  <Icon size={active ? 20 : 22} strokeWidth={active ? 2.5 : 2} />
                </Link>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                  active
                    ? 'bg-neutral-900 text-white shadow-md scale-110'
                    : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                <Icon size={active ? 20 : 22} strokeWidth={active ? 2.5 : 2} />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
