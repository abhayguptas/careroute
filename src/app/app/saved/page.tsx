'use client';

import React from 'react';
import { Bookmark } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function SavedPage() {
  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="mb-10">
        <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-2 flex items-center gap-3 tracking-tight">
          <div className="bg-brand/10 p-2 rounded-xl text-brand">
            <Bookmark size={28} />
          </div>
          Saved Facilities
        </h1>
        <p className="text-neutral-500 text-lg lg:ml-14">Your personalized healthcare network.</p>
      </div>

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
