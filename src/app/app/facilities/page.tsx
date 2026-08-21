'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FacilityCard } from '@/components/FacilityCard';
import { SearchResult } from '@/types/search';
import { Building2, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function FacilitiesPage() {
  const router = useRouter();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const res = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: 'hospital' }),
        });
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFacilities();
  }, []);

  const filteredResults = results.filter(
    (r) =>
      r.facility.name.toLowerCase().includes(search.toLowerCase()) ||
      r.facility.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-2 flex items-center gap-3 tracking-tight">
            <div className="bg-brand/10 p-2 rounded-xl text-brand">
              <Building2 size={28} />
            </div>
            Healthcare Facilities
          </h1>
          <p className="text-neutral-500 text-lg lg:ml-14">
            Verified intelligence for {results.length} local resources.
          </p>
        </div>
        <Button variant="outline" onClick={() => router.push('/app/onboard')} className="bg-surface">
          Add Missing Facility
        </Button>
      </div>

      <div className="bg-surface border border-border p-4 rounded-2xl flex flex-col sm:flex-row gap-4 mb-10 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter facilities by name or type..."
            className="w-full bg-neutral-50 border border-border rounded-xl py-3 pl-12 pr-4 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand transition-all shadow-inner"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 bg-surface">
          <Filter size={16} /> Filters
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-surface border border-border rounded-2xl p-6 h-48 animate-pulse shadow-sm"
            ></div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredResults.map((result, idx) => (
            <FacilityCard
              key={result.facility.id}
              result={result}
              isEmergency={false}
              index={idx}
            />
          ))}
          {filteredResults.length === 0 && (
            <div className="text-center py-16 border-2 border-dashed border-border rounded-2xl bg-neutral-50">
              <p className="text-neutral-500 mb-4 text-lg">No facilities match your filter.</p>
              <Button variant="outline" onClick={() => setSearch('')} className="bg-surface">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
