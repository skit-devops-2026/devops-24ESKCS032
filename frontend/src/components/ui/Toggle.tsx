import { cn } from '../../lib/utils';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  size?: 'sm' | 'md';
}

export function Toggle({ checked, onChange, disabled = false, id, size = 'md' }: ToggleProps) {
  const isSmall = size === 'sm';
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex shrink-0 rounded-full border-2 border-transparent',
        'transition-all duration-250 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        isSmall ? 'h-5 w-9' : 'h-6 w-11',
        checked
          ? 'bg-accent-cyan shadow-glow-cyan'
          : 'bg-surface-border',
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block rounded-full bg-white shadow-md',
          'transform transition-transform duration-250',
          isSmall ? 'h-4 w-4' : 'h-5 w-5',
          checked
            ? isSmall ? 'translate-x-4' : 'translate-x-5'
            : 'translate-x-0',
        )}
      />
    </button>
  );
}
