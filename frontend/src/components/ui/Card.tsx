import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, glass = true, hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-2xl transition-all duration-250',
        glass ? 'glass' : 'bg-surface-2 border border-surface-border',
        hover && 'cursor-pointer hover:border-accent-cyan/40 hover:shadow-card-hover hover:-translate-y-0.5',
        onClick && 'cursor-pointer',
        className,
      )}
    >
      {children}
    </div>
  );
}
