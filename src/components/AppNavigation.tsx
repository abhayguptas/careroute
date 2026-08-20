'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Search, ShieldAlert, HeartPulse, Building2, 
  Activity, PlusCircle, Settings, Menu, X, Bookmark
} from 'lucide-react';

export function AppNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const links = [
    { href: '/app', label: 'Overview', icon: HeartPulse },
    { href: '/app/search', label: 'Find Care', icon: Search },
    { href: '/app/emergency', label: 'Emergency', icon: ShieldAlert, emergency: true },
    { href: '/app/saved', label: 'Saved', icon: Bookmark },
    { href: '/app/facilities', label: 'Facilities', icon: Building2 },
    { href: '/app/scraper-health', label: 'Scraper Health', icon: Activity },
    { href: '/app/onboard', label: 'Add Facility', icon: PlusCircle },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-neutral-950/80 backdrop-blur-md border-b border-border z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <img src="/brand/careroute-mark.svg" alt="CareRoute" className="w-8 h-8" />
          <span className="font-bold text-white tracking-tight">CareRoute</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 bottom-0 w-64 bg-neutral-950 border-r border-border z-40 
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-16 flex items-center px-6 lg:border-b lg:border-border hidden lg:flex">
          <img src="/brand/careroute-logo.svg" alt="CareRoute" className="h-8" />
        </div>

        <nav className="p-4 space-y-1 mt-16 lg:mt-0">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3 pt-4">Navigation</div>
          
          {links.map(link => {
            const active = pathname === link.href;
            const Icon = link.icon;
            
            if (link.emergency) {
              return (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    active ? 'bg-emergency/10 text-emergency' : 'text-emergency hover:bg-neutral-800'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            }

            return (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  active ? 'bg-brand/10 text-brand-light' : 'text-slate-300 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span className="font-medium">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <Link href="/app/settings" className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-400 hover:bg-neutral-800 hover:text-white transition-colors">
            <Settings size={18} />
            <span className="font-medium">Settings</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
