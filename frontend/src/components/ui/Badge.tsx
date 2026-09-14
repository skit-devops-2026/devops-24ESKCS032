import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'amber' | 'green' | 'red' | 'violet' | 'gray' | 'orange';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

const variantClasses = {
  cyan:   'bg-accent-cyan/15 text-accent-cyan border-accent-cyan/30',
  amber:  'bg-accent-amber/15 text-accent-amber border-accent-amber/30',
  green:  'bg-accent-green/15 text-accent-green border-accent-green/30',
  red:    'bg-accent-red/15 text-accent-red border-accent-red/30',
  violet: 'bg-accent-violet/15 text-accent-violet border-accent-violet/30',
  orange: 'bg-accent-orange/15 text-accent-orange border-accent-orange/30',
  gray:   'bg-surface-3 text-gray-400 border-surface-border',
};

const dotColors = {
  cyan:   'bg-accent-cyan',
  amber:  'bg-accent-amber',
  green:  'bg-accent-green',
  red:    'bg-accent-red',
  violet: 'bg-accent-violet',
  orange: 'bg-accent-orange',
  gray:   'bg-gray-400',
};

export function Badge({
  children, variant = 'cyan', size = 'sm', dot = false, className,
}: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 rounded-full border font-medium',
      size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
      variantClasses[variant],
      className,
    )}>
      {dot && (
        <span className={cn('h-1.5 w-1.5 rounded-full', dotColors[variant])} />
      )}
      {children}
    </span>
  );
}
