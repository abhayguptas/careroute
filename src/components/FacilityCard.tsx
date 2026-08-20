'use client';

import { useState } from 'react';
import { HeartPulse, CheckCircle2, AlertCircle, Clock, MapPin, Phone, ArrowUpRight, ShieldCheck, Database } from 'lucide-react';
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
  const hoursAgo = (index * 2) + 1;
  const isStale = hoursAgo > 48;

  const services = (typeof f.services === 'string' ? JSON.parse(f.services || '[]') : f.services) || [];

  return (
    <Card className={`transition-all duration-300 ${isEmergency && index === 0 ? 'border-emergency/50 shadow-[0_0_20px_rgba(225,29,72,0.1)]' : 'hover:border-neutral-700'}`}>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-neutral-800 text-slate-300 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">#{index + 1}</span>
              <h2 className="text-xl font-bold text-white leading-tight">{f.name}</h2>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm mt-2">
              <span className="flex items-center text-slate-400 gap-1"><MapPin size={14} /> {result.distance} km</span>
              <span className="text-neutral-700">•</span>
              <Badge variant="outline" className="text-slate-400">{f.type.replace('_', ' ')}</Badge>
              {f.type.includes('government') && (
                <Badge variant="default" className="bg-blue-900/20 text-blue-400 border-blue-900/30">Government</Badge>
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
          {result.matchReasons.map(reason => (
            <Badge key={reason} variant="success" className="bg-neutral-900 border-green-900/30">
              <CheckCircle2 size={12} className="mr-1 text-green-500" />
              {reason}
            </Badge>
          ))}
          {result.missingCapabilities.map(miss => (
            <Badge key={miss} variant="warning" className="bg-neutral-900 border-amber-900/30 text-slate-400">
              <AlertCircle size={12} className="mr-1 text-amber-500/70" />
              {miss}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3 bg-transparent border-t border-neutral-800">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400" title="Data provenance">
            {isVerified ? <ShieldCheck size={14} className="text-green-500" /> : <ShieldCheck size={14} className="text-slate-500" />}
            <span className={isVerified ? 'text-slate-300' : ''}>{isVerified ? 'Verified' : 'Unverified'}</span>
          </div>
          <div className={`flex items-center gap-1.5 ${isStale ? 'text-amber-500/70' : 'text-slate-400'}`}>
            <Clock size={14} />
            <span>{hoursAgo}h ago</span>
          </div>
          <button onClick={() => setExpanded(!expanded)} className="text-brand hover:text-brand-light font-medium ml-2">
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
        <div className="px-6 py-4 bg-neutral-950 border-t border-neutral-800">
           <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
             <Database size={14} /> AI Data Extraction Evidence
           </h4>
           <div className="space-y-4">
             {evidence.map((ev: any, i: number) => (
                <div key={i} className="flex gap-4">
                  <div className="w-1 bg-neutral-800 rounded-full"></div>
                  <div>
                    <div className="flex items-center gap-2 mb-1 text-sm">
                      <span className="font-semibold text-slate-300">{ev.field || 'Fact'}</span>
                      <a href={ev.sourceUrl || f.sourceUrl} target="_blank" rel="noreferrer" className="text-brand flex items-center hover:underline text-xs">
                        Source <ArrowUpRight size={12} />
                      </a>
                    </div>
                    <p className="text-sm text-slate-400 italic">"{ev.extractedText || ev.sourceText}"</p>
                  </div>
                </div>
             ))}
             {evidence.length === 0 && (
                <p className="text-sm text-slate-500 italic">No direct quoted evidence available for this facility.</p>
             )}
             
             <div className="pt-3 mt-3 border-t border-neutral-800/50 flex justify-between text-[10px] text-slate-500 font-mono">
               <span>ID: {f.id}</span>
               <span>Scraper: {f.scraperId}</span>
             </div>
           </div>
        </div>
      )}
    </Card>
  );
}
