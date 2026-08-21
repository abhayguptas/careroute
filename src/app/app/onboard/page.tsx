'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Link as LinkIcon,
  Cpu,
  CheckCircle2,
  Database,
  AlertTriangle,
  Activity,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function OnboardPage() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');

  const [stage, setStage] = useState<'idle' | 'creating' | 'polling' | 'scraping' | 'done'>('idle');
  const [collectorId, setCollectorId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !name) return;

    setStage('creating');

    try {
      const res = await fetch('/api/create-scraper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, name }),
      });
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      setCollectorId(data.collectorId);
      setStage('polling');
      pollStatus(data.collectorId);
    } catch (err) {
      console.error(err);
      setStage('idle');
      alert('Failed to start AI Agent.');
    }
  };

  const pollStatus = async (c_id: string) => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/create-scraper/status?collectorId=${c_id}`);
        const data = await res.json();

        if (data.status === 'completed') {
          clearInterval(interval);
          setStage('scraping');
          runCollector(c_id);
        } else if (data.status === 'failed') {
          clearInterval(interval);
          setStage('idle');
          alert('AI Agent failed to create scraper.');
        }
      } catch (err) {
        console.error('Polling error', err);
      }
    }, 15000); // Poll every 15s
  };

  const runCollector = async (c_id: string) => {
    try {
      const res = await fetch('/api/scrape/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collectorId: c_id }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setTimeout(() => setStage('done'), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  if (stage !== 'idle') {
    return (
      <div className="max-w-2xl mx-auto pt-16 lg:pt-24 pb-24 px-6">
        <div className="bg-surface border border-border rounded-3xl p-10 lg:p-16 shadow-xl text-center relative overflow-hidden">
          {/* Subtle glow effect behind loader */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand/10 blur-[60px] rounded-full z-0 pointer-events-none"></div>

          <div className="relative z-10 w-28 h-28 mx-auto mb-10">
            {stage === 'done' ? (
              <div className="w-full h-full bg-success/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-16 h-16 text-success" />
              </div>
            ) : (
              <div className="relative w-full h-full">
                <div className="absolute inset-0 border-4 border-brand/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
                {stage === 'scraping' ? (
                  <Database className="absolute inset-0 m-auto text-brand" size={36} />
                ) : (
                  <Cpu className="absolute inset-0 m-auto text-brand" size={36} />
                )}
              </div>
            )}
          </div>

          <h2 className="relative z-10 text-3xl font-bold text-neutral-900 mb-4 tracking-tight">
            {stage === 'creating' && 'Initializing Infrastructure'}
            {stage === 'polling' && 'Constructing Scraper Logic'}
            {stage === 'scraping' && 'Ingesting Facility Data'}
            {stage === 'done' && 'Facility Successfully Added'}
          </h2>

          <p className="relative z-10 text-neutral-600 mb-10 max-w-md mx-auto text-lg leading-relaxed">
            {stage === 'creating' &&
              'Provisioning a dedicated Bright Data collector for this target.'}
            {stage === 'polling' &&
              'The AI Agent is autonomously mapping the target website structure to CareRoute schema requirements.'}
            {stage === 'scraping' &&
              'Running the newly generated collector to extract structured healthcare intelligence.'}
            {stage === 'done' &&
              'The facility data has been verified and is now available in CareRoute.'}
          </p>

          <div className="relative z-10 text-left bg-neutral-50 border border-border p-5 rounded-2xl mb-10 font-mono text-sm shadow-sm">
            <div className="flex justify-between mb-3 pb-3 border-b border-border/60">
              <span className="text-neutral-500 uppercase tracking-widest text-[10px] font-bold">
                Target
              </span>
              <span className="text-neutral-900 font-medium truncate max-w-[200px]">{url}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500 uppercase tracking-widest text-[10px] font-bold">
                Collector ID
              </span>
              <span className="text-brand font-medium">{collectorId || 'Assigning...'}</span>
            </div>
          </div>

          {stage === 'done' && (
            <Button
              size="lg"
              className="w-full rounded-full h-14 text-lg shadow-lg relative z-10"
              onClick={() => router.push('/app/search')}
            >
              View in CareRoute Search
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pt-10 lg:pt-16 pb-24 px-6">
      <div className="mb-12 text-center">
        <div className="w-16 h-16 bg-brand/5 border border-brand/20 rounded-[1.25rem] flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Database size={28} className="text-brand" />
        </div>
        <h1 className="text-3xl lg:text-5xl font-bold text-neutral-900 mb-4 tracking-tight">
          Onboard a Facility
        </h1>
        <p className="text-neutral-600 text-lg leading-relaxed max-w-xl mx-auto">
          Provide a public hospital or clinic URL. CareRoute will autonomously construct a Bright
          Data AI Flow to extract and verify its capabilities.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-[2rem] p-8 lg:p-12 shadow-xl relative overflow-hidden">
        {/* Subtle decorative background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 blur-[80px] rounded-full pointer-events-none"></div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-2 uppercase tracking-widest">
              Facility Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Apollo Hospital Delhi"
              className="w-full bg-neutral-50 border border-border rounded-xl py-4 px-4 text-neutral-900 placeholder-neutral-400 focus:ring-2 focus:ring-brand focus:outline-none transition-all shadow-inner"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-2 uppercase tracking-widest">
              Public Website URL
            </label>
            <div className="relative">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-neutral-50 border border-border rounded-xl py-4 pl-12 pr-4 text-neutral-900 placeholder-neutral-400 focus:ring-2 focus:ring-brand focus:outline-none transition-all shadow-inner"
                required
              />
              <LinkIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                size={20}
              />
            </div>

            <div className="mt-4 bg-brand/5 border border-brand/20 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle size={18} className="text-brand shrink-0 mt-0.5" />
              <p className="text-sm text-neutral-700 leading-relaxed">
                CareRoute strictly limits extraction to 17 predefined data points (departments,
                emergency availability, etc). It does not scrape personal data.
              </p>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full rounded-full h-14 text-lg shadow-lg mt-4"
          >
            Generate AI Scraper & Ingest
          </Button>
        </form>
      </div>
    </div>
  );
}
