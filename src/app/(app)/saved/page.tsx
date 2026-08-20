'use client';

import React from 'react';
import { Bookmark } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function SavedPage() {
  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Bookmark className="text-brand" />
          Saved Facilities
        </h1>
        <p className="text-slate-400">Your personalized healthcare network.</p>
      </div>

      {/* Since we don't have a real backend for users, show the polished empty state */}
      <EmptyState 
        icon={Bookmark}
        title="No saved facilities yet"
        description="Save hospitals, clinics, and resources to quickly access them later."
        action={
          <Link href="/app/search">
            <Button>Find Care to Save</Button>
          </Link>
        }
      />
    </div>
  );
}
