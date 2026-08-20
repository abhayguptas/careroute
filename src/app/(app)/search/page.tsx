'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SearchResult, StructuredIntent } from '@/types/search';
import { FacilityCard } from '@/components/FacilityCard';
import { Search, Map as MapIcon, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';
  const initialLocation = searchParams.get('loc') || '';

  const [query, setQuery] = useState(initialQuery);
  const [intent, setIntent] = useState<StructuredIntent | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!initialQuery) {
      setIsLoading(false);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: initialQuery, location: initialLocation })
        });
        const data = await res.json();
        setIntent(data.intent);
        setResults(data.results);
      } catch (err) {
        console.error('Failed to fetch results', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [initialQuery, initialLocation]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/app/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-8rem)]">
      {/* Left Column: Search & Filters */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <div className="bg-neutral-950 border border-border p-6 rounded-2xl">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find care..."
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-brand transition-shadow"
              />
            </div>
            <Button type="submit" className="w-full mt-3">Search</Button>
          </form>

          {intent && (
            <div className="space-y-4 border-t border-border pt-6">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal size={14} /> Detected Intent
              </h3>
              
              <div className="space-y-3">
                <div>
                  <span className="text-xs text-slate-500 block mb-1">Mode</span>
                  <Badge variant={intent.mode === 'emergency' ? 'emergency' : 'outline'}>
                    {intent.mode.charAt(0).toUpperCase() + intent.mode.slice(1)} Mode
                  </Badge>
                </div>
                
                {intent.specialties.length > 0 && (
                  <div>
                    <span className="text-xs text-slate-500 block mb-1">Required Specialties</span>
                    <div className="flex flex-wrap gap-2">
                      {intent.specialties.map(s => (
                        <Badge key={s} variant="default" className="capitalize">{s}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {intent.facilityType && (
                  <div>
                    <span className="text-xs text-slate-500 block mb-1">Facility Type</span>
                    <Badge variant="outline" className="capitalize">{intent.facilityType}</Badge>
                  </div>
                )}
                
                <div>
                  <span className="text-xs text-slate-500 block mb-1">Location Context</span>
                  <span className="text-sm text-slate-300 bg-neutral-900 px-2 py-1 rounded">{intent.city}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Results & Map */}
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            {isLoading ? 'Searching...' : (
              results.length > 0 ? `${results.length} relevant facilities found` : 'No facilities found'
            )}
          </h2>
          <Button variant="outline" size="sm" className="hidden lg:flex"><MapIcon size={16} className="mr-2" /> Map View</Button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-neutral-950 border border-border rounded-xl p-6 h-48 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((result, idx) => (
              <FacilityCard 
                key={result.facility.id} 
                result={result} 
                isEmergency={intent?.mode === 'emergency'} 
                index={idx} 
              />
            ))}
            
            {results.length > 0 && (
              <div className="text-center py-8 border-t border-border mt-8">
                <p className="text-slate-400 mb-4">Don't see the facility you're looking for?</p>
                <Button variant="secondary" onClick={() => router.push('/app/onboard')}>Add a new facility to CareRoute</Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh]"><div className="animate-pulse text-slate-400">Loading experience...</div></div>}>
      <SearchContent />
    </Suspense>
  );
}
