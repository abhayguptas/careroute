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
    // For demo purposes, we reuse the search API to fetch all by passing an empty query which might just return all in a real app,
    // but since our search API requires a query, we'll just do a dummy search to populate the list.
    const fetchFacilities = async () => {
      try {
        const res = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: 'hospital' }) // fetch some defaults
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

  const filteredResults = results.filter(r => 
    r.facility.name.toLowerCase().includes(search.toLowerCase()) || 
    r.facility.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Building2 className="text-brand" />
            Healthcare Facilities
          </h1>
          <p className="text-slate-400">Verified intelligence for {results.length} local resources.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" onClick={() => router.push('/app/onboard')}>
            Add Missing Facility
          </Button>
        </div>
      </div>

      <div className="bg-neutral-950 border border-border p-4 rounded-xl flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter facilities by name or type..."
            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
        <Button variant="secondary" className="flex items-center gap-2">
          <Filter size={16} /> Filters
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-neutral-950 border border-border rounded-xl p-6 h-48 animate-pulse"></div>
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
            <div className="text-center py-12 border border-dashed border-border rounded-xl bg-neutral-950/50">
              <p className="text-slate-400 mb-4">No facilities match your filter.</p>
              <Button variant="outline" onClick={() => setSearch('')}>Clear Filters</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
