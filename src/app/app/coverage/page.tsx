'use client';

import React, { useEffect, useState } from 'react';
import { Map, Activity, ShieldCheck, MapPin, Database, RefreshCw, Hexagon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function CoveragePage() {
  const [coverageData, setCoverageData] = useState<any>(null);
  const [discoveryJobs, setDiscoveryJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [simulating, setSimulating] = useState(false);

  const fetchCoverage = async () => {
    setIsLoading(true);
    try {
      // For demo, we just fetch center of Lucknow
      const res = await fetch('/api/coverage?lat=26.8467&lng=80.9462');
      const data = await res.json();
      setCoverageData(data);

      const jobsRes = await fetch('/api/discovery');
      const jobsData = await jobsRes.json();
      setDiscoveryJobs(jobsData.activeJobs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoverage();
  }, []);

  const triggerDiscoverySimulation = async (jobId: string) => {
    setSimulating(true);
    try {
      await fetch('/api/discovery/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId }),
      });
      // Refresh
      await fetchCoverage();
    } catch (err) {
      console.error(err);
    } finally {
      setSimulating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-24">
      <div className="mb-10">
        <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-2 flex items-center gap-3 tracking-tight">
          <div className="bg-brand/10 p-2 rounded-xl text-brand">
            <Map size={28} />
          </div>
          Local Intelligence
        </h1>
        <p className="text-neutral-500 text-lg lg:ml-14">
          Real-time geographic coverage of the CareRoute network.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                <Hexagon size={18} className="text-brand" /> H3 Spatial Grid (Lucknow)
              </h2>
              <Button variant="outline" size="sm" onClick={fetchCoverage} disabled={isLoading}>
                <RefreshCw size={14} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
              </Button>
            </div>

            {isLoading ? (
              <div className="h-64 flex items-center justify-center bg-neutral-50 rounded-xl border-2 border-dashed border-border">
                <Activity className="animate-spin text-neutral-400" />
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {coverageData?.details?.map((cell: any) => (
                  <div 
                    key={cell.cellId} 
                    className={`p-4 rounded-xl border ${
                      cell.isCenter ? 'border-brand ring-1 ring-brand' : 'border-border'
                    } bg-neutral-50`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-mono text-neutral-500">{cell.cellId.substring(0, 8)}...</span>
                      {cell.state === 'sufficient' && (
                        <span className="text-xs font-bold text-success flex items-center bg-success/10 px-2 py-0.5 rounded-full">
                          <ShieldCheck size={10} className="mr-1"/> Covered
                        </span>
                      )}
                      {cell.state === 'partial' && (
                        <span className="text-xs font-bold text-amber-600 flex items-center bg-amber-100 px-2 py-0.5 rounded-full">
                          <Activity size={10} className="mr-1"/> Partial
                        </span>
                      )}
                      {cell.state === 'discovering' && (
                        <span className="text-xs font-bold text-brand flex items-center bg-brand/10 px-2 py-0.5 rounded-full">
                          <RefreshCw size={10} className="mr-1 animate-spin"/> Expanding
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <div className="text-2xl font-bold text-neutral-900">
                          {cell.record?.facilityCount || 0}
                        </div>
                        <div className="text-xs text-neutral-500">Facilities</div>
                      </div>
                      
                      {cell.state === 'discovering' && cell.record?.expansionJobId && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-7 text-xs bg-white"
                          disabled={simulating}
                          onClick={() => triggerDiscoverySimulation(cell.record.expansionJobId)}
                        >
                          Simulate Job
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-4">
              Active Discovery
            </h2>
            
            {discoveryJobs.length === 0 ? (
              <div className="text-center py-8">
                <MapPin size={24} className="mx-auto text-neutral-300 mb-2" />
                <p className="text-sm text-neutral-500">No active discovery jobs.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {discoveryJobs.map(job => (
                  <div key={job.id} className="bg-neutral-50 rounded-xl p-4 border border-border/60">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-mono text-brand bg-brand/10 px-1.5 py-0.5 rounded">
                        {job.id.substring(0,8)}
                      </span>
                      <span className="text-xs font-medium text-neutral-500">{job.state}</span>
                    </div>
                    <div className="text-sm font-medium text-neutral-900 flex items-center gap-1.5">
                      <Database size={14} className="text-neutral-400"/> Cell {job.cellId.substring(0,6)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="bg-brand/5 border border-brand/20 rounded-2xl p-6 text-sm text-brand-dark shadow-sm">
            <h3 className="font-bold flex items-center gap-2 mb-2">
              <Activity size={16} /> Autonomous Expansion
            </h3>
            <p className="leading-relaxed">
              When users search in an area with low coverage, CareRoute automatically queues discovery jobs. 
              The system provisions Bright Data scrapers to find, validate, and ingest new local facilities in the background.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
