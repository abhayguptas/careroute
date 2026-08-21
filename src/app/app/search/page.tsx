'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SearchResult, StructuredIntent } from '@/types/search';
import { FacilityCard } from '@/components/FacilityCard';
import { Search, Map as MapIcon, SlidersHorizontal, Activity } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';
  const initialLocation = searchParams.get('loc') || '';

  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(true);
  const [intent, setIntent] = useState<StructuredIntent | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [coverage, setCoverage] = useState<any>(null);

  const performSearch = async (searchQuery: string, location: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery, location }),
      });
      const data = await res.json();
      if (data.results) setResults(data.results);
      if (data.intent) setIntent(data.intent);
      if (data.coverageStatus) setCoverage(data.coverageStatus);
    } catch (err) {
      console.error('Failed to fetch results', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const q = searchParams.get('q');
    const loc = searchParams.get('loc') || 'Lucknow';

    if (q) {
      setQuery(q);
      performSearch(q, loc);
    } else {
      setIsLoading(false);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const loc = searchParams.get('loc') || 'Lucknow';
      router.push(`/app/search?q=${encodeURIComponent(query)}&loc=${encodeURIComponent(loc)}`);
    }
  };

  const [isMapView, setIsMapView] = useState(false);

  return (
    <div className="max-w-[1400px] mx-auto pb-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Intent & Composer */}
        <div className="w-full lg:w-1/3 xl:w-1/4">
          <div className="bg-surface border border-border rounded-2xl shadow-sm p-4 sticky top-24">
            <form onSubmit={handleSearch} className="mb-6 relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find care..."
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-brand text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-brand-light transition-colors"
              >
                Search
              </button>
            </form>

            <div className="space-y-6">
              <div>
                <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <SlidersHorizontal size={12} /> Detected Intent
                </h3>
                <div className="space-y-4">
                  {intent && (
                    <>
                      <div>
                        <div className="text-xs text-neutral-500 mb-1">Mode</div>
                        <Badge variant="outline" className="text-xs">
                          {intent.mode === 'emergency' ? 'Emergency' : 'Care Mode'}
                        </Badge>
                      </div>
                      {intent.specialties.length > 0 && (
                        <div>
                          <div className="text-xs text-neutral-500 mb-1">Specialties needed</div>
                          <div className="flex flex-wrap gap-1.5">
                            {intent.specialties.map((s) => (
                              <Badge key={s} variant="outline" className="text-[10px]">
                                {s}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      <div>
                        <div className="text-xs text-neutral-500 mb-1">Location Context</div>
                        <Badge variant="outline" className="text-[10px] bg-neutral-100">
                          {searchParams.get('loc') || 'Lucknow'}
                        </Badge>
                      </div>
                    </>
                  )}
                  {!intent && !isLoading && (
                    <div className="text-xs text-neutral-500 italic">
                      No specific intent detected. Showing all nearby facilities.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Results & Map */}
        <div className="w-full lg:w-2/3 xl:w-3/4 flex flex-col gap-6">
          {/* Coverage Banner */}
          {coverage && coverage.overallState !== 'sufficient' && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
              <div className="mt-0.5 text-amber-600">
                <Activity size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-amber-900 text-sm">
                  {coverage.overallState === 'undiscovered' ? 'Discovering New Area' : 'Expanding Coverage'}
                </h4>
                <p className="text-amber-700 text-sm mt-1">
                  CareRoute is currently scanning {searchParams.get('loc') || 'this area'} for more {intent?.specialties?.[0] || 'healthcare facilities'}. More results will appear soon.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
              {isLoading
                ? 'Searching...'
                : `${results.length} relevant facilities found`}
            </h2>
            <Button variant="outline" size="sm" onClick={() => setIsMapView(!isMapView)}>
              <MapIcon size={16} className="mr-2" /> {isMapView ? 'List View' : 'Map View'}
            </Button>
          </div>

          {isMapView ? (
            <div className="bg-neutral-100 border border-border rounded-2xl h-[600px] flex flex-col items-center justify-center text-neutral-500 relative overflow-hidden">
              <MapIcon size={48} className="mb-4 text-neutral-300" />
              <p className="font-medium">Map View Component</p>
              <p className="text-sm">Interactive map would render here with {results.length} pins.</p>
              
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle at center, #000 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}></div>
            </div>
          ) : (
            <div className="space-y-4">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-48 bg-neutral-100 rounded-2xl animate-pulse border border-neutral-200"
                    ></div>
                  ))}
                </div>
              ) : results.length === 0 ? (
                <EmptyState
                  icon={Search}
                  title="No facilities found"
                  description="We couldn't find any facilities matching your specific criteria in this area. Try adjusting your search."
                />
              ) : (
                results.map((result, i) => (
                  <FacilityCard
                    key={result.facility.id}
                    result={result}
                    isEmergency={intent?.mode === 'emergency'}
                    index={i}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-pulse text-slate-400">Loading experience...</div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
