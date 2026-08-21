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
    <div className={`bg-surface border border-border rounded-xl p-5 shadow-sm ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-2">
            {field}
          </h4>
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-900">{value}</span>
            <Badge variant="success" className="h-5">
              <CheckCircle2 size={12} className="mr-1" /> Verified
            </Badge>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center text-xs text-neutral-500 gap-1 bg-neutral-100 px-2.5 py-1 rounded-lg font-medium">
            <Clock size={12} />
            {lastChecked}
          </div>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center text-xs text-brand hover:text-brand-light transition-colors font-medium"
          >
            Source <ExternalLink size={12} className="ml-1" />
          </a>
        </div>
      </div>

      <div className="bg-neutral-50 p-4 rounded-xl border border-border/60 relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand/30 rounded-l-xl"></div>
        <p className="text-sm text-neutral-700 italic pl-3 leading-relaxed">&ldquo;{evidenceText}&rdquo;</p>
      </div>
    </div>
  );
}
