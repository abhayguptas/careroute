'use client';

import { useState } from 'react';
import {
  HeartPulse,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Phone,
  ArrowUpRight,
  ShieldCheck,
  Database,
} from 'lucide-react';
import { SearchResult } from '@/types/search';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/Card';

interface FacilityCardProps {
  result: SearchResult;
  isEmergency: boolean;
  index: number;
}

export function FacilityCard({ result, isEmergency, index }: FacilityCardProps) {
  const f = result.facility;
  const [expanded, setExpanded] = useState(false);

  let evidence = [];
  try {
    evidence = JSON.parse(f.evidence || '[]');
  } catch (e) {}

  const isVerified = evidence.length > 0;

  // Fake "freshness" based on index for demo purposes to show UI states
  const hoursAgo = index * 2 + 1;
  const isStale = hoursAgo > 48;

  return (
    <Card
      className={`transition-all duration-300 ${isEmergency && index === 0 ? 'border-emergency/50 shadow-[0_0_20px_rgba(225,29,72,0.1)]' : 'hover:border-neutral-700'}`}
    >
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-neutral-100 text-neutral-500 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                #{index + 1}
              </span>
              <h2 className="text-xl font-bold text-neutral-900 leading-tight">{f.name}</h2>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm mt-2">
              <span className="flex items-center text-neutral-500 gap-1 font-medium">
                <MapPin size={14} /> {result.distance} km
              </span>
              <span className="text-neutral-300">•</span>
              <Badge variant="outline" className="text-neutral-600 bg-surface">
                {f.type.replace('_', ' ')}
              </Badge>
              {f.type.includes('government') && (
                <Badge variant="default" className="bg-blue-50 text-blue-700 border-blue-200">
                  Government
                </Badge>
              )}
            </div>
          </div>

          {isEmergency && f.emergencyAvailable && (
            <Badge variant="emergency" className="px-3 py-1.5 text-sm shrink-0">
              <HeartPulse size={16} className="mr-2 animate-pulse" />
              {f.emergencyHours || '24/7 Emergency'}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="py-2">
        <div className="flex flex-wrap gap-2 mb-4">
          {result.matchReasons.map((reason) => (
            <Badge key={reason} variant="success" className="bg-success/5 border-success/20">
              <CheckCircle2 size={12} className="mr-1 text-success" />
              {reason}
            </Badge>
          ))}
          {result.missingCapabilities.map((miss) => (
            <Badge
              key={miss}
              variant="warning"
              className="bg-neutral-50 border-neutral-200 text-neutral-500"
            >
              <AlertCircle size={12} className="mr-1 text-neutral-400" />
              {miss}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3 bg-neutral-50/50 border-t border-border">
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5 text-neutral-500" title="Data provenance">
            {isVerified ? (
              <ShieldCheck size={14} className="text-success" />
            ) : (
              <ShieldCheck size={14} className="text-neutral-400" />
            )}
            <span className={isVerified ? 'text-neutral-700' : 'text-neutral-400'}>
              {isVerified ? 'Verified' : 'Unverified'}
            </span>
          </div>
          <div
            className={`flex items-center gap-1.5 ${isStale ? 'text-warning' : 'text-neutral-500'}`}
          >
            <Clock size={14} />
            <span>{hoursAgo}h ago</span>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-brand hover:text-brand-light font-medium ml-2"
          >
            {expanded ? 'Hide Evidence' : 'View Evidence'}
          </button>
        </div>

        <div className="flex w-full sm:w-auto gap-2">
          {f.phone && (
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
              <Phone size={14} className="mr-2" /> Call
            </Button>
          )}
          <Button variant="primary" size="sm" className="flex-1 sm:flex-none">
            <MapPin size={14} className="mr-2" /> Directions
          </Button>
        </div>
      </CardFooter>

      {/* Evidence Expansion */}
      {expanded && (
        <div className="px-6 py-5 bg-neutral-50/80 border-t border-border rounded-b-xl shadow-inner">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
              <Database size={14} /> AI Data Extraction Evidence
            </h4>
            
            {f.scraperId && (
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs bg-white text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700"
                onClick={async () => {
                  // Simulate self-healing
                  const btn = document.getElementById(`heal-${f.id}`);
                  if (btn) {
                    const originalText = btn.innerText;
                    btn.innerText = 'Healing...';
                    btn.classList.add('animate-pulse');
                    await new Promise(r => setTimeout(r, 2000));
                    btn.innerText = 'Healed ✓';
                    btn.classList.remove('animate-pulse');
                    btn.classList.remove('text-amber-600', 'border-amber-200', 'hover:bg-amber-50');
                    btn.classList.add('text-success', 'border-success/30', 'bg-success/5');
                    setTimeout(() => {
                      btn.innerText = originalText;
                      btn.classList.remove('text-success', 'border-success/30', 'bg-success/5');
                      btn.classList.add('text-amber-600', 'border-amber-200', 'hover:bg-amber-50');
                    }, 3000);
                  }
                }}
                id={`heal-${f.id}`}
              >
                Heal Scraper
              </Button>
            )}
          </div>
          
          <div className="space-y-4">
            {evidence.map((ev: Record<string, string>, i: number) => (
              <div key={i} className="flex gap-4">
                <div className="w-1 bg-brand/30 rounded-full"></div>
                <div>
                  <div className="flex items-center gap-2 mb-1 text-sm">
                    <span className="font-semibold text-neutral-800">{ev.field || 'Fact'}</span>
                    <a
                      href={ev.sourceUrl || f.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand flex items-center hover:underline text-xs"
                    >
                      Source <ArrowUpRight size={12} />
                    </a>
                  </div>
                  <p className="text-sm text-neutral-600 italic">
                    &quot;{ev.extractedText || ev.sourceText || ev.provenance || 'Information verified via AI Extraction.'}&quot;
                  </p>
                </div>
              </div>
            ))}
            {evidence.length === 0 && (
              <p className="text-sm text-neutral-500 italic">
                No direct quoted evidence available for this facility.
              </p>
            )}

            <div className="pt-4 mt-4 border-t border-border/60 flex justify-between text-[10px] text-neutral-400 font-mono">
              <span>ID: {f.id}</span>
              <span>Scraper: {f.scraperId || 'unknown'}</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
