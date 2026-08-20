import React from 'react';
import { Badge } from './Badge';
import { CheckCircle2, Clock, ExternalLink } from 'lucide-react';

interface EvidencePanelProps {
  field: string;
  value: string;
  sourceUrl: string;
  evidenceText: string;
  lastChecked: string;
  className?: string;
}

export function EvidencePanel({
  field,
  value,
  sourceUrl,
  evidenceText,
  lastChecked,
  className = '',
}: EvidencePanelProps) {
  return (
    <div className={`bg-neutral-900 border border-border rounded-lg p-4 ${className}`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            {field}
          </h4>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">{value}</span>
            <Badge variant="success" className="h-5">
              <CheckCircle2 size={12} className="mr-1" /> Verified
            </Badge>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center text-xs text-slate-400 gap-1 bg-neutral-800 px-2 py-1 rounded">
            <Clock size={12} />
            {lastChecked}
          </div>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center text-xs text-[#0F766E] hover:text-[#0B5C55] transition-colors"
          >
            Source <ExternalLink size={12} className="ml-1" />
          </a>
        </div>
      </div>

      <div className="bg-neutral-950 p-3 rounded border border-neutral-800 relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-neutral-700 rounded-l"></div>
        <p className="text-sm text-slate-300 italic pl-2">"{evidenceText}"</p>
      </div>
    </div>
  );
}
