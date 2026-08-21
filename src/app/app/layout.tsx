import React from 'react';
import { AppNavigation } from '@/components/AppNavigation';
import { LocationHeader } from '@/components/LocationHeader';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AppNavigation />

      <div className="lg:pl-64 pt-16 lg:pt-0 min-h-screen flex flex-col">
        {/* Sticky Header for App */}
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border px-6 h-14 flex items-center justify-between hidden lg:flex">
          <div className="flex items-center text-sm text-neutral-500 font-medium">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              Live Data Network
            </span>
          </div>
          <div className="flex items-center gap-4">
            <LocationHeader />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
