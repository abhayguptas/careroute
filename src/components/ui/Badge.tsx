import React from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'emergency' | 'outline';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

export function Badge({ variant = 'default', className = '', children, ...props }: BadgeProps) {
  const baseStyles =
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border';

  const variants = {
    default: 'bg-neutral-100 text-neutral-800 border-neutral-200',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning-foreground border-warning/20',
    emergency: 'bg-emergency/10 text-emergency border-emergency/20',
    outline: 'bg-transparent text-foreground border-border',
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}
