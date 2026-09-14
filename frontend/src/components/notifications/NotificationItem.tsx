import { X } from 'lucide-react';
import type { AppNotification } from '../../types';
import { useDevices } from '../../context/DeviceContext';
import { Badge } from '../ui/Badge';
import { formatDistanceToNow } from '../../lib/time';
import { cn } from '../../lib/utils';

const typeConfig = {
  AUTOMATION: { label: 'Automation', variant: 'cyan' as const,   icon: '⚡' },
  WARNING:    { label: 'Warning',    variant: 'amber' as const,   icon: '⚠️' },
  INFO:       { label: 'Info',       variant: 'gray' as const,    icon: 'ℹ️' },
  ALERT:      { label: 'Alert',      variant: 'red' as const,     icon: '🔔' },
};

interface NotificationItemProps {
  notification: AppNotification;
}

export function NotificationItem({ notification: n }: NotificationItemProps) {
  const { markNotificationRead, dismissNotification } = useDevices();
  const config = typeConfig[n.type];

  return (
    <div
      onClick={() => !n.read && markNotificationRead(n.id)}
      className={cn(
        'group flex items-start gap-3 p-4 rounded-xl border transition-all duration-150',
        n.read
          ? 'bg-surface-2 border-surface-border opacity-70'
          : 'bg-surface-3 border-accent-cyan/20 cursor-pointer hover:border-accent-cyan/40',
      )}
    >
      {/* Unread dot */}
      <div className="pt-1 shrink-0">
        <div className={cn(
          'h-2 w-2 rounded-full transition-colors',
          n.read ? 'bg-surface-border' : 'bg-accent-cyan animate-pulse-slow',
        )} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="text-sm font-semibold text-white">{n.title}</span>
          <Badge variant={config.variant} size="sm">{config.label}</Badge>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">{n.message}</p>
        <p className="text-[10px] text-gray-600 mt-1.5">{formatDistanceToNow(n.timestamp)}</p>
      </div>

      {/* Dismiss button */}
      <button
        onClick={e => { e.stopPropagation(); dismissNotification(n.id); }}
        className="p-1 rounded-lg text-gray-600 hover:text-gray-300 hover:bg-surface-4 opacity-0 group-hover:opacity-100 transition-all"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
