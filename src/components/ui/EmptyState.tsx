import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-16 text-center border-2 border-dashed border-border rounded-2xl bg-neutral-50 ${className}`}
    >
      <div className="bg-neutral-100 p-5 rounded-full mb-6">
        <Icon size={32} className="text-neutral-400" />
      </div>
      <h3 className="text-xl font-bold text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-500 mb-8 max-w-sm leading-relaxed">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
