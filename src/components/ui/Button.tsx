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
      'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-md';

    const variants = {
      primary: 'bg-brand hover:bg-brand-light text-brand-foreground focus:ring-brand',
      secondary: 'bg-neutral-800 hover:bg-neutral-700 text-white focus:ring-neutral-700',
      emergency: 'bg-emergency hover:bg-red-600 text-emergency-foreground focus:ring-emergency',
      outline: 'border border-border hover:bg-neutral-800 text-foreground focus:ring-neutral-700',
      ghost: 'hover:bg-neutral-800 text-slate-300 hover:text-white focus:ring-neutral-700',
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
