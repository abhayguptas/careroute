'use client';

import { Cpu, Database, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CreationProgressProps {
  stage: 'creating' | 'polling' | 'scraping' | 'done';
  statusMessage: string;
  url: string;
  collectorId: string | null;
  name: string;
}

export function CreationProgress({ stage, statusMessage, url, collectorId, name }: CreationProgressProps) {
  const router = useRouter();

  if (stage === 'done') {
    return (
      <div className="glass-panel p-12 rounded-2xl border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.15)] text-center">
        <CheckCircle className="text-green-500 mx-auto mb-6" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">{name} Onboarded!</h2>
        <p className="text-green-300 mb-8">The AI Agent built the scraper, extracted the data, and ingested it into CareRoute.</p>
        <button 
          onClick={() => router.push('/')}
          className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-xl transition-colors"
        >
          Return to Search
        </button>
      </div>
    );
  }

  return (
    <div className="glass-panel p-12 rounded-2xl border border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.15)] text-center">
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="absolute inset-0 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        {stage === 'scraping' ? (
          <Database className="absolute inset-0 m-auto text-teal-400" size={40} />
        ) : (
          <Cpu className="absolute inset-0 m-auto text-blue-400" size={40} />
        )}
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">
        {stage === 'scraping' ? 'Ingesting Data' : 'Building Custom Scraper'}
      </h2>
      <p className="text-blue-300 mb-6">{statusMessage}</p>
      
      <div className="bg-slate-800 p-4 rounded text-left border border-slate-700">
        <p className="text-xs text-slate-400 mb-1">Target: <span className="text-slate-200">{url}</span></p>
        <p className="text-xs text-slate-400 mb-1">Collector ID: <span className="font-mono text-blue-400">{collectorId || 'Assigning...'}</span></p>
      </div>
    </div>
  );
}
