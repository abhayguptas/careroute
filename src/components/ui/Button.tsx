import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'emergency' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-full';

    const variants = {
      primary: 'bg-brand hover:bg-brand-light text-brand-foreground shadow-sm focus:ring-brand',
      secondary:
        'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 shadow-sm focus:ring-neutral-200',
      emergency:
        'bg-emergency hover:bg-red-600 text-emergency-foreground shadow-sm focus:ring-emergency',
      outline:
        'bg-surface border border-border hover:bg-neutral-50 text-foreground shadow-sm focus:ring-neutral-200',
      ghost: 'hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 focus:ring-neutral-200',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 py-2 text-sm',
      lg: 'h-12 px-8 text-base',
      icon: 'h-10 w-10',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
