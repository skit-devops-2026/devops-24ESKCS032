import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const variantClasses = {
  primary:   'bg-accent-cyan text-surface-0 hover:bg-accent-cyan-dim shadow-glow-cyan font-semibold',
  secondary: 'bg-surface-3 border border-surface-border text-white hover:bg-surface-4 hover:border-accent-cyan/40',
  ghost:     'text-gray-400 hover:text-white hover:bg-surface-3',
  danger:    'bg-accent-red/20 border border-accent-red/40 text-accent-red hover:bg-accent-red/30',
  success:   'bg-accent-green/20 border border-accent-green/40 text-accent-green hover:bg-accent-green/30',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
};

export function Button({
  variant = 'secondary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-all duration-150',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
