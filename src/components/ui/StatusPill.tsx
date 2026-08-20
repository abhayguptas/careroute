import React from 'react';

type Status = 'healthy' | 'broken' | 'healing' | 'creating' | 'ready';

interface StatusPillProps {
  status: Status;
  className?: string;
}

export function StatusPill({ status, className = '' }: StatusPillProps) {
  const config = {
    healthy: { color: 'bg-green-500', text: 'Healthy', textColor: 'text-green-500', bg: 'bg-green-500/10 border-green-500/20' },
    ready: { color: 'bg-green-500', text: 'Ready', textColor: 'text-green-500', bg: 'bg-green-500/10 border-green-500/20' },
    broken: { color: 'bg-red-500', text: 'Needs Attention', textColor: 'text-red-500', bg: 'bg-red-500/10 border-red-500/20' },
    healing: { color: 'bg-amber-500 animate-pulse', text: 'Healing...', textColor: 'text-amber-500', bg: 'bg-amber-500/10 border-amber-500/20' },
    creating: { color: 'bg-blue-500 animate-pulse', text: 'Initializing', textColor: 'text-blue-500', bg: 'bg-blue-500/10 border-blue-500/20' },
  };

  const { color, text, textColor, bg } = config[status] || config.healthy;

  return (
    <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium border ${bg} ${className}`}>
      <span className={`w-2 h-2 rounded-full ${color}`} />
      <span className={textColor}>{text}</span>
    </div>
  );
}
